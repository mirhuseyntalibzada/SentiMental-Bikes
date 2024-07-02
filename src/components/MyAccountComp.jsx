import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import supabase from '../config/connect'

const MyAccountComp = () => {
    const [active, setActive] = useState('dashboard')
    const [cookie, setCookies, deleteCookie] = useCookies(['cookie-user'])
    const [user, setUser] = useState(null)

    const setSection = (section) => {
        setActive(section)
    }

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await supabase.from('users').select()
            const currentUser = data.find(item => item.token === cookie['cookie-user'])
            setUser(currentUser.username);
        }
        fetchData()
    }, [cookie])
    return (
        <section id='account-section'>
            <div className="box-container">
                <div className="green-box"></div>
                <div className="white-box"></div>
            </div>
            <div className="container">
                <div className="account-container">
                    <div className="ul-container">
                        <ul>
                            <li className={`${active === 'dashboard' ? 'active' : ''}`} onClick={() => { setSection('dashboard') }}><div><a href="#">Dashboard</a><i className="fa-solid fa-gauge" /></div></li>
                            <li className={`${active === 'orders' ? 'active' : ''}`} onClick={() => { setSection('orders') }}><div><a href="#">Orders</a><i className="fa-solid fa-bag-shopping" /></div></li>
                            <li className={`${active === 'addresses' ? 'active' : ''}`} onClick={() => { setSection('addresses') }}><div><a href="#">Addresses</a><i className="fa-solid fa-house" /></div></li>
                            <li className={`${active === 'details' ? 'active' : ''}`} onClick={() => { setSection('details') }}><div><a href="#">Account details</a><i className="fa-solid fa-user" /></div></li>
                            <li className={`${active === 'vat' ? 'active' : ''}`} onClick={() => { setSection('vat') }}><div><a href="#">VAT number</a></div></li>
                            <li className={`${active === 'log-out' ? 'active' : ''}`} onClick={() => {
                                setSection('log-out')
                                deleteCookie(['cookie-user'])
                                window.location.reload()
                            }}><div><a href="#">Log out</a><i className="fa-solid fa-right-from-bracket" /></div></li>
                        </ul>
                    </div>
                    <div className="content-container">
                        <div className="text-container">
                            <p>Hello <strong>{user}</strong> (not <strong>{user}</strong>? <a onClick={() => {
                                deleteCookie(['cookie-user'])
                                window.location.reload()
                            }} href="#!">Log out</a> )</p>
                            <p>From your account dashboard you can view your <a href="#!">recent orders</a>, manage your <a href="#!">shipping and billing addresses</a>, and <a href="#!">edit your password and account details</a>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default MyAccountComp