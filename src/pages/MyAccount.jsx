import React from 'react'
import LoginRegister from '../components/LoginRegister'
import MyAccountComp from '../components/MyAccountComp'
import { useCookies } from 'react-cookie'

const MyAccount = () => {

  const [cookie] = useCookies('cookie-user')
  return (
    <>
      <section id='my-account'>
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