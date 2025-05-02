import React, { useState, useEffect } from 'react'
import styles from '../styles/dashboard.module.css'
import sms from '../assets/sms.png';
import profile from '../assets/profile.png';
import search from '../assets/search.png';
import { fetchBotDetails,fetchCustomer, fetchTeamDetails,fetchTeamMessages } from '../services';

function Dashboard(props) {
    const [customer, setCustomer] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [searchTicket,setSearchTicket]=useState('');
    const storedUserId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    

    const fetchingCust=async()=>{
        try{
        const res= await fetchCustomer();
        console.log("fetch customer")
        console.log(res);
        setCustomer(res);
        }catch(err){
            if(err.response?.status === 401){
                localStorage.clear();
                window.location.href="/login";
            }
        }
    }
    const fetchingTeamMegs=async()=>{
        try{
        const res =await fetchTeamMessages(storedUserId);
        console.log(res);
        setCustomer(res.data);
        }catch(err){
            console.log(err?.response?.data?.message || err.message);
            setCustomer([]);
        }
    }
    useEffect(() => {
        if (role === "admin") {
           fetchingCust(); 
            return
        }
        fetchingTeamMegs();

    }, [])

   
    const resolvedTickets = (customer || []).filter(cust => {
        return cust?.status === 'resolved';
    })
    const unresolvedTickets = (customer || []).filter(cust => {
        return cust?.status === 'unresolved';
    });

    const filteredCustomers=(customer || []).filter(cust =>{
        // const ticketNumber= generateTicketNumber(cust.createdAt).toLowerCase();
        return cust?.ticketNo?.toLowerCase().includes(searchTicket.toLowerCase());
    })

    const filteredResolved = resolvedTickets.filter(cust => {
        // const ticketNumber = generateTicketNumber(cust.createdAt).toLowerCase();
        return cust?.ticketNo?.toLowerCase().includes(searchTicket.toLowerCase());
    });

    const filteredUnresolved = unresolvedTickets.filter(cust => {
        // const ticketNumber = generateTicketNumber(cust.createdAt).toLowerCase();
        return cust?.ticketNo?.toLowerCase().includes(searchTicket.toLowerCase());
    });

    // function generateTicketNumber(createdAt) {
    //     const dateObj = new Date(createdAt);
    //     const year = dateObj.getFullYear(); // e.g., 2025
    //     const date = String(dateObj.getDate()).padStart(2, '0'); // e.g., 28
    //     const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // months are 0-indexed, so +1
    //     return  `Ticket# ${year}-00${date}${month}`;
    // }

    return (
        <div className={styles.main}>
            <h3 className={styles.heading}>Dashboard</h3>
            <div className={styles.searchBar}>
                <img src={search} alt="search" className={styles.search} />
                <input type='text'
                 className={styles.input}
                 placeholder='Search for ticket'
                 value={searchTicket}
                 onChange={(e)=>setSearchTicket(e.target.value)}
                />
            </div>
            <div className={styles.mainBody}>
                <div className={styles.cardHead}>
                    <div className={styles.iconHead}>
                        <img src={sms} alt='sms' />
                        <button
                            className={styles.buttonOne}
                            onClick={() => setActiveTab('all')}
                        >All Tickets</button>
                    </div>
                    <button
                        className={styles.button}
                        onClick={() => setActiveTab('resolved')}
                    >Resolved</button>

                    <button
                        className={styles.button}
                        onClick={() => setActiveTab('unresolved')}
                    >Unresolved</button>
                </div>
                <hr className={styles.line} />

                {activeTab === 'all' &&
                    filteredCustomers.map((cust, index) => (
                        <div className={styles.card} key={index}>
                            <div className={styles.cardTop}>
                                <div className={styles.cardTopMain}>
                                <div className={styles.cardBody}>
                                    <h3>{cust?.ticketNo}</h3>
                                    <p>
                                        {new Date(Date.parse(cust?.messages?.[0]?.createdAt)).toLocaleTimeString(
                                            [],
                                            { hour: "2-digit", minute: "2-digit" }
                                        )}
                                    </p>
                                </div>
                                {cust?.messages?.length > 0 && (

                                    <div className={styles.cardBody} key={index}>
                                        <p>{cust?.messages[0]?.message}</p>
                                        <p>  {Math.floor((new Date() - new Date(cust?.messages?.[0]?.createdAt)) / (1000 * 60 * 60))}:00</p>
                                    </div>

                                )}
                                </div>

                                <hr className={styles.line} />
                                <div className={styles.cardBody}>
                                    <div className={styles.cardProfile}>
                                        <img src={profile} alt='profile' />
                                        <div className={styles.profileDetails}>
                                            <p>{cust?.name}</p>
                                            <p>{cust?.email}</p>
                                            <p>{cust?.phone}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <a href='#' onClick={() => {
                                            localStorage.setItem("active_chat", JSON.stringify(cust))
                                            localStorage.setItem("active_tab", 'dashboard')
                                            props.changeTab('contact center')
                                        }}>Open ticket</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))
                }

                {activeTab === 'resolved' && filteredResolved.map((cust, index) => (
                    <div className={styles.card} key={index}>
                        <div className={styles.cardTop}>
                            <div className={styles.cardTopMain}>
                            <div className={styles.cardBody}>
                                <h3>{cust?.ticketNo}</h3>
                                <p>
                                    {new Date(Date.parse(cust?.messages?.[0]?.createdAt)).toLocaleTimeString(
                                        [],
                                        { hour: "2-digit", minute: "2-digit" }
                                    )}
                                </p>
                            </div>

                            {cust.messages?.length >0 &&(
                                <div className={styles.cardBody} >
                                    <p>{cust?.messages?.[0]?.message}</p>
                                    <p>{Math.floor((new Date() - new Date(cust?.messages?.[0]?.createdAt)) / (1000 * 60 * 60))}:00</p>
                                </div>
                            )}
                            </div>
                            <hr className={styles.line} />
                            <div className={styles.cardBody}>
                                <div className={styles.cardProfile}>
                                    <img src={profile} alt='profile' />
                                    <div className={styles.profileDetails}>
                                        <p>{cust.name}</p>
                                        <p>{cust.email}</p>
                                        <p>{cust.phone}</p>
                                    </div>
                                </div>
                                <div>
                                    <a href='#' onClick={() => {
                                        localStorage.setItem("active_chat", JSON.stringify(cust));
                                        localStorage.setItem("active_tab", 'dashboard');
                                        props.changeTab('contact center');
                                    }}>Open ticket</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {activeTab === 'unresolved' && filteredUnresolved.map((cust, index) => (
                    <div className={styles.card} key={index}>
                        <div className={styles.cardTop}>
                            <div className={styles.cardTopMain}>
                            <div className={styles.cardBody}>
                                <h3>{cust?.ticketNo}</h3>
                                <p>
                                    {new Date(Date.parse(cust?.messages?.[0]?.createdAt)).toLocaleTimeString(
                                        [],
                                        { hour: "2-digit", minute: "2-digit" }
                                    )}
                                </p>
                            </div>

                            {cust.messages?.length>0  &&  (
                                <div className={styles.cardBody} >
                                    <p>{cust?.messages?.[0]?.message}</p>
                                    <p>{Math.floor((new Date() - new Date(cust?.messages?.[0]?.createdAt)) / (1000 * 60 * 60))}:00</p>
                                </div>
                            )}
                            </div>
                            <hr className={styles.line} />
                            <div className={styles.cardBody}>
                                <div className={styles.cardProfile}>
                                    <img src={profile} alt='profile' />
                                    <div className={styles.profileDetails}>
                                        <p>{cust.name}</p>
                                        <p>{cust.email}</p>
                                        <p>{cust.phone}</p>
                                    </div>
                                </div>
                                <div>
                                    <a href='#' onClick={() => {
                                        localStorage.setItem("active_chat", JSON.stringify(cust));
                                        localStorage.setItem("active_tab", 'dashboard');
                                        props.changeTab('contact center');
                                    }}>Open ticket</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;
