import React from 'react'
import { NavLink } from 'react-router-dom'
import supabase from '../config/connect'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import BillingAddress from '../components/BillingAddress'

const Cart = () => {
  const [items, setItems] = useState({})
  const [amount, setAmount] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [cookie] = useCookies(['cookie-user'])

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('users').select()
      const user = data.find(({ token }) => token === cookie['cookie-user'])
      setItems(user.cart.cart);
      setAmount(user.cart.cartTotalAmount);
      setQuantity(user.cart.cartTotalQuantity);
    }
    fetchData()
  }, [])

  return (
    <>
      <section id='cart'>
        <div className="container">
          <div className="text-container">
            {items.length === undefined ? <h1>Cart</h1> : <h1>Checkout</h1>}
          </div>
        </div>
      </section>
      <section id='cart-section'>
        <div className="box-container">
          <div className="green-box"></div>
          <div className="white-box"></div>
        </div>
        <div className="container">
          <div>
            {items.length === undefined ?
              <>
                <div className="message">
                  <span>Your cart is currently empty.</span>
                </div>
                <button className='return-to-shop'>
                  <NavLink to={"/configure-a-bike"} onClick={() => { window.scrollTo(0, 0) }}>
                    RETURN TO SHOP
                  </NavLink>
                </button>
              </>
              : <div>{items.length !== undefined ?
                items.map((item, i) => (
                  <div key={i} className='product-card' >
                    <div className='img-text-container'>
                      <div className='img-container'>
                        <img src={`/src/images/bicycles/handlebars/${item.handle_color.split(' ').join('-')}/bicycle-color/${item.bicycle_color.split(' ').join('-')}.png`} alt="" />
                      </div>
                      <div className='text-container'>
                        <h5>Configure a bike</h5>
                        <div className='category-name'>
                          <h6>Frame Type</h6>
                          <p>Noogat</p>
                        </div>
                        <div className='category-name'>
                          <h6>Tyres</h6>
                          <p>Standart</p>
                        </div>
                        <div className='category-name'>
                          <h6>Bicycle color</h6>
                          <p>{item.bicycle_color}</p>
                        </div>
                        <div className='category-name'>
                          <h6>Handle color</h6>
                          <p>{item.handle_color}</p>
                        </div>
                        <div className='price-quantity-container'>
                          <div>
                            <h5>€{item.price * item.quantity}.00</h5>
                          </div>
                          <div className='quantity'>
                            <a href="#!" className='minus'>-</a>
                            <input value={item.quantity} type="number" onChange={handleChange} />
                            <a href="#!" className='plus'>+</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="delete">
                      <i className="fa-solid fa-x"></i>
                    </div>
                  </div>
                )) : ''}
                <div className="amount-container">
                  <div className='amount-info'>
                    <h1>Subtotal:</h1>
                    <span>€{amount}.00</span>
                  </div>
                  <div className='amount-info'>
                    <h1>Shipping:</h1>
                    <span>€{50 * quantity}.00</span>
                  </div>
                  <div className='amount-info'>
                    <h1>Total:</h1>
                    <span>€{amount + (50 * quantity)}.00</span>
                  </div>
                  <div className='coupon-container'>
                    <input placeholder='Coupon code' type="text" />
                    <button>APPLY COUPON</button>
                  </div>
                </div>
              </div>
            }
          </div>
          {items.length === undefined ? '' :
            <div className="billing-adress-desktop">
              <BillingAddress />
            </div>
          }
        </div>
        {items.length === undefined ? '' :
          <div className="billing-adress-mobile">
            <BillingAddress />
          </div>
        }
      </section >
    </>
  )
}

export default Cart