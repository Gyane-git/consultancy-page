import React from 'react'
import Hero from '@/components/Hero'
import Card from '@/components/Card'

export default function DestinationsPage() {
  const items = [
    { title: 'Australia', desc: "Go8 universities & regional PR benefits", icon: 'map', href: '/destinations/australia' },
    { title: 'United Kingdom', desc: 'Short masters & Graduate Route', icon: 'map', href: '/destinations/uk' },
    { title: 'United States', desc: 'STEM OPT and top tech programs', icon: 'map', href: '/destinations/usa' },
  ]

  return (
    <main>
      <Hero title="Where Will You Sync Next?" subtitle="Handpicked destinations matched to your profile." icon="map" />

      <section className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((it) => (
            <a key={it.title} href={it.href} className="block">
              <Card title={it.title} desc={it.desc} icon={it.icon} />
            </a>
          ))}
        </div>
      </section>
    </main>
  )
}
