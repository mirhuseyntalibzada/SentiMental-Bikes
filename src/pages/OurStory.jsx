import React from 'react'
import img1 from '../images/Image-7-scaled-600x346.webp'
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
      <section id='our-story'>
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
    </>
  )
}

export default OurStory