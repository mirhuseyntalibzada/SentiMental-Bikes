import React from 'react'
import { useState } from 'react';
import BecomePartnerComp from '../components/BecomePartnerComp';
import icon from '../images/connection-btn-icon.svg'
import supabase from '../config/connect';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const DealerShip = () => {

  const [active, setActive] = useState('all')
  const [dealership, setDealership] = useState([])
  const [filteredData, setFilteredData] = useState(dealership)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data } = await supabase.from('dealership').select()
    setDealership(data)
  }

  const changeActive = (country) => {
    setActive(country)
    if (country === 'all') {
      setFilteredData(dealership);
    } else {
      setFilteredData(dealership.filter(item => item.country === country.toUpperCase()));
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
            <NavLink to={"/become-a-partner"}>
            <button>
              <img src={icon} alt="" />
              BECOME A PARTNER
            </button>
            </NavLink>
          </div>
          <div className="box-container"></div>
        </div>
        <div className="dealerships-container">
          <div className="container">
            {filteredData.length === 0 ? dealership.map((item, i) => (
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
            )) : filteredData.map((item, i) => (
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
              </div>))}
          </div>
        </div>
      </section>
      <BecomePartnerComp data={{
        h1: "Become a partner",
        p: `Feeling the SentiMental vibe? Great! We are always looking for like-minded 
      partners who share our values. Whether you're a bike shop, a cycling club, a company,
       or an individual with a burning passion for e-bikes, there's a place for you in our 
       #itsrideoclock community.`,
        button: `BECOME A PARTNER`,
        path: `/become-a-partner`
      }} style={{ backgroundColor: "rgb(233, 233, 230)" }} />
    </>
  )
}

export default DealerShip