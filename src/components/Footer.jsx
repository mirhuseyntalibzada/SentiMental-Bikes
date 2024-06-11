import React from 'react'
import marquee_bike_1 from '../images/marquee-bike-1.webp'
import marquee_bike_2 from '../images/marquee-bike-2.webp'
import marquee_bike_3 from '../images/marquee-bike-3.webp'
import Marquee from "react-fast-marquee";
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
        </footer>

    )
}

export default Footer