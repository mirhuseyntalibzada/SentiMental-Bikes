import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Cart = () => {
  const cartData = useSelector((state) => state.cart) 
  return (
    <>
      {cartData.cart.map((item, i) => (
        <h1 key={i}>{item.handle_color}</h1>
      ))}
      <section id='cart'>
        <div className="container">
          <div className="text-container">
            <h1>Cart</h1>
          </div>
        </div>
      </section>
      <section id='cart-section'>
        <div className="box-container">
          <div className="green-box"></div>
          <div className="white-box"></div>
        </div>
        <div className="container">
          {cartData.cart.length === 0 ?
            <>
              <div className="message">
                <span>Your cart is currently empty.</span>
              </div>
              <button>
                <NavLink to={"/configure-a-bike"} onClick={() => { window.scrollTo(0, 0) }}>
                  RETURN TO SHOP
                </NavLink>
              </button>
            </>
            :''}
        </div>
      </section >
    </>
  )
}

export default Cart