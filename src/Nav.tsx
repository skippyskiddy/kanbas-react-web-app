import { Link, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Nav() {
    const { pathname } = useLocation();

 return (
    <nav className="nav nav-tabs">
      <Link to="/Labs/a3"
            className={`nav-link text-primary fs-5 px-2 ${pathname.includes("a3") ? "active" : ""}`}>A3</Link>
      <Link to="/Kanbas/Dashboard"
            className={`nav-link text-primary fs-5 px-2 ${pathname.includes("Kanbas") ? "active" : ""}`}>Kanbas</Link>
      <Link to="/hello"
            className={`nav-link text-primary fs-5 px-2 ${pathname.includes("hello") ? "active" : ""}`}>Hello</Link>
    </nav>
 );
}
export default Nav;