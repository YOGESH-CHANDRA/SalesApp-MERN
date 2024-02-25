import { useEffect, useState } from "react";
import Spinner from "../component/Spinner";
import { toast } from "react-toastify";
import URL from "../Constant.js";

const Top5sales = () => {
  const [top5sales, setTop5sales] = useState([]);
  const [loading, setLoading] = useState(false);
  const top5salesData = async () => {
    try {
      setLoading(true);
      const resp = await fetch(`${URL}/api/v1/salesData/top5sales`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwtSAtoken")}`,
        },
      });

      if (resp.ok) {
        const data = await resp.json();
        setLoading(false);
        setTop5sales(data);
      }
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    top5salesData();
  }, []);

  return (
    <div className="top5sales bg-secondary row p-3 text-center">
      <h1 className="text-center">TOP 5 SALES</h1>
      {!loading ? (
        <table className="table bg-white  m-auto">
          <thead className="border-bottom">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Sales Id</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Sale Amount</th>
            </tr>
          </thead>
          <tbody>
            {top5sales.map((salesItem, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{salesItem.salesId}</td>
                <td>{salesItem.productName}</td>
                <td>{salesItem.quantity}</td>
                <td>{salesItem.salesAmount}/-</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Top5sales;
