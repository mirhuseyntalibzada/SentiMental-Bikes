import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addProductToCart } from '../toolkit/features/cartSlice';
import { addToWishlist, removeFromWishlist } from '../toolkit/features/wishlistSlice';
import slugify from 'slugify';
import { useEffect } from 'react';
import supabase from '../config/connect';
import { Bounce, toast } from 'react-toastify'

const ProductCard = ({ productState }) => {
    const [cookie] = useCookies(['cookie-user'])
    const dispatch = useDispatch()
    const wishlist = useSelector((state) => state.wishlist.wishlist)
    const wishlistAll = useSelector((state) => state.wishlist)

    const [wishlistModified, setWishlistModified] = useState(false);

    const toggleHeart = async (product) => {
        if (wishlist.some(item => item.id === product.id)) {
            dispatch(removeFromWishlist(product.id));
        } else {
            dispatch(addToWishlist({ ...product, quantity: 1 }));
        }
        setWishlistModified(true);
    };

    const checkUser = async (item, type) => {
        if (cookie['cookie-user'] !== undefined) {
            if (type === 'cart') {
                dispatch(addProductToCart({ ...item, quantity: 1 }));
                alertMessage("Added to cart", 1000)
            } else {
                toggleHeart(item);
            }
        } else {
            alertMessage(`You have to log in first`)
        }
    };

    const addWishlistToDB = async () => {
        const { data } = await supabase.from('users').select()
        const user = data.find(({ token }) => token === cookie['cookie-user'])
        const { error } = await supabase.from('users').update({
            wishlist: wishlistAll
        }).eq('token', user.token)
    }

    useEffect(() => {
        if (wishlistModified || wishlist.length > 0) {
            addWishlistToDB(wishlistAll);
            setWishlistModified(false);
        }
    }, [wishlistAll, wishlistModified]);

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

    return (
        <>
            <div key={productState.id} className="card-container">
                <div className="content">
                    <div className="img-container">
                        <img src={`${productState.img[0]}`} alt="" />
                    </div>
                    <div className="info-container">
                        <h6>{productState.name.toUpperCase()}</h6>
                        <span>€{productState.price}.00</span>
                    </div>
                    <div className="button-container">
                        <button onClick={() => { window.scrollTo(0, 0); }} className='details'><Link to={`/details/${slugify(productState.name.toLowerCase())}`}>DETAILS</Link></button>
                        <button onClick={() => { checkUser(productState, 'cart') }} >CART</button>
                    </div>
                    <div className='fav'>
                        <i onClick={() => { checkUser(productState, 'wishlist') }} className={`fa-${wishlist.some(item => item.id === productState.id) ? 'solid' : "regular"} fa-heart`}></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard