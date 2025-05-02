import React, { useState } from 'react'
import styles from '../styles/login.module.css';
import frame from '../assets/Frame.png';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import login from '../services';
const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const handlechange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const response = await login(formData);
        console.log(response);
        if (response && response.token) {
            localStorage.setItem("authToken", response.token);
            localStorage.setItem("userId", response.user._id);
            localStorage.setItem("role", response.user.role);
            navigate('/main');
        } else {
            console.log("Login failed. Please check your credentials.");
        }
    }

        const navigate = useNavigate();
        const handleSignup = () => {
            navigate("/signup")
        }

    return (
        <div>
            <div className={styles.loginContainer}>
                <div className={styles.loginLeft}>
                    <div className={styles.logoContainer}>
                        <img src={logo} alt="logo" className={styles.logo} />
                    </div>
                    <div className={styles.loginMain}>
                        <div className={styles.login}>
                            <h1 className={styles.loginName}>Sign in to your Plexify</h1>
                            <form onSubmit={handleSubmit}>
                                <div className={styles.loginDetail}>
                                    <label className={styles.label}>Username</label>

                                    <input type='email'
                                        name='username'
                                         autoComplete='username'
                                        className={styles.input}
                                        required
                                        value={formData.username}
                                        onChange={handlechange} />
                                </div>
                                <div className={styles.loginDetail}>
                                    <label className={styles.label}>Password</label>

                                    <input type='password'
                                        name='password'
                                        autoComplete='current-password'
                                        className={styles.input}
                                        required
                                        value={formData.password}
                                        onChange={handlechange} />
                                </div>
                                <button className={styles.loginBtn}
                                    type='submit'>Log in</button>
                            </form>
                        </div>
                        <div className={styles.bottomContainer}>
                            <label>Don't have an account?</label>
                            <button className={styles.signupBtn} onClick={handleSignup}>Sign up</button>
                        </div>
                    </div>
                    <div className={styles.footerLine}>
                        <p className={styles.para}>  This site is protected by reCAPTCHA and the <a className={styles.link}>Google Privacy Policy </a>and <a className={styles.link}>Terms of Service</a> apply.  </p>                </div>
                </div>
                <div className={styles.loginRight}>
                    <img className={styles.frame} src={frame} alt='frame' />

                </div>
            </div>
        </div>
    )
}

export default Login
