import { Link, NavLink } from "react-router";
import SearchBar from "../search/SearchBar";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link className="navbar-brand" to="/">
          ShopSphere
        </Link>

        <div className="navbar-search">
          <SearchBar />
        </div>

        <nav className="navbar-links" aria-label="Primary navigation">
          <NavLink
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
            to="/"
          >
            Home
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
            to="/products"
          >
            Products
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
            to="/wishlist"
          >
            Wishlist
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
            to="/cart"
          >
            Cart
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
