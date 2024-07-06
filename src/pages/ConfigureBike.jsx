import React from 'react'
import SentiMentalNews from '../components/SentiMentalNews'
import icon from '../images/logo-btn-icon.svg'
import ExperienceSentimental from '../components/ExperienceSentimental'
import { useState } from 'react'

const ConfigureBike = () => {

  const [handleColor, setHandleColor] = useState('white')
  const [bicycleColor, setBicycleColor] = useState('1')
  const [value, setValue] = useState(1)

  const changeHandleColor = (color) => {
    setHandleColor(color)
  }

  const changeBicycleColor = (color) => {
    setBicycleColor(color)
  }

  return (
    <>
      <section id='configure'>
        <div className="configure">
          <div className="container">
            <div className="heading">
              <h1>Configure a bike</h1>
              <h3>€1,899.00</h3>
            </div>
            <div className='img-content-container'>
              <div className="img-container">
                <img src={`/src/images/bicycles/${handleColor}%20handlebar/${bicycleColor}.png`} alt="" />
              </div>
              <div className='features'>
                <div className="options">
                  <h6>FRAME OPTIONS</h6>
                </div>
                <div className="bicycle-color">
                  <h6>Bicycle color</h6>
                  <div className="color-container">
                    <div onClick={() => { changeBicycleColor("1") }}></div>
                    <div onClick={() => { changeBicycleColor("2") }}></div>
                    <div onClick={() => { changeBicycleColor("3") }}></div>
                    <div onClick={() => { changeBicycleColor("4") }}></div>
                    <div onClick={() => { changeBicycleColor("5") }}></div>
                    <div onClick={() => { changeBicycleColor("6") }}></div>
                  </div>
                </div>
                <div className="handle-color">
                  <h6>Handle color</h6>
                  <div className="color-container">
                    <div onClick={() => { changeHandleColor("white") }}></div>
                    <div onClick={() => { changeHandleColor("black") }}></div>
                    <div onClick={() => { changeHandleColor("orange") }}></div>
                    <div onClick={() => { changeHandleColor("lilac") }}></div>
                    <div onClick={() => { changeHandleColor("blue") }}></div>
                    <div onClick={() => { changeHandleColor("cyan") }}></div>
                  </div>
                </div>
                <div className="download-pdf">
                  <button>DOWNLOAD PDF</button>
                </div>
                <div className="add-to-cart">
                  <div className='quantity'>
                    <a onClick={() => { setValue(value - 1) }} href="#!" className='minus'>-</a>
                    <input value={value} type="number" />
                    <a onClick={() => { setValue(value + 1) }} href="#!" className='plus'>+</a>
                  </div>
                  <button className='add-to-cart'>
                    <img src={icon} alt="" />
                    <span>ADD TO CART</span>
                  </button>
                </div>
                <div className="share">
                  <h6>SHARE THIS AWESOME BIKE</h6>
                  <div className="icons">
                    <a href="#!"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#!"><i className="fa-brands fa-x-twitter"></i></a>
                    <a href="#!"><i className="fa-brands fa-pinterest-p"></i></a>
                    <a href="#!"><i className="fa-brands fa-linkedin"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='green-box'>
          <div className="box"></div>
        </div>
      </section>
      <ExperienceSentimental />
      <SentiMentalNews />
    </>
  )
}

export default ConfigureBike