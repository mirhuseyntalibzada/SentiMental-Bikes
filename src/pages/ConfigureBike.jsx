import React from 'react'
import SentiMentalNews from '../components/SentiMentalNews'
import icon from '../images/logo-btn-icon.svg'
import ExperienceSentimental from '../components/ExperienceSentimental'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, setCartToRedux, setProductToRedux } from '../toolkit/features/cartSlice'
import { bicycles } from '../data/bicycles'
import { useCookies } from 'react-cookie'
import supabase from '../config/connect'
import { useEffect } from 'react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

const ConfigureBike = () => {
  const [cookie] = useCookies(['cookie-user'])
  const [value, setValue] = useState(1);
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const [filters, setFilters] = useState({
    bicycleColor: 'Alabaster Adventure',
    handleColor: 'Alabaster Adventure'
  });

  // Wishlist----------------------------------------------------------------

  const [category, setCategory] = useState([])
  const [filteredProducts, setfilteredProducts] = useState([])

  useEffect(() => {
    const removeDuplicate = () => {
      let uniqueCategory = []
      products.forEach(product => {
        if (!uniqueCategory.includes(product.category)) {
          uniqueCategory.push(product.category)
        }
      })
      setCategory(uniqueCategory);
    }
    removeDuplicate()
  }, [])

  const getFilteredProducts = (category) => {
    const filtered = products.filter((product) => product.category === category)
    setfilteredProducts(filtered)
  }

  // ----------------------------------------------------------------Wishlist

  // Search------------------------------------------------------------------
  const [searchedProducts, setSearchedProducts] = useState([])

  const searchProd = (keyword) => {
    const searchedItems = filteredProducts.length === 0 ?
      products.filter(item => item.name.includes(keyword.toUpperCase())) :
      filteredProducts.filter(item => item.name.includes(keyword.toUpperCase()))
    keyword.length === 0 ? setSearchedProducts([]) : setSearchedProducts(searchedItems)
  }

  // ------------------------------------------------------------------Search

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };

  const filteredBicycle = bicycles.filter(bicycle => {
    return (
      (filters.bicycleColor === '' || bicycle.bicycle_color.split('-').join(' ') === filters.bicycleColor) &&
      (filters.handleColor === '' || bicycle.handle_color.split('-').join(' ') === filters.handleColor)
    );
  });

  //addtocart------------------------------------------------------------------
  useEffect(() => {
    const fetchCartData = async () => {
      const { data } = await supabase.from('users').select()
      const user = data.find(({ token }) => token === cookie['cookie-user'])
      if (user.cart) {
        dispatch(setCartToRedux(user.cart.cart))
        dispatch(setProductToRedux(user.cart.product))
      }
    }
    fetchCartData()
  }, [dispatch, cookie])

  const checkUser = async () => {
    if (cookie['cookie-user'] !== undefined) {
      dispatch(addToCart({ ...filteredBicycle[0], quantity: value }))
    } else {
      alert("you have to log in first")
    }
  }

  const addCartToDB = async () => {
    const { data } = await supabase.from('users').select()
    const user = data.find(({ token }) => token === cookie['cookie-user'])
    const { error } = await supabase.from('users').update({
      cart: cart
    }).eq('token', user.token)
  }

  useEffect(() => {
    if (cart.cart && cart.product) {
      if (cart.cart.length > 0 || cart.product.length > 0) {
        addCartToDB()
      }
    }
  }, [cart])
  //------------------------------------------------------------------addtocart

  return (
    <>
      <section id='configure'>
        <div className="configure">
          <div className="container">
            <div className="heading">
              <h1>Configure a bike</h1>
              <h3>€1,899.00</h3>
            </div>
            <div className='img-content-container'>
              <div className="img-container">
                <img src={`/src/images/bicycles/handlebars/${filters.handleColor.split(' ').join('-')}/bicycle-color/${filters.bicycleColor.split(' ').join('-')}.png`} alt="" />
              </div>
              <div className='features'>
                <div className="options">
                  <h6>FRAME OPTIONS</h6>
                </div>
                <div className="bicycle-color">
                  <h6>Bicycle color</h6>
                  <div className="color-container">
                    <div onClick={() => setFilters({ ...filters, bicycleColor: "Alabaster Adventure" })}></div>
                    <div onClick={() => setFilters({ ...filters, bicycleColor: "Midnight Reverie" })}></div>
                    <div onClick={() => setFilters({ ...filters, bicycleColor: "Sunset Soliloquy" })}></div>
                    <div onClick={() => setFilters({ ...filters, bicycleColor: "Lilac Love" })}></div>
                    <div onClick={() => setFilters({ ...filters, bicycleColor: "Daydream Sky" })}></div>
                    <div onClick={() => setFilters({ ...filters, bicycleColor: "Lovely Lagoon" })}></div>
                  </div>
                </div>
                <div className="handle-color">
                  <h6>Handle color</h6>
                  <div className="color-container">
                    <div onClick={() => setFilters({ ...filters, handleColor: "Alabaster Adventure" })}></div>
                    <div onClick={() => setFilters({ ...filters, handleColor: "Midnight Reverie" })}></div>
                    <div onClick={() => setFilters({ ...filters, handleColor: "Sunset Soliloquy" })}></div>
                    <div onClick={() => setFilters({ ...filters, handleColor: "Lilac Love" })}></div>
                    <div onClick={() => setFilters({ ...filters, handleColor: "Daydream Sky" })}></div>
                    <div onClick={() => setFilters({ ...filters, handleColor: "Lovely Lagoon" })}></div>
                  </div>
                </div>
                <div className="download-pdf">
                  <button>DOWNLOAD PDF</button>
                </div>
                <div className="add-to-cart">
                  <div className='quantity'>
                    <a onClick={() => {
                      value > 1 ? setValue(value - 1) : ''
                    }} href="#!" className='minus'>-</a>
                    <input value={value} type="number" onChange={handleChange} />
                    <a onClick={() => { setValue(value + 1) }} href="#!" className='plus'>+</a>
                  </div>
                  <button onClick={() => { checkUser() }} className='add-to-cart'>
                    <img src={icon} alt="" />
                    <span>ADD TO CART</span>
                  </button>
                </div>
                <div className="share">
                  <h6>SHARE THIS AWESOME BIKE</h6>
                  <div className="icons">
                    <a href="#!"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#!"><i className="fa-brands fa-x-twitter"></i></a>
                    <a href="#!"><i className="fa-brands fa-pinterest-p"></i></a>
                    <a href="#!"><i className="fa-brands fa-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="addons">
        <div className='category-container'>
          <div className="container">
            <ul>
              <li onClick={() => { setfilteredProducts(products) }}><a href="#!">ALL</a></li>
              {category.map((item, i) => (
                <li onClick={() => getFilteredProducts(item)} key={i}><a href="#!">{item.toUpperCase()}</a></li>
              ))}
            </ul>
            <input onChange={(e) => searchProd(e.target.value)} placeholder='Search product' type="text" />
          </div>
          <div className="box-container"></div>
        </div>
        <div className="container">
          <div className="products-container">
            {filteredProducts.length === 0 ?
              searchedProducts.length === 0 ?
                products.map((product, i) => (
                  <ProductCard key={i} productState={product} />
                ))
                :
                searchedProducts.map((product, i) => (
                  <ProductCard key={i} productState={product} />
                ))
              :
              searchedProducts.length === 0 ?
                filteredProducts.map((product, i) => (
                  <ProductCard key={i} productState={product} />
                ))
                :
                searchedProducts.map((product, i) => (
                  <ProductCard key={i} productState={product} />
                ))
            }
          </div>
        </div>
        <div className='green-box'>
          <div className="box"></div>
        </div>
      </section>
      <ExperienceSentimental />
      <SentiMentalNews />
    </>
  )
}

export default ConfigureBike