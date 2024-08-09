import React from 'react'
import img1 from '../images/Image-7-scaled-600x346.webp'
import img2 from '../images/Image-3-700x590.webp'
import img3 from '../images/Image-12-scaled-600x400.webp'
import logo from '../images/logo-small.svg';
import SentiMentalNews from '../components/SentiMentalNews';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { ModeContext } from '../context/ModeContext';

const OurStory = () => {

  const { t, i18n: { changeLanguage, language } } = useTranslation();
  const [mode, setMode] = useContext(ModeContext)
  return (
    <>
      <section className={`who-are-we ${mode === 'dark' ? 'dark' : ''}`} id='who-are-we'>
        <div className='our-story-container'>
          <div className="container">
            <div className="text-container">
              <h1>
                <div><span data-aos="fade-up">{t(`ourStory.span-1.1`)}</span></div>
                <div><span data-aos-delay="100" data-aos="fade-up">{t(`ourStory.span-1.2`)}</span></div>
              </h1>
              <p>
                <div><span data-aos="fade-up">{t(`ourStory.span-2.1`)}</span></div>
                <div><span data-aos-delay="100" data-aos="fade-up">{t(`ourStory.span-2.2`)}</span></div>
              </p>
            </div>
          </div>
          <div className='img-text-container'>
            <div className="img-container">
              <img src={img1} alt="_" />
            </div>
            <div className="text-container">
              <div className="text-content">
                <div className='p-container'>
                  <p data-aos="fade-up">
                   {t(`ourStory.p-1.1`)}
                  </p>
                </div>
                <div className='p-container'>
                  <p data-aos-delay="100" data-aos="fade-up">
                  {t(`ourStory.p-1.2`)}
                  </p>
                </div>
                <div className='p-container'>
                  <p data-aos-delay="200" data-aos="fade-up">
                  {t(`ourStory.p-1.3`)}
                  </p>
                </div>
                <div className='p-container'>
                  <p data-aos-delay="300" data-aos="fade-up">
                  {t(`ourStory.p-1.4`)}
                  </p>
                </div>
                <div className='p-container'>
                  <p data-aos-delay="400" data-aos="fade-up">
                  {t(`ourStory.p-1.5`)}
                  </p>
                </div>
                <div className='p-container'>
                  <p data-aos-delay="500" data-aos="fade-up">
                  {t(`ourStory.p-1.6`)}
                  </p>
                </div>
                <div className="comma-container">
                  <span>"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`our-story ${mode === 'dark' ? 'dark' : ''}`} id="our-story">
        <div className="container">
          <div className="text-img-content">
            <div className="text-container">
              <h5>
                <div className="mobile">
                  <div><span data-aos="fade-up">{t(`ourStory.span-3.1`)}</span></div>
                  <div><span data-aos-delay="100" data-aos="fade-up">{t(`ourStory.span-3.2`)}</span></div>
                </div>
                <div className="desktop">
                  <div><span data-aos="fade-up">{t(`ourStory.span-4.1`)}</span></div>
                  <div><span data-aos-delay="100" data-aos="fade-up">{t(`ourStory.span-4.2`)}</span></div>
                  <div><span data-aos-delay="200" data-aos="fade-up">{t(`ourStory.span-4.3`)}</span></div>
                  <div><span data-aos-delay="300" data-aos="fade-up">{t(`ourStory.span-4.4`)}</span></div>
                </div>
              </h5>
              <p>
                <span data-aos="fade-up">{t(`ourStory.p-2.1`)}</span>

                <span data-aos="fade-up">{t(`ourStory.p-2.2`)}</span>

                <span data-aos="fade-up">{t(`ourStory.p-2.3`)}</span>
              </p>
            </div>
            <div className="img-container">
              <img data-aos="zoom-out" src={img2} alt="" />
            </div>
          </div>
          <div className="result">
            <div className="result-container">
              <h1>
                <div className="mobile">
                  <div><span data-aos="fade-up">{t(`ourStory.span-5.1`)}</span></div>
                  <div><span data-aos-delay="100" data-aos="fade-up">{t(`ourStory.span-5.2`)}</span></div>
                  <div><span data-aos-delay="200" data-aos="fade-up">{t(`ourStory.span-5.3`)}</span></div>
                  <div><span data-aos-delay="300" data-aos="fade-up">{t(`ourStory.span-5.4`)}</span></div>
                  <div><span data-aos-delay="400" data-aos="fade-up">{t(`ourStory.span-5.5`)}</span></div>
                  <div><span data-aos-delay="500" data-aos="fade-up">{t(`ourStory.span-5.6`)}</span></div>
                </div>
                <div className="desktop">
                  <div><span data-aos="fade-up">{t(`ourStory.span-6.1`)}</span></div>
                  <div><span data-aos-delay="100" data-aos="fade-up">{t(`ourStory.span-6.2`)}</span></div>
                  <div><span data-aos-delay="200" data-aos="fade-up">{t(`ourStory.span-6.3`)}</span></div>
                </div>
              </h1>
              <p>
                <span data-aos-delay="300" data-aos="fade-up">{t(`ourStory.span-7`)}</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className={`box-container ${mode === 'dark' ? 'dark' : ''}`}>
        <div className='white-box'></div>
        <div className='green-box'></div>
      </div>
      <SentiMentalNews />
      <section className={`feeling-sentimental-story ${mode === 'dark' ? 'dark' : ''}`} id='feeling-sentimental-story'>
        <div className="container">
          <h1>
            <div className="mobile">
              <div><span data-aos="fade-up">{t(`ourStory.h1-1.1`)}</span></div>
              <div><span data-aos-delay="100" data-aos="fade-up">{t(`ourStory.h1-1.2`)}</span></div>
            </div>
            <div className="desktop">
              <div><span data-aos="fade-up">{t(`ourStory.h1-1.3`)}</span></div>
            </div>
          </h1>
          <div className="p-container">
            <p data-aos-delay="100" data-aos="fade-up">{t(`ourStory.p-3`)}</p>
          </div>
          <div className="logo-container">
            <div data-aos-delay="200" data-aos="fade-up" className='logo-name'>
              <img src={logo} alt="" />
              <div>
                <span>Dule</span>
                <span>{t(`ourStory.span-8`)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={`ride-the-wave ${mode === 'dark' ? 'dark' : ''}`} id='ride-the-wave'>
        <div className="container">
          <div className="text-container">
            <h1>
              <div className="mobile">
                <div>
                  <span data-aos-delay="0" data-aos="fade-up">{t(`ourStory.h1-2.1`)}</span>
                </div>
                <div>
                  <span data-aos-delay="100" data-aos="fade-up">{t(`ourStory.h1-2.2`)}</span>
                </div>
                <div>
                  <span data-aos-delay="200" data-aos="fade-up">{t(`ourStory.h1-2.3`)}</span>
                </div>
              </div>
              <div className="desktop">
                <div>
                  <span data-aos-delay="0" data-aos="fade-up">{t(`ourStory.h1-2.4`)}</span>
                </div>
                <div>
                  <span data-aos-delay="100" data-aos="fade-up">{t(`ourStory.h1-2.5`)}</span>
                </div>
              </div>
            </h1>
          </div>
        </div>
        <div className="img-container">
          <img src={img3} alt="" />
        </div>
      </section>
    </>
  )
}

export default OurStory