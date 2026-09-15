import { useNavigate, useSearchParams } from "react-router";

function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") || "";

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const value = formData.get("search")?.trim() || "";

    if (value) {
      navigate(`/products?search=${encodeURIComponent(value)}`);
    } else {
      navigate("/products");
    }
  }

  function handleClear() {
    navigate("/products");
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label className="search-label" htmlFor="product-search">
        Search products
      </label>

      <div className="search-input-wrapper">
        <span className="search-icon" aria-hidden="true">
          ⌕
        </span>

        <input
          key={searchTerm}
          id="product-search"
          className="search-input"
          name="search"
          type="search"
          defaultValue={searchTerm}
          placeholder="Search products..."
          autoComplete="off"
        />

        {searchTerm && (
          <button
            className="search-clear"
            type="button"
            aria-label="Clear search"
            onClick={handleClear}
          >
            ×
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchBar;
