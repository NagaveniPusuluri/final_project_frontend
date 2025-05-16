import React, { useEffect, useState } from 'react'
import styles from '../styles/settings.module.css'
import {getUserDetails, settings } from '../services'

function Settings() {

  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const role = localStorage.getItem("role")
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId")

    console.log(role);
    if (storedUserId) {
      setUserId(storedUserId);
    }
    else {
      console.error("User ID not found in localStorage");
      window.location.href = "/login";
    }
  }, [])

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: role,
    password: "",
    confirmPassword: ""
  })
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    if (formData.password !== formData.confirmPassword) {
      console.log("Password and Confirm Password do not match")
      return;
    }
    if (!userId) {
      console.error("User ID is not set");
      return;
    }
    const { response, data } =await settings(formData, userId)

    if (response && response.ok) {
      console.log("User updated successfully");
      localStorage.clear();
      window.location.reload();
      window.location.href = "/login";
      console.log(formData);
      console.log(response);
      console.log(data);
      console.log(userId);
    } else {
      alert("Error updating user", data?.message);
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   const storedUserId = localStorage.getItem("userId");
  //   if (storedUserId) {
  //     setUserId(storedUserId);
  
  //     const fetchUserData = async () => {
  //       const { response, data } = await getUserDetails(storedUserId);
  //       if (response && response.ok) {
  //         setFormData({
  //           firstName: data.firstName || "",
  //           lastName: data.lastName || "",
  //           email: data.email || "",
  //           role: data.role || role,  
  //           password: "",
  //           confirmPassword: ""
  //         });
  //       } else {
  //         console.error("Failed to fetch user details", data?.message);
  //       }
  //     };
  
  //     fetchUserData();
  //   } else {
  //     console.error("User ID not found in localStorage");
  //     window.location.href = "/login";
  //   }
  // }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}> Settings</h3>
      <div>
        <h3 className={styles.heading}></h3>
      </div>
      <hr className={styles.line} />
      <form onSubmit={handleSubmit} className={styles.formBody}>
        <label className={styles.label}>First Name</label>
        <input type='text'
          name='firstName'
          className={styles.input}
          required
          value={formData.firstName}
          onChange={handleChange} />
        <label className={styles.label}>Last Name</label>
        <input type='text'
          name='lastName'
          className={styles.input}
          required
          value={formData.lastName}
          onChange={handleChange} />
        <label className={styles.label}>Email</label>
        <input type='email'
          name='email'
          className={styles.input}
          required
          value={formData.email}
          onChange={handleChange} />
        <label className={styles.label}>Password</label>
        <input type='password'
          name='password'
          autoComplete='new-password'
          className={styles.input}
          required
          value={formData.password}
          onChange={handleChange} />
        <label className={styles.label}>Confirm Password</label>
        <input type='password'
          name='confirmPassword'
          autoComplete='new-password'
          className={styles.input}
          required
          value={formData.confirmPassword}
          onChange={handleChange} />
        <button className={styles.saveBtn}
          type='submit' disabled={loading}>
          {/* Save */}
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  )
}

export default Settings
