import { redirect } from "next/navigation";
import { supabase } from "./supabase";

export async function register(userData) {
  //check for existing user with email
  let { data: email, emailError } = await supabase
    .from("userAccounts")
    .select("email")
    .eq("email", userData.email);

  if (email.length > 0) {
    return {
      data: email,
      error: {
        message: "User with this email already exists.",
      },
    };
  }

  //check for existing user with username
  let { data: username, usernameError } = await supabase
    .from("userAccounts")
    .select("username")
    .eq("username", userData.username);

  if (username.length > 0) {
    return {
      data: username,
      error: {
        message: "User with this username already exists",
      },
    };
  }

  let { data, error } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
  });

  console.log(data);
  console.log(data);
  console.log(data);
  console.log(data);
  if (error) {
    console.log("ERROR:");
    console.log(error.message);
    return;
  }

  const userObj = {
    userId: data.user.id,
    email: userData.email,
    username: userData.username,
    sales: [],
    purchases: [],
  };
  console.log(userObj);

  const { data: regData, error: regError } = await supabase
    .from("userInfoEcoms")
    .insert(userObj);

  if (regError) {
    console.log(regError);
    return;
  }
  return { data, error };
}

export async function login(userData) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: userData.email,
    password: userData.password,
  });

  console.log(data);
  console.log(error);
  return { data, error };
}

export async function signout() {
  let { error } = await supabase.auth.signOut();
  window.location.href = "/";
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  console.log(data);
  if (error) {
    console.error("Error getting user:", error);
  }
  return data;
}

export async function getUserInfo(id) {
  let { data: userInfo, error } = await supabase
    .from("userInfoEcoms")
    .select("email, username, created_at")
    .eq("userId", id)
    .single();

  if (error) {
    console.log(error.message);
  }

  return userInfo;
}

export async function getUserSalesInfo(id) {
  let { data: userSalesInfo, error } = await supabase
    .from("userInfoEcoms")
    .select("sales")
    .eq("userId", id)
    .limit();

  if (error) {
    console.log(error.message);
  }
  console.log("aaa");
  console.log(userSalesInfo);
  return userSalesInfo[0];
}

export async function getUserSale(id, orderId) {
  let { data: userSalesInfo, error } = await supabase
    .from("userInfoEcoms")
    .select("sales")
    .eq("id", id)
    .limit();

  console.log("1");
  console.log(orderId);

  if (error) {
    console.log(error.message);
  }
  console.log();
  console.log();
  console.log();
  console.log("sale");
  console.log("sale");
  console.log(userSalesInfo);
  const sale = userSalesInfo[0].sales.find((sale) => sale.orderId == orderId);

  return sale;
}

export async function getUserPurchases(id) {
  let { data: userPurchasesInfo, error } = await supabase
    .from("userInfoEcoms")
    .select("purchases")
    .eq("userId", id)
    .limit();

  if (error) {
    console.log(error.message);
  }

  return userPurchasesInfo[0];
}

export async function getUserPurchase(id, orderId) {
  let { data: userPurchaseInfo, error } = await supabase
    .from("userInfoEcoms")
    .select("purchases")
    .eq("id", id)
    .limit();

  if (error) {
    console.log(error.message);
  }
  console.log(userPurchaseInfo);

  const sale = userPurchaseInfo[0].purchases.find(
    (sale) => sale.orderId == orderId
  );

  return sale;
}

export async function getUserProducts(userId) {
  let { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("listedBy", userId);

  if (error) {
    console.log("ERROR FETCHING USER PRODUCTS: ", error.message);
  }

  return products;
}
