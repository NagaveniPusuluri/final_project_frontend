import React, { createContext, useState } from "react";

export const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const date=new Date();
  const timeDate =
  date.getHours().toString().padStart(2, "0") +
  date.getMinutes().toString().padStart(2, "0") +
  date.getSeconds().toString().padStart(2, "0") +
  date.getDate().toString().padStart(2, "0") +
  (date.getMonth() + 1).toString().padStart(2, "0") +
  date.getFullYear().toString();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'NA',
    assignedTo: null,
    ticketNo:`ticket # ${timeDate}`
  });

  const [welcomeMsg, setWelcomeMsg] = useState(localStorage.getItem('welcomeMsg')||`👋 Want to chat about Hubly? I'm a chatbot here to help you find your way.`);
  const [headerColor, setHeaderColor] = useState(localStorage.getItem('selectedHeader') ||'#ffffff');
  const [backgroundColor, setBackgroundColor] = useState(localStorage.getItem('selectedBodyColor') ||'#ffffff');
  const [customMessage1, setCustomMessage1] = useState(localStorage.getItem('customMsg1')|| 'How can i help you?');
  const [customMessage2, setCustomMessage2] = useState(localStorage.getItem('customMsg2')|| 'Ask me anything!');
  const [missedChatTimer,setMissedChatTimer]=useState(localStorage.getItem("missedChatTimer")|| null);

  return (
    <ChatbotContext.Provider value={{
      formData, setFormData,
      welcomeMsg, setWelcomeMsg,
      headerColor, setHeaderColor,
      backgroundColor, setBackgroundColor,
      customMessage1, setCustomMessage1,
      customMessage2, setCustomMessage2,
      missedChatTimer,setMissedChatTimer
    }}>
      {children}
    </ChatbotContext.Provider>
  );
};
