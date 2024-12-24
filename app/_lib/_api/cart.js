export function initCart() {
  const cart = sessionStorage.getItem("cart");

  if (cart === null) {
    sessionStorage.setItem("cart", JSON.stringify([]));
  }

  return cart ? JSON.parse(cart) : [];
}

export function addToCart(product) {
  console.log(product);
  const cart = initCart();
  console.log(product);
  cart.push(product);
  sessionStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart);
}

export function removeFromCart(productId) {
  console.log(productId);
  const cart = initCart().filter((product) => product.id !== productId);
  console.log(cart);
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

export function clearCart() {
  sessionStorage.setItem("cart", []);
}
