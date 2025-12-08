import { useEffect, useRef } from 'react'

interface Snowflake {
  x: number
  y: number
  radius: number
  speed: number
  drift: number
  opacity: number
}

export function SnowEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const snowflakesRef = useRef<Snowflake[]>([])
  const animationFrameRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createSnowflakes = () => {
      if (!canvas) return
      
      const flakeCount = Math.floor((window.innerWidth * window.innerHeight) / 10000)
      snowflakesRef.current = []
      
      for (let i = 0; i < flakeCount; i++) {
        snowflakesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 1,
          speed: Math.random() * 1 + 0.5,
          drift: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.6 + 0.4
        })
      }
    }

    const drawSnowflake = (flake: Snowflake) => {
      if (!ctx) return
      ctx.beginPath()
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`
      ctx.fill()
    }

    const updateSnowflakes = () => {
      if (!canvas) return
      snowflakesRef.current.forEach(flake => {
        flake.y += flake.speed
        flake.x += flake.drift

        if (flake.y > canvas.height) {
          flake.y = -10
          flake.x = Math.random() * canvas.width
        }

        if (flake.x > canvas.width) {
          flake.x = 0
        } else if (flake.x < 0) {
          flake.x = canvas.width
        }
      })
    }

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      snowflakesRef.current.forEach(drawSnowflake)
      updateSnowflakes()
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createSnowflakes()
    animate()

    const handleResize = () => {
      resizeCanvas()
      createSnowflakes()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
