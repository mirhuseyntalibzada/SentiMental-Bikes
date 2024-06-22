import React from 'react'
import dealershipData from '../data/dealerships';
import { useState } from 'react';
import BecomePartnerComp from '../components/BecomePartnerComp';
import icon from '../images/connection-btn-icon.svg'

const DealerShip = () => {

  const [active, setActive] = useState('all')
  const [filteredData, setFilteredData] = useState(dealershipData)

  const changeActive = (country) => {
    setActive(country)
    if (country === 'all') {
      setFilteredData(dealershipData);
    } else {
      setFilteredData(dealershipData.filter(item => item.country === country.toUpperCase()));
    }
  }

  return (
    <>
      <section id='dealership-text-section'>
        <div className="container">
          <div className="text-container">
            <h1>
              <div className="mobile">
                <div><span data-aos="fade-up">Bike dealerships World</span></div>
                <div><span data-aos-delay="100" data-aos="fade-up">Wide</span></div>
              </div>
              <div className="desktop">
                <div><span data-aos="fade-up">Bike dealerships World Wide</span></div>
              </div>
            </h1>
          </div>
          <div className="made-in-container">
            <span className='text-made-in'><span className='made-in'>Made in</span> <span className='european'>EUROPEAN UNION</span></span>
          </div>
        </div>
      </section>
      <section id='dealerships'>
        <div className="category-container">
          <div className="container">
            <ul>
              <li><a onClick={() => { changeActive('all') }} className={`${active == 'all' ? 'active' : ''}`} href="#">All</a></li>
              <li><a onClick={() => { changeActive('croatia') }} className={`${active == 'croatia' ? 'active' : ''}`} href="#">Croatia</a></li>
              <li><a onClick={() => { changeActive('germany') }} className={`${active == 'germany' ? 'active' : ''}`} href="#">Germany</a></li>
              <li><a onClick={() => { changeActive('slovakia') }} className={`${active == 'slovakia' ? 'active' : ''}`} href="#">Slovakia</a></li>
              <li><a onClick={() => { changeActive('czech republic') }} className={`${active == 'czech republic' ? 'active' : ''}`} href="#">Czech Republic</a></li>
            </ul>
            <button>
              <img src={icon} alt="" />
              BECOME A PARTNER
            </button>
          </div>
          <div className="box-container"></div>
        </div>
        <div className="dealerships-container">
          <div className="container">
            {filteredData.map((item, i) => (
              <div data-aos-delay={`${i * 100}`} data-aos="fade-up" key={i} className="card-container">
                <div className='first-container'>
                  <div className='desktop-country'>
                    <span>{item.country}</span>
                  </div>
                  <div className="img-container">
                    <img src={`/src/images/${item.img}`} alt="" />
                  </div>
                  <span className='mobile-country'>{item.country}</span>
                </div>
                <div className="second-container">
                  <h1>{item.title}</h1>
                  <div className="link-desc">
                    <div className="link">
                      <i className="fa-solid fa-desktop"></i>
                      <span>{item.link}</span>
                      <span className='seperator'>|</span>
                    </div>
                    <div className="desc">
                      <span>{item.desc}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <BecomePartnerComp style={{ backgroundColor: "rgb(233, 233, 230)" }} />
    </>
  )
}

export default DealerShip