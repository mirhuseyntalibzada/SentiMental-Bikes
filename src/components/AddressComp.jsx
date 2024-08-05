import React, { useState, useEffect } from 'react';
import { countries } from '../data/countries';
import supabase from '../config/connect';
import { useCookies } from 'react-cookie';
import { Bounce, toast } from 'react-toastify';

const AddressComp = ({ h1, type }) => {
    const [activeBtn, setActiveBtn] = useState(false);
    const [activeCountry, setActiveCountry] = useState('Azerbaijan');
    const [filteredCountries, setFilteredCountries] = useState();

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

    const toggleBtn = () => {
        setActiveBtn(!activeBtn);
    };

    const setCountry = (country) => {
        setActiveCountry(country);
    };

    const searchCountry = (input) => {
        setFilteredCountries(countries.filter(country => country.countryName.toLowerCase().includes(input.toLowerCase())));
    };

    const [cookie] = useCookies(['cookie-user']);
    const [userInfo, setUserInfo] = useState({
        fName: "",
        lName: "",
        town_city: "",
        company_name: "",
        postcode_zip: "",
        state_county: "",
        street_house: "",
        street_apartment: "",
        phone: "",
        email: ""
    });

    const handleChange = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase.from('users').select();
            const user = data.find(({ token }) => token === cookie['cookie-user']);
            const addressLocation = user[type + '_address'].shipping[0];
            setUserInfo({
                fName: user.first_name,
                lName: user.last_name,
                town_city: addressLocation.town_city,
                company_name: addressLocation.company_name,
                postcode_zip: addressLocation.postcode_zip,
                state_county: addressLocation.state_county,
                street_house: addressLocation.street_house,
                street_apartment: addressLocation.street_apartment,
                phone: type === 'billing' ? user.phone : "",
                email: type === 'billing' ? user.email : ""
            });
            setActiveCountry(addressLocation.country);
        };
        fetchData();
    }, [type, cookie]);

    const handleClick = async (e) => {
        alertMessage('Please wait, do not reload the page');
        e.preventDefault();
        const { data } = await supabase.from('users').select();
        const user = data.find(({ token }) => token === cookie['cookie-user']);
        const addressLocation = type + "_address";
        const updateData = {
            first_name: userInfo.fName,
            last_name: userInfo.lName,
            [addressLocation]: {
                shipping: [
                    {
                        company_name: userInfo.company_name,
                        country: activeCountry,
                        street_house: userInfo.street_house,
                        street_apartment: userInfo.street_apartment,
                        town_city: userInfo.town_city,
                        state_county: userInfo.state_county,
                        postcode_zip: userInfo.postcode_zip
                    }
                ]
            }
        };
        if (type === 'billing') {
            updateData.phone = userInfo.phone;
            updateData.email = userInfo.email;
        }
        const { error } = await supabase.from('users').update(updateData).eq('token', user.token);
        window.location.reload();
    };

    return (
        <>
            <h1>{h1}</h1>
            <form id='address' action="">
                <div className="input-container">
                    <label htmlFor="fName">FIRST NAME*</label>
                    <input name="fName" value={userInfo.fName} onChange={handleChange} type="text" />
                </div>
                <div className="input-container">
                    <label htmlFor="lName">LAST NAME*</label>
                    <input name="lName" value={userInfo.lName} onChange={handleChange} type="text" />
                </div>
                <div className="input-container">
                    <label htmlFor="company_name">COMPANY NAME(OPTIONAL)</label>
                    <input name="company_name" value={userInfo.company_name} onChange={handleChange} type="text" />
                </div>
                <div className='input-container'>
                    <label>COUNTRY / REGION</label>
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
                <div className="input-container">
                    <label htmlFor="street_house">STREET ADDRESS*</label>
                    <input name="street_house" value={userInfo.street_house} onChange={handleChange} className='house-input' placeholder='House number and street name' type="text" />
                    <input name="street_apartment" value={userInfo.street_apartment} onChange={handleChange} placeholder='Apartment, suite, unit, etc. (optional)' type="text" />
                </div>
                <div className="input-container">
                    <label htmlFor="town_city">TOWN / CITY*</label>
                    <input name="town_city" value={userInfo.town_city} onChange={handleChange} type="text" />
                </div>
                <div className="input-container">
                    <label htmlFor="state_county">STATE COUNTY*</label>
                    <input name="state_county" value={userInfo.state_county} onChange={handleChange} type="text" />
                </div>
                <div className="input-container">
                    <label htmlFor="postcode_zip">POSTCODE / ZIP*</label>
                    <input name="postcode_zip" value={userInfo.postcode_zip} onChange={handleChange} type="text" />
                </div>
                {type === 'billing' &&
                    <>
                        <div className="input-container">
                            <label htmlFor="phone">PHONE*</label>
                            <input name="phone" value={userInfo.phone} onChange={handleChange} type="text" />
                        </div>
                        <div className="input-container">
                            <label htmlFor="email">EMAIL ADDRESS*</label>
                            <input name="email" value={userInfo.email} onChange={handleChange} type="text" />
                        </div>
                    </>
                }
                <div className="btn-container">
                    <button onClick={handleClick}>SAVE ADDRESS</button>
                </div>
            </form>
        </>
    );
};

export default AddressComp;
