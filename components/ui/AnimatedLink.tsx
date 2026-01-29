'use client'

import { useState, useEffect } from 'react'

interface AnimatedLinkProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  isHovered?: boolean
}

export function AnimatedLink({ children, className = '', onClick, isHovered: externalIsHovered }: AnimatedLinkProps) {
  const [internalIsHovered, setInternalIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Use external hover state if provided, otherwise use internal
  const isHovered = externalIsHovered !== undefined ? externalIsHovered : internalIsHovered

  return (
    <span
      className={`relative inline-flex items-center overflow-hidden cursor-pointer ${className}`}
      onMouseEnter={() => externalIsHovered === undefined && !isMobile && setInternalIsHovered(true)}
      onMouseLeave={() => externalIsHovered === undefined && !isMobile && setInternalIsHovered(false)}
      onClick={onClick}
    >
      {/* Texte original qui part vers le haut */}
      <span
        className="inline-flex items-center transition-all duration-300 ease-out"
        style={{
          transform: isHovered && !isMobile ? 'translateY(-100%)' : 'translateY(0)',
          opacity: isHovered && !isMobile ? 0 : 1,
        }}
      >
        {children}
      </span>

      {/* Texte dupliqué qui arrive d'en bas */}
      <span
        className="absolute inset-0 inline-flex items-center transition-all duration-300 ease-out"
        style={{
          transform: isHovered && !isMobile ? 'translateY(0)' : 'translateY(100%)',
          opacity: isHovered && !isMobile ? 1 : 0,
        }}
      >
        {children}
      </span>
    </span>
  )
}
