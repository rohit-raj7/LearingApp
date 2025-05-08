import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './pages/student/Home'
import CoursesList from './pages/student/CoursesList'
import CoursesDetails from './pages/student/CourseDetails'
import MyEnrollments from './pages/student/MyEnrollments'
import Loading from './components/students/Loading'
import Player from './pages/student/Player'

import Educator from './pages/educator/Educator'
import Dashboard from './pages/educator/Dashboard'
import AddCourse from './pages/educator/AddCourese'
import MyCourses from './pages/educator/MyCourses'
import StudentsEnrolled from './pages/educator/StudentsEnrolled'
import Navbar from './components/students/Navbar'
import "quill/dist/quill.snow.css"


function App() {
const isEducatorRoute=useMatch('/educator/*')


  return (
    <div className='text-default min-h-screen bg-white'>
     {!isEducatorRoute && <Navbar/> }
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/courses-list' element={<CoursesList />} />
        <Route path='/courses-list/:input' element={<CoursesList />} />
        <Route path='/course/:id' element={<CoursesDetails />} />
        <Route path='/my-enrollments' element={<MyEnrollments />} />
        <Route path='/player/:curseId' element={<Player />} />
        <Route path='/loading/:path' element={<Loading />} />
        <Route path='/educator' element={<Educator />}>
          <Route path='/educator' element={<Dashboard />} />
          <Route path='add-course' element={<AddCourse />} />
          <Route path='my-courses' element={<MyCourses />} />
          <Route path='student-enrolled' element={<StudentsEnrolled />} />
        </Route>
      </Routes>


    </div>
  )
}

export default App
