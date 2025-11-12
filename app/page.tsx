import Image from "next/image";
import Link from "next/link";
import { products } from "@/src/data/products"; 

export default function Page() {
  const heroImage = "/images/hero.jpg";
  // const aboutImage = "/images/tuolumne.jpg"; // Replace with your About image

  return (
    <main>
      {/* Promo Banner */}
      <div className="promo-banner">
        <p>Pre-Order Now & Save 10% • Be First to Experience Our Autumn Collection • Limited Spots Available</p>
      </div>

      {/* Header */}
      <header>
        <nav>
          <div className="nav-container">
            <div className="logo">TUALMI</div>
            {/* <div className="nav-links">
              <Link href="#collection">New Arrivals</Link>
              <Link href="#collection">Women</Link>
              <Link href="#collection">Outerwear</Link>
              <Link href="#collection">Layers</Link>
              <Link href="#collection">Bottoms</Link>
              <Link href="#about">Our Story</Link>
              <Link href="#sustainability">Sustainability</Link>
            </div> */}
            <div className="nav-actions">
              <Link href="#collection">Collection</Link>
              <Link href="#about">Our Story</Link>
              {/* <Link href="#cart">Cart (0)</Link> */}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <Image
            src={heroImage}
            alt="Hero image"
            fill
            style={{ objectFit: "cover" }}
          />
          <div className="hero-overlay" />
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-label">Introducing Autumn Collection 2025</p>
            <h1 className="hero-title">Where Adventure Meets Elegance</h1>
            <p className="hero-description">
              Sustainable outdoor wear designed for the modern woman who refuses to
              choose between performance and femininity.
            </p>
            <div className="hero-buttons">
              <a href="#collection" className="btn-primary">Shop Collection</a>
              <a href="#about" className="btn-secondary">Our Story</a>
            </div>
          </div>
        </div>
      </section>

      {/* Collection */}
      <section id="collection" className="section" style={{ background: "var(--color-cream)" }}>
        <div className="container">
          <div className="section-header">
            <p className="section-label">Autumn Collection 2025</p>
            <h2 className="section-title">The Adventure Begins</h2>
            <p className="section-description">
              Each piece is thoughtfully designed to accompany you on your journey,
              crafted from sustainable materials without compromising on style or performance.
            </p>
          </div>

          <div className="product-grid grid-2-columns">
            {products.map((product) => (
              <Link 
                key={product.slug} 
                href={`/products/${product.slug}`} 
                className="product-card"
              >
                <div className="product-image-container">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    className="product-image"
                    width={500}
                    height={600}
                  />
                  <div className="product-overlay" />
                </div>
                <div className="product-details">
                  <p className="details-category">{product.colors[0].name}</p>
                  <h3 className="details-name">{product.name}</h3>
                  <p className="details-price">${product.price}</p>
                </div>
                {product.preOrder && (
                  <button className="btn-preorder">Pre-Order Now</button>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section" style={{ background: "var(--color-rose-50)" }}>
        <div className="container">
          <div className="section-header">
            <p className="section-label">Our Story</p>
            <h2 className="section-title">Sustainably Crafted, Elegantly Designed</h2>
            <p className="section-description">
              At TUALMI, we believe outdoor wear should empower women to embrace adventure without compromising style. 
              Every piece in our collection is made from sustainable materials and designed to perform in any journey.
            </p>
          </div>
          <div className="about-content" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
            {/* <Image
              // src={aboutImage}
              // alt="About image"
              width={800}
              height={400}
              style={{ objectFit: "cover", borderRadius: "8px" }}
            /> */}
            <p style={{ maxWidth: "700px", textAlign: "center", color: "var(--color-taupe-700)", fontSize: "1rem", lineHeight: "1.6" }}>
              Our journey began with a passion for functional design and a commitment to sustainability. 
              From the choice of fabrics to the smallest stitch, TUALMI creates clothing that celebrates elegance, 
              durability, and the spirit of adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "var(--color-taupe-900)", color: "var(--color-cream)", padding: "4rem 0" }}>
        <div className="container">
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "2rem" }}>
            <div className="footer-brand">
              <h3 style={{ marginBottom: "1rem" }}>TUALMI</h3>
              <p>
                Sustainable outdoor wear for the modern woman who embraces 
                adventure with elegance.
              </p>
            </div>

            <div className="footer-section">
              <h4>Shop</h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li><a href="#collection">New Arrivals</a></li>
                <li><a href="#collection">Outerwear</a></li>
                <li><a href="#collection">Layers</a></li>
                <li><a href="#collection">Bottoms</a></li>
                <li><a href="#collection">Accessories</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Company</h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li><a href="#about">Our Story</a></li>
                <li><a href="#sustainability">Sustainability</a></li>
                <li><a href="#journal">Journal</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Support</h4>
              <ul style={{ listStyle: "none", padding: 0 }}>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Shipping & Returns</a></li>
                <li><a href="#">Size Guide</a></li>
                <li><a href="#">Care Instructions</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>


          {/* ✨ New Contact Section */}
          <div className="footer-section">
            <h4>Contact Us!!</h4>
            <p>
              We'd love to hear from you — whether it’s about our gear or your next
              adventure.
            </p>
            <a
              href="mailto:tualmi-outdoors@gmail.com"
              style={{
                color: "var(--color-cream)",
                textDecoration: "underline",
                display: "inline-block",
                marginTop: "0.5rem",
              }}
            >
              tualmi-outdoors@gmail.com
            </a>
          </div>

          <div className="footer-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
            <p>&copy; 2025 TUALMI Outdoors. All rights reserved.</p>
            <div className="social-links" style={{ display: "flex", gap: "1rem" }}>
              <a href="https://instagram.com/tualmioutdoors" aria-label="Instagram">Instagram</a>
              {/* <a href="#" aria-label="Facebook">Facebook</a> */}
              <a href="mailto:tualmi-outdoors@gmail.com" aria-label="Email">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
