import React from 'react'
import LoginRegister from '../components/LoginRegister'
import MyAccountComp from '../components/MyAccountComp'
import { useCookies } from 'react-cookie'
import { useContext } from 'react'
import { ModeContext } from '../context/ModeContext'

const MyAccount = () => {

  const [mode] = useContext(ModeContext)
  const [cookie] = useCookies('cookie-user')
  
  return (
    <>
      <section className={`my-account ${mode === 'dark' ? 'dark' : ''}`} id='my-account'>
        <div className="container">
          <div className="text-container">
            <h1>My account</h1>
          </div>
        </div>
      </section>
      {cookie['cookie-user'] === undefined ? <LoginRegister /> : <MyAccountComp />}
    </>
  )
}

export default MyAccount