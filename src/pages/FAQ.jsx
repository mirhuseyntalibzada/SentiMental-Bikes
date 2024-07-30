import React from 'react'
import accordionFAQ from '../data/accordionFAQ'
import { useState } from 'react';
import { useContext } from 'react';
import { ModeContext } from '../context/ModeContext'

const FAQ = () => {
  const [openSections, setOpenSections] = useState({});
  const [mode] = useContext(ModeContext)

  const toggleAccordion = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      <section className={`faq ${mode==='dark'?'dark':''}`} id='faq'>
        <div className="container">
          <div className="text-container">
            <h1>FAQ</h1>
          </div>
        </div>
      </section>
      <section className={`wishlist-section ${mode==='dark'?'dark':''}`} id='wishlist-section'>
        <div className="box-container">
          <div className="green-box"></div>
          <div className="white-box"></div>
        </div>
        <div className="container">
          <div className="accordion-container">
            {accordionFAQ.map((item, index) => (
              <div data-aos-delay={`${index * 100}`} data-aos="fade-up" className="accordion" key={index}>
                <div
                  onClick={() => toggleAccordion(item.question)}
                  className={`accordion-header ${openSections[item.question] ? 'active' : ''}`}
                >
                  <h1>{item.question}</h1>
                  <div className="angle-down">
                    <i className="fa-solid fa-angle-down"></i>
                  </div>
                </div>
                <div className={`accordion-body ${openSections[item.question] ? 'active' : ''}`}>
                  {item.list ?
                    <>
                      <p>{item.answer}</p>
                      <ul>
                        {item.list.map((liItem, i) => (
                          <li key={i}>{liItem}</li>
                        ))}
                      </ul>
                    </>
                    :
                    <p>{item.answer}</p>
                  }
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default FAQ