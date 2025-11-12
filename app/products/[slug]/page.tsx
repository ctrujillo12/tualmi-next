import Image from "next/image";
import { products } from "@/src/data/products";

interface Params {
  slug: string;
}

export default function ProductPage({ params }: { params: Params }) {
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <main>
      <h1>{product.name}</h1>
      <p>${product.price}</p>
      <div className="product-images">
        {product.images.map((img, i) => (
          <Image key={i} src={img} alt={`${product.name} ${i}`} width={500} height={600} />
        ))}
      </div>
      <div className="product-colors">
        {product.colors.map((color, i) => (
          <div key={i}>
            <p>{color.name}</p>
            <div style={{ background: color.gradient, width: 50, height: 50 }} />
          </div>
        ))}
      </div>
    </main>
  );
}
