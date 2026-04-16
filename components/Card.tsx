import React from 'react'
import Icon from './Icon'

export default function Card({ title, desc, icon = 'star' }: { title: string; desc?: string; icon?: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 text-left hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-14 h-14 rounded-md bg-[#fff5f5] flex items-center justify-center">
            <Icon name={icon} />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-[#1a1a1a]">{title}</h3>
          {desc && <p className="text-sm text-gray-600 mt-1">{desc}</p>}
        </div>
      </div>
    </div>
  )
}
