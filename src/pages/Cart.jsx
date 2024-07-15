import React from 'react'
import { NavLink } from 'react-router-dom'
import supabase from '../config/connect'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import BillingAddress from '../components/BillingAddress'
import { removeFromCart, setCartToRedux } from '../toolkit/features/cartSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const Cart = () => {
  const [cookie] = useCookies(['cookie-user'])
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)
  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount)
  const cartTotalQuantity = useSelector((state) => state.cart.cartTotalQuantity)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('users').select()
      const user = data.find(({ token }) => token === cookie['cookie-user'])
      if (user) {
        dispatch(setCartToRedux(user.cart.cart))
      }
    }
    fetchData()
  }, [cookie, dispatch])

  const updateCartInSupabase = async (updatedCart) => {
    const { data } = await supabase.from('users').select()
    const user = data.find(({ token }) => token === cookie['cookie-user'])
    if (user) {
      const updatedCartData = {
        cart: updatedCart,
        cartTotalAmount: updatedCart.reduce((total, item) => total + item.price * item.quantity, 0),
        cartTotalQuantity: updatedCart.reduce((total, item) => total + item.quantity, 0)
      }
      const { error } = await supabase.from('users').update({
        cart: updatedCartData
      }).eq('token', user.token)
      if (error) {
        console.error('Error updating cart:', error)
      }
    }
  }

  const handleRemoveItem = async (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId)
    await updateCartInSupabase(updatedCart)
    dispatch(removeFromCart(itemId))
  }

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = cart.map((item, i) => {
      if (i === index) {
        return { ...item, quantity: newQuantity }
      }
      return item
    })
    updateCartInSupabase(updatedCart)
    dispatch(setCartToRedux(updatedCart))
  }

  const handleIncrement = (index) => {
    const newQuantity = cart[index].quantity + 1
    handleQuantityChange(index, newQuantity)
  }

  const handleDecrement = (index) => {
    if (cart[index].quantity > 1) {
      const newQuantity = cart[index].quantity - 1
      handleQuantityChange(index, newQuantity)
    }
  }

  const handleInputChange = (index, e) => {
    const newQuantity = parseInt(e.target.value, 10)
    if (!isNaN(newQuantity) && newQuantity > 0) {
      handleQuantityChange(index, newQuantity)
    }
  }


  return (
    <>
      <section id='cart'>
        <div className="container">
          <div className="text-container">
            {cart.length === undefined ? <h1>Cart</h1> : <h1>Checkout</h1>}
          </div>
        </div>
      </section>
      <section id='cart-section'>
        <div className="box-container">
          <div className="green-box"></div>
          <div className="white-box"></div>
        </div>
        <div className="container">
          <>
            {cart.length === undefined || cart.length === 0 ?
              <div className='message-container'>
                <div className="message">
                  <span>Your cart is currently empty.</span>
                </div>
                <button className='return-to-shop'>
                  <NavLink to={"/configure-a-bike"} onClick={() => { window.scrollTo(0, 0) }}>
                    RETURN TO SHOP
                  </NavLink>
                </button>
              </div>
              : <div className='product-container'>{cart.length !== undefined || cart.length !== 0 ?
                cart.map((item, i) => (
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
                          <a href="#!" className='minus' onClick={() => handleDecrement(i)}>-</a>
                          <input value={item.quantity} type="number" onChange={(e) => handleInputChange(i, e)} />
                          <a href="#!" className='plus' onClick={() => handleIncrement(i)}>+</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="delete" onClick={() => handleRemoveItem(item.id)}>
                      <i className="fa-solid fa-x"></i>
                    </div>
                  </div>
                )) : ''}
                <div className="amount-container">
                  <div className='amount-info'>
                    <h1>Subtotal:</h1>
                    <span>€{cartTotalAmount}.00</span>
                  </div>
                  <div className='amount-info'>
                    <h1>Shipping:</h1>
                    <span>€{50 * cartTotalQuantity}.00</span>
                  </div>
                  <div className='amount-info'>
                    <h1>Total:</h1>
                    <span>€{cartTotalAmount + (50 * cartTotalQuantity)}.00</span>
                  </div>
                  <div className='coupon-container'>
                    <input placeholder='Coupon code' type="text" />
                    <button>APPLY COUPON</button>
                  </div>
                </div>
              </div>
            }
          </>
          {cart.length === undefined || cart.length === 0 ? '' :
            <div className="billing-adress-desktop">
              <BillingAddress />
            </div>
          }
        </div>
        {cart.length === undefined || cart.length === 0 ? '' :
          <div className="billing-adress-mobile">
            <BillingAddress />
          </div>
        }
      </section >
    </>
  )
}

export default Cart