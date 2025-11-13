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
  const product = products.find(p => p.slug === slug);
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
          <Link href="/" style={{ color: "var(--color-sage-600)", textDecoration: "underline" }}>
            Return to home
          </Link>
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
                />
              </div>

              <div className="thumbnails">
                {currentColorImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`thumb ${selectedImage === i ? "active" : ""}`}
                  >
                    <Image src={img} alt={`Thumbnail ${i + 1}`} fill style={{ objectFit: "contain" }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="details">
              <div className="meta">
                <p className="preorder">{product.preOrder ? "PRE-ORDER" : "IN STOCK"}</p>
                <h1 className="title">{product.name}</h1>
                <p className="price">${product.price}</p>
              </div>

              {/* Color Selection */}
              <div className="option">
                <label>Color: {product.colors[selectedColor].name}</label>
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
              <div className="option">
                <label>Size</label>
                <div className="size-row">
                  {["XS", "S", "M", "L", "XL"].map(size => (
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
              <div className="option">
                <label>Quantity</label>
                <div className="quantity">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                disabled={!selectedSize}
                onClick={handlePreOrder}
                className="btn-primary"
              >
                {product.preOrder ? "Pre-Order Now" : "Add to Cart"}
              </button>

              {!selectedSize && <p className="size-warning">Please select a size</p>}

              {/* Product Description */}
              <div className="description">
                <h3>Product Details</h3>
                <p>
                  Crafted from sustainable materials with meticulous attention to detail, this piece
                  combines performance with elegance. Perfect for outdoor adventures without
                  compromising on style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preorder Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="close" onClick={() => setShowModal(false)}>×</button>

            {!submitted ? (
              <>
                <div className="modal-header">
                  <div className="badge">🎉 Early Access</div>
                  <h2>Reserve Your Spot</h2>
                  <p>
                    {product.name} • {product.colors[selectedColor].name} • Size {selectedSize} • Qty {quantity}
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                  />
                  <p className="hint">Join our newsletter for exclusive updates</p>

                  <div className="note">
                    ✨ Something special is coming your way. Stay tuned for exclusive details.
                  </div>

                  <button type="submit" className="btn-primary">Save My Spot</button>
                </form>
              </>
            ) : (
              <div className="thank-you">
                <div className="check">✓</div>
                <h3>Thank You!</h3>
                <p>Check your email for your payment link and order details.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <Link href="/" className="logo">TUALMI</Link>
            <p>&copy; 2025 TUALMI Outdoors. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Styles */}
      <style jsx>{`
        .header {
          background: var(--color-cream);
          border-bottom: 1px solid var(--color-taupe-200);
        }

        .product-section {
          padding: 4rem 2rem;
          background: var(--color-cream);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .product-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .main-image {
          position: relative;
          width: 100%;
          aspect-ratio: 5/6;
          border-radius: 8px;
          overflow: hidden;
          background: var(--color-taupe-100);
          margin-bottom: 1rem;
        }

        .thumbnails {
          display: flex;
          gap: 0.5rem;
          overflow-x: auto;
        }

        .thumb {
          position: relative;
          width: 80px;
          height: 96px;
          border-radius: 4px;
          overflow: hidden;
          border: 2px solid transparent;
          opacity: 0.6;
          flex-shrink: 0;
        }

        .thumb.active {
          border-color: var(--color-sage-600);
          opacity: 1;
        }

        .details .title {
          font-size: 2.5rem;
          font-weight: 300;
          color: var(--color-taupe-900);
        }

        .details .price {
          font-size: 1.5rem;
          color: var(--color-taupe-700);
        }

        .option {
          margin: 2rem 0;
        }

        .color-row,
        .size-row {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .color-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid var(--color-taupe-300);
        }

        .color-btn.active {
          border: 3px solid var(--color-taupe-900);
        }

        .size-btn {
          padding: 0.75rem 1.25rem;
          border: 1px solid var(--color-taupe-300);
          border-radius: 4px;
        }

        .size-btn.active {
          background: var(--color-taupe-900);
          color: var(--color-cream);
        }

        .quantity {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .quantity button {
          width: 40px;
          height: 40px;
        }

        .btn-primary {
          width: 100%;
          padding: 1rem;
          background: var(--color-sage-600);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .modal {
          background: var(--color-cream);
          border-radius: 12px;
          padding: 2rem;
          width: 100%;
          max-width: 480px;
          position: relative;
        }

        .close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
        }

        /* 📱 Responsive Styles */
        @media (max-width: 768px) {
          .product-section {
            padding: 2rem 1rem;
          }

          .product-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .gallery {
            position: static;
          }

          .main-image {
            aspect-ratio: 1/1;
          }

          .details .title {
            font-size: 1.75rem;
          }

          .details .price {
            font-size: 1.25rem;
          }

          .btn-primary {
            padding: 0.75rem;
          }

          .modal {
            padding: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .main-image {
            aspect-ratio: 1/1;
          }
          .thumb {
            width: 64px;
            height: 64px;
          }
          .details .title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </main>
  );
}
