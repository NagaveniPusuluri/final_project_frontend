import React, { useState, useEffect } from "react";
import analyticsImg from '../assets/1.png';
import messageImg from '../assets/2.png';
import teamImg from '../assets/3.png';
import dashboardImg from '../assets/4.png';
import settings from '../assets/5.png';
import vector from '../assets/Vector.png';
import chatbot from '../assets/chatbot.png';
import styles from '../styles/main.module.css';
import profile from '../assets/profile.png';
import Dashboard from "../Components/Dashboard";
import Chatbot from "../Components/Chatbot";
import Contact from '../Components/Contact';
import Analytics from "../Components/Analytics";
import Team from "../Components/Team";
import Settings from "../Components/Settings";
import { useNavigate } from "react-router-dom";

const Main = () => {
    // const token = localStorage.getItem("authToken");
    const navigate=useNavigate();
    const [click, setClick] = useState(localStorage.getItem("active_tab") || 'dashboard');
    const handleButton = (buttonName) => {
        setClick(buttonName);
        localStorage.setItem("active_tab", buttonName);
    }
    useEffect(()=>{
        const token = localStorage.getItem("authToken");
        if(!token){
            navigate("/login");
        }
    },[])
    return (
            <div className={styles.container}>
             
                    <div className={styles.sidebarContainer}>
                        <div className={styles.sideBar}>
                            <div className={styles.sideBarImgContainerHead}>

                                <img src={vector} alt="cloud" className={styles.sideImg} />

                            </div>
                            <div className={styles.sideBarImgContainer} >
                                <button className={styles.iconBtn} onClick={() => handleButton('dashboard')}>
                                    <img src={dashboardImg} alt="dashboard" className={styles.sideImg} />

                                </button>
                                {click == 'dashboard' && <p className={styles.iconText}>{click}</p>}
                            </div>
                            <div className={styles.sideBarImgContainer}>
                                <button className={styles.iconBtn}>
                                    <img src={messageImg} alt="message" className={styles.sideImg} onClick={() => handleButton('contact center')} />
                                </button>

                                {click === 'contact center' && <p className={styles.iconText}>{click}</p>}
                            </div>
                            <div className={styles.sideBarImgContainer}>
                                <button className={styles.iconBtn}>
                                    <img src={analyticsImg} alt="analytics" className={styles.sideImg} onClick={() => handleButton('analytics')} />
                                </button>

                                {click === 'analytics' && <p className={styles.iconText}>{click}</p>}
                            </div>

                            <div className={styles.sideBarImgContainer}>
                                <button className={styles.iconBtn}>
                                    <img src={chatbot} alt="chatbot" className={styles.sideImg} onClick={() => handleButton('chatbot')} />
                                </button>

                                {click === 'chatbot' && <p className={styles.iconText}>{click}</p>}
                            </div>
                            <div className={styles.sideBarImgContainer}>
                                <button className={styles.iconBtn}>
                                    <img src={teamImg} alt="team" className={styles.sideImg} onClick={() => handleButton('team')} />
                                </button>

                                {click === 'team' && <p className={styles.iconText}>{click}</p>}
                            </div>
                            <div className={styles.sideBarImgContainer}>
                                <button className={styles.iconBtn}>
                                    <img src={settings} alt="settings" className={styles.sideImg} onClick={() => handleButton('settings')} />
                                </button>

                                {click === 'settings' && <p className={styles.iconText}>{click}</p>}
                            </div>
                        </div>

                        <div>
                            <img src={profile} alt="profile"  />
                        </div>
                  
                </div>
                <div className={styles.sideBarContainerBody}>
                    {click === 'dashboard' && <Dashboard   changeTab={handleButton} />}
                    {click === 'contact center' && <Contact/>}
                    {click === 'analytics' && <Analytics />}
                    {click === 'chatbot' && <Chatbot />}
                    {click === 'team' && <Team />}
                    {click === 'settings' && <Settings />}
                </div>
            </div>
    )

}
export default Main;