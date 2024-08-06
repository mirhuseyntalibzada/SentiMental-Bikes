import React from 'react'
import marquee_bike_1 from '../images/marquee-bike-1.webp'
import marquee_bike_2 from '../images/marquee-bike-2.webp'
import marquee_bike_3 from '../images/marquee-bike-3.webp'
import Marquee from "react-fast-marquee";
import payments from '../data/payments';
import configure_icon from '../images/configure-btn-icon.svg';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ModeContext } from '../context/ModeContext';
import { useTranslation } from 'react-i18next';
const Footer = () => {

    const [mode] = useContext(ModeContext)
    const { t, i18n: { changeLanguage, language } } = useTranslation();

    return (
        <footer className={`footer ${mode==="dark"?'dark':''}`}>
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
            <div className="container">
                <div className='text-nav-container'>
                    <div className='text-content'>
                        <div className="text-container">
                            <h3>{t('footer.h3')}</h3>
                            <p>{t('footer.p.1')}</p>
                            <form className="email">
                                <input placeholder='name@gmail.com' type="text" />
                                <button>{t('footer.button')}</button>
                            </form>
                        </div>
                    </div>
                    <div className="links">
                        <div className="nav">
                            <NavLink onClick={() => { window.scrollTo(0, 0) }} to={"/our-story"}>{t('footer.a.1')}</NavLink>
                            <NavLink onClick={() => { window.scrollTo(0, 0) }} to={"/become-a-partner"}>{t('footer.a.2')}</NavLink>
                            <NavLink onClick={() => { window.scrollTo(0, 0) }} to={"/contact"}>{t('footer.a.3')}</NavLink>
                        </div>
                        <div className="other-links">
                            <a href="!#">{t('footer.a.4')}</a>
                            <a href="!#">{t('footer.a.5')}</a>
                            <a href="!#">{t('footer.a.6')}</a>
                            <a href="!#">{t('footer.a.7')}</a>
                            <a href="!#">{t('footer.a.8')}</a>
                        </div>
                    </div>
                </div>
                <div className='social-media-payments'>
                    <div className="social-media">
                        <h5>{t('footer.h5.1')}</h5>
                        <div className="icons">
                            <div className="icon">
                                <i className="fa-brands fa-facebook-f" />
                            </div>
                            <div className="icon">
                                <i className="fa-brands fa-instagram" />
                            </div>
                            <div className="icon">
                                <i className="fa-brands fa-tiktok" />
                            </div>
                            <div className="icon">
                                <i className="fa-brands fa-linkedin" />
                            </div>
                        </div>
                    </div>
                    <div className="payments">
                        <h5>{t('footer.h5.2')}</h5>
                        <div className="payment-img">
                            {payments.map(item => (
                                <div key={item.id} className="img-container">
                                    <img src={`src/images/${item.image}`} alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="configure-button">
                    <NavLink onClick={()=>{window.scrollTo(0,0)}} to={"/configure-a-bike"} className="secondary-btn" data-text="Configure a bike">
                        <img src={configure_icon} alt="Logo Btn Icon" />
                        <span>CONFIGURE A BIKE</span>
                    </NavLink>
                </div>
                <div className="text-container">
                    <p><span>{t('footer.p.2')}</span>
                    {t('footer.p.3')}</p>
                </div>
            </div>
        </footer >

    )
}

export default Footer