import { React, useEffect } from 'react';
import img from '../images/Image-13-2560x1172.webp'
import img1 from '../images/contact-us-cta-pralina-bike-image-600x657.webp'
import icon from '../images/connection-btn-icon.svg'
import AOS from 'aos';
import 'aos/dist/aos.css';
const BecomePartnerComp = ({ style }) => {

    useEffect(() => {
        AOS.init({
            duration: 700,
            once: true,
            offset: 200,
            easing: 'ease-out'
        })
    }, [])

    return (
        <section style={{ backgroundColor: style.backgroundColor }} id='become-a-partner-component'>
            <div className="img-container">
                <img src={img} alt="" />
                <div className="box-container"></div>
            </div>
            <div className="become-a-partner">
                <div className="container">
                    <div>
                        <h1>Become a partner</h1>
                    </div>
                    <div className="img-container-desktop">
                        <img src={img1} alt="" />
                    </div>
                    <div>
                        <p>As a partner, you'll get to spread our spirit, enjoy unique perks,
                            and help us redefine what it means to ride for "SentiMental reasons".</p>
                        <button>
                            <img src={icon} alt="" />
                            BECOME A PARTNER
                        </button>
                    </div>
                    <div className="img-container-mobile">
                        <img src={img1} alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BecomePartnerComp