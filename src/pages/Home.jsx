import React from 'react'
import noogat from '../images/SentiMental-Bikes-Noogat.webp'
import pralina from '../images/SentiMental-Bikes-Pralina-600x840.webp'
import team from '../images/Image-1-700x590.webp'
import background from '../images/Image-12-2-2048x1181.webp'
import background_dark from '../images/image-12-2-dark.jpg'
import logo from '../images/logo-small.svg';
import configure_icon from '../images/configure-btn-icon.svg';
import bike_1 from "../images/1.Noogat-SentiMental-Bikes.webp"
import bike_2 from "../images/2.Noogat-SentiMental-Bikes.webp"
import bike_3 from "../images/3.Pralina-SentiMental-Bikes-600x657.webp"
import bike_4 from "../images/4.Pralina-SentiMental-Bikes-600x657.webp"
import bike_5 from "../images/5.Noogat-SentiMental-Bikes.webp"
import bike_6 from "../images/6.Pralina-SentiMental-Bikes-600x657.webp"
import sideView from "../images/SideView-600x390.webp"
import speed from "../images/speed.svg"
import battery from "../images/battery-life.svg"
import motor from "../images/motor.svg"
import bike_bg from "../images/Image-11-2560x1476.webp"
import { useState } from 'react'
import accordionData from '../data/accordion'
import supabase from '../config/connect'
import { useEffect } from 'react'
import ExperienceSentimental from '../components/ExperienceSentimental'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { ModeContext } from '../context/ModeContext'

