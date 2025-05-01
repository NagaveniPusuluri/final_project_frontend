import React, { useEffect, useState, useContext } from 'react'
import styles from '../styles/contact.module.css'
import profile from '../assets/profile.png'
import email from '../assets/email.png'
import contact from '../assets/contact.png'
import phone from '../assets/phone.png'
import status from '../assets/status.png'
const url = import.meta.env.VITE_BACKEND_URL;
import home from '../assets/home.png'
import send from '../assets/send.png'
import { fetchCustomer, fetchTeamMessages, fetchTeamDetails, updateMissedChat } from '../services'
import { ChatbotContext } from '../Context/ChatbotContext'


function Contact() {

  const [message, setMessage] = useState({
    message: '',
    sender: 'bot',
    receiver: 'customer'
  });

  const { missedChatTimer, setMissedChatTimer
  } = useContext(ChatbotContext);

  const [showStatus, setShowStatus] = useState(false);
  const [onClickTeamMember, setOnClickTeamMember] = useState(false);
  const [assignedTo, setAssignedTo] = useState(null);
  const [teamMembers, setTeamMembers] = useState([])
  const [details, setDetails] = useState([]);
  const role = localStorage.getItem("role");
  const [selectedCustomer, setSelectedCustomer] = useState(() => {
    try {
      const stored = localStorage.getItem("active_chat");
      return stored && stored !== "undefined" ? JSON.parse(stored) : null;
    } catch (err) {
      console.error("Failed to parse activeuser:", err);
      return null;
    }
  })

  const token = localStorage.getItem("authToken");
  const storedUserId = localStorage.getItem("userId")
  const id = selectedCustomer ? selectedCustomer._id : null

  const fetchingCust = async () => {
    const res = await fetchCustomer();
    console.log(res);
    setDetails(res);
    const stored = localStorage.getItem("active_chat");
    if (stored) {
      const parsedStored = JSON.parse(stored);
      const matchedCustomer = res.find(cust => cust._id === parsedStored._id);
      if (matchedCustomer) {
        setSelectedCustomer(matchedCustomer);
      } else {
        setSelectedCustomer(parsedStored);
      }
    }
  }

  const fetchingTeamMegs = async () => {
    const res = await fetchTeamMessages(storedUserId);
    console.log(res);
    setDetails(res.data)

    const stored = localStorage.getItem("active_chat");
    if (stored) {
      const parsedStored = JSON.parse(stored);
      const matchedCustomer = res.data.find(cust => cust._id === parsedStored._id);
      if (matchedCustomer) {
        setSelectedCustomer(matchedCustomer);
      } else {
        setSelectedCustomer(parsedStored);
      }
    }
  }

  const fetchingTeamMembers = async () => {
    const res = await fetchTeamDetails(storedUserId);
    console.log(res);
    setTeamMembers(res);
  }

  useEffect(() => {
    const init = async () => {
      if (role === "admin") {
        await fetchingCust();

      } else {
        await fetchingTeamMegs();
      }
      await fetchingTeamMembers(storedUserId);
    }
    init();
  }, [])

  const handleChange = (e) => {
    setMessage(prev => ({
      ...prev,
      message: e.target.value
    }))
  }
  const handleSend = async () => {
    if (message.message.trim() === "" || !selectedCustomer) return;
    console.log(message);

    try {
      const res = await fetch(`${url}/customer/add-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, message })
      })

      const data = await res.json()
      console.log(data);

      setSelectedCustomer(prev => {
        const updated = {
          ...prev,
          messages: [...(prev.messages || []), message]
        };
        localStorage.setItem("active_chat", JSON.stringify(updated));
        return updated;
      });

      localStorage.setItem("active_chat", JSON.stringify(data))

      setMessage({
        message: '',
        sender: 'bot',
        receiver: 'customer'
      });

    } catch (err) {
      console.log(err)
    }
  };

  const handleStatusChange = async (e) => {
    const modifiedStatus = e.target.value;
    try {
      if (!selectedCustomer) return
      const res = await fetch(`${url}/customer/${selectedCustomer._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: modifiedStatus })
      })
      const data = await res.json();
      console.log(data);
      setSelectedCustomer(data.customer);
      localStorage.setItem("active_chat", JSON.stringify(data.customer));
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleTeam = async () => {

    try {
      const response = await fetch(`${url}/user/message/update/?memberId=${assignedTo}&ticketId=${selectedCustomer._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`

        }
      })
      const data = await response.json();

      console.log(data);
      setOnClickTeamMember(false);

    } catch (err) {
      console.log(err)
    }
  }

  const missed = async (user) => {
    const dateobj = user?.ticketNo.slice(-8)
    const created = new Date(user.createdAt);
    const now = Date.now();
    const difference = now - created.getTime();
    if (difference > missedChatTimer && user.isMissed === false) {
      const response = await updateMissedChat(user._id, dateobj)
      console.log(response)
    }
    else if (user.isMissed === true) {
      console.log('already marked as missed')
    }
    else {
      console.log('not missed chat')
    }
    console.log(`Difference: ${difference} ms`);
    console.log(`missed chat timer: ${missedChatTimer} ms`)
    console.log(dateobj)
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.containerOne}>
        <h3 className={styles.heading}>contact center</h3>
        <h5 className={styles.subHeading}>chats</h5>
        <hr className={styles.line} />
        {Array.isArray(details) && details.map((item, index) => (
          <div className={`${styles.chatContainer} ${selectedCustomer?._id === item._id ? styles.activeChat : ''}`} key={index}
            onClick={() => {
              missed(item);
              setSelectedCustomer(item)
              localStorage.setItem("active_chat", JSON.stringify(item))
            }}>
            <img src={profile} alt='profile' />
            <div className={styles.profileBody}>
              <div className={styles.profileName}>{item.name}</div>
              <div className={styles.chatMessage}>{item.messages?.[0]?.message || "No messages"}</div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.containerTwo}>
        <div className={styles.containerTop}>
          <h2 className={styles.heading}>{selectedCustomer?.ticketNo}</h2>
          <img src={home} alt='home' />
        </div>
        <div className={styles.containerBody}>
          <div className={styles.dateContainer}>
            <hr className={styles.sideLines} />
            <h5 className={styles.subHeadingmain}>{new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}</h5>
            <hr className={styles.sideLines} />
          </div>

        </div>

        <div className={styles.messageContainer}>

       

          {selectedCustomer?.status === 'resolved' ? (
            ""
          ) : (selectedCustomer?.assignedTo && selectedCustomer.assignedTo !== storedUserId) ? (
            ""
          )
            : (
              selectedCustomer?.messages?.map((msg, index) => {
                return <div
                  key={index}
                  className={`${styles.messageBubble} ${msg.sender === 'bot' ? styles.botMessage : styles.custMessage
                    }`}
                >
                  <img src={profile} alt='profile'  className={styles.profilePic}/>
                  <div className={styles.profileMsgBody}> 
                     <div className={`${msg.sender === 'bot' ? styles.botProfileName : styles.custProfileName}`}>
                      {/* {selectedCustomer.name} */}
                      {msg?.sender === 'bot' ? 'Bot' : selectedCustomer?.name}
                    </div>
                    <div className={styles.msgText}> {msg.message}</div>
                    
                    </div>
                    
                  </div>
                  
            }))}
             {selectedCustomer?.isMissed === true ? (
                  <div className={styles.missedChatText}>
              Repying to missed chat
            </div>
          ) : null}

                 
                  
        </div>

        { selectedCustomer?.status === 'resolved' ? (
            <div className={styles.resolvedText}>
              This chat has been resolved
            </div>
          ) :
            (selectedCustomer?.assignedTo && selectedCustomer.assignedTo !== storedUserId) ? (
              <div className={styles.resolvedText}>
                This chat is assigned to new team member. you no longer have access
              </div>
            )
              : (
                <div className={styles.searchContainer}>
                  <textarea
                    placeholder="Type here"
                    rows={2}
                    value={message.message}
                    className={styles.sendMsg}
                    onChange={handleChange}
                  ></textarea>
                  <img src={send} alt='send' className={styles.sendIcon} onClick={handleSend} />
                </div>
              )
        }

      </div>
      <div className={styles.containerThree}>
        <div className={styles.detailsContainer}>
          {selectedCustomer ? (
            <div className={styles.selectedContainer}>
              <div className={styles.detailsTop}>
                <img src={profile} alt='profile' />
                <h3 className={styles.chatMessage}>{selectedCustomer?.name}</h3>
              </div>
              <h2 className={styles.profileName}>Details</h2>
              <div className={styles.miniContainer}>
                <img src={contact} alt='cust-name' />
                <span className={styles.custDetail}>{selectedCustomer?.name}</span>
              </div>
              <div className={styles.miniContainer}>
                <img src={phone} alt='cust-phone' />
                <span className={styles.custDetail}>{selectedCustomer?.phone}</span>
              </div>
              <div className={styles.miniContainer}>
                <img src={email} alt='cust-email' />
                <span className={styles.custDetail}>{selectedCustomer?.email}</span>
              </div>
            </div>
          ) : (<div>No messages</div>)}
          <div className={styles.selectedContainer}>
            <h2 className={styles.profileName}>Teammates</h2>


            <div className={styles.miniContainer}>
              <img src={profile} alt="user-icon" />
              <select
                className={styles.dropdownOne}
                onChange={(e) => {
                  console.log("Selected username:", e.target.value)
                  setAssignedTo(e.target.value);
                  setOnClickTeamMember(true);

                }}
              >
                <option value="" className={styles.subHeading} >Select a user</option>

                {teamMembers?.map((member, index) => (
                  <option value={member._id} key={index}>
                    {member.username}
                  </option>
                ))}
              </select>
            </div>


            <div className={styles.miniContainer}>
              <div className={styles.leftmini}>
                <img src={status} alt="ticket-icon" />
                <div className={styles.dropdownWrapper}>
                  <select
                    className={styles.dropdown}
                    onChange={handleStatusChange}
                  >
                    <option className={styles.subHeading} value="#">Ticket Status</option>
                    <option className={styles.subHeading} value="resolved">Resolved</option>
                    <option className={styles.subHeading} value="unresolved">Unresolved</option>
                  </select>
                </div>
              </div>
            </div>
            {
              onClickTeamMember && (
                <div className={styles.modelTeamContainer}>
                  <h3 className={styles.modelText}>Chat would be assigned to Different team member  </h3>
                  <div className={styles.modelBtn}>
                    <button onClick={() => setOnClickTeamMember(false)} className={styles.cancel}>Cancel</button>
                    <button onClick={() => { handleTeam() }} className={styles.confirm}>Confirm</button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div >
    </div>

  )
}

export default Contact
