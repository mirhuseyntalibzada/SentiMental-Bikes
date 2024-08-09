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
import { addComment, deleteComment, setDBToComments, updateComment } from '../toolkit/features/commentSlice'
import { Bounce, toast } from 'react-toastify'

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

    const checkUser = async (item) => {
        if (cookie['cookie-user'] !== undefined) {
            dispatch(addProductToCart({ ...item, quantity: value }))
            alertMessage("Added to cart", 3000)
        } else {
            alertMessage("You have to log in first", 3000)
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

    //review------------------------------------------------------------------------------------

    const adminToken = import.meta.env.VITE_ADMIN_TOKEN
    const [isBtnActive, setIsBtnActive] = useState(null)
    const [isEditActive, setIsEditActive] = useState(null)
    const [comment, setComment] = useState('')
    const [editComment, setEditComment] = useState('');
    const commentsAll = useSelector((state) => state.comment.comments)

    const checkUserComment = async (item, e) => {
        e.preventDefault();
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const { data } = await supabase.from('users').select()
        const user = data.find(({ token }) => token === cookie['cookie-user'])
        if (cookie['cookie-user'] !== undefined) {
            dispatch(addComment({ id: crypto.randomUUID(), payload: item, user: user.username, userToken: user.token, product: slug, date: `${day}.${month}.${year}` }));
        } else {
            alertMessage("you have to log in first", 3000);
        }
        setComment('')
    }

    const toggleBtn = (id) => {
        setIsBtnActive((prevState) => (prevState === id ? null : id));
    };

    const toggleEdit = (id) => {
        setIsEditActive((prevState) => (prevState === id ? null : id));
    }

    const handleEditSave = (id, e) => {
        e.preventDefault();
        dispatch(updateComment({ id, payload: editComment }));
        setIsEditActive(null);
        setIsBtnActive(null)
    };

    const handleRemoveItem = async (id) => {
        let removedComments = [...commentsAll]
        removedComments = removedComments.filter(item => item.id !== id);
        dispatch(deleteComment(id))
        await removeLastCommentInSupabase(removedComments)
    }

    const removeLastCommentInSupabase = async (removedComments) => {
        const { error } = await supabase.from('products').update({
            comments: removedComments
        }).eq('name', slug.split('-').join(' '));
        if (error) {
            console.error("Error updating cart:", error.message);
        }
    }

    const addCommentsToDB = async () => {
        const { error } = await supabase.from('products').update({
            comments: commentsAll
        }).eq('name', slug.split('-').join(' '));
        if (error) {
            console.error("Error updating cart:", error.message);
        }
    };

    useEffect(() => {
        if (commentsAll) {
            if (commentsAll.length > 0) {
                addCommentsToDB();
            }
        }
    }, [commentsAll]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase.from('products').select('comments').eq('name', slug.split('-').join(' '))
            dispatch(setDBToComments(data[0].comments))
        }
        fetchData()
    }, [])

    //------------------------------------------------------------------------------------review

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
        <section className={`details-section ${mode === 'dark' ? 'dark' : ''}`} id='details'>
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
                    <div className='comments-header'>
                        <h1>{commentsAll ? commentsAll.filter(item => item.product === slug).length : '0'} Comments</h1>
                    </div>
                    <form action="" onSubmit={(e) => e.preventDefault()}>
                        <input value={comment} onChange={e => setComment(e.target.value)} type="text" />
                        <button onClick={(e) => checkUserComment(comment, e)} className='mobile'>
                            <i className="fa-regular fa-paper-plane"></i>
                        </button>
                    </form>
                    <div className="comments-section">
                        {commentsAll?.map((item) => (
                            item.product === slug ? (
                                <div key={item.id} className="comment-container">
                                    <div className='comment-cont-head'>
                                        <h5>{item.user}</h5>
                                        {isEditActive === item.id ? (
                                            ''
                                        ) : (
                                            <>
                                                <div className='three-dots' onClick={() => toggleBtn(item.id)}>
                                                    <i className="fa-solid fa-ellipsis-vertical"></i>
                                                </div>
                                                <div className={`three-dots-container ${isBtnActive === item.id ? 'active' : ''}`}>
                                                    {item.userToken === cookie['cookie-user'] || cookie['cookie-user'] === adminToken ?
                                                        <>
                                                            <div onClick={() => toggleEdit(item.id)} className="edit">
                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                                <span>EDIT</span>
                                                            </div>
                                                            <div onClick={() => handleRemoveItem(item.id)} className="delete">
                                                                <i className="fa-solid fa-trash"></i>
                                                                <span>DELETE</span>
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <div className="delete">
                                                                <i className="fa-solid fa-flag"></i>
                                                                <span>REPORT</span>
                                                            </div>
                                                        </>
                                                    }
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <div className='rating-date'>
                                        {/* <div>
                                            <i className="fa-solid fa-star" style={{ color: "rgb(181, 105, 14)" }}></i>
                                            <i className="fa-regular fa-star" style={{ color: "rgb(181, 105, 14)" }}></i>
                                            <i className="fa-regular fa-star" style={{ color: "rgb(181, 105, 14)" }}></i>
                                            <i className="fa-regular fa-star" style={{ color: "rgb(181, 105, 14)" }}></i>
                                            <i className="fa-regular fa-star" style={{ color: "rgb(181, 105, 14)" }}></i>
                                        </div> */}
                                        <span>{item.date}</span>
                                    </div>
                                    {isEditActive === item.id ? (
                                        <form className='edit-form' onSubmit={(e) => handleEditSave(item.id, e)}>
                                            <input
                                                type="text"
                                                value={editComment}
                                                onChange={(e) => setEditComment(e.target.value)}
                                            />
                                            <button type='submit' className='mobile'>
                                                SAVE
                                            </button>
                                        </form>
                                    ) : (
                                        <p>{item.payload}</p>
                                    )}
                                </div>
                            ) : null
                        ))}
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Details