import { getDoc, getFirestore, doc } from "firebase/firestore";


const db=getFirestore();

/**
 * Fetches the BDA name corresponding to a given BDA ID.
 * @param {string} BDAid - The ID of the BDA.
 * @returns {Promise<string>} - A promise that resolves to the BDA name or "Not Found".
 */

const getBDAName = async(BDAid)=>{
    try{
        const BDARef=doc(db, 'BDAs',BDAid)
        const BDASnap = await getDoc(BDARef)

        if(BDASnap.exists()){
            return BDASnap.data().name;
        }else{
            return "Not Found"
        }
    }catch(err){
        console.log("Error fetching BDA name",err);
        return "Error"
    }
}
export default getBDAName;