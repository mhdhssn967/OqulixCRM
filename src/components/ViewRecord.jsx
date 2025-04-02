import React from 'react'
import './ViewRecord.css'

const ViewRecord = () => {
  return (
    <>
      <div className='viewRecord'>
        <h1>Detailed View</h1>
        <div>
          <h2>Institute Name : <span>Aster Medicity</span></h2>
          <h2>Representative : <span>Dr. Gopalan</span></h2>
        </div>
        <div>
          <h2>Person of contact : <span>Nandan Sir</span></h2>
          <h2>Contact No : <span><a href='tel:989877777'>989877777</a></span> </h2>
        </div>
        <div>
          <h2>Associate : <span>Sakeer</span></h2>
          <h2>Status : <span>To contact</span></h2>
        </div>
        <div>
          <h2>Last Contacted Date : <span>12-04-2025</span></h2>
          <h2>Next Follow Up Date : <span>23-05-2025</span></h2>
        </div>
        <div>
          <h2>Remarks 
            <span> : Lorem ipsum dolor sit amet consectetur adipisicing elit. In mollitia distinctio maxime ipsam accusamus, et, esse magni placeat vitae qui cupiditate praesentium facere eum itaque quibusdam voluptatum reprehenderit consequuntur temporibus.</span>
          </h2>
        </div>
      </div>
    </>
  )
}

export default ViewRecord