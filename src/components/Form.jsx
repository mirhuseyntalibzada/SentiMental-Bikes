import React from 'react'
import { useContext } from 'react'
import { ModeContext } from '../context/ModeContext'
import { useTranslation } from 'react-i18next'

const Form = ({ data }) => {
    const [mode] = useContext(ModeContext)
    const { t, i18n: { changeLanguage, language } } = useTranslation();
    return (
        <section className={`form-section ${mode}`} id='form-section'>
            <div className="container">
                <div className='hero-container'>
                    <h1>{language==="en"?data.h1:data.h1_az}</h1>
                    <p>{language==="en"?data.p:data.p_az}</p>
                </div>
                <div className="form-text-container">
                    <form action="">
                        <label className='input-label' htmlFor="">{t(`form.label-1`)}<span>*</span></label>
                        <div className='text-input'>
                            <input type="text" />
                        </div>
                        <label className='input-label' htmlFor="">{t(`form.label-2`)}<span>*</span></label>
                        <div className='text-input'>
                            <input type="text" />
                        </div>
                        <label className='input-label' htmlFor="">{t(`form.label-3`)}</label>
                        <div className='text-input'>
                            <input type="text" />
                        </div>
                        <label className='input-label' htmlFor="">{t(`form.label-4`)}<span>*</span></label>
                        <div className='text-input'>
                            <input type="text" />
                        </div>
                        <label className='input-label' htmlFor="">{t(`form.label-5`)} <span>*</span></label>
                        <div>
                            <textarea></textarea>
                        </div>
                        <label className='input-label' htmlFor="">{t(`form.label-6`)} <span>*</span></label>
                        <div className='agreement'>
                            <input type="checkbox" />
                            <label htmlFor="">{t(`form.label-7.1`)} <a href="#">{t(`form.label-7.2`)}</a></label>
                        </div>
                        <div className='btn-submit'>
                            <button type='submit'>{t(`form.button`)}</button>
                        </div>
                    </form>
                    <div className="text-icon-container">
                        <div className='text-content'>
                            <h1>{t(`form.h1`)}</h1>
                            <div className='text-container'>
                                <p>
                                    <strong>Duško (Dule) Ilijević</strong>
                                    {t(`form.p-1`)}
                                </p>
                                <a href="#">dule@sentimental.bike</a>
                                <p>+385 (0) 91 521 7582</p>
                                <p>weChat: SentiMentalBikes</p>
                            </div>
                            <div className='text-container'>
                                <p>
                                    <strong>Ivan Ignatovski, dipl.ing.</strong>
                                    {t(`form.p-2`)}
                                </p>
                                <a href="#">ivan@sentimental.bike</a>
                                <p>+385 (0) 98 9436 730</p>
                                <p>WeChat: Ivan Ignatovski</p>
                            </div>
                        </div>
                        <div className="icon-content">
                            <h2>{t(`form.h2`)}</h2>
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