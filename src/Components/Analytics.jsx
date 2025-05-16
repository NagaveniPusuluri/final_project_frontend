import React, { useEffect, useState } from 'react'
import styles from '../styles/analytics.module.css'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { fetchCustomer, fetchMissedChats } from '../services'

function Analytics() {
  const [chatCount, setChatCount] = useState(0);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [replyingTime, setReplyingTime] = useState(0);
  const [data, setData] = useState([]);

  const WeeklyChats = (data) => {
    const result = [];
    let week = 1;

    for (let i = 0; i < data.length; i += 7) {
      const weekSlice = data.slice(i, i + 7);
      const missedchats = weekSlice.reduce((sum, day) => sum + day.count, 0);
      result.push({
        name: `week${week}`,
        missedchats,
      });
      week++;
    }

    return result;
  }

  const fetchTickets = async () => {
    const res = await fetchCustomer();
    console.log(res);
    setChatCount(res.length);
    const resolvedChats = res.filter((ticket) => ticket.status === "resolved")
    setResolvedCount(Math.ceil((resolvedChats.length / res.length) * 100))

    const msgRpy = res.filter(item =>
      item.messages.some(message => message.sender === 'bot')
    );
    console.log(msgRpy)

    let totalReplyTime = 0;
    let replyCount = 0;

    msgRpy.forEach(ticket => {
      const sortedMessages = [...ticket.messages].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      const botFirstIndex = sortedMessages.findIndex(msg => msg.sender === 'bot');

      if (botFirstIndex > 0) {
        const userBeforeBot = [...sortedMessages]
          .slice(0, botFirstIndex)
          .reverse()
          .find(msg => msg.sender === 'customer');

        if (userBeforeBot) {
          const userTime = new Date(userBeforeBot.createdAt).getTime();
          const botTime = new Date(sortedMessages[botFirstIndex].createdAt).getTime();

          const replyTime = botTime - userTime;

          totalReplyTime += replyTime;
          replyCount++;
        }
      }
    });


    const averageReplyTimeMinutes = replyCount > 0 ? Math.round((totalReplyTime / replyCount) / (1000 * 60)) : 0;
    setReplyingTime(averageReplyTimeMinutes);
    setReplyingTime(averageReplyTimeMs)

    console.log(`Avg reply time: ${averageReplyTimeMs} mins`);
  }

  const fetchMissed = async () => {
    const res = await fetchMissedChats();
    console.log(res);
    const weekData = WeeklyChats(res.data);
    console.log(weekData);
    setData(weekData);
  }

  useEffect(() => {
    fetchTickets();
    fetchMissed();
  }, [])



  return (
    <div className={styles.main}>
      <h3 className={styles.heading}>Analytics</h3>
      <div className={styles.section}>
        <h3 className={styles.missedChats}>Missed Charts</h3>
        <ResponsiveContainer className={styles.chatMain} >
          <LineChart data={data}>
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Line type='monotone' dataKey='missedchats' stroke='#00c853' strokeWidth={2} />
            <CartesianGrid stroke="#ccc" vertical={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.stats}>
        <div className={styles.mainContainer}>

          <h4 className={styles.missedChats}>Average Reply Time</h4>
          <div className={styles.miniContainer}>
            <p className={styles.para}>For highest customer satisfaction rates you should aim to reply to an incoming customer's message in 15 seconds or less. Quick responses will get you more conversations, help you earn customers trust and make more sales.</p>

            <p className={styles.paraRight}>{`${replyingTime} mins`}</p>
          </div>
        </div>

        <div className={styles.mainContainer}>
          <h4 className={styles.missedChats}>Resolved Tickets</h4>
          <div className={styles.miniContainer}>
            <p className={styles.para}>A callback system on a website, as well as proactive invitations, help to attract even more customers. A separate round button for ordering a call with a small animation helps to motivate more customers to make calls.</p>

            <div className={styles.circle}>

              <CircularProgressbar value={resolvedCount} text={`${resolvedCount}%`}
                styles={buildStyles({
                  pathColor: `#00c853`,
                  textColor: `#00c853`,
                  trailColor: `#dde2e9`,
                  textSize: `10px`,
                })
                } />
            </div>
          </div>
        </div>

        <div className={styles.mainContainer}>
          <h4 className={styles.missedChats}>Total Chats</h4>
          <div className={styles.miniContainer}>
            <p className={styles.para}>This metric Shows the total number of chats for all Channels for the selected the selected period </p>
            <p className={styles.paraRight}>{`${chatCount} Chats`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
