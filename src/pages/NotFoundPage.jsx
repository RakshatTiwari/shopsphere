import { Link } from "react-router";

function NotFoundPage() {
  return (
    <main className="page">
      <section className="page-header">
        <p className="page-eyebrow">404</p>

        <h1>Page not found</h1>

        <p className="page-description">
          The page you're looking for doesn't exist.
        </p>

        <Link className="primary-button" to="/">
          Return home
        </Link>
      </section>
    </main>
  );
}

export default NotFoundPage;
