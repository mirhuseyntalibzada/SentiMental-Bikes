import React from 'react'
import img1 from '../images/Image-7-scaled-600x346.webp'
import img2 from '../images/Image-3-700x590.webp'
import img3 from '../images/Image-12-scaled-600x400.webp'
import AOS from 'aos'
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import newsData from '../data/news';
import logo from '../images/logo-small.svg';

const OurStory = () => {

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
      offset: 100,
      easing: 'ease-out'
    })
  }, [])

  return (
    <>
      <section id='who-are-we'>
        <div className='our-story-container'>
          <div className="container">
            <div className="text-container">
              <h1>We're SentiMental. And so are you.</h1>
              <p>Hi, my name is Duško (Dule), and I'm the Creative Director
                behind SentiMental Bikes.</p>
            </div>
          </div>
          <div className="img-container">
            <img src={img1} alt="_" />
          </div>
          <div className="text-content">
            <div className='p-container'>
              <p data-aos="fade-up">
                At SentiMental, we believe that life is too short for
              </p>
            </div>
            <div className='p-container'>
              <p data-aos-delay="100" data-aos="fade-up">
                ordinary e-bikes. That's why we pour our hearts
              </p>
            </div>
            <div className='p-container'>
              <p data-aos-delay="200" data-aos="fade-up">
                and souls into crafting extraordinary e-bikes that
              </p>
            </div>
            <div className='p-container'>
              <p data-aos-delay="300" data-aos="fade-up">
                exude personality, wit, and charm. Our mission is
              </p>
            </div>
            <div className='p-container'>
              <p data-aos-delay="400" data-aos="fade-up">
                simple: to make you fall in love with e-biking all
              </p>
            </div>
            <div className='p-container'>
              <p data-aos-delay="500" data-aos="fade-up">
                over again.
              </p>
            </div>
            <div className="comma-container">
              <span>"</span>
            </div>
          </div>
        </div>
      </section>
      <section id="our-story">
        <div className="container">
          <div className="text-img-content">
            <div className="text-container">
              <h5>
                <div className="mobile">
                  <div><span data-aos="fade-up">My journey began in a tiny workshop, where imagination</span></div>
                  <div><span data-aos-delay="100" data-aos="fade-up">knew no bounds, and inspiration struck at every corner.</span></div>
                </div>
                <div className="desktop">
                  <div><span data-aos="fade-up">My journey began in a tiny</span></div>
                  <div><span data-aos-delay="100" data-aos="fade-up">workshop, where imagination knew</span></div>
                  <div><span data-aos-delay="200" data-aos="fade-up">no bounds, and inspiration struck at</span></div>
                  <div><span data-aos-delay="300" data-aos="fade-up">every corner.</span></div>
                </div>
              </h5>
              <p>
                <span data-aos="fade-up">Frustrated with the monotonous options available in the market,
                  I dared to dream up an e-bike that transformed from a humble idea into
                  an extraordinary reality.</span>

                <span data-aos="fade-up">Each SentiMental bike is meticulously handcrafted, ensuring that our
                  passion for detail and dedication to quality shines through. With a subtle
                  nod to the golden era of biking, our timeless designs pay homage to the
                  past while embracing the future.</span>

                <span data-aos="fade-up">Our e-bikes are more than just a mode of transportation; they’re an
                  invitation to experience the world in a whole new way.</span>
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
                  <div><span data-aos="fade-up">So, hop on, and let</span></div>
                  <div><span data-aos-delay="100" data-aos="fade-up">SentiMental bikes take you</span></div>
                  <div><span data-aos-delay="200" data-aos="fade-up">on a journey of rediscovery,</span></div>
                  <div><span data-aos-delay="300" data-aos="fade-up">where the joy of e-biking is</span></div>
                  <div><span data-aos-delay="400" data-aos="fade-up">limited only by your</span></div>
                  <div><span data-aos-delay="500" data-aos="fade-up">imagination.</span></div>
                </div>
                <div className="desktop">
                  <div><span data-aos="fade-up">So, hop on, and let SentiMental bikes take you on a</span></div>
                  <div><span data-aos-delay="100" data-aos="fade-up">journey of rediscovery, where the joy of e-biking is</span></div>
                  <div><span data-aos-delay="200" data-aos="fade-up">limited only by your imagination.</span></div>
                </div>
              </h1>
              <p>
                <span data-aos-delay="300" data-aos="fade-up">Together, we’ll create memories that will last a lifetime.</span>
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="box-container">
        <div className='white-box'></div>
        <div className='green-box'></div>
      </div>
      <section id='sentimental-news-story'>
        <div className="container">
          <div className="h1-container">
            <h1 data-aos="fade-up" className='hero-h1'>SentiMental in the Spotlight</h1>
          </div>
          <div style={{ overflow: "hidden" }}>
            {newsData.map(item => (
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
          <div className="button-container">
            <button>ALL MEDIA</button>
          </div>
        </div>
      </section>
      <section id='feeling-sentimental-story'>
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
              <div>
                <span>Dule</span>
                <span>Sentimental Bikes</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id='ride-the-wave'>
        <div className="container">
          <div className="text-container">
            <h1>
              <div className="mobile">
                <div>
                  <span data-aos-delay="0" data-aos="fade-up">Go ahead. Ride the</span>
                </div>
                <div>
                  <span data-aos-delay="100" data-aos="fade-up">wave. For SentiMental</span>
                </div>
                <div>
                  <span data-aos-delay="200" data-aos="fade-up">reasons.</span>
                </div>
              </div>
              <div className="desktop">
                <div>
                  <span data-aos-delay="0" data-aos="fade-up">Go ahead. Ride the wave.</span>
                </div>
                <div>
                  <span data-aos-delay="100" data-aos="fade-up">For SentiMental reasons.</span>
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