import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/educator/Navbar'
import Sidebr from '../../components/educator/Sidebr'
import { assets } from '../../assets/assets';
import Footer from '../../components/educator/Footer';

function Educator() {
  return (
    <div className='text-default min-h-screen bg-white '>
      <Navbar />
      <div className='flex' >
        <Sidebr />
        <div className='flex-1'>
          {<Outlet />}
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default Educator
