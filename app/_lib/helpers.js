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

export function formatDate(inputDate) {
  const date = new Date(inputDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

  return `${day}.${month}.${year}`;
}
