import React from 'react'
import { useState } from 'react';
import BecomePartnerComp from '../components/BecomePartnerComp';
import icon from '../images/connection-btn-icon.svg'
import supabase from '../config/connect';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ModeContext } from '../context/ModeContext';
import { useTranslation } from 'react-i18next';

const DealerShip = () => {

  const [active, setActive] = useState('all')
  const [dealership, setDealership] = useState([])
  const [filteredData, setFilteredData] = useState(dealership)
  const [mode] = useContext(ModeContext)

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

  const { t, i18n: { changeLanguage, language } } = useTranslation();

  return (
    <>
      <section className={`dealership-text-section ${mode === 'dark' ? 'dark' : ''}`} id='dealership-text-section'>
        <div className="container">
          <div className="text-container">
            <h1>
              <div className="mobile">
                <div><span data-aos="fade-up">{t(`dealerShip.span-1.1`)}</span></div>
                <div><span data-aos-delay="100" data-aos="fade-up">{t(`dealerShip.span-1.2`)}</span></div>
              </div>
              <div className="desktop">
                <div><span data-aos="fade-up">{t(`dealerShip.span-1.1`)} {t(`dealerShip.span-1.2`)}</span></div>
              </div>
            </h1>
          </div>
          <div className="made-in-container">
            <span className='text-made-in'><span className='made-in'>{t(`home.span-2.1`)}</span> <span className='european'>{t(`home.span-2.2`)}</span></span>
          </div>
        </div>
      </section>
      <section className={`dealerships ${mode === 'dark' ? 'dark' : ''}`} id='dealerships'>
        <div className="category-container">
          <div className="container">
            <ul>
              <li><a onClick={() => { changeActive('all') }} className={`${active == 'all' ? 'active' : ''}`} href="#">{t(`dealerShip.a.1`)}</a></li>
              <li><a onClick={() => { changeActive('croatia') }} className={`${active == 'croatia' ? 'active' : ''}`} href="#">{t(`dealerShip.a.2`)}</a></li>
              <li><a onClick={() => { changeActive('germany') }} className={`${active == 'germany' ? 'active' : ''}`} href="#">{t(`dealerShip.a.3`)}</a></li>
              <li><a onClick={() => { changeActive('slovakia') }} className={`${active == 'slovakia' ? 'active' : ''}`} href="#">{t(`dealerShip.a.4`)}</a></li>
              <li><a onClick={() => { changeActive('czech republic') }} className={`${active == 'czech republic' ? 'active' : ''}`} href="#">{t(`dealerShip.a.5`)}</a></li>
            </ul>
            <NavLink to={"/become-a-partner"}>
              <button>
                <img src={icon} alt="" />
                {t(`dealerShip.button`)}
              </button>
            </NavLink>
          </div>
          <div className="box-container"></div>
        </div>
        <div className="dealerships-container">
          <div className="container">
            {filteredData.length === 0 ? dealership?.map((item, i) => (
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
            )) : filteredData?.map((item, i) => (
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
        h1_az: "Partnyorumuz olun :)",
        p: `Feeling the SentiMental vibe? Great! We are always looking for like-minded 
      partners who share our values. Whether you're a bike shop, a cycling club, a company,
       or an individual with a burning passion for e-bikes, there's a place for you in our 
       #itsrideoclock community.`,
        p_az: `Sentimental bir atmosfer hiss edirsiniz? - əla! Həmişə həmfikir tərəfdaşlar axtarırıq
 dəyərlərimizi bölüşürük. Velosiped dükanı, velosiped klubu, şirkət olmağınızdan asılı olmayaraq
və ya e-velosipedlərə həvəsli olan bir şəxs sizin üçün bizim #itsrideoclock icmamızda sizin üçün yerimiz var.`,
        button: `BECOME A PARTNER`,
        button_az: `PARTNYORUMUZ OLUN`,
        path: `/become-a-partner`
      }} style={mode === 'dark' ? { backgroundColor: "rgb(22, 22, 25)" } : { backgroundColor: "rgb(233, 233, 230)" }} />
    </>
  )
}

export default DealerShip