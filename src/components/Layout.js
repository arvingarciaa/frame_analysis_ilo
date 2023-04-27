import React from 'react'
import Navbar from './Navbar'
import '../styles/global.css'

export default function Layout({ children }) {
  return (
    <div className='layout'>
      <title> ILO - Frame Analysis </title>
      <Navbar />
      { children }
    </div>
  )
}
