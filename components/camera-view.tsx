"use client"

import { useEffect, useRef, useState } from "react"
import { KazakhOrnament } from "@/components/kazakh-ornament"

export interface Point {
  x: number
  y: number
  z: number
}

interface CameraViewProps {
  onHandCoordinates: (landmarks: Point[]) => void
}

export function CameraView({ onHandCoordinates }: CameraViewProps) {

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  useEffect(() => {

    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1280, height: 720, aspectRatio: 16 / 9 }
      })
      .then((stream) => {
        setHasPermission(true)
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      })
      .catch(() => setHasPermission(false))

  }, [])

  useEffect(() => {

    if (!hasPermission || !videoRef.current || !canvasRef.current) return

    let hands: any
    let camera: any

    const loadScript = (src: string) =>
      new Promise((resolve, reject) => {
        const script = document.createElement("script")
        script.src = src
        script.async = true
        script.onload = resolve
        script.onerror = reject
        document.body.appendChild(script)
      })

    const init = async () => {

      await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js")
      await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js")

      // @ts-ignore
      const Hands = window.Hands
      // @ts-ignore
      const Camera = window.Camera

      if (!Hands || !Camera) {
        console.error("MediaPipe not loaded")
        return
      }

      hands = new Hands({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      })

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.6
      })

      const onResults = (results: any) => {

        const canvas = canvasRef.current!
        const ctx = canvas.getContext("2d")!

        ctx.save()
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.translate(canvas.width, 0)
        ctx.scale(-1, 1)

        ctx.drawImage(
          results.image,
          0,
          0,
          canvas.width,
          canvas.height
        )

        if (results.multiHandLandmarks?.length) {

          const landmarks = results.multiHandLandmarks[0]

          onHandCoordinates(landmarks)

          const connections = [
            [0,1],[1,2],[2,3],[3,4],
            [0,5],[5,6],[6,7],[7,8],
            [5,9],[9,10],[10,11],[11,12],
            [9,13],[13,14],[14,15],[15,16],
            [13,17],[17,18],[18,19],[19,20],
            [0,17]
          ]

          ctx.strokeStyle = "rgba(42, 123, 124, 0.4)" // Turquoise
          ctx.lineWidth = 3

          connections.forEach(([a,b]) => {

            const p1 = landmarks[a]
            const p2 = landmarks[b]

            ctx.beginPath()
            ctx.moveTo(p1.x * canvas.width, p1.y * canvas.height)
            ctx.lineTo(p2.x * canvas.width, p2.y * canvas.height)
            ctx.stroke()

          })

          const tips = [4,8,12,16,20]

          tips.forEach((t) => {

            const p = landmarks[t]

            const x = p.x * canvas.width
            const y = p.y * canvas.height

            ctx.fillStyle = "rgba(200, 148, 42, 0.8)" // Gold
            ctx.fill()
            
            // Add a subtle glow
            ctx.shadowColor = "rgba(200, 148, 42, 0.4)"
            ctx.shadowBlur = 10
            ctx.stroke()
            ctx.shadowBlur = 0

          })

        }

        ctx.restore()

      }

      hands.onResults(onResults)

      camera = new Camera(videoRef.current, {

        onFrame: async () => {
          if (videoRef.current) {
            await hands.send({ image: videoRef.current })
          }
        },

        width: 1280,
        height: 720

      })

      camera.start()

    }

    init()

    return () => {

      if (camera) camera.stop()
      if (hands) hands.close()

    }

  }, [hasPermission, onHandCoordinates])

  if (hasPermission === false) {

    return (
      <div className="flex items-center justify-center w-full aspect-video bg-black/50 text-white text-sm">
        Camera permission required
      </div>
    )

  }

  return (

    <div className="relative w-full aspect-video overflow-hidden">

      <video
        ref={videoRef}
        playsInline
        className="hidden"
      />

      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        className="absolute inset-0 w-full h-full"
      />

      {hasPermission === null && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-ivory/60 backdrop-blur-md">
          <div className="animate-slow-rotate mb-4">
            <KazakhOrnament size={60} variant="medallion" opacity={0.6} />
          </div>
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-gold">
            Бейнекамера қосылуда...
          </span>
        </div>
      )}

    </div>

  )

}