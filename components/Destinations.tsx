import React from 'react'

const DestinationCard = ({ title, note }: { title: string; note?: string }) => (
  <div className="border rounded-md p-4">
    <h4 className="font-semibold">{title}</h4>
    {note && <p className="text-sm mt-2">{note}</p>}
  </div>
)

export default function Destinations() {
  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-semibold mb-6">Where Will You Sync Next?</h2>
      <p className="mb-6">From London to Dublin and Australia to Malta — we match your profile to the right destination and pathway.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DestinationCard title="Australia" note="Founder’s specialty; Go8 universities & regional PR benefits." />
        <DestinationCard title="UK" note="Fast-track 1-year MSc; 2-year Graduate Route (PSW)." />
        <DestinationCard title="USA" note="Innovation hub; 36-month STEM OPT extension for eligible grads." />
        <DestinationCard title="Canada" note="Stable path to PR; uncapped Master’s/PhD study permits." />
        <DestinationCard title="Ireland" note="Tech hub; excellent for IT & CS careers." />
        <DestinationCard title="Malta & Baltics" note="Budget-friendly EU access with practical degrees." />
      </div>
    </section>
  )
}
