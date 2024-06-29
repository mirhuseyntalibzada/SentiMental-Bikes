import React from 'react'
import LoginRegister from '../components/LoginRegister'

const MyAccount = () => {
  return (
    <>
      <section id='my-account'>
        <div className="container">
          <div className="text-container">
            <h1>My account</h1>
          </div>
        </div>
      </section>
      <LoginRegister />
    </>
  )
}

export default MyAccount