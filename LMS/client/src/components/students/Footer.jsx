import React from 'react'
import { assets } from '../../assets/assets'
import Social from '../Social'

function Footer() {
  return (
    <div className='pt-10 px-4 md:px-20 lg:px-32 bg-gray-900 w-full overflow-hidden' id='Footer'>
    
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-start '>
            <div className='w-full md:w-1/3 mb-8 md:mb-0'>
            <div className='flex gap-2'><img src={assets.logo} alt="Logo" className="h-8 w-8" />
            <span className='text-3xl text-gray-300 font-medium'>Rohit Raj</span></div>
                <p className='text-gray-400 mt-4'><h2 className='font-medium text-gray-300' >Thank You for Visiting My Website!</h2>
                I appreciate your time. As a frontend developer, I create responsive, user-friendly websites. Feel free to reach out with questions or collaboration ideas!</p>
                <div className='justify-start justify-items-start'>
                <Social/>
                </div>
            </div>
           
            <div className='w-full md:w-1/5 mb-8 md:mb-0'>
            <h3 className='text-white text-lg font-bold mb-4
            '>Company</h3>
            <ul className='flex flex-col gap-2 text-gray-400'>
                <a href="#Header" className='hover:text-white'>Home</a>
                <a href="#About" className='hover:text-white'>About us</a>
                <a href="#Experience" className='hover:text-white'>Works</a>
                <a href="#Contact" className='hover:text-white'>Contact us</a>
                {/* <a href="/privacy-policy" className='hover:text-white'>Privacy Policy</a> */}
                <a href="https://rohit-rajfsdfsf4.netlify.app/" target="_blank" rel="noopener noreferrer" className='hover:text-white'>Privacy Policy</a>
        
           
            </ul>
            </div>
            <div className='w-full md:w-1/3 '>
               <h3 className='text-white text-lg font-bold mb-4 '>Subscribe to our newsletter</h3>
               <p className='text-gray-400 mb-4 max-w-80 '>The latest news, articles,and resources,sent to your inbox weekely</p>
                  {/* <div className='flex gap-2'>
                    
                    <Subscribe/>
                  </div> */}
                  <a href="https://drive.google.com/file/d/1hDJOLueAWUebX6Ia0zDPCei9obq_nc3n/view?usp=sharing"><button className='py-2 px-4 mt-4 rounded border border-white text-white'>View Resume</button></a>
                 
            </div>
        </div>
        <div className='border-t border-gray-700 py-4 mt-10 text-center text-gray-500'>
            Copyright 2024 ©  Rohit Raj. All Right Reserved.
        </div>
      
    </div>
  )
}

export default Footer
