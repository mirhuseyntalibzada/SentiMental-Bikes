import React from 'react'
import marquee_bike_1 from '../images/marquee-bike-1.webp'
import marquee_bike_2 from '../images/marquee-bike-2.webp'
import marquee_bike_3 from '../images/marquee-bike-3.webp'
import Marquee from "react-fast-marquee";
import payments from '../data/payments';
import configure_icon from '../images/configure-btn-icon.svg';
const Footer = () => {
    return (
        <footer>
            <div className="footer-marquee">
                <Marquee speed={125}>
                    <div className="footer-marquee-track-inner">
                        <div className="footer-marquee-track-piece">
                            <div className="title-xl">SentiMental Bikes</div>
                            <div className="track-image">
                                <img src={marquee_bike_1} />
                            </div>
                            <div className="track-divider" />
                        </div>
                        <div className="footer-marquee-track-piece">
                            <div className="title-xl">SentiMental Bikes</div>
                            <div className="track-image">
                                <img src={marquee_bike_2} />
                            </div>
                            <div className="track-divider" />
                        </div>
                        <div className="footer-marquee-track-piece">
                            <div className="title-xl">SentiMental Bikes</div>
                            <div className="track-image">
                                <img src={marquee_bike_3} />
                            </div>
                            <div className="track-divider" /></div>
                        <div className="footer-marquee-track-piece">
                            <div className="title-xl">SentiMental Bikes</div>
                            <div className="track-image">
                                <img src={marquee_bike_2} />
                            </div>
                            <div className="track-divider" /></div>
                    </div>
                </Marquee>
            </div>
            <div className="container">
                <h3>Keep The Vibes Rolling!</h3>
                <p>Stay up-to-date with all things SentiMental.
                    Subscribe to our newsletter and make sure never
                    miss a beat in the e-bike world. After all, #itsrideoclock somewhere!</p>
                <form className="email">
                    <input placeholder='name@gmail.com' type="text" />
                    <button>SUBSCRIBE</button>
                </form>
                <div className="links">
                    <div className="nav">
                        <a href="!#">Our Story</a>
                        <a href="!#">Become a partner</a>
                        <a href="!#">Contact</a>
                    </div>
                    <div className="other-links">
                        <a href="!#">Privacy policy</a>
                        <a href="!#">Terms and Conditions</a>
                        <a href="!#">User Privacy Notice</a>
                        <a href="!#">Monri WSPay Usage Statement</a>
                        <a href="!#">Statement of conversion</a>
                    </div>
                </div>
                <div className="social-media">
                    <h5>Follow us on social media</h5>
                    <div className="icons">
                        <div classname="icon"><i className="fa-brands fa-facebook-f" /></div>
                        <div classname="icon"><i className="fa-brands fa-instagram" /></div>
                        <div classname="icon"><i className="fa-brands fa-tiktok" /></div>
                        <div classname="icon"><i className="fa-brands fa-linkedin" /></div>
                    </div>
                </div>
                <div className="payments">
                    <h5>Secure Payment</h5>
                    <div className="payment-img">
                        {payments.map(item => (
                            <div className="img-container">
                                <img src={`src/images/${item.image}`} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="configure-button">
                    <a href="#" className="secondary-btn" data-text="Configure a bike">
                        <img src={configure_icon} alt="Logo Btn Icon" />
                        <span>CONFIGURE A BIKE</span>
                    </a>
                </div>
                <div className="text-container">
                    <p>© SentiMental Bikes 2024. All rights reserved.
                        POD d.o.o., Dežanovac 234, 43500 Daruvar, Republic of Croatia, VAT NUMBER: HR03398907795
                        Entered in the court register of the Bjelovar Commercial Court under company registration number 010008500 with the share capital of EUR 793.820,00 EUR, paid in full.
                        Bank account: Hrvatska poštanska banka d.d., Jurišićeva ulica 4, 10000 Zagreb, Hrvatska. IBAN: HR2125030071111002039, SWIFT: HPBZGHR2X</p>
                </div>
            </div>
        </footer>

    )
}

export default Footer