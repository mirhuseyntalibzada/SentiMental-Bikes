import React from 'react'
import { useContext } from 'react'
import { ModeContext } from '../context/ModeContext'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useState } from 'react'
import supabase from '../config/connect'
import { useTranslation } from 'react-i18next'
import ProductCard from './ProductCard'

const ThankYou = () => {

    const [mode] = useContext(ModeContext)
    const { t, i18n: { changeLanguage, language } } = useTranslation();
    const [cookie] = useCookies(['cookie-user'])
    const [product, setProduct] = useState([])

    useEffect(() => {
        let random = [];
        while (random.length < 4) {
            let randomNum = Math.floor((Math.random() * 12 + 1));
            if (!random.includes(randomNum)) {
                random.push(randomNum);
            }
        }

        const fetchData = async () => {
            const products = [];
            for (const item of random) {
                const { data } = await supabase.from('products').select().eq('id', item);
                if (data) {
                    products.push(data[0]);
                }
            }
            setProduct(products);
        };
        fetchData();
    }, []);

    console.log(product);



    return (
        <>
            <section className={`cart ${mode === 'dark' ? 'dark' : ''}`} id='cart'>
                <div className="container">
                    <div className="text-container">
                        <h1>Thank You</h1>
                    </div>
                </div>
            </section>
            <section className={`cart-section ${mode === 'dark' ? 'dark' : ''}`} id='cart-section'>
                <div className="box-container">
                    <div className="green-box"></div>
                    <div className="white-box"></div>
                </div>
                <div className="container">
                    <p className='thanks'>Thank you for your purchase. Please checkout our other products</p>
                </div>
                <div className="container">
                    <div className='products-container'>
                        {
                            product
                                ?
                                product?.map((item, i) => (
                                    <ProductCard key={i} productState={item} />
                                ))
                                :
                                ''
                        }
                    </div>
                </div>

            </section >
        </>
    )
}

export default ThankYou