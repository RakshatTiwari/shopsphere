function PriceFilter({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}) {
  return (
    <section className="filter-section">
      <h2 className="filter-title">Price</h2>

      <div className="price-inputs">
        <label className="price-field">
          <span>Minimum</span>

          <div className="price-input-wrapper">
            <span className="price-symbol">$</span>

            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(event) => onMinPriceChange(event.target.value)}
              placeholder="0"
              aria-label="Minimum price"
            />
          </div>
        </label>

        <label className="price-field">
          <span>Maximum</span>

          <div className="price-input-wrapper">
            <span className="price-symbol">$</span>

            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(event) => onMaxPriceChange(event.target.value)}
              placeholder="Any"
              aria-label="Maximum price"
            />
          </div>
        </label>
      </div>
    </section>
  );
}

export default PriceFilter;
