import React from 'react'
import Hero from '../../components/students/Hero'
import Compaines from '../../components/students/Compaines'
import CoursesSection from '../../components/students/CoursesSection'
import TestimonialsSections from '../../components/students/TestimonialsSections'
import CollToAction from '../../components/students/CollToAction'
import Footer from '../../components/students/Footer'

function Home() {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero/>
      <Compaines/>
      <CoursesSection/>
      <TestimonialsSections/>
      <CollToAction/>
      <Footer/>
    </div>
  )
}

export default Home
