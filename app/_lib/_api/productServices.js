import { supabase, supabaseUrl } from "./supabase";
import { getCurrentUser } from "./userServices";

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

  window.location.href = "/browse";
}

export async function postProduct(product) {
  const currentUser = await getCurrentUser();

  //UPLOADING PRODUCT IMAGE TO SUPABASE:

  //imageName for supabase's storage bucket and imagePath for the link to the image in products table
  const imageName = `${Math.random()}-${product.productImg.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/productImages/${imageName}`;
  const { error: storageError } = supabase.storage
    .from("productImages")
    .upload(imageName, product.productImg);

  //if the image isnt posted, don't post the product (PRODUCTS WITHOUT IMAGE CANNOT EXIST)
  if (storageError) {
    console.log("ERROR UPLOADING IMAGE: ", storageError.message);
    return;
  }

  //posting product
  const { data, error } = await supabase
    .from("products")
    .insert({
      ...product,
      productImg: [imagePath],
      productRating: 0,
      listedBy: currentUser.user.id,
    })
    .select()
    .single();

  if (error) {
    console.log("ERROR: ", error);
    return;
  }

  //time for image posting query to take effect so that the image of the product can be visualized properly on page change
  setTimeout(() => {
    window.location.href = `/browse/product/${data.id}`;
  }, 200);
}

export async function editProduct(newProduct, id) {
  //UPLOADING PRODUCT IMAGE TO SUPABASE:

  // imageName for supabase's storage bucket and imagePath for the link to the image in products table
  if (typeof newProduct.productImg[0] !== "string") {
    const imageName = `${Math.random()}-${
      newProduct.productImg[0].name || Math.random()
    }`.replaceAll("/", "");

    const imagePath = `${supabaseUrl}/storage/v1/object/public/productImages/${imageName}`;
    const { error: storageError } = supabase.storage
      .from("productImages")
      .upload(imageName, newProduct.productImg[0]);

    //if the image isnt posted, don't post the product (PRODUCTS WITHOUT IMAGE CANNOT EXIST)
    if (storageError) {
      console.log("ERROR UPLOADING IMAGE: ", storageError.message);
      return;
    }

    const { data, error } = await supabase
      .from("products")
      .update({ ...newProduct, productImg: [imagePath] })
      .eq("id", id)
      .select();
  } else {
    const { data, error } = await supabase
      .from("products")
      .update({ ...newProduct, productImg: [newProduct.productImg[0]] })
      .eq("id", id)
      .select();
  }

  setTimeout(() => {
    window.location.href = `/browse/product/${id}`;
  }, 1000);
}

export async function submitOrder(order) {
  const { data, error } = await supabase
    .from("orders")
    .insert(order)
    .select()
    .single();

  if (error) {
    console.log("ERROR WHEN SUBMITTING ORDER:", error.message);
    return;
  }
  console.log("SUBMITTED");

  return data;
}
