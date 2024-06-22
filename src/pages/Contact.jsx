import React from 'react'
import BecomePartnerComp from '../components/BecomePartnerComp';
import AOS from 'aos'
import 'aos/dist/aos.css';
import Form from '../components/Form';

const Contact = () => {
  return (
    <>
      <Form data={{
        h1: "Get in touch",
        p: `Are you curious about our e- bikes, or simply want to chat about the joy of riding?
        We're here to answer your questions and assist with all inquiries.
        Just drop us a line and we'll get back to you ASAP!`
      }} />
      <BecomePartnerComp style={{ backgroundColor: "rgb(205, 205, 199)" }} />
    </>
  )
}

export default Contact