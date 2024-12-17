"use client";
function ProductRatingSetter({ product }) {
  return (
    <div>
      <p className="text-xl">{product.productRating}⭐</p>
    </div>
  );
}

export default ProductRatingSetter;
