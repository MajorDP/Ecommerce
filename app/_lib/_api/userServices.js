import { supabase } from "./supabase";

export async function getUserInfo(id) {
  let { data: userInfo, error } = await supabase
    .from("userInfoEcoms")
    .select("email, username, created_at")
    .eq("id", id)
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
    .eq("id", id)
    .limit();

  if (error) {
    console.log(error.message);
  }
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
    .eq("id", id)
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
