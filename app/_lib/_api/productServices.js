import { supabase } from "./supabase";

export async function getProducts() {
  let { data: products, error } = await supabase
    .from("products")
    .select("*")
    .limit();

  if (error) {
    console.log(error.message);
  }

  return products;
}

export async function getPopularProducts() {
  let { data: products, error } = await supabase
    .from("products")
    .select("*")
    .gt("productRating", "4.9");

  if (error) {
    console.log(error.message);
  }

  return products;
}

export async function getProduct(id) {
  let { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error.message);
  }

  return product;
}

export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);
}
