import { React, useEffect } from 'react';
import img from '../images/Image-13-2560x1172.webp'
import img1 from '../images/contact-us-cta-pralina-bike-image-600x657.webp'
import icon from '../images/connection-btn-icon.svg'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ModeContext } from '../context/ModeContext';
import { useTranslation } from 'react-i18next';
const BecomePartnerComp = ({ style, data: { h1, h1_az, p, p_az, button, button_az, path } }) => {

    const [mode] = useContext(ModeContext)

    useEffect(() => {
        AOS.init({
            duration: 700,
            once: true,
            offset: 200,
            easing: 'ease-out'
        })
    }, [])

    const { t, i18n: { changeLanguage, language } } = useTranslation();

    return (
        <section className={`become-a-partner-component ${mode === 'dark' ? 'dark' : ''}`} style={{ backgroundColor: style.backgroundColor }} id='become-a-partner-component'>
            <div className="img-container">
                <img src={img} alt="" />
                <div className="box-container"></div>
            </div>
            <div className="become-a-partner">
                <div className="container">
                    <div>
                        <h1>{language==='en'?h1:h1_az}</h1>
                    </div>
                    <div className="img-container-desktop">
                        <img src={img1} alt="" />
                    </div>
                    <div>
                        <p>{language==='en'?p:p_az}</p>
                        <NavLink onClick={() => { window.scrollTo(0, 0) }} to={path}>
                            <button>
                                <img src={icon} alt="" />
                                {language==='en'?button:button_az}
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