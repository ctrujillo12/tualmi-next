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
      <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1>Product not found</h1>
          <Link href="/" style={{ color: "var(--color-sage-600)", textDecoration: "underline" }}>
            Return to home
          </Link>
        </div>
      </main>
    );
  }

  // Get the current color's images
  const currentColorImages = product.colors[selectedColor]?.images || product.images;

  const handleColorChange = (colorIndex: number) => {
    setSelectedColor(colorIndex);
    setSelectedImage(0); // Reset to first image of new color
  };

  const handlePreOrder = () => {
    if (!selectedSize) return;
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const totalPrice = (product.price * quantity * 0.85).toFixed(2);
      
      const response = await fetch('/api/preorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          product: product.name,
          color: product.colors[selectedColor].name,
          size: selectedSize,
          quantity,
          totalPrice
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit pre-order');
      }

      const data = await response.json();
      console.log("Pre-order successful:", data);
      setSubmitted(true);
      
      // Reset after 3 seconds
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
      <header style={{ background: "var(--color-cream)", borderBottom: "1px solid var(--color-taupe-200)" }}>
        <nav>
          <div className="nav-container">
            <Link href="/" className="logo">TUALMI</Link>
            <div className="nav-links">
              <Link href="/#collection">Collection</Link>
              <Link href="/#about">Our Story</Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Product Content */}
      <section style={{ padding: "4rem 2rem", background: "var(--color-cream)" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            
            {/* Image Gallery */}
            <div style={{ position: "sticky", top: "2rem" }}>
              <div style={{ 
                position: "relative", 
                width: "100%", 
                aspectRatio: "5/6",
                borderRadius: "8px",
                overflow: "hidden",
                marginBottom: "1rem",
                background: "var(--color-taupe-100)"
              }}>
                <Image
                  src={currentColorImages[selectedImage]}
                  alt={`${product.name} ${product.colors[selectedColor].name} view ${selectedImage + 1}`}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
              
              {/* Thumbnail Gallery */}
              <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto" }}>
                {currentColorImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    style={{
                      position: "relative",
                      width: "80px",
                      height: "96px",
                      borderRadius: "4px",
                      overflow: "hidden",
                      border: selectedImage === i ? "2px solid var(--color-sage-600)" : "2px solid transparent",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      opacity: selectedImage === i ? 1 : 0.6,
                      background: "var(--color-taupe-100)"
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <div style={{ marginBottom: "2rem" }}>
                <p style={{ color: "var(--color-sage-600)", fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>
                  {product.preOrder ? "PRE-ORDER" : "IN STOCK"}
                </p>
                <h1 style={{ fontSize: "2.5rem", fontWeight: "300", marginBottom: "1rem", color: "var(--color-taupe-900)" }}>
                  {product.name}
                </h1>
                <p style={{ fontSize: "1.5rem", color: "var(--color-taupe-700)" }}>
                  ${product.price}
                </p>
              </div>

              {/* Color Selection */}
              <div style={{ marginBottom: "2rem" }}>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "1rem", color: "var(--color-taupe-900)" }}>
                  Color: {product.colors[selectedColor].name}
                </label>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => handleColorChange(i)}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: color.gradient,
                        border: selectedColor === i ? "3px solid var(--color-taupe-900)" : "2px solid var(--color-taupe-300)",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: selectedColor === i ? "0 4px 12px rgba(0,0,0,0.15)" : "none"
                      }}
                      title={color.name}
                      aria-label={`Select ${color.name} color`}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div style={{ marginBottom: "2rem" }}>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "1rem", color: "var(--color-taupe-900)" }}>
                  Size
                </label>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: "0.75rem 1.5rem",
                        border: selectedSize === size ? "2px solid var(--color-taupe-900)" : "1px solid var(--color-taupe-300)",
                        background: selectedSize === size ? "var(--color-taupe-900)" : "transparent",
                        color: selectedSize === size ? "var(--color-cream)" : "var(--color-taupe-900)",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        transition: "all 0.3s ease"
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div style={{ marginBottom: "2rem" }}>
                <label style={{ display: "block", fontSize: "0.875rem", fontWeight: "500", marginBottom: "1rem", color: "var(--color-taupe-900)" }}>
                  Quantity
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "1px solid var(--color-taupe-300)",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: "1.25rem",
                      color: "var(--color-taupe-900)",
                      borderRadius: "4px"
                    }}
                  >
                    −
                  </button>
                  <span style={{ fontSize: "1rem", minWidth: "40px", textAlign: "center" }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      width: "40px",
                      height: "40px",
                      border: "1px solid var(--color-taupe-300)",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: "1.25rem",
                      color: "var(--color-taupe-900)",
                      borderRadius: "4px"
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                disabled={!selectedSize}
                onClick={handlePreOrder}
                className="btn-primary"
                style={{
                  width: "100%",
                  padding: "1rem",
                  fontSize: "1rem",
                  opacity: !selectedSize ? 0.5 : 1,
                  cursor: !selectedSize ? "not-allowed" : "pointer"
                }}
              >
                {product.preOrder ? "Pre-Order Now" : "Add to Cart"}
              </button>

              {!selectedSize && (
                <p style={{ fontSize: "0.875rem", color: "var(--color-taupe-600)", marginTop: "0.5rem" }}>
                  Please select a size
                </p>
              )}

              {/* Product Description */}
              <div style={{ marginTop: "3rem", paddingTop: "3rem", borderTop: "1px solid var(--color-taupe-200)" }}>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "1rem", color: "var(--color-taupe-900)" }}>
                  Product Details
                </h3>
                <p style={{ color: "var(--color-taupe-700)", lineHeight: "1.6" }}>
                  Crafted from sustainable materials with meticulous attention to detail, 
                  this piece combines performance with elegance. Perfect for outdoor adventures 
                  without compromising on style.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Order Modal */}
      {showModal && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "1rem"
          }}
          onClick={() => setShowModal(false)}
        >
          <div 
            style={{
              background: "var(--color-cream)",
              borderRadius: "12px",
              padding: "2.5rem",
              maxWidth: "500px",
              width: "100%",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "transparent",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "var(--color-taupe-600)"
              }}
            >
              ×
            </button>

            {!submitted ? (
              <>
                <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                  <div style={{
                    display: "inline-block",
                    background: "var(--color-sage-100)",
                    color: "var(--color-sage-700)",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    marginBottom: "1rem"
                  }}>
                    🎉 Early Access
                  </div>
                  <h2 style={{ fontSize: "2rem", marginBottom: "0.5rem", color: "var(--color-taupe-900)" }}>
                    Reserve Your Spot
                  </h2>
                  <p style={{ color: "var(--color-taupe-600)", fontSize: "0.875rem" }}>
                    {product.name} • {product.colors[selectedColor].name} • Size {selectedSize} • Qty {quantity}
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ 
                      display: "block", 
                      fontSize: "0.875rem", 
                      fontWeight: "500", 
                      marginBottom: "0.5rem",
                      color: "var(--color-taupe-900)"
                    }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        border: "1px solid var(--color-taupe-300)",
                        borderRadius: "6px",
                        fontSize: "1rem",
                        background: "white"
                      }}
                    />
                    <p style={{ fontSize: "0.75rem", color: "var(--color-taupe-600)", marginTop: "0.5rem" }}>
                      Join our newsletter for exclusive updates and early access
                    </p>
                  </div>

                  <div style={{
                    background: "var(--color-rose-50)",
                    padding: "1.5rem",
                    borderRadius: "8px",
                    marginBottom: "1.5rem",
                    textAlign: "center"
                  }}>
                    <p style={{ 
                      color: "var(--color-taupe-700)", 
                      fontSize: "1rem",
                      lineHeight: "1.6"
                    }}>
                      ✨ Something special is coming your way. Stay tuned for exclusive details and pricing.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      width: "100%",
                      padding: "1rem",
                      fontSize: "1rem",
                      marginBottom: "1rem"
                    }}
                  >
                    Save My Spot
                  </button>

                  <p style={{ fontSize: "0.75rem", textAlign: "center", color: "var(--color-taupe-600)" }}>
                    We'll send you a payment link and all the details via email
                  </p>
                </form>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✓</div>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", color: "var(--color-taupe-900)" }}>
                  Thank You!
                </h3>
                <p style={{ color: "var(--color-taupe-600)" }}>
                  Check your email for your payment link and order details.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ background: "var(--color-taupe-900)", color: "var(--color-cream)", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <Link href="/" className="logo" style={{ fontSize: "1.5rem", marginBottom: "1rem", display: "inline-block" }}>
              TUALMI
            </Link>
            <p style={{ marginTop: "1rem" }}>&copy; 2025 TUALMI Outdoors. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}