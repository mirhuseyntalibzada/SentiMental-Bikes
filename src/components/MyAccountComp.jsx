import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import supabase from '../config/connect'
import { useRef } from 'react'
import AdminPanel from './AdminPanel'
import { useContext } from 'react'
import { ModeContext } from '../context/ModeContext'
import { NavLink } from 'react-router-dom'
import AddressComp from './AddressComp'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

const MyAccountComp = () => {

    const [cookie, setCookies, deleteCookie] = useCookies(['cookie-user'])
    const adminToken = "7c1a32ca-24c4-495e-bb5d-114ba449fb20"
    const [isAdmin, setAdmin] = useState(false)
    const [mode] = useContext(ModeContext)
    const orders = useSelector((state) => state.cart.orders)

    useEffect(() => {
        const checkAdmin = () => {
            if (cookie['cookie-user'] === adminToken) {
                setAdmin(true);
            }
        }
        checkAdmin()
    }, [cookie])

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([])
    useEffect(() => {
        async function fetchProducts() {
            let { data, error } = await supabase
                .from('products')
                .select('*');
            if (error) console.error('Error fetching products:', error);
            else setProducts(data);
            setLoading(false);
        }
        fetchProducts();
    }, []);


    const [active, setActive] = useState('')

    useEffect(() => {
        setActive(isAdmin ? 'adminPanel' : 'dashboard');
    }, [isAdmin]);

    const [user, setUser] = useState('null')
    const [fName, setFName] = useState('')
    const [lName, setLName] = useState('')
    const [email, setEmail] = useState('')
    const passwordRef = useRef(null)
    const oldPasswordRef = useRef(null)
    const newPasswordRef = useRef(null)
    const [prevVisibilityInputs, setVisibilityInputs] = useState([false, false, false])

    const setSection = (section) => {
        setActive(section)
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase.from('users').select()
            const currentUser = data.find(item => item.token === cookie['cookie-user'])
            setUser(currentUser.username);
            setFName(currentUser.first_name)
            setLName(currentUser.last_name)
            setEmail(currentUser.email)
        }
        fetchData()
    }, [cookie])

    const updateData = async () => {
        const { data } = await supabase.from('users').select()
        const currentUser = data.find(item => item.token === cookie['cookie-user'])
        if (fName && lName && user && email) {
            if (oldPasswordRef.current.value === currentUser.password) {
                if (newPasswordRef.current.value === passwordRef.current.value) {
                    const { error } = await supabase.from('users').update({
                        first_name: fName,
                        last_name: lName,
                        username: user,
                        email: email,
                        password: passwordRef.current.value
                    }).eq('token', currentUser.token);
                    if (error) {
                        console.error('Error updating wishlist:', error);
                    }
                    window.location.reload()
                    deleteCookie(['cookie-user']);
                } else {
                    alert('The new passwords you entered do not match. Please try again.')
                }
            } else {
                alert('The current password you entered is incorrect. Please try again.')
            }
        } else {
            alert('no')
        }

    }

    const toggleVisibilityInput = (index) => {
        setVisibilityInputs(prevVisibilityInputs =>
            prevVisibilityInputs.map((visible, i) => (i === index ? !visible : visible))
        );
    }

    const [addressType, setAddressType] = useState(null)
    const [isContainerVisible, setIsContainerVisible] = useState(true)
    useEffect(() => {
        setIsContainerVisible(true)
        setAddressType(null)
    }, [])
    const handleAddClick = (type) => {
        setIsContainerVisible(false)
        setAddressType(type)
    }

    const [edit, setEdit] = useState({
        billing: false,
        shipping: false
    })

    const [userShippingAddress, setUserShippingAddress] = useState({
        country: "",
        town_city: "",
        company_name: "",
        postcode_zip: "",
        state_county: "",
        street_house: "",
        street_apartment: ""
    })

    const [userBillingAddress, setUserBillingAddress] = useState({
        country: "",
        town_city: "",
        company_name: "",
        postcode_zip: "",
        state_county: "",
        street_house: "",
        street_apartment: ""
    })

    const [userCredentials, setUserCredentials] = useState({
        fName: '',
        lName: ''
    })

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase.from('users').select();
            const user = data.find(({ token }) => token === cookie['cookie-user']);
            const shippingAddressLocation = user['shipping_address'].shipping[0]
            const billingAddressLocation = user['billing_address'].shipping[0]
            setEdit({
                billing: !!user?.billing_address,
                shipping: !!user?.shipping_address
            });

            setUserShippingAddress({
                country: shippingAddressLocation.country,
                town_city: shippingAddressLocation.town_city,
                company_name: shippingAddressLocation.company_name,
                postcode_zip: shippingAddressLocation.postcode_zip,
                state_county: shippingAddressLocation.state_county,
                street_house: shippingAddressLocation.street_house,
                street_apartment: shippingAddressLocation.street_apartment
            })

            setUserBillingAddress({
                country: billingAddressLocation.country,
                town_city: billingAddressLocation.town_city,
                company_name: billingAddressLocation.company_name,
                postcode_zip: billingAddressLocation.postcode_zip,
                state_county: billingAddressLocation.state_county,
                street_house: billingAddressLocation.street_house,
                street_apartment: billingAddressLocation.street_apartment
            })

            setUserCredentials({
                fName: user.first_name,
                lName: user.last_name,
            })
        };

        fetchData();
    }, []);

    const { t, i18n: { changeLanguage, language } } = useTranslation();

    if (loading) {
        return (
            <>
                <div className={`loader-container ${mode === 'dark' ? 'dark' : ''}`}>
                    <div className='loader'></div>
                </div>
            </>
        );
    }

    return (
        <section className={`account-section ${mode === 'dark' ? 'dark' : ''}`} id='account-section'>
            <div className="box-container">
                <div className="green-box"></div>
                <div className="white-box"></div>
            </div>
            <div className="container">
                <div className="account-container">
                    <div className="ul-container">
                        <ul>
                            {isAdmin ?
                                <li className={`${active === 'adminPanel' ? 'active' : ''}`} onClick={() => {
                                    setSection('adminPanel'); setIsContainerVisible(true)
                                    setAddressType(null)
                                }}><div><a href="#!">Admin Panel</a><i className="fa-solid fa-hammer"></i></div></li>
                                : ''}
                            <li className={`${active === 'dashboard' ? 'active' : ''}`} onClick={() => {
                                setSection('dashboard'); setIsContainerVisible(true)
                                setAddressType(null)
                            }}><div><a href="#!">{t('myAccountComp.a.1')}</a><i className="fa-solid fa-gauge" /></div></li>
                            <li className={`${active === 'orders' ? 'active' : ''}`} onClick={() => {
                                setSection('orders'); setIsContainerVisible(true)
                                setAddressType(null)
                            }}><div><a href="#!">{t('myAccountComp.a.2')}</a><i className="fa-solid fa-bag-shopping" /></div></li>
                            <li className={`${active === 'addresses' ? 'active' : ''}`} onClick={() => {
                                setSection('addresses'); setIsContainerVisible(true)
                                setAddressType(null)
                            }}><div><a href="#!">{t('myAccountComp.a.3')}</a><i className="fa-solid fa-house" /></div></li>
                            <li className={`${active === 'details' ? 'active' : ''}`} onClick={() => {
                                setSection('details'); setIsContainerVisible(true)
                                setAddressType(null)
                            }}><div><a href="#!">{t('myAccountComp.a.4')}</a><i className="fa-solid fa-user" /></div></li>
                            <li className={`${active === 'vat' ? 'active' : ''}`} onClick={() => {
                                setSection('vat'); setIsContainerVisible(true)
                                setAddressType(null)
                            }}><div><a href="#!">{t('myAccountComp.a.5')}</a></div></li>
                            <li className={`${active === 'log-out' ? 'active' : ''}`} onClick={() => {
                                setSection('log-out')
                                deleteCookie(['cookie-user'])
                                window.location.reload()
                            }}><div><a href="#">{t('myAccountComp.a.6')}</a><i className="fa-solid fa-right-from-bracket" /></div></li>
                        </ul>
                    </div>
                    <div className="content-container">
                        {isAdmin ?
                            <AdminPanel active={active} products={products} />
                            : ''}
                        <div style={active === 'dashboard' ? { display: "block" } : { display: "none" }} className="dashboard-text-container">
                            <p>{language === "en" ? 'Hello' : 'Salam'} <strong>{user}</strong> ({language === "en" ? 'not' : ''} <strong>{user}</strong> {language === "en" ? '' : 'deyilsiniz'}? <a onClick={() => {
                                deleteCookie(['cookie-user'])
                                window.location.reload()
                            }} href="#!">{t('myAccountComp.a.6')}</a> )</p>
                            {language === 'en'
                                ?
                                <p>From your account dashboard you can view your <a onClick={() => { setSection('orders') }} href="#!">recent orders</a>, manage your <a onClick={() => { setSection('addresses') }} href="#!">shipping and billing addresses</a>, and <a onClick={() => { setSection('details') }} href="#!">edit your password and account details</a>.</p>
                                :
                                <p>Hesabınızın idarəetmə panelində son <a onClick={() => { setSection('orders') }} href="#!">sifarişlərinizə</a> baxa, <a onClick={() => { setSection('addresses') }} href="#!">göndərmə və ödəniş ünvanlarınızı</a> idarə edə, <a onClick={() => { setSection('details') }} href="#!">şifrənizi və hesab məlumatlarınızı</a> düzəldə bilərsiniz.</p>
                            }
                        </div>
                        <div style={active === 'orders' ? { display: "block" } : { display: "none" }} className="orders-text-container">
                            {orders ?
                                orders.map((item, i) => (
                                    <div key={i} className="product-card">
                                        <div className="img-text-container">
                                            <div className="img-container">
                                                {item.img ?
                                                    <img src={`${item.img[0]}`} alt="" />
                                                    :
                                                    <img src={`/src/images/bicycles/handlebars/${item.handle_color}/bicycle-color/${item.bicycle_color}.png`} alt="" />
                                                }
                                            </div>
                                            <div className="text-container">
                                                <div className="category-name">
                                                    <h6>{t('myAccountComp.h6-1')}</h6>
                                                    {item.img ?
                                                        <p>{item.name.toUpperCase()}</p>
                                                        :
                                                        <p>SentiMental {t('myAccountComp.p-1')}</p>
                                                    }
                                                </div>
                                                <div className="category-name">
                                                    {item.img ?
                                                        <>
                                                            <h6>{t('myAccountComp.h6-1')}</h6>
                                                            <p>{item.category}</p>
                                                        </>
                                                        :
                                                        <>
                                                            <h6>{t('myAccountComp.h6-3')}</h6>
                                                            <p>{item.bicycle_color}</p>
                                                        </>
                                                    }
                                                </div>
                                                {item.img ?
                                                    ''
                                                    :
                                                    <div className="category-name">
                                                        <h6>{t('myAccountComp.h6-4')}</h6>
                                                        <p>{item.bicycle_color}</p>
                                                    </div>
                                                }
                                                <div className="category-name">
                                                    <h6>{t('myAccountComp.h6-5')}</h6>
                                                    <p>{item.quantity}</p>
                                                </div>
                                                <div className="price-quantity-container">
                                                    <div>
                                                        <h5>{t('myAccountComp.h5')} €{item.quantity * item.price}.00</h5>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                :
                                language === 'en'
                                    ?
                                    <p>No orders has been made yet. <NavLink to={"/configure-a-bike"}>Browse products</NavLink></p>
                                    :
                                    <p>Heç bir sifariş edilməyib. <NavLink to={"/configure-a-bike"}>Məhsullara baxın</NavLink></p>
                            }
                        </div>
                        <div style={active === 'addresses' ? { display: "block" } : { display: "none" }} className="addresses-text-container">
                            {isContainerVisible ? '' :
                                addressType === 'billing' ?
                                    <AddressComp h1={'Billing address'} type={'billing'} />
                                    :
                                    <AddressComp h1={'Shipping Address'} type={'shipping'} />
                            }
                            {isContainerVisible ?
                                <>
                                    <p>{t('myAccountComp.p-2')}</p>
                                    <div className="div-container">
                                        <div>
                                            <h1>{t('myAccountComp.h1-1')}</h1>
                                            <a onClick={() => { handleAddClick('billing') }} href="#!">{edit.billing ? "Edit" : "Add"}</a>
                                            {edit.billing
                                                ?
                                                <>
                                                    <p>{userBillingAddress.company_name}</p>
                                                    <p>{`${userCredentials.fName} ${userCredentials.lName}`}</p>
                                                    <p>{userBillingAddress.street_house}</p>
                                                    <p>{userBillingAddress.street_apartment}</p>
                                                    <p>{`${userBillingAddress.postcode_zip} ${userBillingAddress.town_city}`}</p>
                                                    <p>{userBillingAddress.country}</p>
                                                </>
                                                :
                                                <p>{t('myAccountComp.p-3')}</p>
                                            }
                                        </div>
                                        <div>
                                            <h1>{t('myAccountComp.h1-2')}</h1>
                                            <a onClick={() => { handleAddClick('shipping') }} href="#!">{edit.shipping ? "Edit" : "Add"}</a>
                                            {edit.billing
                                                ?
                                                <>
                                                    <p>{userShippingAddress.company_name}</p>
                                                    <p>{`${userCredentials.fName} ${userCredentials.lName}`}</p>
                                                    <p>{userShippingAddress.street_house}</p>
                                                    <p>{userShippingAddress.street_apartment}</p>
                                                    <p>{`${userShippingAddress.postcode_zip} ${userShippingAddress.town_city}`}</p>
                                                    <p>{userShippingAddress.country}</p>
                                                </>
                                                :
                                                <p>{t('myAccountComp.p-3')}</p>
                                            }
                                        </div>
                                    </div>
                                </>
                                : ''}
                        </div>
                        <div style={active === 'details' ? { display: "block" } : { display: "none" }} className="details-text-container">
                            <div className="input-container">
                                <label htmlFor="">{t('myAccountComp.label-1')}*</label>
                                <input value={fName} onChange={(e) => setFName(e.target.value)} type="text" />
                            </div>
                            <div className="input-container">
                                <label htmlFor="">{t('myAccountComp.label-2')}*</label>
                                <input value={lName} onChange={(e) => setLName(e.target.value)} type="text" />
                            </div>
                            <div className="input-container">
                                <label htmlFor="">{t('myAccountComp.label-1')}*</label>
                                <input value={user} onChange={(e) => setUser(e.target.value)} type="text" />
                                <span>{t('myAccountComp.span-1')}</span>
                            </div>
                            <div className="input-container">
                                <label htmlFor="">{t('myAccountComp.label-4')}*</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
                            </div>
                            <h1>{t('myAccountComp.h1-3')}</h1>
                            <div className="input-container">
                                <label htmlFor="">{t('myAccountComp.label-5')}</label>
                                <div className='password-container'>
                                    <input ref={oldPasswordRef} type={`${prevVisibilityInputs[0] ? "text" : "password"}`} />
                                    <div className='eye-btn-container'>
                                        <button type='button' className='eye-btn' onClick={(e) => {
                                            e.preventDefault()
                                            toggleVisibilityInput(0)
                                        }}>
                                            {
                                                <>
                                                    {prevVisibilityInputs[0] ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}
                                                </>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="input-container">
                                <label htmlFor="">{t('myAccountComp.label-6')}</label>
                                <div className='password-container'>
                                    <input ref={newPasswordRef} type={`${prevVisibilityInputs[1] ? "text" : "password"}`} />
                                    <div className='eye-btn-container'>
                                        <button type='button' className='eye-btn' onClick={(e) => {
                                            e.preventDefault()
                                            toggleVisibilityInput(1)
                                        }}>
                                            {
                                                <>
                                                    {prevVisibilityInputs[1] ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}
                                                </>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="input-container">
                                <label htmlFor="">{t('myAccountComp.label-7')}</label>
                                <div className='password-container'>
                                    <input ref={passwordRef} type={`${prevVisibilityInputs[2] ? "text" : "password"}`} />
                                    <div className='eye-btn-container'>
                                        <button type='button' className='eye-btn' onClick={(e) => {
                                            e.preventDefault()
                                            toggleVisibilityInput(2)
                                        }}>
                                            {
                                                <>
                                                    {prevVisibilityInputs[2] ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}
                                                </>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-container">
                                <button type='submit' onClick={() => {
                                    updateData();
                                }}>
                                    {t('myAccountComp.button-1')}
                                </button>
                            </div>
                        </div>
                        <div style={active === 'vat' ? { display: "flex" } : { display: "none" }} className="vat-text-container">
                            <div className='input-container'>
                                <label htmlFor="">{t('myAccountComp.label-8')}R</label>
                                <input type="text" />
                            </div>
                            <div className='btn-container'>
                                <button>{t('myAccountComp.button-2')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default MyAccountComp