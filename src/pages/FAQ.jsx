import React, { useState, useContext } from 'react';
import { ModeContext } from '../context/ModeContext';
import { useTranslation } from 'react-i18next';
import accordionFAQ from '../data/accordionFAQ';

const FAQ = () => {
  const [openSections, setOpenSections] = useState({});
  const [mode] = useContext(ModeContext);
  const { t, i18n: { changeLanguage, language } } = useTranslation();

  const toggleAccordion = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  let displayedTypes = new Set();

  return (
    <>
      <section className={`faq ${mode === 'dark' ? 'dark' : ''}`} id='faq'>
        <div className="container">
          <div className="text-container">
            <h1>{t('faq.h1')}</h1>
          </div>
        </div>
      </section>
      <section className={`wishlist-section ${mode === 'dark' ? 'dark' : ''}`} id='wishlist-section'>
        <div className="box-container">
          <div className="green-box"></div>
          <div className="white-box"></div>
        </div>
        <div className="container">
          <div className="accordion-container">
            {accordionFAQ.map((item, index) => {
              const typeNotDisplayed = !displayedTypes.has(item.type);
              if (typeNotDisplayed) {
                displayedTypes.add(item.type);
              }
              return (
                <div key={index} data-aos-delay={`${index * 100}`} data-aos="fade-up" className="accordion">
                  {typeNotDisplayed && (
                    <div className="accordion-type">
                      <h2>{language === "en" ? item.type : item.type_az}</h2>
                    </div>
                  )}
                  <div
                    onClick={() => toggleAccordion(item.question)}
                    className={`accordion-header ${openSections[item.question] ? 'active' : ''}`}
                  >
                    <h1>{language==="en"?item.question:item.question_az}</h1>
                    <div className="angle-down">
                      <i className="fa-solid fa-angle-down"></i>
                    </div>
                  </div>
                  <div className={`accordion-body ${openSections[item.question] ? 'active' : ''}`}>
                    {item.list ? (
                      <>
                        <p>{language === "en" ? item.answer : item.answer_az}</p>
                        <ul>
                          {language === "en"
                            ?
                            item.list.map((liItem, i) => (
                              <li key={i}>{liItem}</li>
                            ))
                            :
                            item.list_az.map((liItem, i) => (
                              <li key={i}>{liItem}</li>
                            ))
                          }
                        </ul>
                      </>
                    ) : (
                      <p>{language === 'en' ? item.answer : item.answer_az}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;
