import React from 'react'
import './Navbar.css'
import logo from '../assets/OQ.png'

const Nav = () => {
  return (
    <>
    <div className='nav'>
        <img src={logo} style={{width:'50px'}} alt="" />
        <h1>Oqulix CRM</h1>
    </div>
    </>
  )
}

export default Nav