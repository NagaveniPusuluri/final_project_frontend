import React, { useState, useEffect, useContext } from 'react';
import logo from '../assets/logo.png';
import styles from '../styles/intro.module.css';
import play from '../assets/play.png';
import cover from '../assets/cover.png';
import card from '../assets/Card.png';
import calendar from '../assets/Calendar.png';
import chart from '../assets/chart.png';
import { useNavigate } from 'react-router-dom';
import style from '../styles/landing.module.css';
import company from '../assets/Company logo.png';
import company1 from '../assets/Company logo1.png';
import company2 from '../assets/Company logo2.png';
import company3 from '../assets/Company logo3.png';
import company6 from '../assets/Company logo6.png';
import company5 from '../assets/Company logo5.png';
import chatbotBtn from '../assets/chatbotBtn.png';
import ellipse from '../assets/Ellipse6.png';
import chatbotClose from '../assets/chatbotClose.png'
import sendmsg from '../assets/sendmsg.png';
import { postCustomer, postMessage, fetchBotDetails } from '../services';
import { ChatbotContext } from '../Context/ChatbotContext';


function Landing() {


    const { formData, setFormData,
        welcomeMsg, setWelcomeMsg,
        headerColor, setHeaderColor,
        backgroundColor, setBackgroundColor,
        customMessage1, setCustomMessage1,
        customMessage2, setCustomMessage2
    } = useContext(ChatbotContext);
    const date=new Date();
  const timeDate =
  date.getHours().toString().padStart(2, "0") +
  date.getMinutes().toString().padStart(2, "0") +
  date.getSeconds().toString().padStart(2, "0") +
  date.getDate().toString().padStart(2, "0") +
  (date.getMonth() + 1).toString().padStart(2, "0") +
  date.getFullYear().toString();


    let current_user = null;
    try {
        current_user = JSON.parse(localStorage.getItem('current_user'));
    } catch (e) {
        console.warn("Invalid user JSON", e);
    }
    const id = current_user ? current_user._id : null
    console.log(id);

    const savedClick = JSON.parse(localStorage.getItem('chat_open')) || false;

    const [popup, setPopup] = useState(true);
    const [click, setClick] = useState(savedClick);
    const [message, setMessage] = useState({
        message: '',
        sender: 'customer',
        receiver: 'bot'
    });
    const [details, setDetails] = useState([]);

    const [preFormMessages, setPreFormMessages] = useState(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('pre_messages'));
            return Array.isArray(saved) ? saved : [];
        } catch {
            return [];
        }
    });

    const [postFormMessages, setPostFormMessages] = useState(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('post_messages'));
            return Array.isArray(saved) ? saved : [];
        } catch {
            return [];
        }
    });

    const [formSubmitted, setFormSubmitted] = useState(() => JSON.parse(localStorage.getItem('form_submitted')) || false);
    const [showForm, setShowForm] = useState(() => JSON.parse(localStorage.getItem('show_form')) || false);
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate("/login");
    }
    const handleSignup = () => {
        navigate("/signup");
    }

    useEffect(() => {
        const savedClick = JSON.parse(localStorage.getItem('chat_open')) || false;
        setClick(savedClick);
        if (savedClick) {
            setPopup(true);
        }
    }, [])

    const handleClose  = () => {
            setPopup(false); // Hide popup if chat opens
    }

    const handleClick = () => {
        console.log("inhandle close")
        const newClick = !click;
        setClick(newClick);
        localStorage.setItem('chat_open', JSON.stringify(newClick));
         if (newClick) {
        setPopup(false);
         }else{
            setPopup(false);
        localStorage.setItem('chat_open', JSON.stringify(false));
        localStorage.removeItem("current_user");
        localStorage.removeItem('form_submitted');
        localStorage.removeItem('pre_messages');
        localStorage.removeItem('post_messages');
        localStorage.removeItem('show_form');
        localStorage.setItem('pre_messages', JSON.stringify([]));
        localStorage.setItem('post_messages', JSON.stringify([]));

        setFormData({
            name: '',
            email: '',
            phone: '',
            status: 'NA',
            assignedTo: null,
            ticketNo:`ticket # ${timeDate}`
        })

        setDetails([]);
        setPreFormMessages([]);
        setPostFormMessages([]);
        setFormSubmitted(false);
        setShowForm(false);

        setMessage({
            message: '',
            sender: 'customer',
            receiver: 'bot'
        })
    }
}
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormSubmitted(true);
        setShowForm(false);
        console.log(formData);
        const response = await postCustomer(formData);
        console.log(response);
        setFormData({    name: '',
            email: '',
            phone: '',
            status: 'NA',
            assignedTo: null,
            ticketNo:`ticket # ${timeDate}`});

         localStorage.setItem("current_user", JSON.stringify(response))
    }
    const handleSendMsg = async () => {
        console.log(id);
        console.log(message.message);
        if (!message.message.trim()) {
            console.log("Empty or invalid message. Aborting send.");
            return;
        }
        console.log("Sending message...");
        try {
            const result = await postMessage(id, message);
            console.log(result);


            if (!showForm && !formSubmitted) {
                setPreFormMessages([...preFormMessages, message]);
                console.log(preFormMessages)
                setShowForm(true);
            } else if (formSubmitted) {
                setPostFormMessages([...postFormMessages, message]);
                console.log(postFormMessages)
            }
            setMessage({
                message: '',
                sender: 'customer',
                receiver: 'bot'
            });

        } catch (err) {
            console.error(err);
        }
    }

    async function fetchDetails() {
        const user = await fetchBotDetails(id);
        console.log(user)
        if (user) {
            setDetails(user);
            const preForm = [];
            const postForm = [];
            user.messages.forEach((msg) => {
                if (!formSubmitted) {
                    preForm.push(msg);
                } else {
                    postForm.push(msg);
                }
            })
            setPreFormMessages(preForm);
            setPostFormMessages(postForm);
        }
    }
    useEffect(() => {
        fetchDetails();
    }, []);


    useEffect(() => {
        localStorage.setItem('pre_messages', JSON.stringify(preFormMessages));
    }, [preFormMessages]);

    useEffect(() => {
        localStorage.setItem('post_messages', JSON.stringify(postFormMessages));
    }, [postFormMessages]);

    useEffect(() => {
        localStorage.setItem('form_submitted', JSON.stringify(formSubmitted));
    }, [formSubmitted]);

    useEffect(() => {
        localStorage.setItem('show_form', JSON.stringify(showForm));
    }, [showForm]);

    useEffect(() => {
        localStorage.setItem('chat_open', JSON.stringify(click));
    }, [click]);



    return (
        <>
            <div className={style.landingcontainer}>
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
                <div className={style.chatbotMain}>
                    <button className={style.chatBotBtn} onClick={() => { handleClick() }}>
                        <img src={click ? chatbotClose : chatbotBtn} alt='chatbot' className={style.chatBotImg} />
                    </button>
                    <div className={style.chatBotModel} >
                        {popup &&
                            <div className={style.chatbotPopup}>
                                <img src={ellipse} alt='ellipse' className={style.ellipseImg} />
                                <button className={style.popupClose} onClick={() => { handleClose() }}>X</button>
                                <p className={style.text}>{welcomeMsg}
                                    {/* 👋 Want to chat about Hubly? I'm an chatbot here to help you find your way. */}
                                </p>

                            </div>
                        }
                        {click &&
                            <div className={style.chatbotContainer}>
                                <div className={style.chatbotHeader} style={{ backgroundColor: headerColor }}>
                                    <img src={ellipse} alt='ellipse' className={style.ellipseImg2} />
                                    <span className={style.headerName}>Hubly</span>
                                </div>
                                <div className={style.chatBotMsgBody} style={{ backgroundColor: backgroundColor }}>

                                    <div className={style.messageBubble}>{customMessage1}</div>
                                    <div className={style.messageBubble}>{customMessage2}</div>
                                    {showForm &&
                                        <form onSubmit={handleSubmit}
                                            className={style.chatBotForm}>
                                            <div>
                                                <img src={ellipse} alt='ellipse' className={style.ellipseImg3} />
                                            </div>
                                            <div className={style.formText}>
                                                <h3>Introduction yourself</h3>
                                                <label htmlFor='name'>Your Name</label>
                                                <input className={style.input} type='text' name='name' value={formData.name} onChange={handleChange} required />
                                                <hr className={styles.line} />

                                                <label htmlFor='phone' >Your Phone</label>
                                                <input className={style.input} type='number' name='phone' value={formData.phone} onChange={handleChange} required />
                                                <hr className={styles.line} />
                                                <label htmlFor='email'>Your Email</label>
                                                <input className={style.input} type='email' name='email' value={formData.email} onChange={handleChange} required />
                                                <hr className={styles.line} />
                                                <button type='submit' className={style.button}>Thank You</button>
                                            </div>
                                        </form>}
                                    <div className={style.messageContainer}>
                                        {Array.isArray(preFormMessages) && Array.isArray(postFormMessages) &&
                                            [...preFormMessages, ...postFormMessages].map((msg, index) => (
                                                <div
                                                    key={index}
                                                    className={`${style.messageBubble} ${msg.sender === 'bot' ? style.botMessage : style.userMessage}`}>
                                                    {msg.message}
                                                </div>
                                            ))}
                                    </div>

                                </div>
                                <div className={style.chatBotSendMsg}>
                                    <input type='text'
                                        className={style.input}
                                        placeholder="Write a message"
                                        value={message.message}
                                        name='message'
                                        onChange={(e) => {
                                            setMessage({ ...message, message: e.target.value })
                                        }
                                        }
                                    />
                                    <img src={sendmsg} alt='send-msg' style={{ cursor: 'pointer' }}
                                        onClick={handleSendMsg} className={style.sendMsgIcon}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                </div>

            </div>
        </>
    )


}

export default Landing



