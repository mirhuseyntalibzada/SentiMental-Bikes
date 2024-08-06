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
        h1_az: "Bizimlə Əlaqə",
        p: `Are you curious about our e- bikes, or simply want to chat about the joy of riding?
        We're here to answer your questions and assist with all inquiries.
        Just drop us a line and we'll get back to you ASAP!`,
        p_az: `E-velosipedlərimizlə maraqlanırsınız, yoxsa sadəcə sürməyin sevinci barədə söhbət etmək istəyirsiniz?
        Suallarınızı cavablandırmağa və bütün suallarınıza kömək etməyə hazırıq.
        Sadəcə bizə e-poçt göndərin və ən qısa zamanda sizinlə əlaqə saxlayacağıq!`
      }} />
      <BecomePartnerComp data={{
        h1: "Become a partner",
        h1_az: "Partnyorumuz olun... nolar",
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
      }} style={mode === 'dark' ? { backgroundColor: "rgb(22,22,25)" } : { backgroundColor: "rgb(205, 205, 199)" }} />
    </>
  )
}

export default Contact