import React, { useState, useEffect } from 'react';
import logo from '../images/logo-big.svg';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const [isLangActive, setIsLangActive] = useState(false);
    const [isHamActive, setIsHamActive] = useState(false);
    const [show, setShow] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const toggleLangBtn = () => {
        setIsLangActive(!isLangActive);
    };

    const toggleHamBtn = () => {
        setIsHamActive(!isHamActive);
    };

    const controlNavbar = () => {
        if (!isHamActive) {
            const scrollY = window.scrollY;
            if (scrollY <= 0) {
                setShow(true);
            } else if (scrollY > lastScrollY) {
                setShow(false);
            } else {
                setShow(true);
            }
            setLastScrollY(scrollY);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);

        return () => {
            window.removeEventListener('scroll', controlNavbar);
        };
    }, [lastScrollY, isHamActive]);

    useEffect(() => {
        if (isHamActive) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [isHamActive]);

    const { t, i18n: { changeLanguage, language } } = useTranslation();

    const setLanguage = (newLanguage) => {
        changeLanguage(newLanguage);
    }

    return (
        <>
            <div className={`mobile-nav ${isHamActive ? 'active' : ''}`}>
                <div className="container">
                    <nav className={`${isHamActive ? 'active' : ''}`}>
                        <ul>
                            <li>
                                <NavLink onClick={() => {
                                    window.scrollTo(0, 0);
                                    toggleHamBtn()
                                }} to={"/our-story"} className={`${isHamActive ? 'active' : ''}`}>
                                    <span>{t(`header.ourStory`)}</span>
                                    <span>{t(`header.ourStory`)}</span>
                                </NavLink>
                            </li>````
                            <li>
                                <NavLink onClick={() => {
                                    window.scrollTo(0, 0);
                                    toggleHamBtn()
                                }} to={"/dealership"} className={`${isHamActive ? 'active' : ''}`}>
                                    <span>{t(`header.dealerShip`)}</span>
                                    <span>{t(`header.dealerShip`)}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink onClick={() => {
                                    window.scrollTo(0, 0);
                                    toggleHamBtn()
                                }} to={"/contact"} className={`${isHamActive ? 'active' : ''}`}>
                                    <span>{t(`header.contact`)}</span>
                                    <span>{t(`header.contact`)}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink onClick={() => {
                                    window.scrollTo(0, 0);
                                    toggleHamBtn()
                                }} to={"/become-a-partner"} className={`${isHamActive ? 'active' : ''}`}>
                                    <span>{t(`header.becomePartner`)}</span>
                                    <span>{t(`header.becomePartner`)}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink onClick={() => {
                                    window.scrollTo(0, 0);
                                    toggleHamBtn()
                                }} to={"/configure-a-bike"} className={`${isHamActive ? 'active' : ''}`}>
                                    <span>{t(`header.configureBike`)}</span>
                                    <span>{t(`header.configureBike`)}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink onClick={() => {
                                    window.scrollTo(0, 0);
                                    toggleHamBtn()
                                }} to={"/my-account"} className={`${isHamActive ? 'active' : ''}`}>
                                    <span>{t(`header.myAccount`)}</span>
                                    <span>{t(`header.myAccount`)}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink onClick={() => {
                                    window.scrollTo(0, 0);
                                    toggleHamBtn()
                                }} to={"/cart"} className={`${isHamActive ? 'active' : ''}`}>
                                    <span>{t(`header.cart`)}</span>
                                    <span>{t(`header.cart`)}</span>
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <section className={`navbar ${show || 'hidden'}`} id='header'>
                <div className={`background ${isHamActive ? 'active' : ''}`}></div>
                <div className="container">
                    <nav>
                        <NavLink onClick={() => {
                            window.scrollTo(0, 0);
                            isHamActive ? toggleHamBtn() : ''
                        }} to={"/home"} className="img-container">
                            <img src={logo} alt="" />
                        </NavLink>
                        <div className='lang-ham-container'>
                            <div className="navigation">
                                <ul>
                                    <li>
                                        <NavLink onClick={() => { window.scrollTo(0, 0) }} to={"/our-story"}>
                                            <span>{t(`header.ourStory`)}</span>
                                            <span>{t(`header.ourStory`)}</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink onClick={() => { window.scrollTo(0, 0) }} to={"/dealership"}>
                                            <span>{t(`header.dealerShip`)}</span>
                                            <span>{t(`header.dealerShip`)}</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink onClick={() => { window.scrollTo(0, 0) }} to={"/contact"}>
                                            <span>{t(`header.contact`)}</span>
                                            <span>{t(`header.contact`)}</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink onClick={() => { window.scrollTo(0, 0) }} to={"/become-a-partner"}>
                                            <span>{t(`header.becomePartner`)}</span>
                                            <span>{t(`header.becomePartner`)}</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink onClick={() => { window.scrollTo(0, 0) }} to={"/configure-a-bike"}>
                                            <span>{t(`header.configureBike`)}</span>
                                            <span>{t(`header.configureBike`)}</span>
                                        </NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div onClick={toggleLangBtn} className="lang-icon-container">
                                <div className="lang-icon">
                                    <i className="fa-solid fa-globe" />
                                    <i className="fa-solid fa-globe" />
                                </div>
                                <div onClick={e => { e.stopPropagation() }} className={`options-container ${isLangActive ? 'active' : ''}`}>
                                    <span onClick={()=>setLanguage('en')}>EN</span>
                                    <span onClick={()=>setLanguage('az')}>AZ</span>
                                </div>
                            </div>
                            <div onClick={toggleHamBtn} className={`hamburger-menu-container ${isHamActive ? 'active' : ''}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="account-cart-container">
                                <NavLink onClick={() => { window.scrollTo(0, 0) }} to={"/my-account"} className="account-icon">
                                    <i className="fa-solid fa-user"></i>
                                    <i className="fa-solid fa-user"></i>
                                </NavLink>
                                <NavLink onClick={() => { window.scrollTo(0, 0) }} to={"/cart"} className="cart-icon">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </NavLink>
                            </div>
                        </div>
                    </nav>
                </div>
            </section>

        </>
    );
};

export default Header;
