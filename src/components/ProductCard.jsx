import React from 'react'
import { useState } from 'react';
import { addProductToCart } from '../toolkit/features/cartSlice';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import slugify from 'slugify';
import { Link } from 'react-router-dom';

const ProductCard = ({ productState }) => {
    const [heartedProducts, setHeartedProducts] = useState([]);
    const [cookie] = useCookies(['cookie-user'])
    const dispatch = useDispatch()

    const toggleHeart = (id) => {
        if (heartedProducts.includes(id)) {
            setHeartedProducts(heartedProducts.filter(productId => productId !== id));
        } else {
            setHeartedProducts([...heartedProducts, id]);
        }
    };

    const checkUser = async (item) => {
        if (cookie['cookie-user'] !== undefined) {
            dispatch(addProductToCart({ ...item }))
        } else {
            alert("you have to log in first")
        }
    }

    return (
        <div key={productState.id} className="card-container">
            <div className="content">
                <div className="img-container">
                    <img src={`src${productState.img[0]}`} alt="" />
                </div>
                <div className="info-container">
                    <h6>{productState.name}</h6>
                    <span>€{productState.price}.00</span>
                </div>
                <div className="button-container">
                    <button onClick={()=>{window.scrollTo(0, 0);}} className='details'><Link to={`/details/${slugify(productState.name.toLowerCase())}`}>DETAILS</Link></button>
                    <button onClick={() => { checkUser(productState); }}>CART</button>
                </div>
                <div className='fav'>
                    <i onClick={() => toggleHeart(productState.id)} className={`fa-${heartedProducts.includes(productState.id) ? 'solid' : "regular"} fa-heart`}></i>
                </div>
            </div>
        </div>
    )
}

export default ProductCard