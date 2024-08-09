import React from 'react'
import zagreb from "../images/zagreb-design-week-sentimental-bikes-1.webp"
import { useContext } from 'react'
import { ModeContext } from '../context/ModeContext'
import { useTranslation } from 'react-i18next'

const ExperienceSentimental = () => {

    const [mode] = useContext(ModeContext)
    const { t, i18n: { changeLanguage, language } } = useTranslation();

    return (
        <>
            <section className={`experience ${mode==='dark'?'dark':''}`} id='experience'>
                <div className='container'>
                    <div className="text-container">
                        <h1><div><span data-aos="fade-up">{t('experienceSentimental.h1.1')}</span></div>
                            <div><span data-aos-delay="100" data-aos="fade-up">{t('experienceSentimental.h1.2')}</span></div></h1>
                        <div className="p-container">
                            <p data-aos="fade-up" data-aos-delay="200">{t('experienceSentimental.p.1')}</p>
                        </div>
                    </div>
                    <div className="card-container">
                        <div className="img-container">
                            <img data-aos="zoom-out" src={zagreb} alt="" />
                        </div>
                        <div className="content-container">
                            <div className="header-container">
                                <div className='date'>
                                    <span>{t('experienceSentimental.div.1')}</span>
                                    <h3>26</h3>
                                </div>
                                <div className='header'>
                                    <h1>Zagreb</h1>
                                    <p>{t('experienceSentimental.div.2')}</p>
                                </div>
                            </div>
                            <div className="body-container">
                                <p>{t('experienceSentimental.p.2')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section></>
    )
}

export default ExperienceSentimental