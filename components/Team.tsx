import React from 'react'

const Member = ({ name, title, bio, linkedin }: { name: string; title: string; bio: string; linkedin?: string }) => (
  <div className="border rounded-md p-4">
    <h4 className="font-semibold">{name}</h4>
    <p className="text-sm text-gray-600">{title}</p>
    <p className="mt-2 text-sm">{bio}</p>
    {linkedin && (
      <p className="mt-2 text-sm text-blue-600">LinkedIn: <a href={linkedin} target="_blank" rel="noreferrer">Profile</a></p>
    )}
  </div>
)

export default function Team() {
  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-semibold mb-6">The Faces behind the Sync</h2>
      <p className="mb-6">Meet the experts dedicated to turning your global ambitions into reality. From first inquiry to final visa approval, our team is with you every step of the way.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Member
          name="Abiral Acharya"
          title="Founder & CEO"
          bio="Visionary behind Study Sync. 8+ years of experience living, studying and working in Australia. University of Queensland alumnus."
          linkedin="#"
        />

        <Member
          name="Rubina Pradhan"
          title="Co-Founder & Marketing Manager"
          bio="Global marketer with an MSc in Global Marketing Management. Drives our brand and outreach across South East Asia."
          linkedin="#"
        />

        <Member
          name="Aishwarya Acharya"
          title="Senior Application Officer"
          bio="Precision expert handling applications and ensuring high success rates."
          linkedin="#"
        />
      </div>
    </section>
  )
}
