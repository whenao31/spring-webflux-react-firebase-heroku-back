import React from 'react'
import { NavLink } from 'react-router-dom'

const HomePage = ({children}) => (
  <section>
    <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Home</h1>
    <div>
      {children}
    </div>
    <h3 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Welcome to the question and answer app.</h3>
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
      <NavLink to="/questions" className="button" >
        View Questions
      </NavLink>
    </div>
  
  </section>
)
export default HomePage
