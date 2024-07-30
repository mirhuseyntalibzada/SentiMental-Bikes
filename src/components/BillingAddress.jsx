import React from 'react'
import { useState } from 'react'
import { countries } from '../data/countries'
import { useSelector } from 'react-redux'

const BillingAddress = () => {
    const [activeBtn, setActiveBtn] = useState(false)
    const [activeCountry, setActiveCountry] = useState('Azerbaijan')
    const [filteredCountries, setFilteredCountries] = useState()

    const cartAmount = useSelector((state) => state.cart.cartAmount)
    const cartQuantity = useSelector((state) => state.cart.cartQuantity)
    const productAmount = useSelector((state) => state.cart.productAmount)
    const productQuantity = useSelector((state) => state.cart.productQuantity)

    const toggleBtn = () => {
        setActiveBtn(!activeBtn)
    }

    const setCountry = (country) => {
        setActiveCountry(country)
    }

    const searchCountry = (input) => {
        setFilteredCountries(countries.filter(country => country.countryName.toLowerCase().includes(input.toLowerCase())));
    }

    return (
        <>
            <div className='container'>
                <h1>Billing details</h1>
                <div className='input-container'>
                    <h6>FIRST NAME*</h6>
                    <input type="text" />
                </div>
                <div className='input-container'>
                    <h6>LAST NAME *</h6>
                    <input type="text" />
                </div>
                <div className='input-container'>
                    <h6>COMPANY NAME (OPTIONAL)</h6>
                    <input type="text" />
                </div>
                <div className='input-container'>
                    <h6>COUNTRY / REGION</h6>
                    <div className='country-region-container'>
                        <div onClick={() => { toggleBtn() }} className="header">
                            <input readOnly value={activeCountry} type="text" />
                            <div className='options-btn'><i className="fa-solid fa-angle-down"></i></div>
                        </div>
                        <div className={`body ${activeBtn ? 'active' : ''}`}>
                            <div className="input">
                                <input onChange={(e) => { searchCountry(e.target.value) }} type="text" />
                            </div>
                            <div className="country-container">
                                {
                                    filteredCountries === undefined
                                        ?
                                        countries.map((country, id) => (
                                            <span className={`country ${activeCountry === country.countryName ? 'active' : ''}`} key={id} onClick={() => { setCountry(country.countryName); toggleBtn() }}>{country.countryName}</span>
                                        ))
                                        :
                                        filteredCountries.length === 0 ?
                                            <span className='country'>No matches found</span>
                                            :
                                            filteredCountries.map((country, id) => (
                                                <span className={`country ${activeCountry === country.countryName ? 'active' : ''}`} key={id} onClick={() => { setCountry(country.countryName); toggleBtn() }}>{country.countryName}</span>
                                            ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='input-container'>
                    <h6>STREET ADDRESS *</h6>
                    <input style={{ marginBottom: "1.5em" }} placeholder='House numbers and street name' type="text" />
                    <input placeholder='Apartment, suite, unit, etc.(optional)' type="text" />
                </div>
                <div className='input-container'>
                    <h6>TOWN / CITY *</h6>
                    <input type="text" />
                </div>
                <div className='input-container'>
                    <h6>STATE / COUNTY *</h6>
                    <input type="text" />
                </div>
                <div className='input-container'>
                    <h6>POSTCODE / ZIP *</h6>
                    <input type="text" />
                </div>
                <div className='input-container'>
                    <h6>PHONE *</h6>
                    <input type="text" />
                </div>
                <div className='input-container'>
                    <h6>EMAIL ADDRESS *</h6>
                    <input type="text" />
                </div>
                <div className='input-container'>
                    <h6>VAT NUMBER(OPTIONAL)</h6>
                    <input type="text" />
                </div>
                <div className='input-container'>
                    <h6>ORDER NOTES (OPTIONAL)</h6>
                    <textarea placeholder='Notes about your order, e.g. special notes for delivery.' name="" id=""></textarea>
                </div>
                <div className="amount-container">
                    <div className='amount-info'>
                        <h1>Subtotal:</h1>
                        <span>€{cartAmount + productAmount}.00</span>
                    </div>
                    <div className='amount-info'>
                        <h1>Shipping:</h1>
                        <span>€{(50 * cartQuantity + (10 * productQuantity))}.00</span>
                    </div>
                    <div className='amount-info'>
                        <h1>Total:</h1>
                        <span>€{productAmount + cartAmount + (50 * cartQuantity) + (10 * productQuantity)}.00</span>
                    </div>
                </div>
                <div className='payment'>
                    <h6>CHOOSE A PAYMENT METHOD</h6>
                    <div className='payment-container'>
                        <div className='payment-card'>
                            <div className='payment-header'>
                                <input defaultChecked name='payment' type="radio" />
                                <h6>DIRECT BANK TRANSFER</h6>
                            </div>
                            <div className="payment-body">
                                <p>
                                    Make your payment directly into our bank account.
                                    Please use your Order ID as the payment reference.
                                    Your order will not be shipped until the funds have
                                    cleared in our account.
                                </p>
                            </div>
                        </div>
                        <div className='payment-card'>
                            <div className='payment-header'>
                                <input name='payment' type="radio" />
                                <h6>CREDIT CARD OR CRYPTO PAYMENT</h6>
                            </div>
                            <div className="payment-body">
                                <p>You will be securely redirected to our payment
                                    processor’s page, where you can choose to complete
                                    your purchase using your preferred credit/debit card
                                    or cryptocurrency.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='privacy-policy'>
                    <p>Your personal data will be used to process your order,
                        support your experience throughout this website, and
                        for other purposes described in our <a href="#!">privacy policy</a>.</p>
                </div>
                <div className='terms-conditions'>
                    <input id='terms' type="checkbox" />
                    <label htmlFor="terms"> I have read and agree to the website <a href="#!">terms and conditions</a> *</label>
                </div>
                <div className='btn-container'>
                    <button>PLACE ORDER</button>
                </div>
            </div>
        </>
    )
}

export default BillingAddress