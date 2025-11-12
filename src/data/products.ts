export interface ProductColor {
  name: string;
  image: string;
  gradient: string;
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
      "/images/pink-fleece.png",
      "/images/polka-fleece.png",
      "/images/yellow-fleece.png",
    ],
    colors: [
      {
        name: "Pink",
        image: "/images/pink-fleece.png",
        gradient:
          "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
      },
      {
        name: "Polka",
        image: "/images/polka-fleece.png",
        gradient:
          "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
      },
      {
        name: "Yellow",
        image: "/images/yellow-fleece.png",
        gradient:
          "linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)",
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
        image: "/images/white-pants.png",
        gradient:
          "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
      },
      {
        name: "Brown",
        image: "/images/brown-pants-bg.png",
        gradient:
          "linear-gradient(135deg, #d7ccc8 0%, #a1887f 100%)",
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
        image: "/images/olive-pants-bg.png",
        gradient:
          "linear-gradient(135deg, #a5b68d 0%, #7d8f69 100%)",
      },
      {
        name: "Gray",
        image: "/images/gray-pants-bg.png",
        gradient:
          "linear-gradient(135deg, #bdbdbd 0%, #9e9e9e 100%)",
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
        image: "/images/yellow-shorts-bg.png",
        gradient:
          "linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)",
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
        image: "/images/carabiner.png",
        gradient:
          "linear-gradient(135deg, #e0e0e0 0%, #bdbdbd 100%)",
      },
    ],
  },
];
