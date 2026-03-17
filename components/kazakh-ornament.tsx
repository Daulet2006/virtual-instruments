"use client"

import { motion } from "framer-motion"

interface KazakhOrnamentProps {
  className?: string
  size?: number
  opacity?: number
  animated?: boolean
  color?: string
  variant?: "corner" | "center" | "border" | "full"
}

export function KazakhOrnament({
  className = "",
  size = 200,
  opacity = 0.3,
  animated = true,
  color = "oklch(0.78 0.16 75)",
  variant = "center",
}: KazakhOrnamentProps) {
  const Wrapper = animated ? motion.div : "div"
  const animProps = animated
    ? {
        animate: { rotate: 360 },
        transition: { duration: 60, repeat: Infinity, ease: "linear" },
      }
    : {}

  if (variant === "corner") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className={className}
        style={{ opacity }}
        fill="none"
      >
        <path
          d="M5 5 L30 5 L30 10 L10 10 L10 30 L5 30 Z"
          stroke={color}
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M10 10 Q20 5 30 15 Q20 25 10 20 Z"
          stroke={color}
          strokeWidth="0.8"
          fill={color}
          fillOpacity="0.15"
        />
        <circle cx="20" cy="15" r="2" fill={color} fillOpacity="0.5" />
        <path
          d="M12 12 Q16 8 22 12 Q16 16 12 12 Z"
          fill={color}
          fillOpacity="0.3"
        />
      </svg>
    )
  }

  if (variant === "border") {
    return (
      <svg
        width={size}
        height="20"
        viewBox={`0 0 ${size} 20`}
        className={className}
        style={{ opacity }}
        fill="none"
      >
        {Array.from({ length: Math.floor(size / 20) }).map((_, i) => (
          <g key={i} transform={`translate(${i * 20}, 0)`}>
            <path
              d="M2 10 Q5 2 10 10 Q15 18 18 10"
              stroke={color}
              strokeWidth="1"
              fill="none"
            />
            <circle cx="10" cy="10" r="1.5" fill={color} fillOpacity="0.5" />
          </g>
        ))}
      </svg>
    )
  }

  if (variant === "full") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        className={className}
        style={{ opacity }}
        fill="none"
      >
        {/* Outer octagon */}
        <polygon
          points="200,20 340,80 380,200 340,320 200,380 60,320 20,200 60,80"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
        />
        {/* Inner decorative rings */}
        <circle cx="200" cy="200" r="140" stroke={color} strokeWidth="0.8" strokeDasharray="4 4" fill="none" />
        <circle cx="200" cy="200" r="100" stroke={color} strokeWidth="1" fill="none" />
        <circle cx="200" cy="200" r="60" stroke={color} strokeWidth="0.8" fill="none" />
        {/* Radial ornament arms */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x1 = 200 + 60 * Math.cos(rad)
          const y1 = 200 + 60 * Math.sin(rad)
          const x2 = 200 + 140 * Math.cos(rad)
          const y2 = 200 + 140 * Math.sin(rad)
          const mx = 200 + 100 * Math.cos(rad)
          const my = 200 + 100 * Math.sin(rad)
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="0.8" />
              <circle cx={mx} cy={my} r="4" fill={color} fillOpacity="0.4" />
              {/* Diamond ornament */}
              <polygon
                points={`${mx},${my - 8} ${mx + 5},${my} ${mx},${my + 8} ${mx - 5},${my}`}
                fill={color}
                fillOpacity="0.3"
                stroke={color}
                strokeWidth="0.5"
              />
            </g>
          )
        })}
        {/* Central kazakh motif */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x = 200 + 35 * Math.cos(rad)
          const y = 200 + 35 * Math.sin(rad)
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="5" fill={color} fillOpacity="0.5" />
              <path
                d={`M ${200} ${200} Q ${x} ${y - 10} ${x + 10} ${y}`}
                stroke={color}
                strokeWidth="0.8"
                fill="none"
              />
            </g>
          )
        })}
        {/* Corner ram horns (Koshkar Muiz motif) */}
        {[0, 1, 2, 3].map((i) => {
          const angle = i * 90
          const rad = (angle * Math.PI) / 180
          const bx = 200 + 160 * Math.cos(rad + Math.PI / 4)
          const by = 200 + 160 * Math.sin(rad + Math.PI / 4)
          return (
            <g key={i}>
              <path
                d={`M ${bx} ${by} Q ${bx + 15 * Math.cos(rad)} ${by + 15 * Math.sin(rad)} ${bx + 10} ${by - 10}`}
                stroke={color}
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              <circle cx={bx} cy={by} r="3" fill={color} fillOpacity="0.6" />
            </g>
          )
        })}
        <circle cx="200" cy="200" r="12" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1" />
        <circle cx="200" cy="200" r="4" fill={color} fillOpacity="0.8" />
      </svg>
    )
  }

  // Default: center
  return (
    <Wrapper className={className} {...(animated ? animProps : {})} style={{ opacity }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
      >
        {[0, 45, 90, 135].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          return (
            <g key={i}>
              <line
                x1={100 + 30 * Math.cos(rad)}
                y1={100 + 30 * Math.sin(rad)}
                x2={100 + 90 * Math.cos(rad)}
                y2={100 + 90 * Math.sin(rad)}
                stroke={color}
                strokeWidth="1"
              />
              <line
                x1={100 - 30 * Math.cos(rad)}
                y1={100 - 30 * Math.sin(rad)}
                x2={100 - 90 * Math.cos(rad)}
                y2={100 - 90 * Math.sin(rad)}
                stroke={color}
                strokeWidth="1"
              />
              <circle
                cx={100 + 60 * Math.cos(rad)}
                cy={100 + 60 * Math.sin(rad)}
                r="5"
                fill={color}
                fillOpacity="0.4"
              />
              <circle
                cx={100 - 60 * Math.cos(rad)}
                cy={100 - 60 * Math.sin(rad)}
                r="5"
                fill={color}
                fillOpacity="0.4"
              />
            </g>
          )
        })}
        <circle cx="100" cy="100" r="80" stroke={color} strokeWidth="0.8" strokeDasharray="3 6" fill="none" />
        <circle cx="100" cy="100" r="50" stroke={color} strokeWidth="1" fill="none" />
        <circle cx="100" cy="100" r="10" fill={color} fillOpacity="0.3" />
        <circle cx="100" cy="100" r="4" fill={color} />
      </svg>
    </Wrapper>
  )
}
