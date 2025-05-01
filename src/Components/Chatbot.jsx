import React, { useContext, useState, useEffect } from 'react'
import style from '../styles/chatbot.module.css'
import ellipse from '../assets/ellipse 6.png'
import sendmsg from '../assets/sendmsg.png'
import { ChatbotContext } from '../Context/ChatbotContext'

function Chatbot() {

  const [hours,setHours]=useState('00');
  const [minutes, setMinutes]=useState('00');
  const [seconds,setSeconds]=useState('00');
  
  
  const { formData, setFormData,
    welcomeMsg, setWelcomeMsg,
    headerColor, setHeaderColor,
    backgroundColor, setBackgroundColor,
    customMessage1, setCustomMessage1,
    customMessage2, setCustomMessage2,
    missedChatTimer,setMissedChatTimer
  } = useContext(ChatbotContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleWelcomeMsgChange = (e) => {
    setWelcomeMsg(e.target.value);
    localStorage.setItem('welcomeMsg',e.target.value)
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  }

  const handleCustomeMsg1Change = (e) => {
    setCustomMessage1(e.target.value);
    localStorage.setItem('customMsg1',e.target.value)
  }

  const handleCustomeMsg2Change = (e) => {
    setCustomMessage2(e.target.value);
    localStorage.setItem('customMsg2',e.target.value)
  }

  const handleHeaderColorChange = (color) => {
    setHeaderColor(color);
  }
  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color);
  }
  const generate=(limit)=>{
    return Array.from({length:limit},(_,i)=>{
     return <option key={i} value={String(i).padStart(2,'0')}>
        {String(i).padStart(2,'0')}
      </option>
    })
  }
  const handleSave=()=>{
      const totalMilliseconds =
      parseInt(hours) * 3600000 +
      parseInt(minutes) * 60000 +
      parseInt(seconds) * 1000;
      setMissedChatTimer(totalMilliseconds)
      alert(`the missed chat timer is : ${totalMilliseconds}`)
      localStorage.setItem('missedChatTimer', totalMilliseconds )
  }
  return (
    <div className={style.container}>
      <h4 className={style.heading}>Chat Bot</h4>
      <div className={style.main}>
        <div className={style.mainLeft}>
          <div className={style.chatbotContainer} style={{ backgroundColor: backgroundColor }}>
            <div className={style.chatbotHeader} style={{ backgroundColor: headerColor }}>
              <img src={ellipse} alt='ellipse' className={style.ellipseImg2} />
              <span className={style.headerName}>Hubly</span>
            </div>
            <div className={style.chatBotMsgBody}>

              <div className={style.customMessages}>
                {customMessage1 && <p className={style.messageBubble}>{customMessage1}</p>}
                {customMessage2 && <p className={style.messageBubble}>{customMessage2}</p>}
              </div>
              <form
                className={style.chatBotForm} onSubmit={handleFormSubmit}>
                <div>
                  <img src={ellipse} alt='ellipse' className={style.ellipseImg3} />
                </div>
                <div className={style.formText}>
                  <h3>Introduction yourself</h3>
                  <label htmlFor='name'>Your Name</label>
                  <input className={style.input}
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <hr className={style.line} />
                  <label htmlFor='phone' >Your Phone</label>
                  <input className={style.input}
                    type='number'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <hr className={style.line} />
                  <label htmlFor='email'>Your Email</label>
                  <input className={style.input}
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <hr className={style.line} />
                  <button type='submit' className={style.button}>Thank You</button>
                </div>
              </form>

            </div>

            <div className={style.chatBotSendMsg}>
              <input type='text'
                className={style.input}
                placeholder="Write a message"
                name='message'
              />
              <img src={sendmsg} alt='send-msg' style={{ cursor: 'pointer' }} />
            </div>
          </div>
          <div className={style.chatbotPopup}>
            <img src={ellipse} alt='ellipse' className={style.ellipseImg} />
            <button className={style.popupClose} >X</button>
            <p className={style.text}>{welcomeMsg}</p>
          </div>
        </div>

        <div className={style.mainRight}>
          <div className={style.box}>
            <h5>Header Color</h5>
            <div className={style.colorgroup}>
              <div className={style.whitecolor} 
              onClick={() =>{ handleHeaderColorChange('#FFFFFF')
                localStorage.setItem('selectedHeader', '#FFFFFF')
              }}
              >

              </div>
              <div className={style.blackcolor}
              onClick={() =>{ handleHeaderColorChange('#000000')       
                localStorage.setItem('selectedHeader', '#000000')
              }}>

              </div>
              <div className={style.bluecolor} 
              onClick={() =>{ handleHeaderColorChange('#33475B')
                localStorage.setItem('selectedHeader','#33475B')
              }}>

              </div>
            </div>
            <div className={style.colorgroupTwo}>
              <div className={style.squareColor} style={{ backgroundColor: headerColor }}></div>
              <input type='text'
                className={style.inputbox}
                value={headerColor}
                placeholder="Customized header color"
                onChange={(e) => setHeaderColor(e.target.value)} />
            </div>
          </div>
          <div className={style.box}>
            <h5>Custom Background Color</h5>
            <div className={style.colorgroup}>
              <div className={style.whitecolor} 
              onClick={() => {handleBackgroundColorChange('#FFFFFF')
                localStorage.setItem('selectedBodyColor','#FFFFFF')
              }}>

              </div>
              <div className={style.blackcolor} 
              onClick={() => {handleBackgroundColorChange('#000000')
                localStorage.setItem('selectedBodyColor','#000000')
              }}>

              </div>
              <div className={style.halfwhitecolor}
              onClick={() =>{ handleBackgroundColorChange('#FAFBFC')
                localStorage.setItem('selectedBodyColor','#FAFBFC')
              }}>

              </div>
            </div>
            <div className={style.colorgroupTwo}>
              <div className={style.squareColor} style={{ backgroundColor: backgroundColor }}></div>
              <input type='text' className={style.inputbox}
                placeholder='Customized background color'
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </div>
          </div>
          <div className={style.box}>
            <h5>Customize Message</h5>
            <input type='text'
              className={style.msgCustomize}
              placeholder='custome message 1'
              value={customMessage1}
              onChange={handleCustomeMsg1Change}
            />
            <input type='text'
              className={style.msgCustomize}
              placeholder='custom message 2'
              value={customMessage2}
              onChange={handleCustomeMsg2Change}
            />
          </div>
          <div className={style.boxMain}>
            <h5>Introduction Form</h5>
            <label htmlFor='name'>Your Name</label>
            <input className={style.input}
              type='text' name='name'
              value={formData.name} onChange={handleInputChange}
            />
            <hr className={style.line} />

            <label htmlFor='phone' >Your Phone</label>
            <input className={style.input}
              type='number'
              name='phone' value={formData.phone}
              onChange={handleInputChange}
              required />
            <hr className={style.line} />
            <label htmlFor='email'>Your Email</label>
            <input className={style.input}
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />
            <hr className={style.line} />
            <button type='submit' className={style.button}>Thank You</button>
          </div>
          <div className={style.box}>
            <h5>Welcome Message</h5>
            <textarea rows={2} className={style.textarea}
              value={welcomeMsg}
              onChange={handleWelcomeMsgChange}
            />
          </div>
          <div className={style.box} >
            <h5>Missed chat timer </h5>
            <div className={style.selectTimer}>
              <select value={hours} onChange={(e)=>setHours(e.target.value)} className={style.select}>
                {generate(24)}
              </select>
              <span>:</span>
              <select value={minutes} onChange={(e)=>setMinutes(e.target.value)} className={style.select}>
                {generate(60)}
              </select>
              <span>:</span>
              <select value={seconds} onChange={(e)=>setSeconds(e.target.value)} className={style.select}>
                {generate(60)}
              </select>
            </div>
            <button className={style.saveBtn} onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatbot
