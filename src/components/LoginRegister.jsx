import React from 'react'
import { useRef, useState } from 'react'
import supabase from '../config/connect'
import { useCookies } from 'react-cookie'

const LoginRegister = () => {
    const [visibilityLogin, setVisibilityLogin] = useState(false)
    const [visibilityRegister, setVisibilityRegister] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const userName = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const loginCredential = useRef(null)
    const loginPassword = useRef(null)
    const [cookies, setCookies] = useCookies(['cookie-user']) // cookie

    const toggleVisibilityLogin = () => {
        setVisibilityLogin(!visibilityLogin)
    }

    const toggleVisibilityRegister = () => {
        setVisibilityRegister(!visibilityRegister)
    }

    const registerSubmitted = async (e) => {
        e.preventDefault()
        if (!userName.current.value || !email.current.value || !password.current.value) {
            setErrorMessage('Error: Please provide valid credentials.');
        } else {
            const { error } = await supabase.from('users').insert({
                username: userName.current.value,
                email: email.current.value,
                password: password.current.value,
                token: crypto.randomUUID() // cookie
            })
            if (error) {
                setErrorMessage('error');
            } else {
                setErrorMessage("success");
            }
        }
    }


    const loginSubmitted = async (e) => {
        e.preventDefault()
        const { data } = await supabase.from('users').select();
        if (!loginCredential.current.value) {
            setErrorMessage('Error: Username is required.');
        } else {
            data.map(item => {
                if ((item.username === loginCredential.current.value || item.email === loginCredential.current.value) && item.password === loginPassword.current.value) {
                    setErrorMessage('success');
                    setCookies('cookie-user', item.token)
                } else {
                    if (loginCredential.current.value.slice(loginCredential.current.value.indexOf("@"), loginCredential.current.value.indexOf("@") + 1) === "@") {
                        setErrorMessage(`Error: The password you entered for the email ${loginCredential.current.value} is incorrect. Lost your password?`);
                    } else {
                        setErrorMessage(`Error: The password you entered for the username ${loginCredential.current.value} is incorrect. Lost your password?`);
                    }
                }
            })
        }
        console.log(data.filter(item => item.token === cookies['cookie-user'])); // cookie
    }

    return (
        <section id='login-register-section'>
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
                                <label className='input-label' htmlFor="">USERNAME OR EMAIL ADDRESS <span>*</span></label>
                                <div>
                                    <input ref={loginCredential} type="text" />
                                </div>
                                <label className='input-label' htmlFor="">PASSWORD <span>*</span></label>
                                <div className='password-container'>
                                    <input ref={loginPassword} type={`${visibilityLogin ? "text" : "password"}`} />
                                    <div>
                                        <button className='eye-btn' onClick={(e) => {
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
                                        <label htmlFor="">Remember me</label>
                                    </div>
                                    <div className='lost-password'>
                                        <a href="#">Lost your password?</a>
                                    </div>
                                </div>
                                <div className='button-container'>
                                    <button type='submit'>LOG IN</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="register">
                        <div className="register-container">
                            <h2>Register</h2>
                            <form onSubmit={registerSubmitted} action="">
                                <label className='input-label' htmlFor="">USERNAME<span>*</span></label>
                                <div>
                                    <input ref={userName} type="text" />
                                </div>
                                <label className='input-label' htmlFor="">EMAIL ADDRESS <span>*</span></label>
                                <div>
                                    <input ref={email} type="email" />
                                </div>
                                <label className='input-label' htmlFor="">PASSWORD <span>*</span></label>
                                <div className='password-container'>
                                    <input className='password-input' ref={password} type={`${visibilityRegister ? "text" : "password"}`} />
                                    <div>
                                        <button className='eye-btn' onClick={(e) => {
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
                                    <p>Your personal data will be used to support your experience throughout
                                        this website, to manage access to your account, and for other purposes
                                        described in our <a href="#">privacy policy.</a></p>
                                </div>
                                <div className='button-container'>
                                    <button type='submit'>REGISTER</button>
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