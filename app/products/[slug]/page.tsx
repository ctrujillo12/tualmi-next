"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/src/data/products";

interface Params {
  slug: string;
}

export default function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!product) {
    return (
      <main className="not-found">
        <div>
          <h1>Product not found</h1>
          <Link href="/">Return to home</Link>
        </div>
      </main>
    );
  }

  const currentColorImages = product.colors[selectedColor]?.images || product.images;

  const handleColorChange = (colorIndex: number) => {
    setSelectedColor(colorIndex);
    setSelectedImage(0);
  };

  const handlePreOrder = () => {
    if (!selectedSize) return;
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const totalPrice = (product.price * quantity * 0.85).toFixed(2);
      const response = await fetch("/api/preorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          product: product.name,
          color: product.colors[selectedColor].name,
          size: selectedSize,
          quantity,
          totalPrice,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit pre-order");

      setSubmitted(true);
      setTimeout(() => {
        setShowModal(false);
        setSubmitted(false);
        setEmail("");
      }, 3000);
    } catch (error) {
      console.error("Pre-order error:", error);
      alert("There was an error processing your pre-order. Please try again.");
    }
  };

  return (
    <>
      <main>
        {/* Header */}
        <header className="header">
          <nav>
            <div className="nav-container">
              <Link href="/" className="logo">
                TUALMI
              </Link>
              <div className="nav-links">
                <Link href="/#collection">Collection</Link>
                <Link href="/#about">Our Story</Link>
              </div>
            </div>
          </nav>
        </header>

        {/* Product Content */}
        <section className="product-section">
          <div className="container">
            <div className="product-grid">
              {/* Image Gallery */}
              <div className="gallery">
                <div className="main-image">
                  <Image
                    src={currentColorImages[selectedImage]}
                    alt={`${product.name} ${product.colors[selectedColor].name} view ${selectedImage + 1}`}
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>

                <div className="thumbnails">
                  {currentColorImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`thumb ${selectedImage === i ? "active" : ""}`}
                      aria-label={`View image ${i + 1}`}
                    >
                      <Image src={img} alt="" fill style={{ objectFit: "contain" }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="details">
                <div className="meta">
                  <p className="badge">{product.preOrder ? "PRE-ORDER" : "IN STOCK"}</p>
                  <h1 className="title">{product.name}</h1>
                  <p className="price">${product.price}</p>
                </div>

                {/* Color Selection */}
                <div className="option-group">
                  <label className="option-label">
                    Color: {product.colors[selectedColor].name}
                  </label>
                  <div className="color-row">
                    {product.colors.map((color, i) => (
                      <button
                        key={i}
                        onClick={() => handleColorChange(i)}
                        className={`color-btn ${selectedColor === i ? "active" : ""}`}
                        style={{ background: color.gradient }}
                        title={color.name}
                        aria-label={`Select ${color.name} color`}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="option-group">
                  <label className="option-label">Size</label>
                  <div className="size-row">
                    {["XS", "S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`size-btn ${selectedSize === size ? "active" : ""}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="option-group">
                  <label className="option-label">Quantity</label>
                  <div className="quantity">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  disabled={!selectedSize}
                  onClick={handlePreOrder}
                  className="btn-primary btn-add-to-cart"
                >
                  {product.preOrder ? "Pre-Order Now" : "Add to Cart"}
                </button>

                {!selectedSize && <p className="size-warning">Please select a size</p>}

                {/* Product Description */}
                <div className="description">
                  <h3>Product Details</h3>
                  <p>
                    Crafted from sustainable materials with meticulous attention to detail, this
                    piece combines performance with elegance. Perfect for outdoor adventures
                    without compromising on style.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <Link href="/" className="logo">
                TUALMI
              </Link>
              <p>&copy; 2025 TUALMI Outdoors. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>

      {/* Pre-order Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
            >
              ×
            </button>

            {!submitted ? (
              <>
                <div className="modal-header">
                  <div className="badge-special">🎉 Early Access</div>
                  <h2>Reserve Your Spot</h2>
                  <p className="order-summary">
                    {product.name} • {product.colors[selectedColor].name} • Size {selectedSize} •
                    Qty {quantity}
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                    />
                    <p className="hint">Join our newsletter for exclusive updates</p>
                  </div>

                  <div className="note">
                    ✨ Something special is coming your way. Stay tuned for exclusive details.
                  </div>

                  <button type="submit" className="btn-primary">
                    Save My Spot
                  </button>
                  
                  <p className="payment-note">
                    We'll send you a payment link and all the details via email
                  </p>
                </form>
              </>
            ) : (
              <div className="thank-you">
                <div className="check-icon">✓</div>
                <h3>Thank You!</h3>
                <p>Check your email for your payment link and order details.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        /* ========================================
           GLOBAL & LAYOUT
           ======================================== */

        .not-found {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .not-found a {
          color: var(--color-sage-600);
          text-decoration: underline;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        /* ========================================
           HEADER
           ======================================== */

        .header {
          background: var(--color-cream);
          border-bottom: 1px solid var(--color-taupe-200);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--color-taupe-900);
          text-decoration: none;
          letter-spacing: 0.1em;
        }

        .nav-links {
          display: flex;
          gap: 2rem;
        }

        .nav-links a {
          color: var(--color-taupe-700);
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.3s ease;
        }

        .nav-links a:hover {
          color: var(--color-sage-600);
        }

        /* ========================================
           PRODUCT SECTION
           ======================================== */

        .product-section {
          padding: 4rem 0;
          background: var(--color-cream);
          min-height: calc(100vh - 200px);
        }

        .product-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        /* ========================================
           IMAGE GALLERY
           ======================================== */

        .gallery {
          position: sticky;
          top: 6rem;
        }

        .main-image {
          position: relative;
          width: 100%;
          aspect-ratio: 5/6;
          border-radius: 12px;
          overflow: hidden;
          background: var(--color-taupe-100);
          margin-bottom: 1rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .thumbnails {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: var(--color-taupe-300) transparent;
        }

        .thumbnails::-webkit-scrollbar {
          height: 6px;
        }

        .thumbnails::-webkit-scrollbar-thumb {
          background: var(--color-taupe-300);
          border-radius: 3px;
        }

        .thumb {
          position: relative;
          width: 80px;
          height: 96px;
          min-width: 80px;
          border-radius: 8px;
          overflow: hidden;
          border: 2px solid transparent;
          background: var(--color-taupe-100);
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0.6;
        }

        .thumb:hover {
          opacity: 0.85;
        }

        .thumb.active {
          border-color: var(--color-sage-600);
          opacity: 1;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        /* ========================================
           PRODUCT DETAILS
           ======================================== */

        .details {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .meta {
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--color-taupe-200);
        }

        .badge {
          display: inline-block;
          color: var(--color-sage-700);
          background: var(--color-sage-100);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          margin-bottom: 1rem;
        }

        .title {
          font-size: 2.5rem;
          font-weight: 300;
          color: var(--color-taupe-900);
          margin-bottom: 1rem;
          line-height: 1.2;
        }

        .price {
          font-size: 1.75rem;
          color: var(--color-taupe-700);
          font-weight: 400;
        }

        /* ========================================
           OPTION GROUPS
           ======================================== */

        .option-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .option-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-taupe-900);
          letter-spacing: 0.03em;
        }

        /* Color Selection */
        .color-row {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .color-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid var(--color-taupe-300);
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .color-btn:hover {
          transform: scale(1.05);
        }

        .color-btn.active {
          border: 3px solid var(--color-taupe-900);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        /* Size Selection */
        .size-row {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .size-btn {
          padding: 0.75rem 1.5rem;
          border: 1px solid var(--color-taupe-300);
          background: transparent;
          color: var(--color-taupe-900);
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.3s ease;
          min-width: 60px;
        }

        .size-btn:hover {
          border-color: var(--color-taupe-900);
        }

        .size-btn.active {
          background: var(--color-taupe-900);
          color: var(--color-cream);
          border-color: var(--color-taupe-900);
        }

        /* Quantity */
        .quantity {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .quantity button {
          width: 44px;
          height: 44px;
          border: 1px solid var(--color-taupe-300);
          background: white;
          color: var(--color-taupe-900);
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.25rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quantity button:hover {
          background: var(--color-taupe-100);
          border-color: var(--color-taupe-900);
        }

        .quantity span {
          font-size: 1.1rem;
          font-weight: 500;
          min-width: 40px;
          text-align: center;
        }

        /* ========================================
           BUTTONS
           ======================================== */

        .btn-primary {
          width: 100%;
          padding: 1rem;
          background: var(--color-sage-600);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.03em;
        }

        .btn-primary:hover {
          background: var(--color-sage-700);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .btn-add-to-cart {
          margin-top: 1rem;
        }

        .size-warning {
          font-size: 0.875rem;
          color: var(--color-taupe-600);
          margin-top: 0.5rem;
          text-align: center;
        }

        /* ========================================
           PRODUCT DESCRIPTION
           ======================================== */

        .description {
          padding-top: 2rem;
          border-top: 1px solid var(--color-taupe-200);
        }

        .description h3 {
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--color-taupe-900);
          margin-bottom: 1rem;
        }

        .description p {
          color: var(--color-taupe-700);
          line-height: 1.7;
          font-size: 0.95rem;
        }

        /* ========================================
           MODAL
           ======================================== */

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal {
          background: var(--color-cream);
          border-radius: 16px;
          padding: 2.5rem;
          width: 100%;
          max-width: 500px;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: none;
          border: none;
          font-size: 2rem;
          color: var(--color-taupe-600);
          cursor: pointer;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: var(--color-taupe-200);
          color: var(--color-taupe-900);
        }

        .modal-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .badge-special {
          display: inline-block;
          background: var(--color-sage-100);
          color: var(--color-sage-700);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .modal-header h2 {
          font-size: 2rem;
          font-weight: 400;
          color: var(--color-taupe-900);
          margin-bottom: 0.75rem;
        }

        .order-summary {
          color: var(--color-taupe-600);
          font-size: 0.875rem;
          line-height: 1.5;
        }

        /* Form */
        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-taupe-900);
          margin-bottom: 0.5rem;
        }

        .form-group input {
          width: 100%;
          padding: 0.875rem;
          border: 1px solid var(--color-taupe-300);
          border-radius: 8px;
          font-size: 1rem;
          background: white;
          transition: all 0.3s ease;
        }

        .form-group input:focus {
          outline: none;
          border-color: var(--color-sage-600);
          box-shadow: 0 0 0 3px rgba(92, 131, 116, 0.1);
        }

        .hint {
          font-size: 0.8rem;
          color: var(--color-taupe-600);
          margin-top: 0.5rem;
        }

        .note {
          background: var(--color-rose-50);
          padding: 1.25rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          text-align: center;
          color: var(--color-taupe-700);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        .payment-note {
          font-size: 0.8rem;
          text-align: center;
          color: var(--color-taupe-600);
          margin-top: 1rem;
        }

        /* Thank You Screen */
        .thank-you {
          text-align: center;
          padding: 3rem 1rem;
        }

        .check-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          background: var(--color-sage-600);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 300;
        }

        .thank-you h3 {
          font-size: 1.75rem;
          font-weight: 400;
          color: var(--color-taupe-900);
          margin-bottom: 0.75rem;
        }

        .thank-you p {
          color: var(--color-taupe-600);
          line-height: 1.6;
        }

        /* ========================================
           FOOTER
           ======================================== */

        .footer {
          background: var(--color-taupe-900);
          color: var(--color-cream);
          padding: 3rem 0;
          margin-top: 4rem;
        }

        .footer-content {
          text-align: center;
        }

        .footer .logo {
          color: var(--color-cream);
          font-size: 1.5rem;
          margin-bottom: 1rem;
          display: inline-block;
        }

        .footer p {
          margin-top: 1rem;
          opacity: 0.8;
          font-size: 0.9rem;
        }

        /* ========================================
           RESPONSIVE - TABLET
           ======================================== */

        @media (max-width: 968px) {
          .product-grid {
            gap: 3rem;
          }

          .title {
            font-size: 2.25rem;
          }

          .nav-container {
            padding: 1.25rem 1.5rem;
          }
        }

        /* ========================================
           RESPONSIVE - MOBILE
           ======================================== */

        @media (max-width: 768px) {
          .container {
            padding: 0 1rem;
          }

          .nav-container {
            padding: 1rem;
          }

          .logo {
            font-size: 1.25rem;
          }

          .nav-links {
            gap: 1.25rem;
          }

          .nav-links a {
            font-size: 0.875rem;
          }

          .product-section {
            padding: 2rem 0;
          }

          .product-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .gallery {
            position: static;
          }

          .main-image {
            aspect-ratio: 4/5;
            border-radius: 8px;
          }

          .thumb {
            width: 70px;
            height: 84px;
            min-width: 70px;
          }

          .meta {
            padding-bottom: 1.5rem;
          }

          .title {
            font-size: 1.75rem;
          }

          .price {
            font-size: 1.5rem;
          }

          .details {
            gap: 1.5rem;
          }

          .option-group {
            gap: 0.875rem;
          }

          .color-btn {
            width: 46px;
            height: 46px;
          }

          .size-btn {
            padding: 0.675rem 1.25rem;
            font-size: 0.875rem;
          }

          .quantity button {
            width: 40px;
            height: 40px;
          }

          .btn-primary {
            padding: 0.875rem;
          }

          .description {
            padding-top: 1.5rem;
          }

          .modal {
            padding: 2rem 1.5rem;
            border-radius: 12px;
          }

          .modal-header h2 {
            font-size: 1.5rem;
          }

          .badge-special {
            font-size: 0.8rem;
            padding: 0.4rem 0.875rem;
          }
        }

        /* ========================================
           RESPONSIVE - SMALL MOBILE
           ======================================== */

        @media (max-width: 480px) {
          .nav-links {
            gap: 1rem;
          }

          .nav-links a {
            font-size: 0.8rem;
          }

          .main-image {
            aspect-ratio: 1/1;
          }

          .thumb {
            width: 64px;
            height: 64px;
            min-width: 64px;
          }

          .title {
            font-size: 1.5rem;
          }

          .price {
            font-size: 1.25rem;
          }

          .color-btn {
            width: 42px;
            height: 42px;
          }

          .size-btn {
            padding: 0.6rem 1rem;
            min-width: 50px;
            font-size: 0.8rem;
          }

          .modal {
            padding: 1.5rem 1.25rem;
          }

          .modal-header h2 {
            font-size: 1.35rem;
          }

          .close-btn {
            top: 1rem;
            right: 1rem;
            font-size: 1.75rem;
          }

          .check-icon {
            width: 64px;
            height: 64px;
            font-size: 2rem;
          }

          .thank-you {
            padding: 2rem 0.5rem;
          }

          .thank-you h3 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}