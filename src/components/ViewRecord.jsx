import React, { useEffect, useState } from "react";
import "./ViewRecord.css";
import close from "../assets/close.png";
import getBDAName from "../services/fetchNames";
import { deleteRecord } from "../services/deleteRecords";
import updateRecord from "../services/editRecord";

const ViewRecord = ({ setViewRecord, viewRecordData, setUpdateTable, updateTable }) => {
  const [bdaName, setBdaName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...viewRecordData });  

  useEffect(() => {
    const fetchBDAName = async () => {
      if (!viewRecordData?.associate) return;
      const BDAname = await getBDAName(viewRecordData.associate);
      setBdaName(BDAname);
    };
    fetchBDAName();
  }, [viewRecordData]);

  const handleDeleteRecord = async (data) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (confirmDelete) {
      await deleteRecord(data);
      setViewRecord(false);
      setUpdateTable(!updateTable);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async() => {
    console.log("Updated Data:", editedData);
    setIsEditing(false);
    await updateRecord(viewRecordData.id,editedData)
    setUpdateTable(!updateTable);
    // You can send `editedData` to your backend API for updating the record
  };

  const handleChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  return (
    <>
      <div className="viewRecord">
        <div className="head">
          <h1>Detailed View</h1>
          <img
            src={close}
            alt=""
            style={{ width: "40px", filter: "invert(1)", alignSelf: "right" }}
            onClick={() => setViewRecord(false)}
          />
        </div>

        <div className="det">
          <h2>
            Institute Name :{" "}
            {isEditing ? (
              <input type="text" value={editedData.institutionName} onChange={(e) => handleChange(e, "institutionName")} />
            ) : (
              <span>{editedData.institutionName}</span>
            )}
          </h2>
          <h2>
            Initial Date : <span>{editedData.date}</span>
          </h2>
        </div>

        <div className="det">
          <h2>
            Associate : <span>{bdaName}</span>
          </h2>
          <h2>
            Status :{" "}
            {isEditing ? (
              <select type="text" value={editedData.currentStatus} onChange={(e) => handleChange(e, "currentStatus")} >
              <option value="New Lead">New Lead</option>
              <option value="Contacted">Contacted</option>
              <option value="Interested">Interested</option>
              <option value="Follow up needed">Follow-Up Needed</option>
              <option value="Quotation Sent">Quotation Sent</option>
              <option value="Awaiting Decision">Awaiting Decision</option>
              <option value="Deal Closed">Converted (Deal Won)</option>
              <option value="Deal Lost">Not Interested (Deal Lost)</option>
                </select>
            ) : (
              <span>{editedData.currentStatus}</span>
            )}
          </h2>
        </div>

        <div className="det">
          <h2>
            Person of contact :{" "}
            {isEditing ? (
              <input type="text" value={editedData.personOfContact} onChange={(e) => handleChange(e, "personOfContact")} />
            ) : (
              <span>
                {editedData.personOfContact} ({editedData.pocDesignation})
              </span>
            )}
          </h2>
          <h2>
            Contact No :{" "}
            {isEditing ? (
              <input type="text" value={editedData.contactNo} onChange={(e) => handleChange(e, "contactNo")} />
            ) : (
              <span>
                <a href={"tel:" + editedData.contactNo}>{editedData.contactNo}</a>
              </span>
            )}
          </h2>
        </div>

        <div className="det">
          <h2>
            Referral person :{" "}
            {isEditing ? (
              <input type="text" value={editedData.referralPerson} onChange={(e) => handleChange(e, "referralPerson")} />
            ) : (
              <span>{editedData.referralPerson}</span>
            )}
          </h2>
          <h2>
            Email ID :{" "}
            {isEditing ? (
              <input type="email" value={editedData.email} onChange={(e) => handleChange(e, "email")} />
            ) : (
              <span>
                <a href={editedData.email}>{editedData.email}</a>
              </span>
            )}
          </h2>
        </div>

        <div className="det">
          <h2>
            Initial Quotes Price :{" "}
            {isEditing ? (
              <input type="number" value={editedData.fPrice} onChange={(e) => handleChange(e, "fPrice")} />
            ) : (
              <span>₹{editedData.fPrice}</span>
            )}
          </h2>
          <h2>
            Final Agreed Price :{" "}
            {isEditing ? (
              <input type="number" value={editedData.lPrice} onChange={(e) => handleChange(e, "lPrice")} />
            ) : (
              <span>₹{editedData.lPrice}</span>
            )}
          </h2>
        </div>

        <div className="det">
          <h2>
            Last Contacted Date :{" "}
            {isEditing ? (
              <input type="date" value={editedData.lastContacted} onChange={(e) => handleChange(e, "lastContacted")} />
            ) : (
              <span>{editedData.lastContacted}</span>
            )}
          </h2>
          <h2>
            Next Follow Up Date :{" "}
            {isEditing ? (
              <input type="date" value={editedData.nextFollowUp} onChange={(e) => handleChange(e, "nextFollowUp")} />
            ) : (
              <span>{editedData.nextFollowUp}</span>
            )}
          </h2>
        </div>

        <div className="det">
          <h2>
            Remarks :{" "}
            {isEditing ? (
              <textarea value={editedData.remarks} onChange={(e) => handleChange(e, "remarks")} />
            ) : (
              <span>{editedData.remarks}</span>
            )}
          </h2>
        </div>

        <div className="btn-div" style={{ display: "flex", justifyContent: "right" }}>
          {isEditing ? (
            <button className="btn btn-success" onClick={handleSave}>
              Save Record
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleEdit}>
              Edit Record
            </button>
          )}
          <button className="btn btn-danger" onClick={() => handleDeleteRecord(viewRecordData.id)}>
            Delete Record
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewRecord;
