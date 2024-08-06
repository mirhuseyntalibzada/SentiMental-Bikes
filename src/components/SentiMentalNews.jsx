import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import supabase from '../config/connect'
import { useContext } from 'react'
import { ModeContext } from '../context/ModeContext'
import { useTranslation } from 'react-i18next'

const SentiMentalNews = () => {
    const [news, setNews] = useState([])
    const [mode] = useContext(ModeContext)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const { data } = await supabase.from('news').select()
        setNews(data)
    }

    const { t, i18n: { changeLanguage, language } } = useTranslation();
    return (
        <>
            <section className={`sentimental-news-story ${mode === 'dark' ? 'dark' : ''}`} id='sentimental-news-story'>
                <div className="container">
                    <div className="h1-container">
                        <h1 data-aos="fade-up" className='hero-h1'>{t(`news.h1`)}</h1>
                        <div className="button-container-desktop">
                            <button>{t(`news.button`)}</button>
                        </div>
                    </div>
                    <div style={{ overflow: "hidden" }}>
                        {news.map(item => (
                            <div data-aos-delay={`${(item.id - 1) * 100}`} data-aos="fade-up" key={item.id} className="card-container">
                                <div className='first-container'>
                                    <span className='desktop-news'>{t(`news.button`)}</span>
                                    <div className="img-container">
                                        <img src={`/src/images/${item.img}`} alt="" />
                                    </div>
                                    <span className='mobile-news'>{t(`news.button`)}</span>
                                </div>
                                <div className="second-container">
                                    <h1>{item.title}</h1>
                                    <div className="date-author">
                                        <i className="fa-regular fa-calendar"></i>
                                        <div className="date">
                                            <span>{item.date}</span>
                                        </div>
                                        <span className='seperator'>|</span>
                                        <div className="author">
                                            <span>{item.author}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="button-container">
                        <button>{t(`news.button`)}</button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SentiMentalNews