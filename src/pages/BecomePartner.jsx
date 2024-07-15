import React from 'react'
import Form from '../components/Form'
import BecomePartnerComp from '../components/BecomePartnerComp'

const BecomePartner = () => {
  return (
    <>
      <Form data={{
        h1: "Become a partner",
        p: `Feeling the SentiMental vibe? Great! We are always looking for like-minded 
      partners who share our values. Whether you're a bike shop, a cycling club, a company,
       or an individual with a burning passion for e-bikes, there's a place for you in our 
       #itsrideoclock community.`
      }} />
      <BecomePartnerComp data={{
        h1: "Get in touch",
        p: `Are you curious about our e- bikes, or simply want to chat about the joy of riding?
        We're here to answer your questions and assist with all inquiries.
        Just drop us a line and we'll get back to you ASAP!`,
        button:`CONTACT US`,
        path: `/contact`
      }} style={{ backgroundColor: "rgb(205, 205, 199)" }} />
    </>
  )
}

export default BecomePartner