import React from 'react'
import { Link } from 'gatsby'

export default function Navbar() {
  return (
    <nav>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Outfit"></link>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <img src="/up_seal.png" alt="" height="50px" width="50px" style={{padding: 0,}}/>
        <img src="/des_logo.png" alt="" height="50px" width="50px"/>
        <span style={{
          fontSize: '1.8em', 
          fontWeight: 500, 
          marginLeft: '10px',
          fontFamily: '"Outfit", sans-serif',
        }}>ILO: Frame Analysis</span>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/procedure">Procedure</Link>
        <Link to="/diagrams">Diagrams</Link>
      </div>
    </nav>
  )
}
