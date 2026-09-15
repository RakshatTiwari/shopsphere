import { Link, NavLink } from "react-router";
import SearchBar from "../search/SearchBar";
import { useCart } from "../../hooks/useCart";

function Navbar() {
  const { cartItemCount } = useCart();

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
            {cartItemCount > 0 && (
              <span
                className="cart-count"
                aria-label={`${cartItemCount} items`}
              >
                {cartItemCount}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
