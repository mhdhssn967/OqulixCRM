import React from 'react'
import './ViewRecord.css'
import close from '../assets/close.png'

const ViewRecord = ({setViewRecord}) => {
  return (
    <>
      <div className='viewRecord'>
        <div className='head'>
          <h1>Detailed View</h1>
          <img src={close} alt="" style={{width:'40px', filter:'invert(1)',alignSelf:'right'}} onClick={()=>setViewRecord(false)}/>
        </div>
        <div className='det'>
          <h2>Institute Name : <span>Aster Medicity</span></h2>
          <h2>Initial Date : <span>12-04-2024</span></h2>
        </div>
        <div className='det'>
          <h2>Associate : <span>Sakeer</span></h2>
          <h2>Status : <span>To contact</span></h2>
        </div>
        <div className='det'>
          <h2>Person of contact : <span>Nandan Sir (Physio Head)</span></h2>
          <h2>Contact No : <span><a href='tel:989877777'>989877777</a></span> </h2>
        </div>
        <div className='det'>
          <h2>Representative : <span>Mr. Anand (MDd)</span></h2>
          <h2>Email ID : <span><a href='mailto:hospital@gmail.com'>hospital@gmail.com</a></span> </h2>
        </div>
        <div className='det'>
          <h2>Initial Quotes Price : <span>$568888</span></h2>
          <h2>Final Agreed Price : <span>$23344</span> </h2>
        </div>
        <div className='det'>
          <h2>Last Contacted Date : <span>12-04-2025</span></h2>
          <h2>Next Follow Up Date : <span>23-05-2025</span></h2>
        </div>
        <div className='det'>
          <h2>Remarks 
            <span> : Lorem ipsum dolor sit amet consectetur adipisicing elit. In mollitia distinctio maxime ipsam accusamus, et, esse magni placeat vitae qui cupiditate praesentium facere eum itaque quibusdam voluptatum reprehenderit consequuntur temporibus.</span>
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