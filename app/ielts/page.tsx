import React from 'react'
import Hero from '@/components/Hero'
import Card from '@/components/Card'

export default function IELTSPage() {
  const items = [
    { title: 'Courses & Coaching', desc: 'Structured classes and personalised plans', icon: 'book', href: '/ielts/courses' },
    { title: 'Mock Tests', desc: 'Timed mocks with feedback', icon: 'star', href: '/ielts/mock-tests' },
    { title: 'Resources', desc: 'Study guides and sample answers', icon: 'book', href: '/ielts/resources' },
  ]

  return (
    <main>
      <Hero title="Master IELTS" subtitle="Practical coaching and realistic mock tests." icon="book" />

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

