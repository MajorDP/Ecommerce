export function getRandomProducts(products, amount) {
  //values for randomIndex boundary within array of products
  const min = 0;
  const max = products.length - 1;

  //max allowed random products count
  const maxProductCount = Math.min(products.length, amount);

  const randomProducts = [];

  while (randomProducts.length < maxProductCount) {
    const randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
    if (!randomProducts.find((el) => el?.id === products[randomIndex]?.id)) {
      randomProducts.push(products[randomIndex]);
    }
  }

  return randomProducts;
}
