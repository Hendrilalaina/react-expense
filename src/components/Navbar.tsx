import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSignout } from "../hooks/useSignout";

const Navbar = () => {
  const { isAuthenticated } = useAuthContext();
  const { logout } = useSignout();

  return (
  <nav className="navbar navbar-expand-lg">
    <div className="container">
      <Logo />
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-link" aria-current="page" to="/">Dashboard</NavLink>
          <NavLink className="nav-link" to="/new">New Expense</NavLink>
          <NavLink className="nav-link" to="/reports">Reports</NavLink>
        </div>
      </div>
      <div className="d-flex" role="search">
        {!isAuthenticated ? (
          <>
            <NavLink className="btn btn-sm btn-outline-light" to="/login">Login</NavLink>
            <NavLink className="btn btn-sm btn-outline-light mx-2" to="/register">Register</NavLink>
          </>
        ) : null}
        {isAuthenticated ? (
          <button className="btn btn-sm app-primary-bg-color btn-outline-light" onClick={logout}>
            Logout
          </button>
        ) : null}
      </div>
    </div>
  </nav>
  )
}

export default Navbar;