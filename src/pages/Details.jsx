import React from 'react'
import { useParams } from 'react-router-dom'
import slugify from 'slugify'
import icon from '../images/logo-btn-icon.svg'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProductToCart, setCartToRedux, setProductToRedux } from '../toolkit/features/cartSlice'
import { useCookies } from 'react-cookie'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import supabase from '../config/connect'
import { useContext } from 'react'
import { ModeContext } from '../context/ModeContext'
import { useTranslation } from 'react-i18next'

const Details = () => {
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);
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


    //Details----------------------------------------------------------------------------------------------
    const { slug } = useParams()
    const productDetail = products.find((product) => slugify(product.name.toLowerCase()) === slug)
    //----------------------------------------------------------------------------------------------Details


    //changeImage------------------------------------------------------------------------------------------
    const [colorIndex, setColorIndex] = useState(0)
    const changeColor = (id) => {
        if (colorIndex !== id) {
            setImageLoading(true);
            setColorIndex(id);
        }
    }
    //------------------------------------------------------------------------------------------changeImage


    //input----------------------------------------------------------------------------------------------------------
    const [value, setValue] = useState(1);

    const handleChange = (e) => {
        const newValue = parseInt(e.target.value, 10);
        if (!isNaN(newValue)) {
            setValue(newValue);
        }
    };
    //----------------------------------------------------------------------------------------------------------input


    //addProductsToCart------------------------------------------------------------------------------------
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const [cookie] = useCookies(['cookie-user'])

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

    const checkUser = async (item) => {
        if (cookie['cookie-user'] !== undefined) {
            dispatch(addProductToCart({ ...item, quantity: value }))
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
    //------------------------------------------------------------------------------------addProductsToCart

    const [mode] = useContext(ModeContext)
    const { t, i18n: { changeLanguage, language } } = useTranslation();

    if (loading) {
        return (
          <>
            <div className={`loader-container ${mode==='dark'?'dark':''}`}>
              <div className='loader'></div>
            </div>
          </>
        );
      }

    return (
        <section className={`details-section ${mode==='dark'?'dark':''}`} id='details'>
            <div className="details">
                <div className="container">
                    <div className="heading">
                        <h1>{productDetail.category.replace(productDetail.category[0], productDetail.category[0].toUpperCase())}</h1>
                        <h3>€{productDetail.price}.00</h3>
                    </div>
                    <div className="img-content-container">
                        <div className="img-container">
                            {imageLoading && <div className="mini-loader"><div className='loader'></div></div>}
                            {productDetail.type === 'customizable' ?
                                <img
                                    src={`${productDetail.img[colorIndex]}`}
                                    alt=""
                                    onLoad={() => setImageLoading(false)} 
                                    style={{ display: imageLoading ? 'none' : 'block' }}
                                />
                                :
                                <img
                                    src={`${productDetail.img[0]}`}
                                    alt=""
                                    onLoad={() => setImageLoading(false)} 
                                    style={{ display: imageLoading ? 'none' : 'block' }}
                                />
                            }
                        </div>
                        <div className='features'>
                            {productDetail.type === 'customizable' ?
                                <>
                                    <div className="options">
                                        <h6>{t('details.h6.1')}</h6>
                                    </div>
                                    <div className="bicycle-color">
                                        <h6>{t('details.h6.2')}</h6>
                                        <div className="color-container">
                                            <div onClick={() => changeColor(0)}></div>
                                            <div onClick={() => changeColor(1)}></div>
                                            <div onClick={() => changeColor(2)}></div>
                                            <div onClick={() => changeColor(3)}></div>
                                            <div onClick={() => changeColor(4)}></div>
                                            <div onClick={() => changeColor(5)}></div>
                                        </div>
                                    </div>
                                </>
                                : ''}
                            <div className="options">
                                <h6>{t('details.h6.3')}</h6>
                            </div>
                            <div className="about">
                                <p>{productDetail.about}</p>
                            </div>
                            <div className="download-pdf">
                                <button>{t('details.h6.4')}</button>
                            </div>
                            <div className="add-to-cart">
                                <div className='quantity'>
                                    <a onClick={() => {
                                        value > 1 ? setValue(value - 1) : ''
                                    }} href="#!" className='minus'>-</a>
                                    <input value={value} type="number" onChange={handleChange} />
                                    <a onClick={() => { setValue(value + 1) }} href="#!" className='plus'>+</a>
                                </div>
                                <button onClick={() => checkUser(productDetail)} className='add-to-cart'>
                                    <img src={icon} alt="" />
                                    <span>{t('details.h6.5')}</span>
                                </button>
                            </div>
                            <div className="share">
                                <h6>{t('details.h6.6')}</h6>
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
    )
}

export default Details