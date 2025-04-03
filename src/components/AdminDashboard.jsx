import React, { useEffect, useState } from 'react'
import './AdminDashboard.css'
import { fetchAdminRecords } from '../services/fetchRecords'
import { getAuth,onAuthStateChanged } from 'firebase/auth'
import { useFetcher } from 'react-router-dom'

const AdminDashboard = () => {

  const [records,setRecords]=useState([])
  const [user,setUser]=useState(null)
  const [BDAcount, setBDACount]=useState(0)
  const [dealsClosed,setDealsClosed]=useState(0)
  const [dealsLoast,setDealsLost]=useState(0)


  useEffect(() => {
      const auth = getAuth();
  
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          try {
              const data = await fetchAdminRecords(currentUser.uid);
              setRecords(data)
            }       
           catch (error) {
            console.error("Error fetching records:", error);
          }
        } else {
          setUser(null);
          setRecords([]);
        }
      });
  
      return () => unsubscribe();
    }, []);

    useEffect(()=>{
      const uniqueAssociates = new Set(records.map(record => record.associate));
      setBDACount(uniqueAssociates.size)
      const closedDeals = records.filter(record=>record.currentStatus=='Deal Closed')
      setDealsClosed(closedDeals.length)
      const lostDeals = records.filter(record=>record.currentStatus=='Deal Lost')
      setDealsLost(lostDeals.length)
    },[records])

    
  return (
    <>
    <div className='dashContainer'>
      <div className='dashMain'>
        <p>Total Leads : {records.length}</p>
      </div>
      <div className='dashMain'>
        <p>No of associates : {BDAcount}</p>
      </div>
      <div className='dashMain'>
        <p>Deals Closed: {dealsClosed}</p>
      </div>
      <div className='dashMain'>
        <p>Deals Lost : {dealsLoast}</p>
      </div>
      <div className='dashMain'>
        <p>Pending Follow-ups</p>
      </div>
      <div className='dashMain'>
        <p>Follow ups in 2 days</p>
      </div>
      <div className='dashMain'>
        <p>Total Revenue from closed deals</p>
      </div>
    </div>

    </>
  )
}

export default AdminDashboard