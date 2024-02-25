import { useEffect, useState } from "react";

import Spinner from "../component/Spinner";
import { toast } from "react-toastify";

// total revenue component
const TotalRevenue = () => {
  const [revenue, setRevenue] = useState(0);
  const [loading, setLoading] = useState(false);

  const totalRevenue=async()=>{
  try {
    setLoading(true);
    const resp = await fetch("/api/v1/salesData/totalRevenue", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwtSAtoken"),
      }
    });

   if(resp.ok){

    const data = await resp.json();
    setLoading(false);
    
    setRevenue(data.Revenue);
   }
  } catch (error) {
    toast.error(error);
    setLoading(false);
  }
}


  useEffect( ()=>
  {totalRevenue()}
  
  ,[])


  return (
    <div className="todaysTotalRevenue m-auto">
      {!loading?<h1 className="text-center">TODAYS REVENUE IS Rs. {revenue}/-</h1>:<Spinner/>}
    </div>
  );
};

export default TotalRevenue;
