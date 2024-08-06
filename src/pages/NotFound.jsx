import React from 'react'
import marquee_bike_1 from '../images/marquee-bike-1.webp'
import marquee_bike_2 from '../images/marquee-bike-2.webp'
import marquee_bike_3 from '../images/marquee-bike-3.webp'
import { NavLink } from 'react-router-dom'
import _404 from '../images/error-404-page-image.png'
import Marquee from "react-fast-marquee";
import { useTranslation } from 'react-i18next'

const NotFound = () => {

    const { t, i18n: { changeLanguage, language } } = useTranslation();

    return (
        <>
            <section id='not-found'>
                <div className="container">
                    <div className="text-container">
                        <h1>404 Error</h1>
                        <h2>{t('notFound.h2')}</h2>
                        <div style={{ overflow: "hidden" }} className="small-text-container">
                            <div data-aos="fade-up" data-aos-delay="0" className='small-text'>
                                <i className="fa-solid fa-caret-right"></i>
                                <NavLink onClick={() => { window.scrollTo(0, 0) }} to={'/home'}>
                                    <div className='span-container'>
                                        <span>{t('notFound.span')}</span>
                                        <span>{t('notFound.span')}</span>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="img-container">
                    <img src={_404} alt="" />
                </div>
            </section>
            <div className="footer-marquee">
                <Marquee speed={125}>
                    <div className="footer-marquee-track-inner">
                        <div className="footer-marquee-track-piece">
                            <div className="title-xl">{t('footer.div')}</div>
                            <div className="track-image">
                                <img src={marquee_bike_1} />
                            </div>
                            <div className="track-divider" />
                        </div>
                        <div className="footer-marquee-track-piece">
                            <div className="title-xl">{t('footer.div')}</div>
                            <div className="track-image">
                                <img src={marquee_bike_2} />
                            </div>
                            <div className="track-divider" />
                        </div>
                        <div className="footer-marquee-track-piece">
                            <div className="title-xl">{t('footer.div')}</div>
                            <div className="track-image">
                                <img src={marquee_bike_3} />
                            </div>
                            <div className="track-divider" /></div>
                        <div className="footer-marquee-track-piece">
                            <div className="title-xl">{t('footer.div')}</div>
                            <div className="track-image">
                                <img src={marquee_bike_2} />
                            </div>
                            <div className="track-divider" /></div>
                    </div>
                </Marquee>
            </div>
        </>
    )
}

export default NotFound