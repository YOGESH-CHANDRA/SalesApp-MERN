import { toast } from "react-toastify";
import { useSalesRecord } from "../SalesContext";
import Spinner from "../component/Spinner";
import { useState } from "react";
import URL from "../Constant.js";
// Add sales form component
const AddSales = () => {
  const { salesItem, setSalesItem, setSalesData } = useSalesRecord();
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalesItem((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { salesId, productName, quantity, salesAmount } = salesItem;
    console.log(salesId, productName, quantity, salesAmount);
    setSalesData((prev) => [...prev, salesItem]);

    try {
      setLoading(true);
      const res = await fetch(`${URL}/api/v1/salesData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtSAtoken")}`,
        },
        body: JSON.stringify(salesItem),
      });
      console.log(await res.json());
      if (res.ok) {
        setSalesItem({
          salesId: "",
          productName: "",
          quantity: "",
          salesAmount: "",
        });
        setLoading(false);
        toast.info("Sales data added");
      }
    } catch (error) {
      toast.error(error);
      setLoading(false);
    }
  };

  return (
    <div className="addSales row p-lg-0 p-md-2 m-auto">
      <h1 className="text-center my-2">ADD SALES ENTRY</h1>
     {!loading? <form className="bg-light p-2 col-lg-8 col-md-12  w-100">
        <div className="form-group">
          <label htmlFor="salesId">Sales Id </label>
          <br />
          <input
            type="text"
            id="salesId"
            className=" form-control "
            name="salesId"
            value={salesItem.salesId}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <br />
          <input
            type="text"
            id="productName"
            className=" form-control "
            name="productName"
            value={salesItem.productName}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="form-group ">
          <label htmlFor="Quantity">Quantity</label>
          <br />
          <input
            type="number"
            id="quantity"
            className=" form-control  "
            name="quantity"
            value={salesItem.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="salesAmount">Amount</label>
          <br />
          <input
            type="number"
            id="salesAmount"
            className="form-control"
            name="salesAmount"
            value={salesItem.salesAmount}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <button
          type="submit"
          className="btn btn-primary w-100"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>:<Spinner/>}
    </div>
  );
};

export default AddSales;
