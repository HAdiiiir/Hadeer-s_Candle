"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface AnimatedLogoProps {
  className?: string
  withLink?: boolean
  onClick?: () => void
}

export function AnimatedLogo({ className, withLink = true, onClick }: AnimatedLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 80
    canvas.height = 80

    // Animation variables
    let angle = 0
    let hue = 270 // Start with purple hue
    let frame = 0
    let animationFrameId: number

    // Draw candle flame
    const drawFlame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw candle body
      ctx.fillStyle = `hsl(${hue}, 70%, 60%)`
      ctx.beginPath()
      ctx.roundRect(25, 40, 30, 35, 5)
      ctx.fill()

      // Draw candle top
      ctx.fillStyle = `hsl(${hue}, 70%, 85%)`
      ctx.beginPath()
      ctx.ellipse(40, 40, 15, 5, 0, 0, Math.PI * 2)
      ctx.fill()

      // Draw wick
      ctx.strokeStyle = "#333"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(40, 40)
      ctx.lineTo(40, 25)
      ctx.stroke()

      // Draw flame
      const flameHeight = 15 + Math.sin(angle) * 3
      const gradient = ctx.createRadialGradient(40, 25 - flameHeight / 2, 2, 40, 25 - flameHeight / 2, flameHeight)
      gradient.addColorStop(0, "rgba(255, 255, 200, 1)")
      gradient.addColorStop(0.4, "rgba(255, 160, 50, 0.9)")
      gradient.addColorStop(1, "rgba(255, 50, 0, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.moveTo(40, 25)
      ctx.bezierCurveTo(35, 25 - flameHeight / 2, 35, 25 - flameHeight, 40, 25 - flameHeight)
      ctx.bezierCurveTo(45, 25 - flameHeight, 45, 25 - flameHeight / 2, 40, 25)
      ctx.fill()

      // Draw glow
      ctx.fillStyle = `hsla(${hue}, 70%, 60%, 0.1)`
      ctx.beginPath()
      ctx.arc(40, 25, 20 + Math.sin(angle * 2) * 5, 0, Math.PI * 2)
      ctx.fill()

      // Update animation variables
      angle += 0.05
      frame++

      // Slowly change hue for subtle color variation
      if (frame % 10 === 0) {
        hue = 270 + Math.sin(angle / 5) * 20 // Vary between purple shades
      }

      animationFrameId = requestAnimationFrame(drawFlame)
    }

    drawFlame()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const canvasElement = (
    <div 
      className={cn("block relative", className)}
      onClick={onClick}
    >
      <canvas 
        ref={canvasRef} 
        width="80" 
        height="80" 
        className="cursor-pointer" 
        title="Hadeer's Candle" 
      />
      <span className="sr-only">Hadeer's Candle Logo</span>
    </div>
  )

  if (withLink) {
    return canvasElement // Let the parent component handle the Link wrapper
  }

  return canvasElement
}