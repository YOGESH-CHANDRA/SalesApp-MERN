import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSalesRecord } from "../SalesContext";
import { toast } from "react-toastify";
import Spinner from "../component/Spinner";
import URL from "../Constant.js";

// login form component
const Login = () => {
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const { setToken, localStorageToken } = useSalesRecord();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUserLogin((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
setLoading(true);
    const loginUser = async () => {
      try {
        const res = await fetch(`${URL}/user/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userLogin),
        });

        let resp = await res.json();

        if (res.ok && res.status == 200) {
          localStorageToken(resp.token);
          setToken(resp.token);

          toast.success("Login succesfully");
          // navigate to Add sales page.
          setLoading(false);
          navigate("/addSales");
        } else {
          setLoading(false);
          toast.info(resp.message);
        }
      } catch (error) {
        toast.info(error);
        setLoading(false);
      }
    };

    loginUser();

    setUserLogin({ email: "", password: "" });
  };
  return (
    < div className="login p-2 ">
    {!loading?
      <>
      <h1 className="text-center my-2">LOGIN FORM</h1>
      <form className="bg-light p-2 was-validated col-lg-6 col-md-12 m-auto">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            name="email"
            value={userLogin.email}
            required
            onChange={inputHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            name="password"
            value={userLogin.password}
            onChange={inputHandler}
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
      </form>
      <Link to="/register" className="d-flex justify-content-center">
        New user? Register here
      </Link>
    </>
      :<Spinner/>}
      </div>
  );
};

export default Login;