const Home = () => {
  const [activeButton, setActiveButton] = useState('noogat');
  const [bike, setBike] = useState("bike_1")
  const [openSections, setOpenSections] = useState({});
  const [news, setNews] = useState([])
  const [mode, setMode] = useContext(ModeContext)
  
  const toggleAccordion = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleClick = (btn) => {
    setActiveButton(btn)
  }

  const handleBike = (bike) => {
    setBike(bike)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await supabase.from('news').select();
    setNews(data)
  }

  const { t, i18n: { changeLanguage, language } } = useTranslation();

  return (
    <>
      <section id='home'>
        <section className={`hero-section ${mode==='dark'?'dark':''}`}>
          <div className="container">
            <div className="hero-container">
              <div className='hero-text'>
                <div><span data-aos="fade-up" data-aos-delay="0">{t(`home.header.1`)}</span></div>
                <div><span data-aos="fade-up" data-aos-delay="100">{t(`home.header.2`)}</span></div>
                <div><span data-aos="fade-up" data-aos-delay="200">{t(`home.header.3`)}</span></div>
              </div>
              <div style={{ overflow: "hidden" }} className="small-text-container">
                <div data-aos="fade-up" data-aos-delay="0" className='small-text'>
                  <i className="fa-solid fa-caret-right"></i>
                  <NavLink onClick={() => { window.scrollTo(0, 0) }} to={'/configure-a-bike'}>
                    <div className='span-container'>
                      <span>{t(`home.span-1`)}</span>
                      <span>{t(`home.span-1`)}</span>
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className={`img-container noogat ${activeButton === 'noogat' ? 'active' : ''}`}>
                <img src={noogat} alt="bike-noogat" />
              </div>
              <div className={`img-container pralina ${activeButton === 'pralina' ? 'active' : ''}`}>
                <img src={pralina} alt="bike-pralina" />
              </div>
              <div className="made-in-container">
                <span className='text-made-in'><span className='made-in'>{t(`home.span-2.1`)}</span> <span className='european'>{t(`home.span-2.2`)}</span></span>
              </div>
            </div>
          </div>
        </section>
        <section className={`btn-container ${mode==='dark'?'dark':''}`} id="btn-container">
          <div className="buttons">
            <div onClick={() => handleClick('noogat')} className={`noogat ${activeButton === 'noogat' ? 'active' : ''}`}><span>NOOGAT 2024</span></div>
            <div onClick={() => handleClick('pralina')} className={`pralina ${activeButton === 'pralina' ? 'active' : ''}`}><span>PRALINA 2024</span></div>
          </div>
          <div className='bottom-part-btn'></div>
        </section>
        <section id="features">
          <div className={`features-container ${mode==='dark'?'dark':''}`}>
            <div className='container'>
              <div>
                <div className="h1-container">
                  <h1 data-aos-delay="0" data-aos="fade-up">{t(`home.h1-1`)}</h1>
                </div>
                <div className="p-container">
                  <p data-aos-delay="50" data-aos="fade-up">{t(`home.p-1`)}</p>
                </div>
              </div>
              <div className='icon-container'>
                <div data-aos-delay="100" data-aos="fade-right" className='icon-card'>
                  <div className="icon">
                    <i className="fa-solid fa-gear"></i>
                  </div>
                  <h2>{t(`home.h2-1`)}</h2>
                  <p>{t(`home.p-2`)}</p>
                </div>

                <div data-aos-delay="200" data-aos="fade-right" className='icon-card'>
                  <div className="icon">
                    <i className="fa-regular fa-clock"></i>
                  </div>
                  <h2>{t(`home.h2-2`)}</h2>
                  <p>{t(`home.p-3`)}</p>
                </div>

                <div data-aos-delay="300" data-aos="fade-right" className='icon-card'>
                  <div className="icon">
                    <i className="fa-solid fa-money-bill"></i>
                  </div>
                  <h2>{t(`home.h2-3`)}</h2>
                  <p>{t(`home.p-4`)}</p>
                </div>
              </div>
              <div className='line'></div>
            </div>
          </div>
        </section>
        <section className={`story ${mode==='dark'?'dark':''}`} id="story">
          <div className="container">
            <div className='content-container'>
              <div className="h6-container">
                <h6 data-aos-delay="0" data-aos="fade-up">{t('header.ourStory')}</h6>
              </div>
              <h1>
                <div><span data-aos-delay="100" data-aos="fade-up">{t(`home.span-3.1`)}</span> <span data-aos-delay="200" data-aos="fade-up">{t(`home.span-3.2`)}</span></div>
                <div><span data-aos-delay="300" data-aos="fade-up">{t(`home.span-3.3`)}</span></div>
              </h1>
              <div className="p-container">
                <p data-aos-delay="350" data-aos="fade-up">{t(`home.p-5`)}</p>
              </div>
              <div style={{ overflow: "hidden" }}>
                <div data-aos-delay="400" data-aos="fade-up" className='read-full-story'>
                  <i className="fa-solid fa-caret-right"></i>
                  <NavLink onClick={() => { window.scrollTo(0, 0) }} to={'/our-story'}><span>{t(`home.span-4`)}</span></NavLink>
                </div>
              </div>
            </div>
            <div className="img-container">
              <img data-aos="zoom-out" src={team} alt="team" />
            </div>
          </div>
        </section>
        <section id="sentimental-background">
          <div className={`container ${mode==='dark'?'dark':''}`}>
            <h1>
              <div>
                <span data-aos-delay="0" data-aos="fade-up">{t(`home.span-5.1`)}</span>
              </div>
              <div>
                <span data-aos-delay="100" data-aos="fade-up">{t(`home.span-5.2`)}</span>
              </div>
            </h1>
          </div>
          <img src={mode==='dark'?background_dark:background} alt="background" />
        </section>
        <section className={`feeling-sentimental ${mode==='dark'?'dark':''}`} id='feeling-sentimental'>
          <div className="container">
            <div className="h1-container">
              <h1 data-aos-delay="0" data-aos="fade-up"><div>{t(`home.h1-2.1`)}</div> {t(`home.h1-2.2`)}</h1>
            </div>
            <div className="p-container">
              <p data-aos-delay="100" data-aos="fade-up">{t(`home.p-6`)}</p>
            </div>
            <div className="logo-container">
              <div data-aos-delay="200" data-aos="fade-up" className='logo-name'>
                <img src={logo} alt="logo" />
                <span>Dule</span>
              </div>
            </div>
          </div>
          <div className="box"></div>
        </section>
        <section id="bikes">
          <div className="container">
            <div className="text-content">
              <div>
                <div className="h6-container">
                  <h6 data-aos="fade-up">{t(`home.h6-1`)}</h6>
                </div>
                <h1>
                  <div>
                    <span data-aos="fade-up">
                      {t(`home.span-6.1`)}
                    </span>
                  </div>
                  <div>
                    <span data-aos-delay="100" data-aos="fade-up">
                      {t(`home.span-6.2`)}
                    </span>
                  </div>
                </h1>
              </div>
              <div className='p-container' style={{ overflow: "hidden" }}>
                <p data-aos-delay="200" data-aos="fade-up">{t(`home.p-7`)}</p>
              </div>
            </div>
            <div className="mobile-content">
              <div className="img-container">
                <img className={`${bike === "bike_1" ? "active" : ""}`} src={bike_1} alt="bike-1" />
                <img className={`${bike === "bike_2" ? "active" : ""}`} src={bike_2} alt="bike-2" />
                <img className={`${bike === "bike_3" ? "active" : ""}`} src={bike_3} alt="bike-3" />
                <img className={`${bike === "bike_4" ? "active" : ""}`} src={bike_4} alt="bike-4" />
                <img className={`${bike === "bike_5" ? "active" : ""}`} src={bike_5} alt="bike-5" />
                <img className={`${bike === "bike_6" ? "active" : ""}`} src={bike_6} alt="bike-6" />
              </div>
              <div className="color-container">
                <div onClick={() => handleBike("bike_1")} className={`dot ${bike === "bike_1" ? "active" : ""}`}>
                  <div className="dot-decoration"></div>
                </div>
                <div onClick={() => handleBike("bike_2")} className={`dot ${bike === "bike_2" ? "active" : ""}`}>
                  <div className="dot-decoration"></div>
                </div>
                <div onClick={() => handleBike("bike_3")} className={`dot ${bike === "bike_3" ? "active" : ""}`}>
                  <div className="dot-decoration"></div>
                </div>
                <div onClick={() => handleBike("bike_4")} className={`dot ${bike === "bike_4" ? "active" : ""}`}>
                  <div className="dot-decoration"></div>
                </div>
                <div onClick={() => handleBike("bike_5")} className={`dot ${bike === "bike_5" ? "active" : ""}`}>
                  <div className="dot-decoration"></div>
                </div>
                <div onClick={() => handleBike("bike_6")} className={`dot ${bike === "bike_6" ? "active" : ""}`}>
                  <div className="dot-decoration"></div>
                </div>
              </div>
              <div className="configure-button">
                <NavLink onClick={() => { window.scrollTo(0, 0) }} to={'/configure-a-bike'} className="secondary-btn" data-text="Configure a bike">
                  <img src={configure_icon} alt="Logo Btn Icon" />
                  <span>{t('header.configureBike')}</span>
                </NavLink>
              </div>
            </div>
            <div className="desktop-content">
              <div className="sticky-container">
                <div className="img-container">
                  <img className={`${bike === "bike_1" ? "active" : ""}`} src={bike_1} alt="bike-1" />
                  <img className={`${bike === "bike_2" ? "active" : ""}`} src={bike_2} alt="bike-2" />
                  <img className={`${bike === "bike_3" ? "active" : ""}`} src={bike_3} alt="bike-3" />
                  <img className={`${bike === "bike_4" ? "active" : ""}`} src={bike_4} alt="bike-4" />
                  <img className={`${bike === "bike_5" ? "active" : ""}`} src={bike_5} alt="bike-5" />
                  <img className={`${bike === "bike_6" ? "active" : ""}`} src={bike_6} alt="bike-6" />
                </div>
                <div className="configure-button">
                  <NavLink onClick={() => { window.scrollTo(0, 0) }} to={'/configure-a-bike'} className="secondary-btn" data-text="Configure a bike">
                    <img src={configure_icon} alt="Logo Btn Icon" />
                    <span>{t('header.configureBike')}</span>
                  </NavLink>
                </div>
                <div className="color-container">
                  <div onClick={() => handleBike("bike_1")} className={`dot ${bike === "bike_1" ? "active" : ""}`}>
                    <div className="dot-decoration"></div>
                  </div>
                  <div onClick={() => handleBike("bike_2")} className={`dot ${bike === "bike_2" ? "active" : ""}`}>
                    <div className="dot-decoration"></div>
                  </div>
                  <div onClick={() => handleBike("bike_3")} className={`dot ${bike === "bike_3" ? "active" : ""}`}>
                    <div className="dot-decoration"></div>
                  </div>
                  <div onClick={() => handleBike("bike_4")} className={`dot ${bike === "bike_4" ? "active" : ""}`}>
                    <div className="dot-decoration"></div>
                  </div>
                  <div onClick={() => handleBike("bike_5")} className={`dot ${bike === "bike_5" ? "active" : ""}`}>
                    <div className="dot-decoration"></div>
                  </div>
                  <div onClick={() => handleBike("bike_6")} className={`dot ${bike === "bike_6" ? "active" : ""}`}>
                    <div className="dot-decoration"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box"></div>
        </section>
        <section id='information'>
          <div className={`information ${mode==='dark'?'dark':''}`}>
            <div className="container">
              <div className='text-img-container'>
                <div className="text-container">
                  <div className="h6-container">
                    <h6 data-aos="fade-up">{t(`home.h6-2`)}</h6>
                  </div>
                  <div className="h1-container">
                    <h1 data-aos-delay="200" data-aos="fade-up">{t(`home.h1-3`)}</h1>
                  </div>
                  <div className="p-container">
                    <p data-aos-delay="300" data-aos="fade-up">{t(`home.p-8`)}</p>
                  </div>
                </div>
                <div className="img-container">
                  <img src={sideView} alt="sideView" />
                </div>
              </div>
              <div className="card-container">
                <div data-aos-delay="400" data-aos="fade-right" className='card'>
                  <div className="svg-container">
                    <img src={speed} alt="speed" />
                  </div>
                  <h3>{t(`home.speed`)}</h3>
                  <h6>{t(`home.h6-3`)}</h6>
                  <p>{t(`home.p-9`)}</p>
                </div>
                <div data-aos-delay="500" data-aos="fade-right" className='card'>
                  <div className="svg-container">
                    <img src={battery} alt="battery" />
                  </div>
                  <h3>{t(`home.batteryLife`)}</h3>
                  <h6>{t(`home.h6-4`)}</h6>
                  <p>{t(`home.p-10`)}</p>
                </div>
                <div data-aos-delay="600" data-aos="fade-right" className='card'>
                  <div className="svg-container">
                    <img src={motor} alt="motor" />
                  </div>
                  <h3>{t(`home.motor`)}</h3>
                  <h6>{t(`home.h6-5`)}</h6>
                  <p>{t(`home.p-11`)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={`bg ${mode==="dark"?'dark':''}`}>
            <div className="light-green"></div>
          </div>
        </section>
        <section className={`accordion-info ${mode==="dark"?'dark':''}`} id='accordion-info'>
          <div className="container">
            <div className="h6-container">
              <h6 data-aos="fade-up">{t(`home.h6-6`)}</h6>
            </div>
            <div className="accordion-container">
              {accordionData.map((item, index) => (
                <div data-aos-delay={`${index * 100}`} data-aos="fade-up" className="accordion" key={index}>
                  <div
                    onClick={() => toggleAccordion(item.en_title)}
                    className={`accordion-header ${openSections[item.en_title] ? 'active' : ''}`}
                  >
                    <h1>{language === "en" ? item.en_title : item.az_title}</h1>
                    <div className="angle-down">
                      <i className="fa-solid fa-angle-down"></i>
                    </div>
                  </div>
                  <div className={`accordion-body ${openSections[item.en_title] ? 'active' : ''}`}>
                    <ul>
                      {language === "en"
                        ?
                        item.en_content.map((contentItem, i) => (
                          <li key={i}>{contentItem}</li>
                        ))
                        :
                        item.az_content.map((contentItem, i) => (
                          <li key={i}>{contentItem}</li>
                        ))
                      }
                    </ul>
                  </div>

                </div>
              ))}
            </div>
          </div>
          <div className="box"></div>
        </section>
        <section className={`image-section ${mode==="dark"?'dark':''}`} id='image-section'>
          <div className="img-container">
            <img data-aos="zoom-out" src={bike_bg} alt="bike_bg" />
          </div>
          <div className="text-container">
            <h6 data-aos="fade-up">{t(`home.h6-7`)}</h6>
          </div>
          <div className="box-container-green">
            <div className="box-container-light-brown"></div>
          </div>
        </section>
        <ExperienceSentimental />
        <section className={`sentimental-news ${mode==='dark'?'dark':''}`} id='sentimental-news'>
          <div className="container">
            <div className="h1-container">
              <h1 data-aos="fade-up" className='hero-h1'>{t(`home.h1-4`)}</h1>
            </div>
            <div style={{ overflow: "hidden" }}>
              {news.map(item => (
                <div data-aos-delay={`${(item.id - 1) * 100}`} data-aos="fade-up" key={item.id} className="card-container">
                  <div className='first-container'>
                    <span className='desktop-news'>{t(`home.news`)}</span>
                    <div className="img-container">
                      <img src={`/src/images/${item.img}`} alt="news" />
                    </div>
                    <span className='mobile-news'>{t(`home.news`)}</span>
                  </div>
                  <div className="second-container">
                    <h1>{item.title}</h1>
                    <div className="date-author">
                      <i className="fa-regular fa-calendar"></i>
                      <div className="date">
                        <span>{item.date}</span>
                      </div>
                      <span className='seperator'>|</span>
                      <div className="author">
                        <span>{item.author}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>


    </>
  )
}

export default Home