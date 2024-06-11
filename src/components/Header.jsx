import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo-big.svg';

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
            if (scrollY > lastScrollY) {
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

    return (
        <>
            <div className={`mobile-nav ${isHamActive ? 'active' : ''}`}>
                <div className="container">
                    <nav className={`${isHamActive ? 'active' : ''}`}>
                        <ul>
                            <li><Link className={`${isHamActive ? 'active' : ''}`} to="#">OUR STORY</Link></li>
                            <li><Link className={`${isHamActive ? 'active' : ''}`} to="#">DEALERSHIP</Link></li>
                            <li><Link className={`${isHamActive ? 'active' : ''}`} to="#">CONTACT</Link></li>
                            <li><Link className={`${isHamActive ? 'active' : ''}`} to="#">BECOME A PARTNER</Link></li>
                            <li><Link className={`${isHamActive ? 'active' : ''}`} to="#">CONFIGURE A BIKE</Link></li>
                            <li><Link className={`${isHamActive ? 'active' : ''}`} to="#">MY ACCOUNT</Link></li>
                            <li><Link className={`${isHamActive ? 'active' : ''}`} to="#">CART</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <section className={`navbar ${show || 'hidden'}`} id='header'>
                <div className={`background ${isHamActive ? 'active' : ''}`}></div>
                <div className="container">
                    <nav>
                        <div className="img-container">
                            <img src={logo} alt="" />
                        </div>
                        <div className='lang-ham-container'>
                            <div className="navigation">
                                <ul>
                                    <li><Link to="#">OUR STORY</Link></li>
                                    <li><Link to="#">DEALERSHIP</Link></li>
                                    <li><Link to="#">CONTACT</Link></li>
                                    <li><Link to="#">BECOME A PARTNER</Link></li>
                                    <li><Link to="#">CONFIGURE A BIKE</Link></li>
                                </ul>
                            </div>
                            <div onClick={toggleLangBtn} className="lang-icon-container">
                                <div className="lang-icon">
                                    <i className="fa-solid fa-globe" />
                                </div>
                                <div onClick={e => { e.stopPropagation() }} className={`options-container ${isLangActive ? 'active' : ''}`}>
                                    <span>EN</span>
                                    <span>AZ</span>
                                </div>
                            </div>
                            <div onClick={toggleHamBtn} className={`hamburger-menu-container ${isHamActive ? 'active' : ''}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="account-cart-container">
                                <div className="account-icon">
                                    <i className="fa-solid fa-user"></i>
                                </div>
                                <div className="cart-icon">
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </section>

        </>
    );
};

export default Header;
