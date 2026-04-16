import React from 'react'
import Icon from './Icon'

export default function Hero({ title, subtitle, icon = 'map' }: { title: string; subtitle?: string; icon?: string }) {
  return (
    <section className="bg-white py-12">
      <div className="max-w-5xl mx-auto px-4 flex items-center gap-6">
        <div className="p-3 rounded-lg bg-gradient-to-br from-[#fff5f5] to-white inline-flex">
          <Icon name={icon} />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#c0392b]">{title}</h1>
          {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
        </div>
      </div>
    </section>
  )
}
