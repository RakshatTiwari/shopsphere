import { useState } from "react";

function ProductGallery({ images = [], title }) {
  const galleryImages = images.length > 0 ? images : [];

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (galleryImages.length === 0) {
    return (
      <div className="product-gallery-empty">
        <span>No image available</span>
      </div>
    );
  }

  const activeImage = galleryImages[activeImageIndex];

  function handlePrevious() {
    setActiveImageIndex((currentIndex) =>
      currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1,
    );
  }

  function handleNext() {
    setActiveImageIndex((currentIndex) =>
      currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1,
    );
  }

  return (
    <div className="product-gallery">
      <div className="product-gallery-main">
        <button
          className="gallery-arrow gallery-arrow-previous"
          type="button"
          onClick={handlePrevious}
          aria-label="Show previous product image"
        >
          ‹
        </button>

        <img
          className="product-gallery-main-image"
          src={activeImage}
          alt={`${title} - image ${activeImageIndex + 1}`}
        />

        <button
          className="gallery-arrow gallery-arrow-next"
          type="button"
          onClick={handleNext}
          aria-label="Show next product image"
        >
          ›
        </button>
      </div>

      <div className="product-gallery-thumbnails">
        {galleryImages.map((image, index) => (
          <button
            className={`product-gallery-thumbnail ${
              index === activeImageIndex
                ? "product-gallery-thumbnail-active"
                : ""
            }`}
            key={`${image}-${index}`}
            type="button"
            onClick={() => setActiveImageIndex(index)}
            aria-label={`Show product image ${index + 1}`}
            aria-pressed={index === activeImageIndex}
          >
            <img
              src={image}
              alt=""
              className="product-gallery-thumbnail-image"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
