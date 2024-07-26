import React, { useState, useEffect } from 'react';
import logo from '../images/logo-big.svg';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Header = () => {
    const [isLangActive, setIsLangActive] = useState(false);
    const [isHamActive, setIsHamActive] = useState(false);
    const [show, setShow] = useState(true);
    const [cartIcon, setCartIcon] = useState(false)
    const [lastScrollY, setLastScrollY] = useState(0);
    const cartQuantity = useSelector((state) => state.cart.cartQuantity)
    const productQuantity = useSelector((state) => state.cart.productQuantity)
    const wishlistQuantity = useSelector((state) => state.wishlist.wishlistTotalQuantity)
    const cartTotalQuantity = cartQuantity + productQuantity

    const toggleLangBtn = () => setIsLangActive(!isLangActive);
    const toggleHamBtn = () => setIsHamActive(!isHamActive);

    const controlNavbar = () => {
        if (!isHamActive) {
            const scrollY = window.scrollY;
            setShow(scrollY <= 0 || scrollY < lastScrollY);
            setLastScrollY(scrollY);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY, isHamActive]);

    useEffect(() => {
        document.body.classList.toggle('no-scroll', isHamActive);
    }, [isHamActive]);

    const { t, i18n: { changeLanguage, language } } = useTranslation();

    const setLanguage = (newLanguage) => {
        changeLanguage(newLanguage);
        localStorage.setItem('lng', newLanguage);
    };

    const toggleCart = () => {
        setCartIcon(!cartIcon)
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
                                }} to={"/our-story"} className={`${isHamActive ? 'open' : ''}`}>
                                    <span>{t(`header.ourStory`)}</span>
                                    <span>{t(`header.ourStory`)}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink onClick={() => {
                                    window.scrollTo(0, 0);
                                    toggleHamBtn()
                                }} to={"/dealership"} className={`${isHamActive ? 'open' : ''}`}>
                                    <span>{t(`header.dealerShip`)}</span>
                                    <span>{t(`header.dealerShip`)}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink onClick={() => {
                                    window.scrollTo(0, 0);
                                    toggleHamBtn()
                                }} to={"/contact"} className={`${isHamActive ? 'open' : ''}`}>
                                    <span>{t(`header.contact`)}</span>
                                    <span>{t(`header.contact`)}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink onClick={() => {
                                    window.scrollTo(0, 0);
                                    toggleHamBtn()
                                }} to={"/faq"} className={`${isHamActive ? 'open' : ''}`}>
                                    <span>{t(`header.faq`)}</span>
                                    <span>{t(`header.faq`)}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink onClick={() => {
                                    window.scrollTo(0, 0);
                                    toggleHamBtn()
                                }} to={"/become-a-partner"} className={`${isHamActive ? 'open' : ''}`}>
                                    <span>{t(`header.becomePartner`)}</span>
                                    <span>{t(`header.becomePartner`)}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink onClick={() => {
                                    window.scrollTo(0, 0);
                                    toggleHamBtn()
                                }} to={"/configure-a-bike"} className={`${isHamActive ? 'open' : ''}`}>
                                    <span>{t(`header.configureBike`)}</span>
                                    <span>{t(`header.configureBike`)}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink onClick={() => {
                                    window.scrollTo(0, 0);
                                    toggleHamBtn()
                                }} to={"/my-account"} className={`${isHamActive ? 'open' : ''}`}>
                                    <span>{t(`header.myAccount`)}</span>
                                    <span>{t(`header.myAccount`)}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink onClick={() => {
                                    window.scrollTo(0, 0);
                                    toggleHamBtn()
                                }} to={"/cart"} className={`${isHamActive ? 'open' : ''}`}>
                                    <span>{t(`header.cart`)}</span>
                                    <span>{t(`header.cart`)}</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink onClick={() => {
                                    window.scrollTo(0, 0);
                                    toggleHamBtn()
                                }} to={"/wishlist"} className={`${isHamActive ? 'open' : ''}`}>
                                    <span>{t(`header.wishlist`)}</span>
                                    <span>{t(`header.wishlist`)}</span>
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
                            <img src={logo} alt="logo" />
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
                                        <NavLink onClick={() => { window.scrollTo(0, 0) }} to={"/faq"}>
                                            <span>{t(`header.faq`)}</span>
                                            <span>{t(`header.faq`)}</span>
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
                                    <span onClick={() => { setLanguage('en'); toggleLangBtn() }}>EN</span>
                                    <span onClick={() => { setLanguage('az'); toggleLangBtn() }}>AZ</span>
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
                                <div onClick={() => { toggleCart() }} className="cart-fav-container">
                                    <div className='head-con'>
                                        <div>
                                            <i className="fa-solid fa-cart-shopping"></i>
                                            <i className="fa-solid fa-heart"></i>
                                        </div>
                                        <div>
                                            <i className="fa-solid fa-cart-shopping"></i>
                                            <i className="fa-solid fa-heart"></i>
                                        </div>
                                    </div>
                                    <div className={`body-con ${cartIcon ? 'active' : ''}`}>
                                        <NavLink onClick={() => { window.scrollTo(0, 0) }} to={"/cart"} className="cart-icon">
                                            <i className="fa-solid fa-cart-shopping"></i>
                                            {cartTotalQuantity !== 0 ?
                                                <div className="quantity">
                                                    <span>{cartTotalQuantity}</span>
                                                </div> :
                                                ''}
                                        </NavLink>
                                        <NavLink onClick={() => { window.scrollTo(0, 0) }} to={"/wishlist"} className="cart-icon">
                                            <i className="fa-solid fa-heart"></i>
                                            {wishlistQuantity !== 0 ?
                                                <div className="quantity">
                                                    <span>{wishlistQuantity}</span>
                                                </div> :
                                                ''}

                                        </NavLink>
                                    </div>
                                </div>
                                {cartTotalQuantity !== 0 || wishlistQuantity !== 0 ?
                                    <div className="quantity">
                                        <span>{cartTotalQuantity + wishlistQuantity}</span>
                                    </div> :
                                    ''}
                            </div>
                        </div>
                    </nav>
                </div>
            </section>

        </>
    );
};

export default Header;
