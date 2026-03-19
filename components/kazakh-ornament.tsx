"use client"

import { motion } from "framer-motion"

interface KazakhOrnamentProps {
  className?: string
  size?: number
  opacity?: number
  animated?: boolean
  color?: string
  variant?: "corner" | "center" | "border" | "full" | "horn" | "medallion"
  width?: number
  height?: number
}

export function KazakhOrnament({
  className = "",
  size = 200,
  opacity = 0.35,
  animated = false,
  color = "#C8942A",
  variant = "center",
  width,
  height,
}: KazakhOrnamentProps) {
  const w = width ?? size
  const h = height ?? size

  const Wrapper = animated ? motion.div : "div"
  const animProps = animated
    ? {
        animate: { rotate: 360 },
        transition: { duration: 60, repeat: Infinity, ease: "linear" },
      }
    : {}

  /* ── QOSHQAR MUIZ (Ram Horn) border strip ── */
  if (variant === "border") {
    const unitW = 40
    const unitH = 24
    const count = Math.max(1, Math.floor(w / unitW))
    const totalW = count * unitW
    return (
      <svg
        width={totalW}
        height={unitH}
        viewBox={`0 0 ${totalW} ${unitH}`}
        className={className}
        style={{ opacity }}
        fill="none"
        aria-hidden="true"
      >
        {Array.from({ length: count }).map((_, i) => {
          const ox = i * unitW
          return (
            <g key={i} transform={`translate(${ox}, 0)`}>
              {/* Ram horn S-curve left */}
              <path
                d={`M 4 12 C 4 5, 12 5, 12 12 C 12 19, 20 19, 20 12`}
                stroke={color}
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
              />
              {/* Ram horn S-curve right mirrored */}
              <path
                d={`M 20 12 C 20 5, 28 5, 28 12 C 28 19, 36 19, 36 12`}
                stroke={color}
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
              />
              {/* Center dot */}
              <circle cx="20" cy="12" r="2" fill={color} fillOpacity="0.6" />
              {/* Small diamonds */}
              <path d={`M 12 12 l 2 -2 l 2 2 l -2 2 Z`} fill={color} fillOpacity="0.35" />
              <path d={`M 28 12 l 2 -2 l 2 2 l -2 2 Z`} fill={color} fillOpacity="0.35" />
            </g>
          )
        })}
      </svg>
    )
  }

  /* ── CORNER frame piece ── */
  if (variant === "corner") {
    return (
      <svg
        width={w}
        height={h}
        viewBox="0 0 120 120"
        className={className}
        style={{ opacity }}
        fill="none"
        aria-hidden="true"
      >
        {/* Outer L frame */}
        <path d="M 8 8 L 60 8 L 60 14 L 14 14 L 14 60 L 8 60 Z"
          stroke={color} strokeWidth="1.5" fill="none" />
        {/* Inner accent line */}
        <path d="M 18 18 L 50 18 L 50 22 L 22 22 L 22 50 L 18 50 Z"
          stroke={color} strokeWidth="0.8" fill="none" />
        {/* Ram horn motif */}
        <path d="M 18 14 C 18 8, 26 8, 26 15 C 26 22, 34 22, 34 14"
          stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round" />
        {/* Small diamond at corner junction */}
        <path d="M 14 14 l 5 -5 l 5 5 l -5 5 Z"
          fill={color} fillOpacity="0.4" />
        <circle cx="34" cy="14" r="3" fill={color} fillOpacity="0.5" />
        {/* Dot ornaments along lines */}
        {[28, 42].map((x) => (
          <circle key={x} cx={x} cy="11" r="1.5" fill={color} fillOpacity="0.4" />
        ))}
        {[28, 42].map((y) => (
          <circle key={y} cx="11" cy={y} r="1.5" fill={color} fillOpacity="0.4" />
        ))}
      </svg>
    )
  }

  /* ── FULL radial medallion with ram horns ── */
  if (variant === "full") {
    const cx = 200, cy = 200
    return (
      <svg
        width={w}
        height={h}
        viewBox="0 0 400 400"
        className={className}
        style={{ opacity }}
        fill="none"
        aria-hidden="true"
      >
        {/* Outer decorative ring */}
        <circle cx={cx} cy={cy} r="180" stroke={color} strokeWidth="1.5"
          strokeDasharray="6 8" fill="none" />
        <circle cx={cx} cy={cy} r="168" stroke={color} strokeWidth="0.6" fill="none" />

        {/* Eight ram horn pairs at 45° intervals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const bx = cx + 145 * Math.cos(rad)
          const by = cy + 145 * Math.sin(rad)
          const mx1 = cx + 115 * Math.cos(rad)
          const my1 = cy + 115 * Math.sin(rad)
          const perpRad = rad + Math.PI / 2
          const px = 14 * Math.cos(perpRad)
          const py = 14 * Math.sin(perpRad)
          return (
            <g key={angle}>
              {/* Ram horn spiral */}
              <path
                d={`M ${bx} ${by} C ${bx + px * 1.8} ${by + py * 1.8} ${mx1 + px * 2.5} ${my1 + py * 2.5} ${mx1 + px * 0.8} ${my1 + py * 0.8}`}
                stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round"
              />
              <path
                d={`M ${bx} ${by} C ${bx - px * 1.8} ${by - py * 1.8} ${mx1 - px * 2.5} ${my1 - py * 2.5} ${mx1 - px * 0.8} ${my1 - py * 0.8}`}
                stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round"
              />
              {/* Outer dot */}
              <circle cx={bx} cy={by} r="3.5" fill={color} fillOpacity="0.55" />
              {/* Mid diamond */}
              <path
                d={`M ${mx1} ${my1 - 5} L ${mx1 + 4} ${my1} L ${mx1} ${my1 + 5} L ${mx1 - 4} ${my1} Z`}
                fill={color} fillOpacity="0.35"
              />
            </g>
          )
        })}

        {/* Inner geometric band */}
        <circle cx={cx} cy={cy} r="100" stroke={color} strokeWidth="1" fill="none" />
        <circle cx={cx} cy={cy} r="88"  stroke={color} strokeWidth="0.6" strokeDasharray="3 5" fill="none" />

        {/* Four large ram horn pairs at cardinal points */}
        {[0, 90, 180, 270].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const bx = cx + 70 * Math.cos(rad)
          const by = cy + 70 * Math.sin(rad)
          const perpRad = rad + Math.PI / 2
          const px = 18 * Math.cos(perpRad)
          const py = 18 * Math.sin(perpRad)
          const ex1 = cx + 56 * Math.cos(rad) + px * 0.6
          const ey1 = cy + 56 * Math.sin(rad) + py * 0.6
          const ex2 = cx + 56 * Math.cos(rad) - px * 0.6
          const ey2 = cy + 56 * Math.sin(rad) - py * 0.6
          return (
            <g key={angle}>
              <path d={`M ${bx} ${by} C ${bx + px * 2} ${by + py * 2} ${ex1} ${ey1 - 6} ${cx + 46 * Math.cos(rad)} ${cy + 46 * Math.sin(rad)}`}
                stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <path d={`M ${bx} ${by} C ${bx - px * 2} ${by - py * 2} ${ex2} ${ey2 - 6} ${cx + 46 * Math.cos(rad)} ${cy + 46 * Math.sin(rad)}`}
                stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
              <circle cx={bx} cy={by} r="5" fill={color} fillOpacity="0.45" />
            </g>
          )
        })}

        {/* Central flower */}
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const ox = cx + 24 * Math.cos(rad)
          const oy = cy + 24 * Math.sin(rad)
          return (
            <ellipse key={angle}
              cx={ox} cy={oy} rx="7" ry="4"
              transform={`rotate(${angle}, ${ox}, ${oy})`}
              fill={color} fillOpacity="0.30"
              stroke={color} strokeWidth="0.6"
            />
          )
        })}
        <circle cx={cx} cy={cy} r="10" fill={color} fillOpacity="0.20" stroke={color} strokeWidth="1" />
        <circle cx={cx} cy={cy} r="4"  fill={color} fillOpacity="0.70" />
      </svg>
    )
  }

  /* ── HORN single motif ── */
  if (variant === "horn") {
    return (
      <svg
        width={w}
        height={h}
        viewBox="0 0 80 80"
        className={className}
        style={{ opacity }}
        fill="none"
        aria-hidden="true"
      >
        {/* Simple large ram horn pair */}
        <path d="M 40 60 C 40 40, 20 35, 18 20 C 16 8, 28 8, 32 20 C 36 32, 40 38, 40 40"
          stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 40 60 C 40 40, 60 35, 62 20 C 64 8, 52 8, 48 20 C 44 32, 40 38, 40 40"
          stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="40" cy="62" r="4" fill={color} fillOpacity="0.5" />
      </svg>
    )
  }

  /* ── MEDALLION compact ── */
  if (variant === "medallion") {
    const r = size / 2
    const cx = r, cy = r
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={className}
        style={{ opacity }}
        fill="none"
        aria-hidden="true"
      >
        <circle cx={cx} cy={cy} r={r * 0.92} stroke={color} strokeWidth="1" strokeDasharray="4 6" />
        <circle cx={cx} cy={cy} r={r * 0.75} stroke={color} strokeWidth="0.8" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const x1 = cx + r * 0.40 * Math.cos(rad)
          const y1 = cy + r * 0.40 * Math.sin(rad)
          const x2 = cx + r * 0.72 * Math.cos(rad)
          const y2 = cy + r * 0.72 * Math.sin(rad)
          return (
            <g key={angle}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.8" />
              <circle cx={x2} cy={y2} r="2.5" fill={color} fillOpacity="0.45" />
            </g>
          )
        })}
        <circle cx={cx} cy={cy} r={r * 0.22} fill={color} fillOpacity="0.15" stroke={color} strokeWidth="0.8" />
        <circle cx={cx} cy={cy} r={r * 0.08} fill={color} fillOpacity="0.65" />
      </svg>
    )
  }

  /* ── DEFAULT: center rotating ornament ── */
  const wrapperStyle = { opacity }
  const wrapperClass = className
  return (
    <Wrapper className={wrapperClass} {...(animated ? animProps : {})} style={wrapperStyle}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        {/* Outer ring */}
        <circle cx="100" cy="100" r="88" stroke={color} strokeWidth="0.8" strokeDasharray="4 7" />
        {/* Mid ring */}
        <circle cx="100" cy="100" r="66" stroke={color} strokeWidth="1" />
        {/* Eight spokes with ram horn ends */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const ix = 100 + 30 * Math.cos(rad)
          const iy = 100 + 30 * Math.sin(rad)
          const ox = 100 + 65 * Math.cos(rad)
          const oy = 100 + 65 * Math.sin(rad)
          const perp = rad + Math.PI / 2
          const px = 8 * Math.cos(perp)
          const py = 8 * Math.sin(perp)
          return (
            <g key={angle}>
              <line x1={ix} y1={iy} x2={ox} y2={oy} stroke={color} strokeWidth="0.8" />
              <path d={`M ${ox} ${oy} C ${ox + px} ${oy + py} ${ox + px * 0.5 + 4 * Math.cos(rad)} ${oy + py * 0.5 + 4 * Math.sin(rad)} ${ox + 4 * Math.cos(rad)} ${oy + 4 * Math.sin(rad)}`}
                stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" />
              <path d={`M ${ox} ${oy} C ${ox - px} ${oy - py} ${ox - px * 0.5 + 4 * Math.cos(rad)} ${oy - py * 0.5 + 4 * Math.sin(rad)} ${ox + 4 * Math.cos(rad)} ${oy + 4 * Math.sin(rad)}`}
                stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" />
            </g>
          )
        })}
        {/* Inner flower */}
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180
          return (
            <ellipse key={angle}
              cx={100 + 18 * Math.cos(rad)}
              cy={100 + 18 * Math.sin(rad)}
              rx="6" ry="3.5"
              transform={`rotate(${angle}, ${100 + 18 * Math.cos(rad)}, ${100 + 18 * Math.sin(rad)})`}
              fill={color} fillOpacity="0.25"
              stroke={color} strokeWidth="0.6"
            />
          )
        })}
        <circle cx="100" cy="100" r="8" fill={color} fillOpacity="0.18" stroke={color} strokeWidth="0.8" />
        <circle cx="100" cy="100" r="3" fill={color} fillOpacity="0.80" />
      </svg>
    </Wrapper>
  )
}
