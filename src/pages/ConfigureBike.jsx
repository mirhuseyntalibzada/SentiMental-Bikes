import React from 'react'
import SentiMentalNews from '../components/SentiMentalNews'
import icon from '../images/logo-btn-icon.svg'
import ExperienceSentimental from '../components/ExperienceSentimental'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../toolkit/features/cartSlice'
import { bicycles } from '../data/bicycles'
import { useCookies } from 'react-cookie'
import supabase from '../config/connect'
import { useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { useContext } from 'react'
import { ModeContext } from '../context/ModeContext'
import { Bounce, toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const ConfigureBike = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchProducts() {
      let { data, error } = await supabase
        .from('products')
        .select('*');
      if (error) console.error('Error fetching products:', error);
      else setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  // Wishlist----------------------------------------------------------------

  const [category, setCategory] = useState([])
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
  }, [products])

  const getFilteredProducts = (category) => {
    const filtered = products.filter((product) => product.category === category)
    setfilteredProducts(filtered)
  }

  // ----------------------------------------------------------------Wishlist


  // Search------------------------------------------------------------------
  const [searchedProducts, setSearchedProducts] = useState([])

  const searchProd = (keyword) => {
    const searchedItems = filteredProducts.length === 0 ?
      products.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase())) :
      filteredProducts.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()))
    keyword.length === 0 ? setSearchedProducts([]) : setSearchedProducts(searchedItems)
  }

  // ------------------------------------------------------------------Search


  //input----------------------------------------------------------------------------------------------------------
  const [value, setValue] = useState(1);

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };
  //----------------------------------------------------------------------------------------------------------input


  //changin the color of image and filtering them------------------------------------------------------------------
  const [filteredProducts, setfilteredProducts] = useState([])

  const [filters, setFilters] = useState({
    bicycleColor: 'Alabaster Adventure',
    handleColor: 'Alabaster Adventure'
  });

  const filteredBicycle = bicycles.filter(bicycle => {
    return (
      (filters.bicycleColor === '' || bicycle.bicycle_color.split('-').join(' ') === filters.bicycleColor) &&
      (filters.handleColor === '' || bicycle.handle_color.split('-').join(' ') === filters.handleColor)
    );
  });
  //------------------------------------------------------------------changin the color of image and filtering them


  //addtocart------------------------------------------------------------------
  const [cookie] = useCookies(['cookie-user'])
  const cart = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const checkUser = async () => {
    if (cookie['cookie-user'] !== undefined) {
      dispatch(addToCart({ ...filteredBicycle[0], quantity: value }))
      alertMessage("Added to cart", 1000)
    } else {
      alertMessage("You have to log in first", 5000)
    }
  }

  const alertMessage = (message, duration) => {
    toast(message, {
      position: "top-right",
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  }

  const addCartToDB = async () => {
    const { data } = await supabase.from('users').select()
    const user = data.find(({ token }) => token === cookie['cookie-user'])
    const { error } = await supabase.from('users').update({
      cart: cart
    }).eq('token', user.token)
  }

  useEffect(() => {
    if (cart.cart || cart.product) {
      if (cart.cart.length > 0 || cart.product.length > 0) {
        addCartToDB()
      }
    }
  }, [cart])
  //------------------------------------------------------------------addtocart

  const [mode] = useContext(ModeContext)
  const { t, i18n: { changeLanguage, language } } = useTranslation();

  if (loading) {
    return (
      <>
        <div className={`loader-container ${mode === 'dark' ? 'dark' : ''}`}>
          <div className='loader'></div>
        </div>
      </>
    );
  }

  return (
    <>
      <section className={`configure-section ${mode === 'dark' ? 'dark' : ''}`} id='configure'>
        <div className="configure">
          <div className="container">
            <div className="heading">
              <h1>{t('configureBike.h1')}</h1>
              <h3>€1,899.00</h3>
            </div>
            <div className='img-content-container'>
              <div className="img-container">
                <img src={`/src/images/bicycles/handlebars/${filters.handleColor.split(' ').join('-')}/bicycle-color/${filters.bicycleColor.split(' ').join('-')}.png`} alt="" />
              </div>
              <div className='features'>
                <div className="options">
                  <h6>{t('configureBike.h6-1')}</h6>
                </div>
                <div className="bicycle-color">
                  <h6>{t('configureBike.h6-2')}</h6>
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
                  <h6>{t('configureBike.h6-3')}</h6>
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
                  <button>{t('configureBike.button')}</button>
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
                    <span>{t('configureBike.span')}</span>
                  </button>
                </div>
                <div className="share">
                  <h6>{t('configureBike.h6-4')}</h6>
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
      <section className={`addons ${mode === 'dark' ? 'dark' : ''}`} id="addons">
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