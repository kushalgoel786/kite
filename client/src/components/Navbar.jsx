import { useDashboardContext } from "../pages/Dashboard";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { logoutUser } = useDashboardContext();
  return (
    <nav className="flex shadow justify-between items-center px-10 h-12">
      <NavLink to="/dashboard">
        <div className="bg-white w-8">
          <img src="/kite-logo.svg" alt="" />
        </div>
      </NavLink>
      <button onClick={logoutUser}>Logout</button>
    </nav>
  );
};

export default Navbar;
