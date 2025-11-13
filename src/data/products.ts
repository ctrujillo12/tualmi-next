export interface ProductColor {
  name: string;
  gradient: string;
  images: string[]; // Changed from 'image' to 'images' array
}

export interface Product {
  slug: string;
  name: string;
  price: number;
  preOrder: boolean;
  images: string[];
  colors: ProductColor[];
}

export const products: Product[] = [
  {
    slug: "trailblazer-fleece",
    name: "Trailblazer Fleece",
    price: 110,
    preOrder: true,
    images: [
      "/images/pink-fleece-bg.png",
      "/images/polka-fleece-bg.png",
      "/images/yellow-fleece-bg.png",
    ],
    colors: [
      {
        name: "Pink",
        gradient: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
        images: ["/images/pink-fleece-bg.png"], // Array of images for this color
      },
      {
        name: "Polka",
        gradient: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
        images: ["/images/polka-fleece-bg.png"],
      },
      {
        name: "Yellow",
        gradient: "linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)",
        images: ["/images/yellow-fleece-bg.png"],
      },
    ],
  },
  {
    slug: "trail-capri",
    name: "Trail Capri",
    price: 80,
    preOrder: true,
    images: [
      "/images/white-pants.png",
      "/images/brown-pants-bg.png",
    ],
    colors: [
      {
        name: "White",
        gradient: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
        images: ["/images/white-pants.png"],
      },
      {
        name: "Brown",
        gradient: "linear-gradient(135deg, #d7ccc8 0%, #a1887f 100%)",
        images: ["/images/brown-pants-bg.png"],
      },
    ],
  },
  {
    slug: "summit-pant",
    name: "Summit Pant",
    price: 90,
    preOrder: true,
    images: [
      "/images/olive-pants-bg.png",
      "/images/gray-pants-bg.png",
    ],
    colors: [
      {
        name: "Olive",
        gradient: "linear-gradient(135deg, #a5b68d 0%, #7d8f69 100%)",
        images: ["/images/olive-pants-bg.png"],
      },
      {
        name: "Gray",
        gradient: "linear-gradient(135deg, #bdbdbd 0%, #9e9e9e 100%)",
        images: ["/images/gray-pants-bg.png"],
      },
    ],
  },
  {
    slug: "horizon-shorts",
    name: "Horizon Shorts",
    price: 60,
    preOrder: true,
    images: ["/images/yellow-shorts-bg.png"],
    colors: [
      {
        name: "Yellow",
        gradient: "linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)",
        images: ["/images/yellow-shorts-bg.png"],
      },
    ],
  },
  {
    slug: "carabiner",
    name: "Carabiner",
    price: 12,
    preOrder: true,
    images: ["/images/carabiner.png"],
    colors: [
      {
        name: "Default",
        gradient: "linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)",
        images: ["/images/carabiner.png"],
      },
    ],
  },
];