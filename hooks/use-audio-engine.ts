"use client"

import { useEffect, useRef, useCallback, useState } from "react"

interface AudioControls {
  volume: number
  pitch: number
  reverb: number
  muted: boolean
}

interface UseAudioEngineReturn {
  playNote: (frequency: number, velocity?: number) => void
  stopAll: () => void
  controls: AudioControls
  setVolume: (v: number) => void
  setPitch: (v: number) => void
  setReverb: (v: number) => void
  setMuted: (v: boolean) => void
  isReady: boolean
  activeNotes: Set<string>
}

export function useAudioEngine(): UseAudioEngineReturn {
  const audioCtxRef = useRef<AudioContext | null>(null)
  const reverbNodeRef = useRef<ConvolverNode | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const filterRef = useRef<BiquadFilterNode | null>(null)
  const pannerRef = useRef<StereoPannerNode | null>(null)
  const activeOscillatorsRef = useRef<Map<string, OscillatorNode>>(new Map())

  const [controls, setControls] = useState<AudioControls>({
    volume: 0.7,
    pitch: 0,
    reverb: 0.4,
    muted: false,
  })
  const [isReady, setIsReady] = useState(false)
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set())
  const controlsRef = useRef(controls)
  controlsRef.current = controls

  const initAudio = useCallback(async () => {
    if (audioCtxRef.current) return
    const ctx = new AudioContext()
    audioCtxRef.current = ctx

    // Master gain
    const masterGain = ctx.createGain()
    masterGain.gain.value = controls.volume
    masterGainRef.current = masterGain

    // Filter
    const filter = ctx.createBiquadFilter()
    filter.type = "lowpass"
    filter.frequency.value = 4000
    filter.Q.value = 1
    filterRef.current = filter

    // Reverb (convolver with generated impulse)
    const convolver = ctx.createConvolver()
    const impulseLength = ctx.sampleRate * 2.5
    const impulse = ctx.createBuffer(2, impulseLength, ctx.sampleRate)
    for (let channel = 0; channel < 2; channel++) {
      const data = impulse.getChannelData(channel)
      for (let i = 0; i < impulseLength; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / impulseLength, 3)
      }
    }
    convolver.buffer = impulse
    reverbNodeRef.current = convolver

    // Panner
    const panner = ctx.createStereoPanner()
    panner.pan.value = 0
    pannerRef.current = panner

    // Reverb wet/dry mix
    const dryGain = ctx.createGain()
    dryGain.gain.value = 1 - controls.reverb
    const wetGain = ctx.createGain()
    wetGain.gain.value = controls.reverb

    // Chain: filter → dry/wet → panner → master → output
    filter.connect(dryGain)
    filter.connect(convolver)
    convolver.connect(wetGain)
    dryGain.connect(panner)
    wetGain.connect(panner)
    panner.connect(masterGain)
    masterGain.connect(ctx.destination)

    setIsReady(true)
  }, [controls.reverb, controls.volume])

  const playNote = useCallback(
    (frequency: number, velocity = 0.8) => {
      if (controlsRef.current.muted) return

      // Lazy init
      if (!audioCtxRef.current) {
        initAudio().then(() => playNote(frequency, velocity))
        return
      }

      const ctx = audioCtxRef.current
      if (ctx.state === "suspended") {
        ctx.resume()
      }

      const filter = filterRef.current
      if (!filter) return

      const now = ctx.currentTime
      const pitchMultiplier = Math.pow(2, controlsRef.current.pitch / 12)
      const finalFrequency = frequency * pitchMultiplier
      const freqKey = `${frequency}`

      // Stop existing note at this frequency
      if (activeOscillatorsRef.current.has(freqKey)) {
        const existing = activeOscillatorsRef.current.get(freqKey)!
        existing.stop(now + 0.05)
        activeOscillatorsRef.current.delete(freqKey)
      }

      // Create oscillator with a richer timbre
      const osc = ctx.createOscillator()
      const gainNode = ctx.createGain()
      const osc2 = ctx.createOscillator() // Harmonic
      const gainNode2 = ctx.createGain()

      osc.type = "sawtooth"
      osc.frequency.setValueAtTime(finalFrequency, now)
      gainNode.gain.setValueAtTime(0, now)
      gainNode.gain.linearRampToValueAtTime(velocity * controlsRef.current.volume * 0.6, now + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 3)

      osc2.type = "sine"
      osc2.frequency.setValueAtTime(finalFrequency * 2, now) // Octave harmonic
      gainNode2.gain.setValueAtTime(0, now)
      gainNode2.gain.linearRampToValueAtTime(velocity * controlsRef.current.volume * 0.2, now + 0.01)
      gainNode2.gain.exponentialRampToValueAtTime(0.001, now + 2)

      osc.connect(gainNode)
      osc2.connect(gainNode2)
      gainNode.connect(filter)
      gainNode2.connect(filter)

      osc.start(now)
      osc2.start(now)
      osc.stop(now + 3)
      osc2.stop(now + 2)

      activeOscillatorsRef.current.set(freqKey, osc)
      setActiveNotes((prev) => new Set([...prev, freqKey]))

      osc.addEventListener("ended", () => {
        activeOscillatorsRef.current.delete(freqKey)
        setActiveNotes((prev) => {
          const next = new Set(prev)
          next.delete(freqKey)
          return next
        })
      })
    },
    [initAudio]
  )

  const stopAll = useCallback(() => {
    if (!audioCtxRef.current) return
    const now = audioCtxRef.current.currentTime
    activeOscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop(now + 0.1)
      } catch {}
    })
    activeOscillatorsRef.current.clear()
    setActiveNotes(new Set())
  }, [])

  const setVolume = useCallback((v: number) => {
    setControls((c) => ({ ...c, volume: v }))
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = v
    }
  }, [])

  const setPitch = useCallback((v: number) => {
    setControls((c) => ({ ...c, pitch: v }))
  }, [])

  const setReverb = useCallback((v: number) => {
    setControls((c) => ({ ...c, reverb: v }))
  }, [])

  const setMuted = useCallback((v: boolean) => {
    setControls((c) => ({ ...c, muted: v }))
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = v ? 0 : controlsRef.current.volume
    }
  }, [])

  useEffect(() => {
    return () => {
      stopAll()
      audioCtxRef.current?.close()
    }
  }, [stopAll])

  return {
    playNote,
    stopAll,
    controls,
    setVolume,
    setPitch,
    setReverb,
    setMuted,
    isReady,
    activeNotes,
  }
}
