import ProductCard from "./ProductCard";

function PaginatedProductList({ products }) {
  return (
    <ul
      className={`w-[100%] flex justify-center  flex-wrap overflow-hidden whitespace-nowrap scroll-smooth gap-1`}
    >
      {products.length > 0
        ? products.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))
        : "There are no items that match your search."}
    </ul>
  );
}

export default PaginatedProductList;
