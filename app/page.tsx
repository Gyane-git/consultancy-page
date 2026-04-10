import React from 'react'
import HeroBanner from '@/components/banner'
import Testimonials from '@/components/Testimonials'
import FindUni from '@/components/find-uni'
import UniPartners from '@/components/uniPartners'
import FAQ from '@/components/FAQ'
import GetInTouch from '@/components/GetInTouch'

function home() {
  return (
    <div>
      <HeroBanner />
      <Testimonials />
      <UniPartners />
      <FindUni />
      <FAQ />
      <GetInTouch />
    </div>
  )
}

export default home