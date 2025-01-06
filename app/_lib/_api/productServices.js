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

  window.location.href = "/browse?order=null&category=null&sort=null";
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

    newProduct.productImg[0] = imagePath;
  }

  //UPDATING OPTIONS
  const updatedOptions = newProduct.options.map(async (option) => {
    if (typeof option.img !== "string") {
      const optionImageName = `${Math.random()}-${option.img.name}`.replaceAll(
        "/",
        ""
      );
      const optionImagePath = `${supabaseUrl}/storage/v1/object/public/productOptionsImages/${optionImageName}`;

      // Upload image for the option
      const { error: optionStorageError } = await supabase.storage
        .from("productOptionsImages")
        .upload(optionImageName, option.img);

      if (optionStorageError) {
        console.log(
          "ERROR UPLOADING OPTION IMAGE: ",
          optionStorageError.message
        );
        return;
        //NO OPTION ADDED IN CASE OF ERROR
      }

      return { ...option, img: optionImagePath };
    }
    return option;
  });

  newProduct.options = await Promise.all(updatedOptions); //AWAITING ALL IMAGE POSTS (IF ANY)

  const { data, error } = await supabase
    .from("products")
    .update({ ...newProduct })
    .eq("id", id)
    .select();

  window.location.href = `/browse/product/${id}`;
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

  return data;
}

export async function postImg(imageFile) {
  const imageName = `${Math.random()}-${imageFile.name}`.replaceAll("/", "");
  const imagePath = `${supabaseUrl}/storage/v1/object/public/productOptionsImages/${imageName}`;

  const { error: storageError } = supabase.storage
    .from("productImages")
    .upload(imageName, imageFile);

  //if the image isnt posted, don't post the product (PRODUCTS WITHOUT IMAGE CANNOT EXIST)
  if (storageError) {
    console.log("ERROR UPLOADING OPTIONS IMAGES: ", storageError.message);
    return;
  }
}

export async function postProduct(product) {
  const currentUser = await getCurrentUser();

  // imageName for supabase's storage bucket and imagePath for the link to the image in products table
  const imageName = `${Math.random()}-${product.productImg.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/productImages/${imageName}`;

  const { error: storageError } = await supabase.storage
    .from("productImages")
    .upload(imageName, product.productImg[0]);

  // If the product image isn't posted, don't post the product (PRODUCTS WITHOUT IMAGE CANNOT EXIST)
  if (storageError) {
    console.log("ERROR UPLOADING IMAGE: ", storageError.message);
    return;
  }

  let optionImagePaths = [];

  if (product.options.length > 0) {
    const uploadedImagePaths = product.options.map(async (option) => {
      const optionImageName = `${Math.random()}-${option.img.name}`.replaceAll(
        "/",
        ""
      );
      const optionImagePath = `${supabaseUrl}/storage/v1/object/public/productOptionsImages/${optionImageName}`;

      const { error: optionStorageError } = await supabase.storage
        .from("productOptionsImages")
        .upload(optionImageName, option.img);

      // If the option image isnt uploaded, skip adding it to the list
      if (optionStorageError) {
        console.log(
          "ERROR UPLOADING OPTION IMAGE: ",
          optionStorageError.message
        );
        return;
      }

      return {
        type: option.type,
        index: option.index,
        img: optionImagePath,
      };
    });

    // Wait for all upload promises to resolve
    optionImagePaths = await Promise.all(uploadedImagePaths); // FILTERING OUT ALL NULL OPTIONS (FAILED IMAGE UPLOADS)
  }

  // Posting the product with the uploaded images and option paths
  const { data, error } = await supabase
    .from("products")
    .insert({
      ...product,
      productImg: [imagePath], // Product's main image path
      productRating: 0,
      listedBy: currentUser.user.id,
      options: optionImagePaths,
    })
    .select()
    .single();

  if (error) {
    console.log("ERROR: ", error);
    return;
  }

  window.location.href = `/browse/product/${data.id}`;
}

export async function getCategories() {
  let { data: categoriesEcoms, error } = await supabase
    .from("categoriesEcoms")
    .select("*");

  if (error) {
    console.log(error.message);
    return [];
  }

  return categoriesEcoms;
}
