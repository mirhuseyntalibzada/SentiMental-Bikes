import React from 'react'
import img1 from '../images/Image-7-scaled-600x346.webp'
import img2 from '../images/Image-3-700x590.webp'
import AOS from 'aos'
import 'aos/dist/aos.css';
import { useEffect } from 'react';

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
              <p data-aos="fade-up">
                <span>Frustrated with the monotonous options available in the market,
                  I dared to dream up an e-bike that transformed from a humble idea into
                  an extraordinary reality.</span>

                <span>Each SentiMental bike is meticulously handcrafted, ensuring that our
                  passion for detail and dedication to quality shines through. With a subtle
                  nod to the golden era of biking, our timeless designs pay homage to the
                  past while embracing the future.</span>

                <span>Our e-bikes are more than just a mode of transportation; they’re an
                  invitation to experience the world in a whole new way.</span>
              </p>
            </div>
            <div className="img-container">
              <img src={img2} alt="" />
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
                <span data-aos="fade-up">Together, we’ll create memories that will last a lifetime.</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default OurStory