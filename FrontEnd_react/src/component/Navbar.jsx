import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useSalesRecord } from "../SalesContext";
import { useEffect } from "react";
import { toast } from "react-toastify";

// Navbar or header

const Navbar = () => {
  const { token, setToken } = useSalesRecord();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("jwtSAtoken");
    setToken(localStorage.getItem("jwtSAtoken"));
    toast.warn("Logout succesfully");
    navigate("/login");
  };

  useEffect(() => {
    setToken(localStorage.getItem("jwtSAtoken"));
  });

  return (
    <div className="navbar bg-primary ">
      <nav className="navbar navbar-expand-lg  w-100">
        <div className="container-fluid">
          <div className="navbar-brand" >
            <b>SALES APP</b>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ">
            
              {token ? 
                 <>
                 <NavLink
                    className="nav-link "
                    aria-current="page"
                    to="/addSales"
                  >
                    ADD SALES
                  </NavLink>
                  <NavLink className="nav-link " to="/top5sales">
                    TOP 5 SALES
                  </NavLink>
                  <NavLink className="nav-link " to="/totalrevenue">
                    TODAY'S TOTAL REVENUE
                  </NavLink>
                  <NavLink
                    className="nav-link logout"
                    to="/logout"
                    onClick={handleLogout}
                  >
                    LOGOUT
                  </NavLink>
                </>
              : 
                <>
                  <NavLink className="nav-link " to="/login">
                    LOGIN
                  </NavLink>
                  <NavLink className="nav-link " to="/register">
                    REGISTER
                  </NavLink>
                </>
              }
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
