import React from 'react'
import { useParams } from 'react-router-dom'
import { products } from '../data/products'
import slugify from 'slugify'
import icon from '../images/logo-btn-icon.svg'

const Details = () => {

    const { slug } = useParams()
    const productDetail = products.find((product) => slugify(product.name.toLowerCase()) === slug)

    return (
        <section id='details'>
            <div className="details">
                <div className="container">
                    <div className="heading">
                        <h1>{productDetail.category}</h1>
                        <h3>€{productDetail.price}.00</h3>
                    </div>
                    <div className="img-content-container">
                        <div className="img-container">
                            <img src={`/src${productDetail.img[0]}`} alt="" />
                        </div>
                        <div className='features'>
                            <div className="options">
                                <h6>FRAME OPTIONS</h6>
                            </div>
                            <div className="bicycle-color">
                                <h6>Bicycle color</h6>
                                <div className="color-container">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                            <div className="download-pdf">
                                <button>DOWNLOAD PDF</button>
                            </div>
                            <div className="add-to-cart">
                                <div className='quantity'>
                                    <a href="#!" className='minus'>-</a>
                                    <input type="number" />
                                    <a href="#!" className='plus'>+</a>
                                </div>
                                <button className='add-to-cart'>
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
    )
}

export default Details