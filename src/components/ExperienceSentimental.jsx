import React from 'react'
import zagreb from "../images/zagreb-design-week-sentimental-bikes-1.webp"

const ExperienceSentimental = () => {
    return (
        <>
            <section id='experience'>
                <div className='container'>
                    <div className="text-container">
                        <h1><div><span data-aos="fade-up">Experience</span></div>
                            <div><span data-aos-delay="100" data-aos="fade-up">SentiMental</span></div></h1>
                        <div className="p-container">
                            <p data-aos="fade-up" data-aos-delay="200">Visit us to get a hands-on experience. Feel the craftsmanship,
                                understand our passion, and most importantly, try our
                                SentiMental bikes for yourself.</p>
                        </div>
                    </div>
                    <div className="card-container">
                        <div className="img-container">
                            <img data-aos="zoom-out" src={zagreb} alt="" />
                        </div>
                        <div className="content-container">
                            <div className="header-container">
                                <div className='date'>
                                    <span>Sep</span>
                                    <h3>26</h3>
                                </div>
                                <div className='header'>
                                    <h1>Zagreb</h1>
                                    <p>10. Zagreb Design Week</p>
                                </div>
                            </div>
                            <div className="body-container">
                                <p>We are excited to announce that SentiMental Bikes will be a part of the
                                    10th Zagreb Design Week! Not only are we exhibiting, but we are also proud partners
                                    of the event. Our bikes will be used by the Design Week crew, and all visitors
                                    will have the opportunity to try them out during the event. We thank everyone
                                    who has been with us on this journey. See you at the Zagreb Fair from September
                                    26th to October 1st!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section></>
    )
}

export default ExperienceSentimental