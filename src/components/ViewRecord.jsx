import React from 'react'
import './ViewRecord.css'
import close from '../assets/close.png'

const ViewRecord = ({setViewRecord, viewRecordData}) => {
  return (
    <>
      <div className='viewRecord'>
        <div className='head'>
          <h1>Detailed View</h1>
          <img src={close} alt="" style={{width:'40px', filter:'invert(1)',alignSelf:'right'}} onClick={()=>setViewRecord(false)}/>
        </div>
        <div className='det'>
          <h2>Institute Name : <span>{viewRecordData.institutionName}</span></h2>
          <h2>Initial Date : <span>{viewRecordData.date}</span></h2>
        </div>
        <div className='det'>
          <h2>Associate : <span>{viewRecordData.associate}</span></h2>
          <h2>Status : <span>{viewRecordData.currentStatus}</span></h2>
        </div>
        <div className='det'>
          <h2>Person of contact : <span>{viewRecordData.personOfContact} ({viewRecordData.pocDesignation})</span></h2>
          <h2>Contact No : <span><a href={'tel:'+viewRecordData.contactNo}>{viewRecordData.contactNo}</a></span> </h2>
        </div>
        <div className='det'>
          <h2>Referral person : <span>{viewRecordData.referralPerson}</span></h2>
          <h2>Email ID : <span><a href={viewRecordData.email}>{viewRecordData.email}</a></span> </h2>
        </div>
        <div className='det'>
          <h2>Initial Quotes Price : <span>₹{viewRecordData.fPrice}</span></h2>
          <h2>Final Agreed Price : <span>₹{viewRecordData.lPrice}</span> </h2>
        </div>
        <div className='det'>
          <h2>Last Contacted Date : <span>{viewRecordData.lastContacted}</span></h2>
          <h2>Next Follow Up Date : <span>{viewRecordData.nextFollowUp}</span></h2>
        </div>
        <div className='det'>
          <h2>Remarks : <span>
                {viewRecordData.remarks}
            </span>
          </h2>
        </div>

       <div className='btn-div' style={{display:'flex',justifyContent:'right',backgroundColor:'red !important'}}>
          <button className='btn btn-primary'> Edit Record</button>
          <button className='btn btn-danger'> Delete Record</button>
  
       </div>
      </div>
    </>
  )
}

export default ViewRecord