import React from 'react'
import Form from '../components/Form'
import BecomePartnerComp from '../components/BecomePartnerComp'

const BecomePartner = () => {
  return (
    <>
    <Form data={{
      h1: "Become a partner",
      p: `Feeling the SentiMental vibe? Great! We are always looking for like-minded partners who share our values. Whether you're a bike shop, a cycling club, a company, or an individual with a burning passion for e-bikes, there's a place for you in our #itsrideoclock community.`
    }} />
    <BecomePartnerComp style={{ backgroundColor: "rgb(205, 205, 199)" }} />
    </>
  )
}

export default BecomePartner