import React from 'react'
import { NavLink } from 'react-router-dom'
import sofkau from '../assets/img/sofkau.png'
import logo from '../assets/img/brain.png'

export const PublicNavbar = () => (
  <nav>
    <NavLink to="/" className='logo_link'><img alt='my brain logo' src={logo} className='main-logo'/></NavLink>
    <section>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/questions">Questions</NavLink>
    </section>
  </nav>
)

export const PrivateNavbar = () => (
  <nav>
    <NavLink to="/" className='logo_link'><img alt='my brain logo' src={logo} className='main-logo'/></NavLink>
    <section>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/questions">Questions</NavLink>
      <NavLink to="/new">New</NavLink>
      <NavLink to="/list">My Questions List</NavLink>
      <NavLink to="/profile">User info</NavLink>
    </section>
  </nav>
)

export const Footer = () => (
  <nav className='myfooter'>
    <a className='image_link'
    href="https://www.sofka.com.co/es/sofka-university/">
        <img alt='sofka logo' src={sofkau} className='footer_logo'/>
    </a>
    
    <section>
      <h6 className='myfootertext'>Refactoring and improvement By WilHenao</h6>
      <br/>
      <h6 className='myfootertext'>© SofkaU 2022. Copyright.</h6>
    </section>
  </nav>
)
