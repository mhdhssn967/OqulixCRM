import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAdminRecords, fetchRecords } from '../services/fetchRecords';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './RecordsTable.css';
import getBDAName from '../services/fetchNames';
import fetchChildBDAs from '../services/fetchChildRecords';
import loadingImg from '../assets/loading.png'
const adminId = import.meta.env.VITE_ADMIN_ID

const RecordsTable = ({triggerRefresh, admin}) => {

  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
  
    

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [BDAnames,setBDAnames]=useState([])
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          if(currentUser.uid!=adminId){
          const data = await fetchRecords(currentUser.uid);
          setRecords(data);  
          }else{
            const data = await fetchAdminRecords(currentUser.uid);
            setRecords(data)
          }       
          fetchChilds()
        } catch (error) {
          console.error("Error fetching records:", error);
        }
      } else {
        setUser(null);
        setRecords([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [triggerRefresh]);


  useEffect(() => {
    const nameFetch = async () => {
      const namesArray = await Promise.all(records.map(async (record) => {
        return await getBDAName(record.associate);
      }));
      setBDAnames(namesArray);
    };
  
    if (records.length > 0) nameFetch();
  }, [records]);






  const fetchChilds = async () => {
    try {
      const childBDAids = await fetchChildBDAs();
      console.log("Child BDAs:", childBDAids);
  
      if (childBDAids.length === 0) return; // No child BDAs, exit early
  
      // Fetch records for all child BDAs in parallel
      const childRecordsArrays = await Promise.all(
        childBDAids.map(id => fetchRecords(id)) // Each fetchRecords() call returns an array
      );
  
      // Flatten the array since each fetchRecords call returns an array
      const allChildRecords = childRecordsArrays.flat();
      
      console.log("All Child Data:", allChildRecords);
  
      // Update state with all fetched records at once
      setRecords(prevRecords => [...prevRecords, ...allChildRecords]);
  
    } catch (err) {
      console.error("Error fetching child data:", err);
    }
  };
  
  

  if (loading) return <div className='loadingDiv' style={{display:'flex',alignItems:'center',justifyContent:'center'}}><h1 style={{textAlign:'center',margin:'10%'}}>Loading records <img src={loadingImg} width={'50px'} alt="image" /></h1></div>;

  if (!user) return <p>Please log in to view records.</p>;

  return (
    <div>
      <Table striped bordered hover className="recordsTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Institution Name</th>
            <th>Person of Contact</th>
            <th>Representative</th>
            <th>Contact No</th>
            <th>Associate</th>
            <th>Status</th>
            <th>Last Contacted</th>
            <th>Next Follow Up</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {records.length > 0 ? (
            records.map((record, index) => (
              <tr key={index}>
                <td className={record.nextFollowUp<=formattedDate?'bg-danger':''}>{index + 1}</td>
                <td className={record.nextFollowUp<=formattedDate?'bg-danger':''}>{record.institutionName}</td>
                <td className={record.nextFollowUp<=formattedDate?'bg-danger':''}>{record.personOfContact}</td>
                <td className={record.nextFollowUp<=formattedDate?'bg-danger':''}>{record.representative}</td>
                <td className={record.nextFollowUp<=formattedDate?'bg-danger':''}>{record.contactNo}</td>
                <td className={record.nextFollowUp<=formattedDate?'bg-danger':''}>{BDAnames[index]}</td>
                <td className={record.nextFollowUp<=formattedDate?'bg-danger':''}>{record.currentStatus}</td>
                <td className={record.nextFollowUp<=formattedDate?'bg-danger':''}>{record.lastContacted}</td>
                <td className={record.nextFollowUp<=formattedDate?'bg-danger':''}>{record.nextFollowUp}</td>
                <td className={record.nextFollowUp<=formattedDate?'bg-danger':''}>{record.remarks}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" style={{ textAlign: 'center' }}>No records found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default RecordsTable;
