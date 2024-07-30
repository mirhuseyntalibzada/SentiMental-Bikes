import React from 'react'
import BecomePartnerComp from '../components/BecomePartnerComp';
import 'aos/dist/aos.css';
import Form from '../components/Form';
import { useContext } from 'react';
import { ModeContext } from '../context/ModeContext';

const Contact = () => {
  const [mode] = useContext(ModeContext)

  return (
    <>
      <Form data={{
        h1: "Get in touch",
        p: `Are you curious about our e- bikes, or simply want to chat about the joy of riding?
        We're here to answer your questions and assist with all inquiries.
        Just drop us a line and we'll get back to you ASAP!`
      }} />
      <BecomePartnerComp data={{
        h1: "Become a partner",
        p: `Feeling the SentiMental vibe? Great! We are always looking for like-minded 
      partners who share our values. Whether you're a bike shop, a cycling club, a company,
       or an individual with a burning passion for e-bikes, there's a place for you in our 
       #itsrideoclock community.`,
        button: `BECOME A PARTNER`,
        path: `/become-a-partner`
      }} style={mode==='dark'?{ backgroundColor: "rgb(22,22,25)" }:{ backgroundColor: "rgb(205, 205, 199)" }} />
    </>
  )
}

export default Contact