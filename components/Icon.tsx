import React from 'react'

export const Icon = ({ name, className = '' }: { name: string; className?: string }) => {
  const common = { width: 40, height: 40, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }
  switch (name) {
    case 'map':
      return (
        <svg {...common} className={className}>
          <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z" stroke="#c0392b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="11" r="1.6" fill="#c0392b" />
        </svg>
      )
    case 'book':
      return (
        <svg {...common} className={className}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="#c0392b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 4.5V17a2.5 2.5 0 0 0 2.5 2.5H20V4.5H6.5A2.5 2.5 0 0 0 4 4.5z" stroke="#c0392b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    case 'star':
      return (
        <svg {...common} className={className}>
          <path d="M12 3l2.6 5.3L20 9l-4 3.9L17 19l-5-2.6L7 19l1-6.1L4 9l5.4-.7L12 3z" fill="#f6ad55" />
        </svg>
      )
    default:
      return null
  }
}

export default Icon
