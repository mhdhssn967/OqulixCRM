import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
const adminId = import.meta.env.VITE_ADMIN_ID

/**
 * Fetch records added by the current logged-in user.
 * @returns {Promise<Array>} - Returns an array of records.
 */
export const fetchRecords = async (userID) => {
  try {
    // Check if user is logged in
    if (!auth.currentUser) {
      console.warn("User not logged in.");
      return [];
    }

    const q = query(collection(db, "records"), where("associate", "==", userID));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching records:", error);
    return []; // Return an empty array on error
  }
};

export const fetchAdminRecords = async (userID) => {

  if (userID !== adminId) {
    console.warn("Unauthorized access: Only admin can fetch all records.");
    return []; // Return an empty array
  }

  try {
    // Check if user is logged in
    if (!auth.currentUser) {
      console.warn("User not logged in.");
      return [];
    }

    const querySnapshot = await getDocs(collection(db, "records"));

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching records:", error);
    return []; // Return an empty array on error
  }
};


