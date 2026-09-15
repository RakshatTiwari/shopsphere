import { useState } from "react";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedValue = searchValue.trim();

    if (!trimmedValue) {
      return;
    }

    console.log("Search submitted:", trimmedValue);
  }

  function handleChange(event) {
    setSearchValue(event.target.value);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <label className="search-label" htmlFor="product-search">
        Search products
      </label>

      <div className="search-input-wrapper">
        <span className="search-icon" aria-hidden="true">
          ⌕
        </span>

        <input
          id="product-search"
          className="search-input"
          type="search"
          value={searchValue}
          onChange={handleChange}
          placeholder="Search products..."
          autoComplete="off"
        />

        {searchValue && (
          <button
            className="search-clear"
            type="button"
            onClick={() => setSearchValue("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchBar;
