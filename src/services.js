const url = import.meta.env.VITE_BACKEND_URL;

const token=localStorage.getItem("authToken");
const login = async (formData) => {
    try {
        const response = await fetch(`${url}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify({ ...formData })
        })
        if (!response.ok) {
            const errorText = await response.text(); 
            console.error("Server error:", errorText);
            return;
        }
        const data = await response.json();
        localStorage.setItem("authToken",data.token)
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async  function signup (formData){
    try{
        const response=await fetch( `${url}/user/signup`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)

        })
        const data= await response.json()
        console.log(data);
        console.log("User Registered",formData);
    }catch(err){
        console.log(err.message);
    }
}

export async function settings(formData, userId) {
    try {
        const response = await fetch(`${url}/user/update/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        return {response, data}
      } catch (err) {
        console.error(err.message );
      }
}

export async function postCustomer(formData) {
    try {
        const response = await fetch(`${url}/customer/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify(formData)
        })
        
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export async function postMessage(id,message){
    try {
        const response = await fetch(`${url}/customer/add-message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, message })
        })
        const result = await response.json()
        return result;
    }
    catch (err) {
        console.log(err)
        return { err: err.message }
    }
}

export async function fetchBotDetails (id) {
    try {
        const res = await fetch(`${url}/customer`,{
            method: "GET",
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            }
        }
        );
        const data = await res.json();

        const currentUser = data.find((user) => user._id === id);
        return currentUser;
        
    } catch (err) {
        console.log("Error fetching customer messages:", err);
    }
}

export async function fetchCustomer ()  {
    try {
        const res = await fetch(`${url}/customer`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            }
        })
        const data = await res.json();
        console.log(data);
        return data

        
    } catch (err) {
        console.log(err)
    }
}
export async function fetchTeamMessages(storedUserId) {
    try {
        const response = await fetch(`${url}/customer/teammember/messages/${storedUserId}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${token}`
            }
        });
        const result = await response.json();

        console.log(result)

    } catch (err) {
        console.log(err.message)
    }
}

export async function fetchTeamDetails(storedUserId) {
    try {
      const res = await fetch(`${url}/user/add-teammembers/${storedUserId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        }
      })
      const data = await res.json()
      return data;
    //   setTeamMembers(data);
      console.log(data);
    }
    catch (err) {
      console.log(err)
    }
  }

export async function updateMissedChat(id,day) {
    try{
        const res=await fetch(`${url}/customer/update-missed`,{
            method:'POST',
            headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({id:id,day:day})
        })
        const data=await res.json();
        return data;

    }catch(err){
        console.log( err.message);
    }
}  

export async function fetchMissedChats(){
    try{
        const res=await fetch (`${url}/customer/get-missed-chats`,{
            method:'GET',
            headers:{
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
            }
        })
        const data= await res.json();
        return data;
    }catch(err){
        console.log(err.message)
        return err;
    }
}

export default login;