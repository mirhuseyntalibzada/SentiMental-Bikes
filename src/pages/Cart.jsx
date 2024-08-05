import React from 'react'
import { NavLink } from 'react-router-dom'
import supabase from '../config/connect'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import BillingAddress from '../components/BillingAddress'
import { removeFromCart, removeFromProduct, setCartToRedux, setProductToRedux } from '../toolkit/features/cartSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useContext } from 'react'
import { ModeContext } from '../context/ModeContext'

const Cart = () => {
  const [cookie] = useCookies(['cookie-user'])
  const dispatch = useDispatch()

  const cartAll = useSelector((state) => state.cart)
  const cart = useSelector((state) => state.cart.cart)
  const product = useSelector((state) => state.cart.product)
  const orders = useSelector((state) => state.cart.orders)


  const addOrderToDB = async () => {
    const { data } = await supabase.from('users').select();
    const user = data.find(({ token }) => token === cookie['cookie-user']);
    const { error } = await supabase.from('users').update({
      cart: cartAll
    }).eq('token', user.token);
    if (error) {
      console.error("Error updating cart:", error.message);
    }
  };

  useEffect(() => {
    if (orders) {
      if (orders.length > 0) {
        addOrderToDB();
      }
    }
  }, [cart]);

  const cartAmount = useSelector((state) => state.cart.cartAmount)
  const cartQuantity = useSelector((state) => state.cart.cartQuantity)
  const productAmount = useSelector((state) => state.cart.productAmount)
  const productQuantity = useSelector((state) => state.cart.productQuantity)

  const updateCartInSupabase = async (updatedCart, updatedProduct) => {
    const { data } = await supabase.from('users').select();
    const user = data.find(({ token }) => token === cookie['cookie-user']);
    if (user) {
      const updatedCartData = {
        cart: updatedCart,
        product: updatedProduct,
        orders: orders,
        cartAmount: updatedCart.reduce((total, item) => total + item.price * item.quantity, 0),
        cartQuantity: updatedCart.reduce((total, item) => total + item.quantity, 0),
        productAmount: updatedProduct.reduce((total, item) => total + item.price * item.quantity, 0),
        productQuantity: updatedProduct.reduce((total, item) => total + item.quantity, 0)
      };
      const { error } = await supabase.from('users').update({
        cart: updatedCartData
      }).eq('token', user.token);
      if (error) {
        console.error('Error updating cart:', error);
      }
    }
  };

  const handleRemoveItem = async (itemId, type) => {
    let updatedCart = [...cart];
    let updatedProduct = [...product];

    if (type === 'cart') {
      updatedCart = updatedCart.filter(item => item.id !== itemId);
      dispatch(removeFromCart(itemId));
    } else if (type === 'product') {
      updatedProduct = updatedProduct.filter(item => item.id !== itemId);
      dispatch(removeFromProduct(itemId));
    }

    await updateCartInSupabase(updatedCart, updatedProduct);
  };

  const handleQuantityChange = (index, newQuantity, type) => {
    if (type === 'cart') {
      const updatedCart = cart.map((item, i) => {
        if (i === index) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      updateCartInSupabase(updatedCart, product);
      dispatch(setCartToRedux(updatedCart));
    } else if (type === 'product') {
      const updatedProduct = product.map((item, i) => {
        if (i === index) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      updateCartInSupabase(cart, updatedProduct);
      dispatch(setProductToRedux(updatedProduct));
    }
  };

  const handleIncrement = (index, type) => {
    if (type === 'cart') {
      const newQuantity = cart[index].quantity + 1;
      handleQuantityChange(index, newQuantity, type);
    } else if (type === 'product') {
      const newQuantity = product[index].quantity + 1;
      handleQuantityChange(index, newQuantity, type);
    }
  };

  const handleDecrement = (index, type) => {
    if (type === 'cart' && cart[index].quantity > 1) {
      const newQuantity = cart[index].quantity - 1;
      handleQuantityChange(index, newQuantity, type);
    } else if (type === 'product' && product[index].quantity > 1) {
      const newQuantity = product[index].quantity - 1;
      handleQuantityChange(index, newQuantity, type);
    }
  };

  const handleInputChange = (index, e, type) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      handleQuantityChange(index, newQuantity, type);
    }
  };


  const [mode] = useContext(ModeContext)


  return (
    <>
      <section className={`cart ${mode === 'dark' ? 'dark' : ''}`} id='cart'>
        <div className="container">
          <div className="text-container">
            {(!cart && !product) || (cart.length === 0 && product.length === 0) ? <h1>Cart</h1> : <h1>Checkout</h1>}
          </div>
        </div>
      </section>
      <section className={`cart-section ${mode === 'dark' ? 'dark' : ''}`} id='cart-section'>
        <div className="box-container">
          <div className="green-box"></div>
          <div className="white-box"></div>
        </div>
        <div className="container">
          <>
            {(!cart && !product) || (cart.length === 0 && product.length === 0) ?
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
              : <div className='product-container'>{cart || cart.length !== 0 ?
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

                {
                  product || product.length !== 0 ?
                    product.map((item, i) => (
                      <div key={i} className='product-card' >
                        <div className='img-text-container'>
                          <div className='img-container'>
                            <img src={`${item.img[0]}`} alt="" />
                          </div>
                          <div className='text-container'>
                            <h5>{item.category === 'addon' ? 'Configure Addon' : 'Configure Part'}</h5>
                            <div className='category-name'>
                              <h6>{item.category === 'addon' ? 'Addon' : 'Part'} Name:</h6>
                              <p>{item.name}</p>
                            </div>
                            <div className='category-name'>
                              <h6>Category:</h6>
                              <p>{item.category}</p>
                            </div>
                            <div className='price-quantity-container'>
                              <div>
                                <h5>€{item.price * item.quantity}.00</h5>
                              </div>
                              <div className='quantity'>
                                <a href="#!" className='minus' onClick={() => handleDecrement(i, 'product')}>-</a>
                                <input value={item.quantity} type="number" onChange={(e) => handleInputChange(i, e, 'product')} />
                                <a href="#!" className='plus' onClick={() => handleIncrement(i, 'product')}>+</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="delete" onClick={() => handleRemoveItem(item.id, 'product')}>
                          <i className="fa-solid fa-x"></i>
                        </div>
                      </div>
                    ))
                    : ''
                }
                <div className="amount-container">
                  <div className='amount-info'>
                    <h1>Subtotal:</h1>
                    <span>€{cartAmount + productAmount}.00</span>
                  </div>
                  <div className='amount-info'>
                    <h1>Shipping:</h1>
                    <span>€{(50 * cartQuantity + (10 * productQuantity))}.00</span>
                  </div>
                  <div className='amount-info'>
                    <h1>Total:</h1>
                    <span>€{productAmount + cartAmount + (50 * cartQuantity) + (10 * productQuantity)}.00</span>
                  </div>
                  <div className='coupon-container'>
                    <input placeholder='Coupon code' type="text" />
                    <button>APPLY COUPON</button>
                  </div>
                </div>
              </div>
            }
          </>
          {(!cart && !product) || (cart.length === 0 && product.length === 0) ? '' :
            <div className="billing-adress-desktop">
              <BillingAddress />
            </div>
          }
        </div>
        {(!cart && !product) || (cart.length === 0 && product.length === 0) ? '' :
          <div className="billing-adress-mobile">
            <BillingAddress />
          </div>
        }
      </section >
    </>
  )
}

export default Cart