import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink to="/books" className="brand">
                <span className="brand-mark">C</span>
                <span>Cinioweb</span>
            </NavLink>

            <div className="nav-links">
                <NavLink to="/books">Books</NavLink>
                <NavLink to="/reader">Reader</NavLink>  {/*modify later*/}
            </div>
        </nav>
    );
}

export default Navbar;