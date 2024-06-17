import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo-big.svg';
import { NavLink } from 'react-router-dom';

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
                            <li>
                                <NavLink to={"/our-story"} className={`${isHamActive ? 'active' : ''}`}>
                                    <span>OUR STORY</span>
                                    <span>OUR STORY</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/dealership"} className={`${isHamActive ? 'active' : ''}`}>
                                    <span>DEALERSHIP</span>
                                    <span>DEALERSHIP</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/contact"} className={`${isHamActive ? 'active' : ''}`}>
                                    <span>CONTACT</span>
                                    <span>CONTACT</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/become-a-partner"} className={`${isHamActive ? 'active' : ''}`}>
                                    <span>BECOME A PARTNER</span>
                                    <span>BECOME A PARTNER</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/configure-a-bike"} className={`${isHamActive ? 'active' : ''}`}>
                                    <span>CONFIGURE A BIKE</span>
                                    <span>CONFIGURE A BIKE</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/my-account"} className={`${isHamActive ? 'active' : ''}`}>
                                    <span>MY ACCOUNT</span>
                                    <span>MY ACCOUNT</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/cart"} className={`${isHamActive ? 'active' : ''}`}>
                                    <span>CART</span>
                                    <span>CART</span>
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
                        <NavLink to={"/home"} className="img-container">
                            <img src={logo} alt="" />
                        </NavLink>
                        <div className='lang-ham-container'>
                            <div className="navigation">
                                <ul>
                                    <li>
                                        <NavLink to={"/our-story"}>
                                            <span>OUR STORY</span>
                                            <span>OUR STORY</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/dealership"}>
                                            <span>DEALERSHIP</span>
                                            <span>DEALERSHIP</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/contact"}>
                                            <span>CONTACT</span>
                                            <span>CONTACT</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/become-a-partner"}>
                                            <span>BECOME A PARTNER</span>
                                            <span>BECOME A PARTNER</span>
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/configure-a-bike"}>
                                            <span>CONFIGURE A BIKE</span>
                                            <span>CONFIGURE A BIKE</span>
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
                                <NavLink to={"/my-account"} className="account-icon">
                                    <i className="fa-solid fa-user"></i>
                                    <i className="fa-solid fa-user"></i>
                                </NavLink>
                                <NavLink to={"/cart"} className="cart-icon">
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
