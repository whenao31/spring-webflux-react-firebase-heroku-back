import React from 'react'
import { NavLink } from 'react-router-dom'

const HomePage = ({children}) => (
  <section>
    <h1>Home</h1>
    <div>
      {children}
    </div>
    <p>Welcome to the question and answer app.</p>
    <NavLink to="/questions" className="button">
      View Questions
    </NavLink>
  
  </section>
)
export default HomePage
