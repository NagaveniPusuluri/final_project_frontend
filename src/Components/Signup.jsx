import React, { useState } from 'react'
import logo from '../assets/logo.png'
import frame from '../assets/Frame.png'
import styles from '../styles/signup.module.css'
import { useNavigate } from 'react-router-dom'
import { signup } from '../services'
const url=import.meta.env.VITE_BACKEND_URL;
const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role:"admin",
        password: "",
        confirmPassword: "",
        agree: false
    });

    const navigate = useNavigate();
    const handleSignin = () => {
        navigate('/login')
    }
    const handleSignup = () => {
        navigate('/login')
    }
    const handleChange=(e)=>{
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]:type==='checkbox'? checked:value
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const response=signup(formData);
    }
    return (
        <div>
            <div className={styles.signupContainer}>
                <div className={styles.signupLeft}>
                    <div className={styles.logoContainer}>
                        <img src={logo} alt="logo" className={styles.logo} />
                    </div>
                    <div className={styles.signupMain}>
                        <form onSubmit={handleSubmit}>
                            <div className={styles.signup}>
                                <div className={styles.signupHeader}>
                                    <h1 className={styles.signupName}>Create an account</h1>
                                    <button className={styles.signinBtn} onClick={handleSignin}>Sign in instead</button>
                                </div>
                                <label className={styles.label}>First Name</label>
                                <input type='text'
                                    name='firstName'
                                    className={styles.input}
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange} />

                                <label className={styles.label}>Last Name</label>
                                <input type='text'
                                    name='lastName'
                                    className={styles.input}
                                    required
                                    value={formData.lastName} 
                                    onChange={handleChange}/>

                                <label className={styles.label}>Email</label>
                                <input type='email'
                                    name='email'
                                    className={styles.input}
                                    required
                                    value={formData.email} 
                                    onChange={handleChange}/>
                                <label className={styles.label}>Password</label>
                                <input type='password'
                                    name='password'
                                    className={styles.input}
                                    required
                                    value={formData.password} 
                                    onChange={handleChange}/>

                                <label className={styles.label}>Confirm Password</label>
                                <input type='password'
                                    name='confirmPassword'
                                    className={styles.input}
                                    required
                                    value={formData.confirmPassword} 
                                    onChange={handleChange}/>

                            </div>
                            <div className={styles.bottomContainer}>
                                <label>
                                    <input type='checkbox'
                                        name="agree"
                                        checked={formData.agree}
                                        onChange={handleChange} />
                                    By creating an account, I agree to our Terms of use
                                    and Privacy Policy
                                </label>
                            </div>
                            <div className={styles.btn}>
                                <button className={styles.signupBtn}
                                    type='submit' onClick={handleSignup}>
                                    Create an account
                                </button>

                            </div>
                        </form>
                    </div>
                    <div className={styles.footerLine}>
                        <p className={styles.para}>  This site is protected by reCAPTCHA and the <a className={styles.link}>Google Privacy Policy </a>and <a className={styles.link}>Terms of Service</a> apply.  </p>                </div>
                </div>
                <div className={styles.signupRight}>
                    <img className={styles.frame} src={frame} alt='frame' />

                </div>
            </div>
        </div>
    )
}

export default Signup



