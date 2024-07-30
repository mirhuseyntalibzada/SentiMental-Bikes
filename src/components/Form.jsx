import React from 'react'
import { useContext } from 'react'
import { ModeContext } from '../context/ModeContext'

const Form = ({ data }) => {
    const [mode] = useContext(ModeContext)
    return (
        <section className={`form-section ${mode}`} id='form-section'>
            <div className="container">
                <div className='hero-container'>
                    <h1>{data.h1}</h1>
                    <p>{data.p}</p>
                </div>
                <div className="form-text-container">
                    <form action="">
                        <label className='input-label' htmlFor="">NAME<span>*</span></label>
                        <div className='text-input'>
                            <input type="text" />
                        </div>
                        <label className='input-label' htmlFor="">E-MAIL<span>*</span></label>
                        <div className='text-input'>
                            <input type="text" />
                        </div>
                        <label className='input-label' htmlFor="">PHONE</label>
                        <div className='text-input'>
                            <input type="text" />
                        </div>
                        <label className='input-label' htmlFor="">SUBJECT<span>*</span></label>
                        <div className='text-input'>
                            <input type="text" />
                        </div>
                        <label className='input-label' htmlFor="">MESSAGE <span>*</span></label>
                        <div>
                            <textarea></textarea>
                        </div>
                        <label className='input-label' htmlFor="">CONSENT <span>*</span></label>
                        <div className='agreement'>
                            <input type="checkbox" />
                            <label htmlFor="">I agree that SentiMental Bikes can
                                contact me at the above-mentioned email address or
                                phone number for all purposes highlighted in
                                the <a href="#">privacy policy.</a></label>
                        </div>
                        <div className='btn-submit'>
                            <button type='submit'>SUBMIT</button>
                        </div>
                    </form>
                    <div className="text-icon-container">
                        <div className='text-content'>
                            <h1>SentiMental Bikes</h1>
                            <div className='text-container'>
                                <p>
                                    <strong>Duško (Dule) Ilijević</strong>
                                    Founder, Creative Director
                                </p>
                                <a href="#">dule@sentimental.bike</a>
                                <p>+385 (0) 91 521 7582</p>
                                <p>weChat: SentiMentalBikes</p>
                            </div>
                            <div className='text-container'>
                                <p>
                                    <strong>Ivan Ignatovski, dipl.ing.</strong>
                                    Founder, CEO
                                </p>
                                <a href="#">ivan@sentimental.bike</a>
                                <p>+385 (0) 98 9436 730</p>
                                <p>WeChat: Ivan Ignatovski</p>
                            </div>
                        </div>
                        <div className="icon-content">
                            <h2>Social Media</h2>
                            <div className="icon-container">
                                <div className='icon'>
                                    <i className="fa-brands fa-facebook-f"></i>
                                </div>
                                <div className='icon'>
                                    <i className="fa-brands fa-instagram"></i>
                                </div>
                                <div className='icon'>
                                    <i className="fa-brands fa-tiktok"></i>
                                </div>
                                <div className='icon'>
                                    <i className="fa-brands fa-linkedin-in"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Form