import React from 'react'
import supabase from '../config/connect'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { setCartToRedux, setProductToRedux } from '../toolkit/features/cartSlice'
import { setWishlistToRedux } from '../toolkit/features/wishlistSlice'

const Wishlist = () => {
  const wishlist = useSelector(state => state.wishlist.wishlist)
  const dispatch = useDispatch()
  const [cookie] = useCookies(['cookie-user'])

  useEffect(() => {
    const fetchCartData = async () => {
      const { data } = await supabase.from('users').select()
      const user = data.find(({ token }) => token === cookie['cookie-user'])
      if (user.cart) {
        dispatch(setCartToRedux(user.cart.cart))
        dispatch(setProductToRedux(user.cart.product))
        dispatch(setWishlistToRedux(user.wishlist.wishlist))
      }
    }
    fetchCartData()
  }, [dispatch, cookie])
  return (
    <>
      <section id='wishlist'>
        <div className="container">
          <div className="text-container">
            <h1>Wishlist</h1>
          </div>
        </div>
      </section>
      <section id='wishlist-section'>
        <div className="box-container">
          <div className="green-box"></div>
          <div className="white-box"></div>
        </div>
        <div className="container">
          <>
            {!wishlist || wishlist.length === 0 ?
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
              : <div className='product-container'>{wishlist || wishlist.length !== 0 ?
                wishlist.map((item, i) => (
                  <div key={i} className='product-card' >
                    <div className='img-text-container'>
                      <div className='img-container'>
                        <img src={`src${item.img[0]}`} alt="" />
                      </div>
                      <div className='text-container'>
                        <h5>Configure part</h5>
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
                          <p>{item.name}</p>
                        </div>
                        <div className='category-name'>
                          <h6>Handle color</h6>
                          <p>{item.name}</p>
                        </div>
                        <div className='price-quantity-container'>
                          <div>
                            <h5>€{item.price * item.quantity}.00</h5>
                          </div>
                          <div className='quantity'>
                            <a href="#!" className='minus' onClick={() => handleDecrement(i, 'cart')}>-</a>
                            <input value={item.quantity} type="number" onChange={(e) => handleInputChange(i, e, 'cart')} />
                            <a href="#!" className='plus' onClick={() => handleIncrement(i, 'cart')}>+</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="delete" onClick={() => handleRemoveItem(item.id, 'cart')}>
                      <i className="fa-solid fa-x"></i>
                    </div>
                  </div>
                )) : ''}
              </div>
            }
          </>
        </div>
      </section >
    </>
  )
}

export default Wishlist