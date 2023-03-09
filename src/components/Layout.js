import React from 'react'
import Navbar from './Navbar'
import '../styles/global.css'

export default function Layout({ children }) {
  return (
    <div className='layout'>
      <title> ILO - Frame Analysis </title>
      <link rel="icon" type="image/x-icon" href="/des_logo.png" />
      <Navbar />
      <div className="content">
        { children }
      </div>
      <footer style={{height: "40px", paddingBottom: "40px"}}></footer>
    </div>
  )
}
