import React, { useState, useEffect } from 'react';
import styles from '../styles/team.module.css';
import editIcon from '../assets/edit.png';
import deleteIcon from '../assets/delete.png';
const url = import.meta.env.VITE_BACKEND_URL;
function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  //   ([
  //   { id: 1, username: 'Olive', phone: '9999999999', email: 'olive@gmail.com', role: 'Admin' },
  //   { id: 2, username: 'Meghana', phone: '9090909090', email: 'meghana@gmail.com', role: 'member' },
  //   { id: 3, username: 'Rahul', phone: '7777777777', email: 'rahul@gmail.com', role: 'member' },
  //   { id: 4, username: 'Meenu', phone: '8908908909', email: 'meenu@gmail.com', role: 'member' },
  //   { id: 5, username: 'Vishwatha', phone: '7897897890', email: 'vishwatha@gmail.com', role: 'member' }
  // ]);
  const token=localStorage.getItem("authToken");
  const storedUserId = localStorage.getItem("userId")
  const [showModel, setShowModel] = useState(false);
  const [newteamMember, setNewTeamMember] = useState({
    username: '',
    phone: '',
    email: '',
    password:'',
    role: '',
    createdBy: storedUserId,
    assignedChats: []
  })

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [dltModel, setDltModel] = useState(null)
  const role=localStorage.getItem("role");
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${url}/user/add-teammembers/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}`
        },
      });
      setDltModel(false);
      fetchTeamDetails();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setTeamMembers((prevMembers) => prevMembers.filter((mem) => mem._id !== id));
    fetchTeamDetails();
  };

  const handleEdit = (member) => {
    setNewTeamMember({ username: member.username, phone: member.phone, email: member.email, password:member.password, role: member.role, assignedChats: member.assignedChats, createdBy: member.createdBy });
    setEditId(member._id);
    setIsEditing(true);
    setShowModel(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeamMember({ ...newteamMember, [name]: value });

  }


  const fetchTeamDetails = async () => {
    console.log(storedUserId)
    try {
      const res = await fetch(`${url}/user/add-teammembers/${storedUserId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}`
        }
      })
      const text = await res.text();
      const data = JSON.parse(text);
      setTeamMembers(data);
      setTeamMembers(data);
      console.log(data);
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {

    console.log(storedUserId);
    fetchTeamDetails(storedUserId);
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        const response = await fetch(`${url}/user/add-teammembers/${editId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
          },
          body: JSON.stringify(newteamMember)
        })
        const updated = await response.json();
        setTeamMembers(prev =>
          prev.map((member) =>
            member._id === editId ? updated : member
          )
        );
        console.log(updated);
        setNewTeamMember({ username: '', phone: '', email: '',password:'', role: '', createdBy: storedUserId });
        setShowModel(false);
        fetchTeamDetails();
      } else {
        const response = await fetch(`${url}/user/add-teammembers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
          },
          body: JSON.stringify(newteamMember)
        })

        const data = await response.json();
        console.log(data);
        setNewTeamMember({ username: '', phone: '', email: '',password:'', role: '', createdBy: storedUserId });
        setShowModel(false);
        setEditId(null);
        setIsEditing(false);
        fetchTeamDetails();
      }
    } catch (err) {
      console.error(err);
    }

  }

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Team</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Full Name</th>
            <th className={styles.th}>Phone</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Role</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member) => (
            <tr key={member._id}>
              <td className={styles.th}>{member.username}</td>
              <td className={styles.th}>{member.phone}</td>
              <td className={styles.th}>{member.email}</td>
              <td className={styles.th}>{member.role}</td>
              <td className={styles.th}>
                <button className={styles.editBtn} onClick={() => handleEdit(member)}>
                  <img src={editIcon} alt='edit'/>
                </button>
                <button className={styles.deleteBtn}
                  onClick={() => setDltModel(mem._id)}
                >
                  <img src={deleteIcon} alt='detele'/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className={styles.addBtn}
        onClick={() =>{ 
          if(role?.toLowerCase() !=='admin'){
            alert('Only admins can add the teammembers')
            return
          }
          setShowModel(true)
        }
        }
      >Add Team members</button>

      {dltModel &&  (
        <div className={styles.deleteModel}>
          <h3 className={styles.heading}>This teammate will be deleted</h3>
          <div className={styles.btngroup}>
            <div className={styles.btngrouptwo}>
              <button onClick={() => setDltModel(null)} className={styles.cancelBtntwo}>Cancel</button>
              <button onClick={() => { handleDelete(dltModel)
                setDltModel(null)
               }} className={styles.confirmBtn}> confirm</button>
            </div>
          </div>
        </div>
      )}

      {showModel && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h4 className={styles.modelHeading}>Add New Team Member</h4>
            <h5 className={styles.subHeading}>Talk with colleagues in a group chat. Messages in this group are only visible to it's participants. New teammates may only be invited by the administrators.
            </h5>
            <form onSubmit={handleSubmit}>
              <label>User name</label>
              <input
                type="text"
                name="username"
                placeholder="User name"
                value={newteamMember.username}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={newteamMember.phone}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newteamMember.email}
                onChange={handleInputChange}
                className={styles.input}
                required
              />
              <label>Password</label>
              <input type='password' name='password' 
              placeholder='password' 
              value={newteamMember.password}
              onChange={handleInputChange}
              className={styles.input}
              required/>
              <label>Role</label>
              <select name='role' value={newteamMember.role} 
              className={styles.select}
               onChange={handleInputChange} required>

                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="Member">Member</option>
              </select>
              <div className={styles.modalButtons}>
                <button type='submit' className={styles.saveBtn}>
                  {isEditing ? 'Edit' : 'Save'}
                </button>
                <button onClick={() => setShowModel(false)}
                  type='button'
                  className={styles.cancelBtn}
                >Cancel</button>

              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default Team
