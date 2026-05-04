export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") return [];

  const cart = localStorage.getItem("cart");

  if (!cart) return [];

  try {
    return JSON.parse(cart);
  } catch {
    return [];
  }
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product: {
  id: string;
  name: string;
  price: number;
  image: string;
}) {
  const cart = getCartItems();

  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  saveCart(cart);
}

export function removeFromCart(productId: string) {
  const cart = getCartItems().filter((item) => item.id !== productId);
  saveCart(cart);
}

export function updateQuantity(productId: string, quantity: number) {
  const cart = getCartItems();

  const item = cart.find((item) => item.id === productId);

  if (!item) return;

  item.quantity = quantity;

  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCart(cart);
}

export function clearCart() {
  localStorage.removeItem("cart");
}