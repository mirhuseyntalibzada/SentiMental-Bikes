import React from 'react'
import noogat from '../images/SentiMental-Bikes-Noogat.webp'
import pralina from '../images/SentiMental-Bikes-Pralina-600x840.webp'
import team from '../images/Image-1-700x590.webp'
import background from '../images/Image-12-2-2048x1181.webp'
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

const Home = () => {

  const [activeButton, setActiveButton] = useState('noogat');
  const [bike, setBike] = useState("bike_1")
  const [openSections, setOpenSections] = useState({});
  const [news, setNews] = useState([])

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

  return (
    <>
      <section id='home'>
        <section className='hero-section'>
          <div className="container">
            <div className="hero-container">
              <div className='hero-text'>
                <div><span data-aos="fade-up" data-aos-delay="0">Fresh Wheels in Town.</span></div>
                <div><span data-aos="fade-up" data-aos-delay="100">Good looking.</span></div>
                <div><span data-aos="fade-up" data-aos-delay="200">Thrill-seeking.</span></div>
              </div>
              <div style={{ overflow: "hidden" }} className="small-text-container">
                <div data-aos="fade-up" data-aos-delay="0" className='small-text'>
                  <i className="fa-solid fa-caret-right"></i>
                  <div className='span-container'>
                    <span>Discover the SentiMental Bikes lineup</span>
                    <span>Discover the SentiMental Bikes lineup</span>
                  </div>
                </div>
              </div>
              <div className={`img-container noogat ${activeButton === 'noogat' ? 'active' : ''}`}>
                <img src={noogat} alt="" />
              </div>
              <div className={`img-container pralina ${activeButton === 'pralina' ? 'active' : ''}`}>
                <img src={pralina} alt="" />
              </div>
              <div className="made-in-container">
                <span className='text-made-in'><span className='made-in'>Made-in</span> <span className='european'>EUROPEAN UNION</span></span>
              </div>
            </div>
          </div>
        </section>
        <section id="btn-container">
          <div className="buttons">
            <div onClick={() => handleClick('noogat')} className={`noogat ${activeButton === 'noogat' ? 'active' : ''}`}><span>NOOGAT 2024</span></div>
            <div onClick={() => handleClick('pralina')} className={`pralina ${activeButton === 'pralina' ? 'active' : ''}`}><span>PRALINA 2024</span></div>
          </div>
          <div className='bottom-part-btn'></div>
        </section>
        <section id="features">
          <div className="features-container">
            <div className='container'>
              <div>
                <div className="h1-container">
                  <h1 data-aos-delay="0" data-aos="fade-up">Key Features</h1>
                </div>
                <div className="p-container">
                  <p data-aos-delay="50" data-aos="fade-up">Packed with awesomeness!</p>
                </div>
              </div>
              <div className='icon-container'>
                <div data-aos-delay="100" data-aos="fade-right" className='icon-card'>
                  <div className="icon">
                    <i className="fa-solid fa-gear"></i>
                  </div>
                  <h2>Heart crafted</h2>
                  <p>Your inner vintage connoisseur will love our handcrafted e-bikes</p>
                </div>

                <div data-aos-delay="200" data-aos="fade-right" className='icon-card'>
                  <div className="icon">
                    <i className="fa-regular fa-clock"></i>
                  </div>
                  <h2>Iconic performance</h2>
                  <p>Unparalleled power and efficiency with a touch of nostalgic flair</p>
                </div>

                <div data-aos-delay="300" data-aos="fade-right" className='icon-card'>
                  <div className="icon">
                    <i className="fa-solid fa-money-bill"></i>
                  </div>
                  <h2>Worth it</h2>
                  <p>Exceptional e-bikes without breaking the bank</p>
                </div>
              </div>
              <div className='line'></div>
            </div>
          </div>
        </section>
        <section id="story">
          <div className="container">
            <div className='content-container'>
              <div className="h6-container">
                <h6 data-aos-delay="0" data-aos="fade-up">OUR STORY</h6>
              </div>
              <h1>
                <div><span data-aos-delay="100" data-aos="fade-up">We're</span> <span data-aos-delay="200" data-aos="fade-up">Sentimental.</span></div>
                <div><span data-aos-delay="300" data-aos="fade-up">And so are you.</span></div>
              </h1>
              <div className="p-container">
                <p data-aos-delay="350" data-aos="fade-up">Born from the spirit of expression and artistry,
                  SentiMental bikes are well thought-out and meticulously
                  crafted artisan bikes. Inspired by the most recognizable
                  old-school bikes, SentiMental models will put you in the spotlight.
                  And make your every single day – epic.</p>
              </div>
              <div style={{ overflow: "hidden" }}>
                <div data-aos-delay="400" data-aos="fade-up" className='read-full-story'>
                  <i className="fa-solid fa-caret-right"></i>
                  <span>Read the full story</span>
                </div>
              </div>
            </div>
            <div className="img-container">
              <img data-aos="zoom-out" src={team} alt="" />
            </div>
          </div>
        </section>
        <section id="sentimental-background">
          <div className="container">
            <h1>
              <div>
                <span data-aos-delay="0" data-aos="fade-up">Go ahead. Ride the wave.</span>
              </div>
              <div>
                <span data-aos-delay="100" data-aos="fade-up">For SentiMental reasons.</span>
              </div>
            </h1>
          </div>
          <img src={background} alt="" />
        </section>
        <section id='feeling-sentimental'>
          <div className="container">
            <div className="h1-container">
              <h1 data-aos-delay="0" data-aos="fade-up"><div>Feeling Sentimental? We</div> got you.</h1>
            </div>
            <div className="p-container">
              <p data-aos-delay="100" data-aos="fade-up">Falling in love is easy. Staying in love takes work.
                This is why we used exceptional materials and long-range
                batteries wrapped in timeless design. So that your love for
                SentiMental bikes lasts today, tomorrow, and beyond.</p>
            </div>
            <div className="logo-container">
              <div data-aos-delay="200" data-aos="fade-up" className='logo-name'>
                <img src={logo} alt="" />
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
                  <h6 data-aos="fade-up">COLORS</h6>
                </div>
                <h1>
                  <div>
                    <span data-aos="fade-up">
                      Good looking.
                    </span>
                  </div>
                  <div>
                    <span data-aos-delay="100" data-aos="fade-up">
                      In every color.
                    </span>
                  </div>
                </h1>
              </div>
              <div className='p-container' style={{ overflow: "hidden" }}>
                <p data-aos-delay="200" data-aos="fade-up">Can you handle all eyes on you? We hope you do.
                  Hand-applied by our artisans, our curated colors will fit your style.</p>
              </div>
            </div>
            <div className="mobile-content">
              <div className="img-container">
                <img className={`${bike === "bike_1" ? "active" : ""}`} src={bike_1} alt="" />
                <img className={`${bike === "bike_2" ? "active" : ""}`} src={bike_2} alt="" />
                <img className={`${bike === "bike_3" ? "active" : ""}`} src={bike_3} alt="" />
                <img className={`${bike === "bike_4" ? "active" : ""}`} src={bike_4} alt="" />
                <img className={`${bike === "bike_5" ? "active" : ""}`} src={bike_5} alt="" />
                <img className={`${bike === "bike_6" ? "active" : ""}`} src={bike_6} alt="" />
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
                <a href="#" className="secondary-btn" data-text="Configure a bike">
                  <img src={configure_icon} alt="Logo Btn Icon" />
                  <span>Configure a bike</span>
                </a>
              </div>
            </div>
            <div className="desktop-content">
              <div className="sticky-container">
                <div className="img-container">
                  <img className={`${bike === "bike_1" ? "active" : ""}`} src={bike_1} alt="" />
                  <img className={`${bike === "bike_2" ? "active" : ""}`} src={bike_2} alt="" />
                  <img className={`${bike === "bike_3" ? "active" : ""}`} src={bike_3} alt="" />
                  <img className={`${bike === "bike_4" ? "active" : ""}`} src={bike_4} alt="" />
                  <img className={`${bike === "bike_5" ? "active" : ""}`} src={bike_5} alt="" />
                  <img className={`${bike === "bike_6" ? "active" : ""}`} src={bike_6} alt="" />
                </div>
                <div className="configure-button">
                  <a href="#" className="secondary-btn" data-text="Configure a bike">
                    <img src={configure_icon} alt="Logo Btn Icon" />
                    <span>Configure a bike</span>
                  </a>
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
          <div className="information">
            <div className="container">
              <div className='text-img-container'>
                <div className="text-container">
                  <div className="h6-container">
                    <h6 data-aos="fade-up">MAKE IT PERSONAL</h6>
                  </div>
                  <div className="h1-container">
                    <h1 data-aos-delay="200" data-aos="fade-up">A ride you'll never forget</h1>
                  </div>
                  <div className="p-container">
                    <p data-aos-delay="300" data-aos="fade-up">With the ability to choose from various
                      colors, parts, and accessories, you're in control of designing a bike
                      that truly reflects your personality and sets you apart from the crowd.
                      So, why settle for a standard bike when you can make it personal and ride
                      in style?</p>
                  </div>
                </div>
                <div className="img-container">
                  <img src={sideView} alt="" />
                </div>
              </div>
              <div className="card-container">
                <div data-aos-delay="400" data-aos="fade-right" className='card'>
                  <div className="svg-container">
                    <img src={speed} alt="" />
                  </div>
                  <h3>Speed</h3>
                  <h6>Swift 'n' Smooth</h6>
                  <p>Feel the wind in your hair as you reach up to 25 km/h,
                    effortlessly gliding through urban landscapes with 3 levels
                    of pedal assist and a Shimano 7-speed rear wheel cassette.</p>
                </div>
                <div data-aos-delay="500" data-aos="fade-right" className='card'>
                  <div className="svg-container">
                    <img src={battery} alt="" />
                  </div>
                  <h3>Battery Life</h3>
                  <h6>Power of Endurance!</h6>
                  <p>Our e-bikes offer up to 8-hr charging time,
                    ensuring lasting adventures. Take a break, fully recharge
                    while we prepare for your next exhilarating journey. Get ready
                    for an ultimate joyride that lasts.</p>
                </div>
                <div data-aos-delay="600" data-aos="fade-right" className='card'>
                  <div className="svg-container">
                    <img src={motor} alt="" />
                  </div>
                  <h3>Motor</h3>
                  <h6>Quiet & Powerful</h6>
                  <p>Our 250W geared rear hub motor delivers a smooth,
                    unobtrusive boost to your pedaling, ensuring every ride feels
                    like an exhilarating adventure, while hydraulic disc brakes with
                    engine cut-off ensure safety and control.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg">
            <div className="light-green"></div>
          </div>
        </section>
        <section id='accordion-info'>
          <div className="container">
            <div className="h6-container">
              <h6 data-aos="fade-up">WHAT IS IN THE BACKGROUND</h6>
            </div>
            <div className="accordion-container">
              {accordionData.map((item, index) => (
                <div data-aos-delay={`${index * 100}`} data-aos="fade-up" className="accordion" key={index}>
                  <div
                    onClick={() => toggleAccordion(item.title)}
                    className={`accordion-header ${openSections[item.title] ? 'active' : ''}`}
                  >
                    <h1>{item.title}</h1>
                    <div className="angle-down">
                      <i className="fa-solid fa-angle-down"></i>
                    </div>
                  </div>
                  <div className={`accordion-body ${openSections[item.title] ? 'active' : ''}`}>
                    <ul>
                      {item.content.map((contentItem, i) => (
                        <li key={i}>{contentItem}</li>
                      ))}
                    </ul>
                  </div>

                </div>
              ))}
            </div>
          </div>
          <div className="box"></div>
        </section>
        <section id='image-section'>
          <div className="img-container">
            <img data-aos="zoom-out" src={bike_bg} alt="" />
          </div>
          <div className="text-container">
            <h6 data-aos="fade-up">Supercharged artisan city bikes</h6>
          </div>
          <div className="box-container-green">
            <div className="box-container-light-brown"></div>
          </div>
        </section>
        <ExperienceSentimental />
        <section id='sentimental-news'>
          <div className="container">
            <div className="h1-container">
              <h1 data-aos="fade-up" className='hero-h1'>SentiMental in the Spotlight</h1>
            </div>
            <div style={{ overflow: "hidden" }}>
              {news.map(item => (
                <div data-aos-delay={`${(item.id - 1) * 100}`} data-aos="fade-up" key={item.id} className="card-container">
                  <div className='first-container'>
                    <span className='desktop-news'>NEWS</span>
                    <div className="img-container">
                      <img src={`/src/images/${item.img}`} alt="" />
                    </div>
                    <span className='mobile-news'>NEWS</span>
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