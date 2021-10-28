import axios from "axios";

const fetchData = async(pageNo) =>{
    const res =  await axios.get(`https://picsum.photos/v2/list?page=${pageNo}&limit=15`);
    console.log("res",res);
    return res.data;
 }

 export {fetchData}