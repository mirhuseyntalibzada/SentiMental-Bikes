import React, { useState, useEffect } from 'react';
import { countries } from '../data/countries';
import { useSelector, useDispatch } from 'react-redux';
import supabase from '../config/connect';
import { useCookies } from 'react-cookie';
import { addToOrder, emptyCart } from '../toolkit/features/cartSlice';
import { useTranslation } from 'react-i18next';
import { Bounce, toast } from 'react-toastify';

const BillingAddress = ({func}) => {
    const [activeBtn, setActiveBtn] = useState(false);
    const [activeCountry, setActiveCountry] = useState('Azerbaijan');
    const [filteredCountries, setFilteredCountries] = useState();
    const [cookie] = useCookies(['cookie-user']);

    const cart = useSelector((state) => state.cart);
    const cartAmount = useSelector((state) => state.cart.cartAmount);
    const cartQuantity = useSelector((state) => state.cart.cartQuantity);
    const productAmount = useSelector((state) => state.cart.productAmount);
    const productQuantity = useSelector((state) => state.cart.productQuantity);

    const dispatch = useDispatch();

    const { t, i18n: { changeLanguage, language } } = useTranslation();

    const [userInfo, setUserInfo] = useState({
        fName: "",
        lName: "",
        company_name: "",
        street_house: "",
        street_apartment: "",
        town_city: "",
        state_county: "",
        postcode_zip: "",
        phone: "",
        email: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase.from('users').select();
            const user = data.find(({ token }) => token === cookie['cookie-user']);
            const addressLocation = user['billing_address']?.shipping[0];
            setUserInfo({
                fName: user?.first_name,
                lName: user?.last_name,
                town_city: addressLocation?.town_city,
                company_name: addressLocation?.company_name,
                postcode_zip: addressLocation?.postcode_zip,
                state_county: addressLocation?.state_county,
                street_house: addressLocation?.street_house,
                street_apartment: addressLocation?.street_apartment,
                phone: user?.phone,
                email: user?.email
            });
            setActiveCountry(addressLocation?.country);
        };
        fetchData();
    }, [cookie]);

    const alertMessage = (message, duration) => {
        toast(message, {
            position: "top-right",
            autoClose: duration,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    };

    const sendToOrder = () => {
        const requiredFields = ['fName', 'lName', 'street_house', 'town_city', 'state_county', 'postcode_zip', 'phone', 'email'];
        for (const field of requiredFields) {
            if (!userInfo[field]) {
                alertMessage("Please fill in all required fields.", 3000);
                return;
            }
        }
        dispatch(addToOrder([...cart.cart, ...cart.product]));
        dispatch(emptyCart());
        alertMessage("Thank you for your purchase.", 5000);
        func(true)
    };

    const toggleBtn = () => {
        setActiveBtn(!activeBtn);
    };

    const setCountry = (country) => {
        setActiveCountry(country);
    };

    const searchCountry = (input) => {
        setFilteredCountries(countries.filter(country => country.countryName.toLowerCase().includes(input.toLowerCase())));
    };

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className='container'>
            <h1>{t('billingAddress.h1.1')}</h1>
            <div className='input-container'>
                <h6>{t('billingAddress.h6.1')}*</h6>
                <input name='fName' value={userInfo.fName} onChange={handleChange} type="text" />
            </div>
            <div className='input-container'>
                <h6>{t('billingAddress.h6.2')} *</h6>
                <input name='lName' value={userInfo.lName} onChange={handleChange} type="text" />
            </div>
            <div className='input-container'>
                <h6>{t('billingAddress.h6.3')}</h6>
                <input name='company_name' value={userInfo.company_name} onChange={handleChange} type="text" />
            </div>
            <div className='input-container'>
                <h6>{t('billingAddress.h6.4')}</h6>
                <div className='country-region-container'>
                    <div onClick={toggleBtn} className="header">
                        <input readOnly value={activeCountry} type="text" />
                        <div className='options-btn'><i className="fa-solid fa-angle-down"></i></div>
                    </div>
                    <div className={`body ${activeBtn ? 'active' : ''}`}>
                        <div className="input">
                            <input onChange={(e) => searchCountry(e.target.value)} type="text" />
                        </div>
                        <div className="country-container">
                            {
                                filteredCountries === undefined
                                    ? countries.map((country, id) => (
                                        <span className={`country ${activeCountry === country.countryName ? 'active' : ''}`} key={id} onClick={() => { setCountry(country.countryName); toggleBtn() }}>{country.countryName}</span>
                                    ))
                                    : filteredCountries.length === 0
                                        ? <span className='country'>{t('billingAddress.span.1')}</span>
                                        : filteredCountries.map((country, id) => (
                                            <span className={`country ${activeCountry === country.countryName ? 'active' : ''}`} key={id} onClick={() => { setCountry(country.countryName); toggleBtn() }}>{country.countryName}</span>
                                        ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='input-container'>
                <h6>{t('billingAddress.h6.5')} *</h6>
                <input name='street_house' value={userInfo.street_house} onChange={handleChange} style={{ marginBottom: "1.5em" }} placeholder='House numbers and street name' type="text" />
                <input name='street_apartment' value={userInfo.street_apartment} onChange={handleChange} placeholder='Apartment, suite, unit, etc.(optional)' type="text" />
            </div>
            <div className='input-container'>
                <h6>{t('billingAddress.h6.6')} *</h6>
                <input name='town_city' value={userInfo.town_city} onChange={handleChange} type="text" />
            </div>
            <div className='input-container'>
                <h6>{t('billingAddress.h6.7')} *</h6>
                <input name='state_county' value={userInfo.state_county} onChange={handleChange} type="text" />
            </div>
            <div className='input-container'>
                <h6>{t('billingAddress.h6.8')} *</h6>
                <input name='postcode_zip' value={userInfo.postcode_zip} onChange={handleChange} type="text" />
            </div>
            <div className='input-container'>
                <h6>{t('billingAddress.h6.9')} *</h6>
                <input name='phone' value={userInfo.phone} onChange={handleChange} type="text" />
            </div>
            <div className='input-container'>
                <h6>{t('billingAddress.h6.10')} *</h6>
                <input name='email' value={userInfo.email} onChange={handleChange} type="text" />
            </div>
            <div className='input-container'>
                <h6>{t('billingAddress.h6.11')}</h6>
                <input name='vat_number' value={userInfo.vat_number} onChange={handleChange} type="text" />
            </div>
            <div className='input-container'>
                <h6>{t('billingAddress.h6.12')}</h6>
                <textarea name='order_notes' value={userInfo.order_notes} onChange={handleChange} placeholder='Notes about your order, e.g. special notes for delivery.' />
            </div>
            <div className="amount-container">
                <div className='amount-info'>
                    <h1>{t('billingAddress.h1.2')}</h1>
                    <span>€{cartAmount + productAmount}.00</span>
                </div>
                <div className='amount-info'>
                    <h1>{t('billingAddress.h1.3')}</h1>
                    <span>€{(50 * cartQuantity + (10 * productQuantity))}.00</span>
                </div>
                <div className='amount-info'>
                    <h1>{t('billingAddress.h1.4')}</h1>
                    <span>€{productAmount + cartAmount + (50 * cartQuantity) + (10 * productQuantity)}.00</span>
                </div>
            </div>
            <div className='payment'>
                <h6>{t('billingAddress.h6.13')}</h6>
                <div className='payment-container'>
                    <div className='payment-card'>
                        <div className='payment-header'>
                            <input defaultChecked name='payment' type="radio" />
                            <h6>{t('billingAddress.h6.14')}</h6>
                        </div>
                        <div className="payment-body">
                            <p>
                                {t('billingAddress.p.1')}
                            </p>
                        </div>
                    </div>
                    <div className='payment-card'>
                        <div className='payment-header'>
                            <input name='payment' type="radio" />
                            <h6>{t('billingAddress.h6.14')}</h6>
                        </div>
                        <div className="payment-body">
                            <p>{t('billingAddress.p.2')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='privacy-policy'>
                <p>{t('billingAddress.p.3.1')} <a href="#!">{t('billingAddress.p.3.2')}</a>.</p>
            </div>
            <div className='terms-conditions'>
                <input id='terms' type="checkbox" />
                {language === "en"
                    ? <label htmlFor="terms"> I have read and agree to the website <a href="#!">terms and conditions</a> *</label>
                    : <label htmlFor="terms">Veb saytın <a href="#!">istifadə şərtləri</a> ilə tanış oldum və onlarla razıyam *</label>
                }
            </div>
            <div onClick={sendToOrder} className='btn-container'>
                <button>{t('billingAddress.button')}</button>
            </div>
        </div>
    );
}

export default BillingAddress;
