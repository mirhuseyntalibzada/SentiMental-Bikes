import React from 'react'

const FAQ = () => {
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
          <h1>General Questions</h1>
          <div className="question-card">
            <div className="head-con">
              <h2>What is an electric bicycle (e-bike)?</h2>
            </div>
            <div className="body-con">
              <p>An electric bicycle (e-bike) is a bicycle equipped with an electric motor that assists with pedaling. This motor can help you travel longer distances and tackle hills more easily.
              </p>
            </div>
          </div>
          <div className="question-card">
            <div className="head-con">
              <h2>How does an e-bike work?</h2>
            </div>
            <div className="body-con">
              <p>An e-bike uses a battery-powered electric motor to provide assistance when you pedal. The motor kicks in based on your pedaling effort, giving you an extra boost.
              </p>
            </div>
          </div>
          <h1>Technical Questions</h1>
          <div className="question-card">
            <div className="head-con">
              <h2>What is the range of an e-bike on a single charge?</h2>
            </div>
            <div className="body-con">
              <p>The range of an e-bike depends on several factors, including the battery capacity, the level of motor assistance, terrain, and rider weight. Typically, you can expect a range of 20-50 miles per charge.
              </p>
            </div>
          </div>
          <div className="question-card">
            <div className="head-con">
              <h2>How long does it take to charge the battery?</h2>
            </div>
            <div className="body-con">
              <p>Charging times vary based on the battery capacity and the charger used. On average, it takes 3-6 hours to fully charge an e-bike battery.
              </p>
            </div>
          </div>
          <div className="question-card">
            <div className="head-con">
              <h2>Can I ride an e-bike in the rain?</h2>
            </div>
            <div className="body-con">
              <p>Yes, most e-bikes are designed to be weather-resistant and can be ridden in the rain. However, it's important to avoid submerging the e-bike in water and to dry it off after riding in wet conditions.
              </p>
            </div>
          </div>
          <h1>Maintenance Questions</h1>
          <div className="question-card">
            <div className="head-con">
              <h2>How often do I need to service my e-bike?</h2>
            </div>
            <div className="body-con">
              <p>Regular maintenance is crucial for keeping your e-bike in good condition. We recommend servicing your e-bike every 6-12 months, depending on usage. Routine checks should include inspecting the brakes, tires, and battery.
              </p>
            </div>
          </div>
          <div className="question-card">
            <div className="head-con">
              <h2>How do I maintain the battery?</h2>
            </div>
            <div className="body-con">
              <p>To extend the life of your e-bike battery, follow these tips:
              </p>
              <ul>
                <li>Avoid fully discharging the battery.</li>
                <li>Store the battery in a cool, dry place.</li>
                <li>Charge the battery regularly, even if not in use.</li>
                <li>Legal and Safety Questions</li>
              </ul>
            </div>
          </div>
          <div className="question-card">
            <div className="head-con">
              <h2>Do I need a license to ride an e-bike?</h2>
            </div>
            <div className="body-con">
              <p>In most regions, e-bikes do not require a license, but laws can vary. Check local regulations to ensure compliance with e-bike laws in your area.
              </p>
            </div>
          </div>
          <div className="question-card">
            <div className="head-con">
              <h2>Are there speed limits for e-bikes?</h2>
            </div>
            <div className="body-con">
              <p>Yes, many regions have speed limits for e-bikes. Typically, e-bikes are limited to a maximum speed of 20-28 mph (32-45 km/h) when using motor assistance.
              </p>
            </div>
          </div>
          <h1>Purchase and Warranty Questions</h1>
          <div className="question-card">
            <div className="head-con">
              <h2>What is the warranty on your e-bikes?</h2>
            </div>
            <div className="body-con">
              <p>Our e-bikes come with a [X]-year warranty covering manufacturing defects and certain components. For detailed warranty information, please refer to our warranty policy.
              </p>
            </div>
          </div>
          <div className="question-card">
            <div className="head-con">
              <h2>Can I test ride an e-bike before purchasing?</h2>
            </div>
            <div className="body-con">
              <p>Yes, we offer test rides at our showroom locations. Please contact us to schedule a test ride and experience the benefits of our e-bikes firsthand.
              </p>
            </div>
          </div>
          <div className="question-card">
            <div className="head-con">
              <h2>Do you offer financing options?</h2>
            </div>
            <div className="body-con">
              <p>Yes, we offer flexible financing options to make owning an e-bike more affordable. Please visit our financing page for more information.
              </p>
            </div>
          </div>
          <h1>Support Questions</h1>
          <div className="question-card">
            <div className="head-con">
              <h2>What should I do if my e-bike has an issue?</h2>
            </div>
            <div className="body-con">
              <p>If you encounter any issues with your e-bike, please contact our customer support team. We offer troubleshooting assistance and repair services to get you back on the road.
              </p>
            </div>
          </div>
          <div className="question-card">
            <div className="head-con">
              <h2>How can I get in touch with customer support?</h2>
            </div>
            <div className="body-con">
              <p>You can reach our customer support team via:
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FAQ