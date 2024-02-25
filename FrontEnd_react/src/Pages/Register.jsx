import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../component/Spinner";

// registration form
const Register = () => {
  const [registerUser, setRegisterUser] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setRegisterUser((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const RegisterUser = async () => {
      console.log(registerUser);
      if (
        registerUser.firstName &&
        registerUser.lastName &&
        registerUser.email &&
        registerUser.password
      ) {
        try {
          setLoading(true);
          console.log(registerUser);
          const res = await fetch("/user/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(registerUser),
          });

          let resp = await res.json();

          if (res.ok && res.status == 201) {
            toast.success(resp.message);
            // If registerd succesful navigate to login page.
            setLoading(false);
            navigate("/login");
          } else {
            toast.warning(resp.message);
            setLoading(false);
          }
        } catch (error) {
          toast.error(error);
        }
      } else {
        toast.info("All field is  required");
      }
    };

    RegisterUser();

    setRegisterUser({ firstName: "", lastName: "", email: "", password: "" });
  };

  return (
    <div className="register was-validated row p-2">
      {!loading?<>
        <h1 className="text-center my-2">Registration Form</h1>
      <form className="bg-light p-2 col-lg-6 col-md-11  m-auto">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            className="form-control"
            name="firstName"
            value={registerUser.firstName}
            onChange={inputHandler}
            required
            placeholder="First Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName"></label>Last Name
          <input
            type="text"
            id="lastName"
            className="form-control"
            required
            name="lastName"
            value={registerUser.lastName}
            onChange={inputHandler}
            placeholder="Last Name"
          />
        </div>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="form-control"
          name="email"
          value={registerUser.email}
          onChange={inputHandler}
          required
          placeholder="Email"
        />

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            name="password"
            minlength="8"
            placeholder="Passowrd must be 8 characters"
            value={registerUser.password}
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
      <Link to="/login" className="d-flex justify-content-center">
        Already a user? Login here
      </Link>
      </>:<Spinner/>
      
    
    }
    </div>
  );
};

export default Register;
