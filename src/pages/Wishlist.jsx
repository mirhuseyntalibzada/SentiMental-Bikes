import React from 'react'
import supabase from '../config/connect'
import icon from '../images/logo-btn-icon.svg'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { addWishlistItemToCart, addWishlistToProduct } from '../toolkit/features/cartSlice'
import { emptyWishlist, removeFromWishlist, setWishlistToRedux } from '../toolkit/features/wishlistSlice'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { ModeContext } from '../context/ModeContext'

const Wishlist = () => {
  const wishlist = useSelector(state => state.wishlist.wishlist)
  const wishlistAll = useSelector(state => state.wishlist)
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const [cookie] = useCookies(['cookie-user'])

  const updateWishlistInSupabase = async (updatedWishlist) => {
    const { data } = await supabase.from('users').select();
    const user = data.find(({ token }) => token === cookie['cookie-user']);
    if (user) {
      const updatedWishlistData = {
        wishlist: updatedWishlist,
        wishlistTotalQuantity: updatedWishlist.reduce((total, item) => total + item.quantity, 0),
        wishlistTotalAmount: updatedWishlist.reduce((total, item) => total + item.price * item.quantity, 0)
      };
      const { error } = await supabase.from('users').update({
        wishlist: updatedWishlistData
      }).eq('token', user.token);
      if (error) {
        console.error('Error updating wishlist:', error);
      }
    }
  };

  const handleRemoveItem = async (itemId) => {
    let updatedWishlist = [...wishlist];
    updatedWishlist = updatedWishlist.filter(item => item.id !== itemId);
    dispatch(removeFromWishlist(itemId));

    await updateWishlistInSupabase(updatedWishlist);
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedWishlist = wishlist.map((item, i) => {
      if (i === index) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateWishlistInSupabase(updatedWishlist);
    dispatch(setWishlistToRedux(updatedWishlist));
  };

  const handleIncrement = (index) => {
    const newQuantity = wishlist[index].quantity + 1;
    handleQuantityChange(index, newQuantity);
  };

  const handleDecrement = (index) => {
    const newQuantity = wishlist[index].quantity - 1;
    handleQuantityChange(index, newQuantity);
  };

  const handleInputChange = (index, e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      handleQuantityChange(index, newQuantity);
    }
  };

  const sendWishlistToCart = () => {
    dispatch(addWishlistToProduct(wishlist))
    dispatch(emptyWishlist())
  }

  const sendItemToCart = (item) =>{
    dispatch(addWishlistItemToCart({...item, quantity:item.quantity}))
    handleRemoveItem(item.id)
  }

  const addCartWishlistToDB = async () => {
    const { data } = await supabase.from('users').select()
    const user = data.find(({ token }) => token === cookie['cookie-user'])
    const { error } = await supabase.from('users').update({
      cart: cart,
      wishlist: wishlistAll
    }).eq('token', user.token)
  }

  useEffect(() => {
    if (cart.cart || cart.product) {
      if (cart.cart.length > 0 || cart.product.length > 0) {
        addCartWishlistToDB()
      }
    }
  }, [cart])

  const [mode] = useContext(ModeContext)

  return (
    <>
      <section className={`wishlist ${mode === 'dark' ? 'dark' : ''}`} id='wishlist'>
        <div className="container">
          <div className="text-container">
            <h1>Wishlist</h1>
          </div>
        </div>
      </section>
      <section className={`wishlist-section ${mode === 'dark' ? 'dark' : ''}`} id='wishlist-section'>
        <div className="box-container">
          <div className="green-box"></div>
          <div className="white-box"></div>
        </div>
        <div className="container">
          <>
            {!wishlist || wishlist.length === 0 ?
              <div className='message-container'>
                <div className="message">
                  <span>Your wishlist is currently empty.</span>
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
                        <img src={`${item.img[0]}`} alt="" />
                      </div>
                      <div className='text-container'>
                        <h5>Configure part</h5>
                        <div className='category-name'>
                          <p>{item.name}</p>
                        </div>
                        <div className='price-quantity-container'>
                          <div>
                            <h5>€{item.price * item.quantity}.00</h5>
                          </div>
                          <div className='quantity'>
                            <a href="#!" className='minus' onClick={() => handleDecrement(i)}>-</a>
                            <input value={item.quantity} type="number" onChange={(e) => handleInputChange(i, e, 'cart')} />
                            <a href="#!" className='plus' onClick={() => handleIncrement(i)}>+</a>
                          </div>
                        </div>
                        <div className="add-to-cart">
                          <button onClick={() => { sendItemToCart(item) }} className='add-to-cart'>
                            <img src={icon} alt="" />
                            <span>ADD TO CART</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="delete" onClick={() => handleRemoveItem(item.id)}>
                      <i className="fa-solid fa-x"></i>
                    </div>
                  </div>
                )) : ''}
              </div>
            }
          </>
          {!wishlist || wishlist.length === 0 ?
            ''
            :
            wishlist.length === 1 ?
            ''
            : <div className="add-to-cart">
            <button onClick={() => { sendWishlistToCart() }} className='add-to-cart'>
              <img src={icon} alt="" />
              <span>ADD ALL TO CART</span>
            </button>
          </div>
          }
        </div>
      </section >
    </>
  )
}

export default Wishlist