import React from 'react'
import { useState } from 'react'

const MyAccount = () => {

  const [visibilityLogin, setVisibilityLogin] = useState(false)
  const [visibilityRegister, setVisibilityRegister] = useState(false)

  const toggleVisibilityLogin = () => {
    setVisibilityLogin(!visibilityLogin)
  }

  const toggleVisibilityRegister = () => {
    setVisibilityRegister(!visibilityRegister)
  }

  return (
    <>
      <section id='my-account'>
        <div className="container">
          <div className="text-container">
            <h1>My account</h1>
          </div>
        </div>
      </section>
      <section id='login-register-section'>
        <div className="box-container">
          <div className="green-box"></div>
          <div className="white-box"></div>
        </div>
        <div className="container">
          <div className="login-register">
            <div className="login">
              <div className="login-container">
                <h2>Login</h2>
                <form action="">
                  <label className='input-label' htmlFor="">USERNAME OR EMAIL ADDRESS <span>*</span></label>
                  <div>
                    <input type="text" />
                  </div>
                  <label className='input-label' htmlFor="">PASSWORD <span>*</span></label>
                  <div className='password-container'>
                    <input type={`${visibilityLogin ? "text" : "password"}`} />
                    <div>
                      <button className='eye-btn' onClick={(e) => {
                        e.preventDefault()
                        toggleVisibilityLogin()
                      }}>
                        {
                          <>
                            {visibilityLogin ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}
                          </>
                        }
                      </button>
                    </div>
                  </div>
                  <div className='remember-password-container'>
                    <div className='remember-me'>
                      <input type="checkbox" name="" id="" />
                      <label htmlFor="">Remember me</label>
                    </div>
                    <div className='lost-password'>
                      <a href="#">Lost your password?</a>
                    </div>
                  </div>
                  <div className='button-container'>
                    <button type='submit'>LOG IN</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="register">
              <div className="register-container">
                <h2>Register</h2>
                <form action="">
                  <label className='input-label' htmlFor="">USERNAME<span>*</span></label>
                  <div>
                    <input type="text" />
                  </div>
                  <label className='input-label' htmlFor="">EMAIL ADDRESS <span>*</span></label>
                  <div>
                    <input type="text" />
                  </div>
                  <label className='input-label' htmlFor="">PASSWORD <span>*</span></label>
                  <div className='password-container'>
                    <input type={`${visibilityRegister ? "text" : "password"}`} />
                    <div>
                      <button className='eye-btn' onClick={(e) => {
                        e.preventDefault()
                        toggleVisibilityRegister()
                      }}>
                        {
                          <>
                            {visibilityRegister ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}
                          </>
                        }
                      </button>
                    </div>
                  </div>
                  <div className='privacy-policy'>
                    <p>Your personal data will be used to support your experience throughout
                      this website, to manage access to your account, and for other purposes
                      described in our <a href="#">privacy policy.</a></p>
                  </div>
                  <div className='button-container'>
                    <button type='submit'>REGISTER</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MyAccount