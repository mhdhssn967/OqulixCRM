import React, { useEffect, useState } from 'react';
import './Homepage.css';
import RecordsTable from '../components/RecordsTable';
import AddRecordModal from '../components/AddRecordModal';
import getBDAName from '../services/fetchNames';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import AdminDashboard from '../components/AdminDashboard';
import { auth } from '../firebaseConfig';
const adminId = import.meta.env.VITE_ADMIN_ID

const HomePage = () => {
  const [userName, setUserName] = useState("BD Associate");
  const [triggerRefresh,setTriggerRefresh]=useState(true)
  const [admin, setAdmin]=useState(false)
  console.log("admin",admin);
  
  

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userName = await getBDAName(user.uid);
          setUserName(userName || "BD Associate"); // Fallback to default if name not found
          fetchAdmin(user.uid)
        } catch (err) {
          console.log("Error fetching user name:", err);
        }
      }
    });

    return () => unsubscribe(); // Cleanup function
  }, [triggerRefresh]); // Runs only on mount

  
  const fetchAdmin=(UID)=>{
    console.log("UID:",UID, adminId);
    
   UID==adminId?setAdmin(true):setAdmin(false)
  }
  

  return (
    <>
      <h1 className='homeTitle'>Hello {userName}</h1>
      <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'start' }}>
        <button style={{ margin: '1%' }} className='btn btn-secondary'>View Associates</button>
        <AddRecordModal triggerRefresh={triggerRefresh} setTriggerRefresh={setTriggerRefresh}/>
      </div>


     { admin==true&&(
      <div style={{margin:'3%'}}><AdminDashboard/></div>
     )
}

      <RecordsTable triggerRefresh={triggerRefresh} admin={admin}/>
    </>
  );
};

export default HomePage;
