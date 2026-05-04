export type Product = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: "GBP 49.99",
    description:
      "High quality sound with noise cancellation and long battery life.",
    image: "/images/headphones.png",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: "GBP 79.99",
    description:
      "Track your fitness, notifications, and daily activity in style.",
    image: "/images/watch.png",
  },
  {
    id: "3",
    name: "LED Desk Lamp",
    price: "GBP 24.99",
    description:
      "Modern lighting with adjustable brightness and sleek design.",
    image: "/images/lamp.png",
  },
  {
    id: "4",
    name: "Portable Speaker",
    price: "GBP 39.99",
    description:
      "Powerful sound in a compact, travel-friendly speaker.",
    image: "/images/speaker.png",
  },
];

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}