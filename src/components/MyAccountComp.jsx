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
                            }}><div><a href="#!">Dashboard</a><i className="fa-solid fa-gauge" /></div></li>
                            <li className={`${active === 'orders' ? 'active' : ''}`} onClick={() => {
                                setSection('orders'); setIsContainerVisible(true)
                                setAddressType(null)
                            }}><div><a href="#!">Orders</a><i className="fa-solid fa-bag-shopping" /></div></li>
                            <li className={`${active === 'addresses' ? 'active' : ''}`} onClick={() => {
                                setSection('addresses'); setIsContainerVisible(true)
                                setAddressType(null)
                            }}><div><a href="#!">Addresses</a><i className="fa-solid fa-house" /></div></li>
                            <li className={`${active === 'details' ? 'active' : ''}`} onClick={() => {
                                setSection('details'); setIsContainerVisible(true)
                                setAddressType(null)
                            }}><div><a href="#!">Account details</a><i className="fa-solid fa-user" /></div></li>
                            <li className={`${active === 'vat' ? 'active' : ''}`} onClick={() => {
                                setSection('vat'); setIsContainerVisible(true)
                                setAddressType(null)
                            }}><div><a href="#!">VAT number</a></div></li>
                            <li className={`${active === 'log-out' ? 'active' : ''}`} onClick={() => {
                                setSection('log-out')
                                deleteCookie(['cookie-user'])
                                window.location.reload()
                            }}><div><a href="#">Log out</a><i className="fa-solid fa-right-from-bracket" /></div></li>
                        </ul>
                    </div>
                    <div className="content-container">
                        {isAdmin ?
                            <AdminPanel active={active} products={products} />
                            : ''}
                        <div style={active === 'dashboard' ? { display: "block" } : { display: "none" }} className="dashboard-text-container">
                            <p>Hello <strong>{user}</strong> (not <strong>{user}</strong>? <a onClick={() => {
                                deleteCookie(['cookie-user'])
                                window.location.reload()
                            }} href="#!">Log out</a> )</p>
                            <p>From your account dashboard you can view your <a onClick={() => { setSection('orders') }} href="#!">recent orders</a>, manage your <a onClick={() => { setSection('addresses') }} href="#!">shipping and billing addresses</a>, and <a onClick={() => { setSection('details') }} href="#!">edit your password and account details</a>.</p>
                        </div>
                        <div style={active === 'orders' ? { display: "block" } : { display: "none" }} className="orders-text-container">
                            {orders ?
                                orders.map((item, i) => (
                                    <div key={i} className="product-card">
                                        <div className="img-text-container">
                                            <div className="img-container">
                                                {/* <img src={`${item.img[0]}`} alt="" /> */}
                                            </div>
                                            <div className="text-container">
                                                <div className="category-name">
                                                    <h6>Product Name:</h6>
                                                    {/* <p>{item.name.toUpperCase()}</p> */}
                                                </div>
                                                <div className="category-name">
                                                    <h6>Product Category:</h6>
                                                    {/* <p>{item.category}</p> */}
                                                </div>
                                                <div className="category-name">
                                                    <h6>Product Type:</h6>
                                                    {/* <p>{item.type}</p> */}
                                                </div>
                                                <div className="price-quantity-container">
                                                    <div>
                                                        {/* <h5>€{item.price}.00</h5> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="delete" onClick={() => { handleRemoveItem(item.id); alertMessage("Please wait, do not reload the page", 5000) }}>
                                            <i className="fa-solid fa-x"></i>
                                        </div>
                                    </div>
                                ))
                                :
                                <p>No orders has been made yet. <NavLink to={"/configure-a-bike"}>Browse products</NavLink></p>
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
                                    <p>The following addresses will be used on the checkout page by default.</p>
                                    <div className="div-container">
                                        <div>
                                            <h1>Billing address</h1>
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
                                                <p>You have not set up this type of address yet</p>
                                            }
                                        </div>
                                        <div>
                                            <h1>Shipping address</h1>
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
                                                <p>You have not set up this type of address yet</p>
                                            }
                                        </div>
                                    </div>
                                </>
                                : ''}
                        </div>
                        <div style={active === 'details' ? { display: "block" } : { display: "none" }} className="details-text-container">
                            <div className="input-container">
                                <label htmlFor="">FIRST NAME*</label>
                                <input value={fName} onChange={(e) => setFName(e.target.value)} type="text" />
                            </div>
                            <div className="input-container">
                                <label htmlFor="">LAST NAME*</label>
                                <input value={lName} onChange={(e) => setLName(e.target.value)} type="text" />
                            </div>
                            <div className="input-container">
                                <label htmlFor="">DISPLAY NAME*</label>
                                <input value={user} onChange={(e) => setUser(e.target.value)} type="text" />
                                <span>This will be how your name will be displayed in the account section and in reviews</span>
                            </div>
                            <div className="input-container">
                                <label htmlFor="">EMAIL ADDRESS*</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" />
                            </div>
                            <h1>Password change</h1>
                            <div className="input-container">
                                <label htmlFor="">Current password (Old password)</label>
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
                                <label htmlFor="">New password</label>
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
                                <label htmlFor="">Confirm new password</label>
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
                                    SAVE CHANGES
                                </button>
                            </div>
                        </div>
                        <div style={active === 'vat' ? { display: "flex" } : { display: "none" }} className="vat-text-container">
                            <div className='input-container'>
                                <label htmlFor="">VAT NUMBER</label>
                                <input type="text" />
                            </div>
                            <div className='btn-container'>
                                <button>SAVE</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default MyAccountComp