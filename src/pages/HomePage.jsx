import { Link } from "react-router";
import { useCategories } from "../hooks/useCategories";
import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/products/ProductGrid";
import "./HomePage.css";

const FEATURED_PRODUCTS_LIMIT = 8;
const HOME_CATEGORY_LIMIT = 8;

function HomePage() {
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories();

  const { data, isLoading, isError } = useProducts({
    limit: FEATURED_PRODUCTS_LIMIT,
  });

  const featuredProducts = data?.products ?? [];

  const categories = Array.isArray(categoriesData)
    ? categoriesData.slice(0, HOME_CATEGORY_LIMIT)
    : [];

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <p className="home-eyebrow">SHOPSPHERE</p>

          <h1>Discover products worth bringing home.</h1>

          <p className="home-hero-description">
            Explore a curated shopping experience with powerful search, flexible
            filters, useful sorting, and product details that help you make
            better choices.
          </p>

          <div className="home-hero-actions">
            <Link className="primary-button home-primary-button" to="/products">
              Browse products
            </Link>

            <Link className="home-secondary-button" to="/products?search=phone">
              Explore a search
            </Link>
          </div>
        </div>

        <div className="home-hero-panel" aria-hidden="true">
          <span className="home-panel-label">DISCOVER</span>
          <strong>Search.</strong>
          <strong>Compare.</strong>
          <strong>Choose.</strong>
          <span className="home-panel-footer">
            A focused storefront built for everyday discovery.
          </span>
        </div>
      </section>

      <section className="home-discovery">
        <div className="home-section-heading">
          <div>
            <p className="home-eyebrow">DISCOVERY</p>
            <h2>Everything you need to shop with confidence.</h2>
          </div>

          <Link className="home-text-link" to="/products">
            View full catalog →
          </Link>
        </div>

        <div className="home-discovery-grid">
          <Link className="home-discovery-card" to="/products">
            <span className="home-card-number">01</span>
            <h3>Browse the catalog</h3>
            <p>
              Explore products across multiple categories and narrow your
              choices with filters.
            </p>
          </Link>

          <Link className="home-discovery-card" to="/products?search=phone">
            <span className="home-card-number">02</span>
            <h3>Search instantly</h3>
            <p>
              Find relevant products quickly using ShopSphere&apos;s integrated
              search experience.
            </p>
          </Link>

          <Link className="home-discovery-card" to="/wishlist">
            <span className="home-card-number">03</span>
            <h3>Save your favorites</h3>
            <p>
              Keep products you are considering in your wishlist for easy access
              later.
            </p>
          </Link>
        </div>
      </section>

      <section className="home-categories">
        <div className="home-section-heading">
          <div>
            <p className="home-eyebrow">SHOP BY CATEGORY</p>
            <h2>Start with what you&apos;re looking for.</h2>
          </div>

          <Link className="home-text-link" to="/products">
            Browse everything →
          </Link>
        </div>

        {categoriesLoading && (
          <div className="home-status home-category-status">
            <p className="home-status-eyebrow">LOADING</p>
            <h3>Loading categories...</h3>
            <p>We&apos;re preparing the latest categories from the catalog.</p>
          </div>
        )}

        {categoriesError && (
          <div className="home-status home-category-status">
            <p className="home-status-eyebrow">UNAVAILABLE</p>
            <h3>Categories couldn&apos;t be loaded.</h3>
            <p>
              You can still browse the complete catalog and use its filters.
            </p>
            <Link className="primary-button" to="/products">
              Open catalog
            </Link>
          </div>
        )}

        {!categoriesLoading && !categoriesError && categories.length > 0 && (
          <div className="home-category-grid">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                className="home-category-card"
                to={`/products?category=${encodeURIComponent(category.slug)}`}
              >
                <span className="home-category-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="home-category-name">{category.name}</span>

                <span className="home-category-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        )}

        {!categoriesLoading && !categoriesError && categories.length === 0 && (
          <div className="home-status home-category-status">
            <p className="home-status-eyebrow">NO CATEGORIES</p>
            <h3>No categories are currently available.</h3>
            <p>Open the catalog to explore the available products.</p>
            <Link className="primary-button" to="/products">
              Open catalog
            </Link>
          </div>
        )}
      </section>

      <section className="home-featured">
        <div className="home-section-heading">
          <div>
            <p className="home-eyebrow">FEATURED PRODUCTS</p>
            <h2>A few places to start.</h2>
          </div>

          <Link className="home-text-link" to="/products">
            See all products →
          </Link>
        </div>

        {isLoading && (
          <div className="home-status">
            <p className="home-status-eyebrow">LOADING</p>
            <h3>Finding products for you...</h3>
            <p>
              We&apos;re retrieving a selection from the ShopSphere catalog.
            </p>
          </div>
        )}

        {isError && (
          <div className="home-status">
            <p className="home-status-eyebrow">UNAVAILABLE</p>
            <h3>Featured products couldn&apos;t be loaded.</h3>
            <p>Visit the catalog to try again and continue browsing.</p>
            <Link className="primary-button" to="/products">
              Open catalog
            </Link>
          </div>
        )}

        {!isLoading && !isError && featuredProducts.length > 0 && (
          <ProductGrid products={featuredProducts} />
        )}

        {!isLoading && !isError && featuredProducts.length === 0 && (
          <div className="home-status">
            <p className="home-status-eyebrow">NO PRODUCTS</p>
            <h3>The featured catalog is currently empty.</h3>
            <p>Open the catalog to explore available products.</p>
            <Link className="primary-button" to="/products">
              Open catalog
            </Link>
          </div>
        )}
      </section>

      <section className="home-bottom-cta">
        <div>
          <p className="home-eyebrow">KEEP EXPLORING</p>
          <h2>Your next find is somewhere in the catalog.</h2>
          <p>
            Use search, filters, sorting, and pagination to move from discovery
            to a product that fits your needs.
          </p>
        </div>

        <Link className="primary-button" to="/products">
          Explore ShopSphere
        </Link>
      </section>
    </main>
  );
}

export default HomePage;
