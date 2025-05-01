import React from "react";
import styles from '../styles/intro.module.css';
import logo from '../assets/logo.png';
import play from '../assets/play.png';
import cover from '../assets/cover.png';
import card from '../assets/Card.png';
import calendar from '../assets/Calendar.png';
import chart from '../assets/chart.png';
import company from '../assets/Company logo.png';
import company1 from '../assets/Company logo1.png';
import company2 from '../assets/Company logo2.png';
import company3 from '../assets/Company logo3.png';
import company6 from '../assets/Company logo6.png';
import company5 from '../assets/Company logo5.png';
import link1 from '../assets/Link1.png';
import link2 from '../assets/Link2.png';
import link3 from '../assets/Link3.png';
import link4 from '../assets/Link4.png';
import link5 from '../assets/Link5.png';
import link6 from '../assets/Link6.png';
import link7 from '../assets/Link7.png';
import checkIcon from '../assets/Check icon.png';
import line from '../assets/line.png';
import social from '../assets/social.png';
import { useNavigate } from 'react-router-dom';
const Intro = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    }
    const handleSignup = () => {
        navigate("/signup");
    }
    return (
        <>
            <div className={styles.container}>

                <div className={styles.header}>
                    <div className={styles.containerLeft}>
                        <img className={styles.logo} src={logo} alt="logo" />
                    </div>
                    <div className={styles.containerRight}>
                        <button className={styles.loginBtn} onClick={handleLogin}>Login</button>
                        <button className={styles.signupBtn} onClick={handleSignup}>Sign up</button>
                    </div>
                </div>
                <div className={styles.main}>
                    <div className={styles.mainLeft}>
                        <h1 className={styles.heading}>Grow Your Business Faster with Hubly CRM</h1>
                        <h5 className={styles.subHeading}>Manage leads, automate workflows, and close deals effortlessly—all in one powerful platform.</h5>
                        <div className={styles.mainGroup}>
                            <button className={styles.startBtn}>Get started</button>
                            <div className={styles.subGroup}>
                                <img src={play} alt="play" />
                                <div className={styles.playText}>Watch Video</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.mainRight}>
                        <img className={styles.cover} src={cover} alt="cover" />
                        <img className={styles.chart} src={chart} alt="chart" />
                        <img className={styles.calendar} src={calendar} alt="calendar" />
                        <img className={styles.card} src={card} alt="card" />
                    </div>
                </div>
                <div className={styles.frame}>
                    <img className={styles.frameImg1} src={company} alt="company" />
                    <img className={styles.frameImg1} src={company1} alt="company1" />

                    <img className={styles.frameImg2} src={company2} alt="company2" />
                    <img className={styles.frameImg3} src={company3} alt="company3" />
                    <img className={styles.frameImg5} src={company5} alt="company5" />
                    <img className={styles.frameImg6} src={company6} alt="company6" />

                </div>
                <div className={styles.platform}>
                    <div className={styles.platformTop}>
                        <h1 className={styles.platformTitle}>At its core, Hubly is a robust CRM solution.</h1>
                        <h6 className={styles.platformSubtitle}>Hubly helps businesses streamline customer interactions, track leads, and automate tasks—saving you time and maximizing revenue. Whether you’re a startup or an enterprise, Hubly adapts to your needs, giving you the tools to scale efficiently.</h6>
                    </div>
                    <div className={styles.platformBody}>
                        <div className={styles.platformBodyLeft}>
                            <div>
                                <h3 className={styles.platformHeading}>MULTIPLE PLATFORMS TOGETHER!</h3>
                                <p className={styles.platformSubHeading}>Email communication is a breeze with our fully integrated, drag & drop email builder.</p>
                            </div>
                            <div>
                                <h3 className={styles.platformHead}>CLOSE</h3>
                                <p className={styles.platformSubHeading}>Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!</p>
                            </div>
                            <div>
                                <h3 className={styles.platformHead}>NURTURE</h3>
                                <p className={styles.platformSubHeading}>Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!</p>
                            </div>
                        </div>
                        <div className={styles.platformBodyRight}>
                            <div className={styles.funnelContainer}>
                                <img className={styles.social} src={social} alt="social"/>
                                <div className={styles.level}>
                                    <div className={styles.funnelSegment + ' ' + styles.capture}>
                                     
                                    </div>
                                </div>
                                <div className={styles.level}>
                                    <div className={styles.funnelSegment + ' ' + styles.nurture}>

                                    </div>
                                </div>
                                <div className={styles.level}>
                                    <div className={styles.funnelSegment + ' ' + styles.close}>
                                    
                                    </div>
                                </div>

                            </div>
                            <h5 className={styles.captureText}>CAPTURE</h5>
                                <h5 className={styles.nurtureText}> NURTURE</h5>
                                <h5 className={styles.closeText}>CLOSE</h5>
                                <img className={styles.captureLine} src={line} alt="cature-line" />
                                <img className={styles.nurtureLine} src={line} alt="nurture-line" />
                                <img className={styles.closeLine} src={line} alt="close-line" />
                        </div>
                    </div>
                </div>
                <div className={styles.plansContainer}>
                    <div className={styles.planTitleContainer}>
                        <h3 className={styles.planTitle}>We have plans for
                            everyone!</h3>
                        <h5 className={styles.planSubTitle}>We started with a strong foundation, then simply built all of the sales and marketing tools ALL businesses need under one platform.</h5>
                    </div>
                    <div className={styles.plans}>
                        <div className={styles.planCard}>
                            <div>
                                <h3 className={styles.planName}>STARTER</h3>
                                <h5 className={styles.planSub}>Best for local businesses needing to improve their online reputation.</h5>
                                <h3 className={styles.price}>$199<span className={styles.pricePermonth}>/month</span></h3>
                                <h4>What’s included</h4>
                                <div className={styles.groupCheck}>
                                    <img src={checkIcon} alt="check-icon" /> <div>Unlimited Users</div>
                                </div>
                                <div className={styles.groupCheck}>
                                    <img src={checkIcon} alt="check-icon" /><div>GMB Messaging</div>
                                </div>
                                <div className={styles.groupCheck}>
                                    <img src={checkIcon} alt="check-icon" /><div>Reputation Management</div>
                                </div>
                                <div className={styles.groupCheck}>
                                    <img src={checkIcon} alt="check-icon" /> <div>GMB Call Tracking</div>
                                </div>
                                <div className={styles.groupCheck}>
                                    <img src={checkIcon} alt="check-icon" /> <div> 24/7 Award Winning Support</div>
                                </div>
                            </div>
                            <div className={styles.btnContainer}>
                                <button className={styles.starterBtn}>SIGN UP FOR STARTER</button>
                            </div>
                        </div>
                        <div className={styles.planCard}>
                            <div>
                                <h3 className={styles.planName}>GROW</h3>
                                <h5 className={styles.planSub}>Best for all businesses that want to take full control of their marketing automation and track their leads, click to close.</h5>
                                <h3 className={styles.price}>$399 <span className={styles.pricePermonth}>/month </span></h3>
                                <h4>What’s included</h4>
                                <div className={styles.groupCheck}>
                                    <img src={checkIcon} alt="check-icon" /> <div>Pipeline Management</div>
                                </div>
                                <div className={styles.groupCheck}>
                                    <img src={checkIcon} alt="check-icon" /><div>Marketing Automation Campaigns</div>
                                </div>
                                <div className={styles.groupCheck}>
                                    <img src={checkIcon} alt="check-icon" /><div>Live Call Transfer</div>
                                </div>
                                <div className={styles.groupCheck}>
                                    <img src={checkIcon} alt="check-icon" /><div>GMB Messaging</div>
                                </div>
                                <div className={styles.groupCheck}>
                                    <img src={checkIcon} alt="check-icon" /><div>Embed-able Form Builder</div>
                                </div>
                                <div className={styles.groupCheck}>
                                    <img src={checkIcon} alt="check-icon" />  <div>Reputation Management</div>
                                </div>
                                <div className={styles.groupCheck}>
                                    <img src={checkIcon} alt="check-icon" /> <div>24/7 Award Winning Support</div>
                                </div>
                            </div>

                            <div className={styles.btnContainer}>
                                <button className={styles.starterBtn}>SIGN UP FOR STARTER</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.footerLeft}>
                        <img className={styles.logo} src={logo} alt={logo}
                        />
                    </div>
                    <div className={styles.footerRight}>
                        <div className={styles.column}>
                            <h3>Product</h3>
                            <ul>
                                <li>Universal checkout</li>
                                <li>
                                    Payment workflows
                                </li>
                                <li>Observability</li>
                                <li>UpliftAI</li>
                                <li>Apps & integrations</li>
                            </ul>
                        </div>

                        <div className={styles.column}>
                            <h3>Why Primer</h3>
                            <ul>
                                <li>
                                    Expand to new markets
                                </li>
                                <li>Boost payment success</li>
                                <li>
                                    Improve conversion rates
                                </li>
                                <li>Reduce payments fraud</li>
                                <li>Recover revenue</li>
                            </ul>
                        </div>
                        <div className={styles.column}>
                            <h3>Developers</h3>
                            <ul>
                                <li>Primer Docs</li>
                                <li>API Reference</li>
                                <li>Payment methods guide</li>
                                <li>Service status</li>
                                <li>Community</li>
                            </ul>
                        </div>
                        <div className={styles.column}>
                            <h3>Resources</h3>
                            <ul>
                                <li>Blog</li>
                                <li>Success stories</li>
                                <li>News room</li>
                                <li>Terms</li>
                                <li>Privacy</li>
                            </ul>
                        </div>
                        <div className={styles.column}>
                            <h3>Company</h3>
                            <ul>
                                <li>Careers</li>
                            </ul>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.iconGroup}>
                                <a href="https://example.com">
                                    <img src={link1} alt="link1" />
                                </a>

                                <a href="https://example.com">
                                    <img src={link2} alt="link2" />
                                </a>

                                <a href="https://example.com">
                                    <img src={link3} alt="link3" />
                                </a>

                                <a href="https://example.com">
                                    <img src={link4} alt="link4" />
                                </a>

                                <a href="https://example.com">
                                    <img src={link5} alt="link5" />
                                </a>

                                <a href="https://example.com">
                                    <img src={link6} alt="link6" />
                                </a>

                                <a href="https://example.com">
                                    <img src={link7} alt="link7" />
                                </a>
                            </div>
                        </div>

                    </div>

                </div>
            </div >
        </>
    )
}
export default Intro