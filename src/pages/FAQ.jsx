import React from 'react'
import accordionFAQ from '../data/accordionFAQ'
import { useState } from 'react';

const FAQ = () => {
  const [openSections, setOpenSections] = useState({});

  const toggleAccordion = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  console.log(accordionFAQ);

  return (
    <>
      <section id='faq'>
        <div className="container">
          <div className="text-container">
            <h1>FAQ</h1>
          </div>
        </div>
      </section>
      <section id='wishlist-section'>
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
                        {item.list.map(liItem => (
                          <li>{liItem}</li>
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