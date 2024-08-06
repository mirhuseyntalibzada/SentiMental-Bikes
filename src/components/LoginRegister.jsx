import React from 'react'
import { useRef, useState } from 'react'
import supabase from '../config/connect'
import { useCookies } from 'react-cookie'
import { useContext } from 'react'
import { ModeContext } from '../context/ModeContext'
import { useTranslation } from 'react-i18next'

const LoginRegister = () => {
    const [visibilityLogin, setVisibilityLogin] = useState(false)
    const [visibilityRegister, setVisibilityRegister] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const userName = useRef(null)
    const userEmail = useRef(null)
    const password = useRef(null)
    const loginCredential = useRef(null)
    const loginPassword = useRef(null)
    const [cookies, setCookies] = useCookies(['cookie-user'])

    const toggleVisibilityLogin = () => {
        setVisibilityLogin(!visibilityLogin)
    }

    const toggleVisibilityRegister = () => {
        setVisibilityRegister(!visibilityRegister)
    }

    const loginUser = async () => {
        const { data } = await supabase.from('users').select();
        const user = data.find(item =>
            (item.username === (loginCredential.current.value) ||
                item.email === (loginCredential.current.value)) &&
            item.password === loginPassword.current.value
        );
        if (user) {
            setErrorMessage('success');
            setCookies('cookie-user', user.token)
            window.location.reload()
        } else {
            if (loginCredential.current.value.includes("@")) {
                setErrorMessage(`Error: The password you entered for the email ${loginCredential.current.value} is incorrect. Lost your password?`);
            } else {
                setErrorMessage(`Error: The password you entered for the username ${loginCredential.current.value} is incorrect. Lost your password?`);
            }
        }

    }

    const registerUser = async () => {
        const { error } = await supabase.from('users').insert({
            username: userName.current.value,
            email: userEmail.current.value,
            password: password.current.value,
            token: crypto.randomUUID()
        })
        if (error) {
            setErrorMessage('error');
        } else {
            setErrorMessage("success");
            userName.current.value = ''
            userEmail.current.value = ''
            password.current.value = ''
        }
    }

    const registerSubmitted = async (e) => {
        e.preventDefault()
        if (!userName.current.value || !userEmail.current.value || !password.current.value) {
            setErrorMessage('Error: Please provide valid credentials.');
        } else {
            const { data } = await supabase.from('users').select();
            data.length === 0 ? registerUser() : data.find(item => item.email === userEmail.current.value) ? setErrorMessage('This email is already registered!') : registerUser()
        }
    }

    const loginSubmitted = async (e) => {
        e.preventDefault()
        if (!loginCredential.current.value) {
            setErrorMessage('Error: Username is required.');
        } else {
            loginUser()
        }
    }

    const [mode] = useContext(ModeContext)
    const { t, i18n: { changeLanguage, language } } = useTranslation();

    return (
        <section className={`login-register-section ${mode === 'dark' ? 'dark' : ''}`} id='login-register-section'>
            <div className="box-container">
                <div className="green-box"></div>
                <div className="white-box"></div>
            </div>
            <div className="container">
                <div className="error-message-container">
                    {errorMessage ? <div className='error-message' style={errorMessage === "success" ? { backgroundColor: "green" } : { backgroundColor: "rgb(226, 49, 48)" }}>
                        <p>{errorMessage}</p>
                    </div> : ''}
                </div>
                <div className="login-register">
                    <div className="login">
                        <div className="login-container">
                            <h2>Login</h2>
                            <form onSubmit={loginSubmitted} action="">
                                <label className='input-label' htmlFor="">{t('loginRegister.label-1')} {language==="en"?'OR':'YA DA'} {t('loginRegister.label-2')} <span>*</span></label>
                                <div>
                                    <input ref={loginCredential} type="text" />
                                </div>
                                <label className='input-label' htmlFor="">{t('loginRegister.label-3')} <span>*</span></label>
                                <div className='password-container'>
                                    <input ref={loginPassword} type={`${visibilityLogin ? "text" : "password"}`} />
                                    <div className='eye-btn-container'>
                                        <button type='button' className='eye-btn' onClick={(e) => {
                                            e.preventDefault()
                                            toggleVisibilityLogin()
                                        }}>
                                            {
                                                <>
                                                    {visibilityLogin ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}
                                                </>
                                            }
                                        </button>
                                    </div>
                                </div>
                                <div className='remember-password-container'>
                                    <div className='remember-me'>
                                        <input type="checkbox" name="" id="" />
                                        <label htmlFor="">{t('loginRegister.label-4')}</label>
                                    </div>
                                    <div className='lost-password'>
                                        <a href="#">{t('loginRegister.a')}</a>
                                    </div>
                                </div>
                                <div className='button-container'>
                                    <button onClick={() => {
                                        window.innerWidth > 768 ? window.scrollTo(0, 430) : window.scrollTo(0, 150)
                                    }} type='submit'>{t('loginRegister.button-1')}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="register">
                        <div className="register-container">
                            <h2>Register</h2>
                            <form onSubmit={registerSubmitted} action="">
                                <label className='input-label' htmlFor="">{t('loginRegister.label-1')}<span>*</span></label>
                                <div>
                                    <input ref={userName} type="text" />
                                </div>
                                <label className='input-label' htmlFor="">{t('loginRegister.label-2')} <span>*</span></label>
                                <div>
                                    <input ref={userEmail} type="email" />
                                </div>
                                <label className='input-label' htmlFor="">{t('loginRegister.label-3')} <span>*</span></label>
                                <div className='password-container'>
                                    <input className='password-input' ref={password} type={`${visibilityRegister ? "text" : "password"}`} />
                                    <div className='eye-btn-container'>
                                        <button type='button' className='eye-btn' onClick={(e) => {
                                            e.preventDefault()
                                            toggleVisibilityRegister()
                                        }}>
                                            {
                                                <>
                                                    {visibilityRegister ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}
                                                </>
                                            }
                                        </button>
                                    </div>
                                </div>
                                <div className='privacy-policy'>
                                    <p>{t('loginRegister.p.1')} <a href="#">{t('loginRegister.p.2')}</a></p>
                                </div>
                                <div className='button-container'>
                                    <button onClick={() => { window.innerWidth > 768 ? window.scrollTo(0, 430) : window.scrollTo(0, 150) }} type='submit'>{t('loginRegister.button')}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginRegister