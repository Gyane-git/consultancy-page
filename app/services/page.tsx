import React from 'react'
import Hero from '@/components/Hero'
import Card from '@/components/Card'

export default function Services() {
  const items = [
    { title: 'Visa Assistance', desc: 'Document checks and application support', icon: 'book', href: '/services/visa' },
    { title: 'Accommodation', desc: 'Housing and homestay help', icon: 'map', href: '/services/accommodation' },
    { title: 'Pre-departure', desc: 'Orientation and checklists', icon: 'star', href: '/services/pre-departure' },
  ]

  return (
    <main>
      <Hero title="Services To Sync Your Journey" subtitle="End-to-end support from application to arrival." icon="star" />

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

