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

  return { data, error };
}

export async function signout() {
  let { error } = await supabase.auth.signOut();
  sessionStorage.clear();
  window.location.href = "/";
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  console.log(data);
  console.log(error);
  if (error) {
    console.log("Error getting user:", error);
    return null;
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
    .from("sales")
    .select("*")
    // Filters
    .eq("soldBy", id);

  if (error) {
    console.log(error.message);
  }
  return userSalesInfo;
}

export async function getUserSale(id, orderId) {
  let { data: sale, error } = await supabase
    .from("sales")
    .select("*")
    .eq("id", orderId)
    .single();

  if (error) {
    console.log(error.message);
  }

  return sale;
}

export async function getUserPurchases(id) {
  let { data: userPurchasesInfo, error } = await supabase
    .from("orders")
    .select("*")
    .eq("orderedBy", id);

  if (error) {
    console.log(error.message);
  }

  return userPurchasesInfo;
}

export async function getUserPurchase(id, orderId) {
  let { data: sale, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (error) {
    console.log(error.message);
  }

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
