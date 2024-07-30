import { React, useEffect } from 'react';
import img from '../images/Image-13-2560x1172.webp'
import img1 from '../images/contact-us-cta-pralina-bike-image-600x657.webp'
import icon from '../images/connection-btn-icon.svg'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ModeContext } from '../context/ModeContext';
const BecomePartnerComp = ({ style, data: { h1, p, button, path } }) => {

    const [mode] = useContext(ModeContext)

    useEffect(() => {
        AOS.init({
            duration: 700,
            once: true,
            offset: 200,
            easing: 'ease-out'
        })
    }, [])

    return (
        <section className={`become-a-partner-component ${mode==='dark'?'dark':''}`} style={{ backgroundColor: style.backgroundColor }} id='become-a-partner-component'>
            <div className="img-container">
                <img src={img} alt="" />
                <div className="box-container"></div>
            </div>
            <div className="become-a-partner">
                <div className="container">
                    <div>
                        <h1>{h1}</h1>
                    </div>
                    <div className="img-container-desktop">
                        <img src={img1} alt="" />
                    </div>
                    <div>
                        <p>{p}</p>
                        <NavLink onClick={() => { window.scrollTo(0, 0) }} to={path}>
                            <button>
                                <img src={icon} alt="" />
                                {button}
                            </button>
                        </NavLink>
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