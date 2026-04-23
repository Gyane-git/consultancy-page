import React from 'react'

//import React from 'react'
import HeroBanner from '@/components/banner'
import Testimonials from '@/components/Testimonials'
import FindUni from '@/components/find-uni'
import UniPartners from '@/components/uniPartners'
import FAQ from '@/components/FAQ'
//import GetInTouch from "@/components/"
//import AboutStudySync from '@/components/AboutStudySync'
//import Team from '@/components/Team'
//import Destinations from '@/components/Destinations'

function dashboard() {
  return (
    <div>
        <HeroBanner />
      {/* <AboutStudySync />
      <Destinations />
      <Team /> */}
      <Testimonials />
      <FindUni />
      <UniPartners />
      
      <FAQ />
    </div>
  )
}

export default dashboard