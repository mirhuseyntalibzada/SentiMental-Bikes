import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import supabase from '../config/connect'
import { useRef } from 'react'
import AdminPanel from './AdminPanel'
import { useContext } from 'react'
import { ModeContext } from '../context/ModeContext'

const MyAccountComp = () => {
    
    const [cookie, setCookies, deleteCookie] = useCookies(['cookie-user'])
    const adminToken = "7c1a32ca-24c4-495e-bb5d-114ba449fb20"
    const [isAdmin, setAdmin] = useState(false)
    const [mode] = useContext(ModeContext)

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


    const [active, setActive] = useState('dashboard')
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section className={`account-section ${mode==='dark'?'dark':''}`} id='account-section'>
            <div className="box-container">
                <div className="green-box"></div>
                <div className="white-box"></div>
            </div>
            <div className="container">
                <div className="account-container">
                    <div className="ul-container">
                        <ul>
                            {isAdmin ?
                                <li className={`${active === 'adminPanel' ? 'active' : ''}`} onClick={() => { setSection('adminPanel') }}><div><a href="#!">Admin Panel</a><i className="fa-solid fa-hammer"></i></div></li>
                                : ''}
                            <li className={`${active === 'dashboard' ? 'active' : ''}`} onClick={() => { setSection('dashboard') }}><div><a href="#!">Dashboard</a><i className="fa-solid fa-gauge" /></div></li>
                            <li className={`${active === 'orders' ? 'active' : ''}`} onClick={() => { setSection('orders') }}><div><a href="#!">Orders</a><i className="fa-solid fa-bag-shopping" /></div></li>
                            <li className={`${active === 'addresses' ? 'active' : ''}`} onClick={() => { setSection('addresses') }}><div><a href="#!">Addresses</a><i className="fa-solid fa-house" /></div></li>
                            <li className={`${active === 'details' ? 'active' : ''}`} onClick={() => { setSection('details') }}><div><a href="#!">Account details</a><i className="fa-solid fa-user" /></div></li>
                            <li className={`${active === 'vat' ? 'active' : ''}`} onClick={() => { setSection('vat') }}><div><a href="#!">VAT number</a></div></li>
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
                            <p>From your account dashboard you can view your <a href="#!">recent orders</a>, manage your <a href="#!">shipping and billing addresses</a>, and <a href="#!">edit your password and account details</a>.</p>
                        </div>
                        <div style={active === 'orders' ? { display: "block" } : { display: "none" }} className="orders-text-container">
                            <p>No orders has been made yet. <a href="#!">Browse products</a></p>
                        </div>
                        <div style={active === 'addresses' ? { display: "block" } : { display: "none" }} className="addresses-text-container">
                            <p>The following addresses will be used on the checkout page by default.</p>
                            <div className="div-container">
                                <div>
                                    <h1>Billing address</h1>
                                    <a href="#!">Add</a>
                                    <p>You have not set up this type of address yet</p>
                                </div>
                                <div>
                                    <h1>Shipping address</h1>
                                    <a href="#!">Add</a>
                                    <p>You have not set up this type of address yet</p>
                                </div>
                            </div>
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
                                <label htmlFor="">Current password (leave blank to leave unchanged)</label>
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
                                <label htmlFor="">New password (leave blank to leave unchanged)</label>
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