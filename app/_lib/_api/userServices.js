import { redirect } from "next/navigation";
import { supabase } from "./supabase";
import { signIn } from "next-auth/react";

export async function register(userData) {
  //check for existing user with email
  let { data: email, emailError } = await supabase
    .from("userInfoEcoms")
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
    .from("userInfoEcoms")
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
    return {
      data: username,
      error: {
        message: error.message,
      },
    };
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

  const preferencesObj = {
    userId: data.user.id,
    categoryPrefs: [],
    priceRangePrefs: [],
    searchPrefs: [],
    ratingPrefs: [{ from: 0, to: 10 }],
  };

  const { error: prefsError } = await supabase
    .from("userPreferences")
    .insert(preferencesObj);

  if (prefsError) {
    console.log(prefsError);
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

//Supabase client-side function for retrieving user data
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log("Error getting user:", error);
    return null;
  }

  return data;
}

//User credentials info
export async function getUserInfo(id) {
  const { data: userData, error: userDataError } =
    await supabase.auth.getUser();

  let { data: userInfo, error } = await supabase
    .from("userInfoEcoms")
    .select("email, username, created_at, isPartner, userId")
    .eq("userId", userData.user.id)
    .single();

  if (error) {
    console.log(error.message);
  }

  return userInfo;
}

//Sales, purchases and orders of user
export async function getUserSales(id) {
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

export async function getUserSale(orderId) {
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

export async function getUserPurchase(orderId) {
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

export async function getOrder(id) {
  let { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error.message);
    return;
  }

  return order;
}

//Partnership
export async function requestPartnership(userData) {
  const { data, error } = await supabase
    .from("partnershipRequests")
    .insert(userData)
    .select();

  if (error) {
    console.error(error.message);
    return;
  }

  return data;
}

export async function revokePartnership() {
  const user = await getCurrentUser();

  if (user.user.id) {
    const { error } = await supabase
      .from("partnershipRequests")
      .delete()
      .eq("userId", user.user.id);

    if (error) {
      console.log(error.message);
    }
  }
}

export async function checkForPartnerShip() {
  const user = await getCurrentUser();

  if (user.user.id) {
    const { data: partnership, error } = await supabase
      .from("partnershipRequests")
      .select("*")
      .eq("userId", user.user.id)
      .single()
      .limit(1); // Fetch at most one row, rather than requiring exactly one

    console.log(partnership);
    if (error) {
      console.log(error.message);
      return null;
    }

    return partnership;
  }
}

//User credentials
export async function updateEmail(currentUser, oldEmail, newEmail) {
  try {
    const { data: userEmail, error: error1 } = await supabase
      .from("userInfoEcoms")
      .select("email")
      .eq("email", oldEmail)
      .eq("userId", currentUser.id)
      .single();

    if (error1 || !userEmail) {
      return {
        data: null,
        error: { message: "Email provided was not valid." },
      };
    }

    const { data: updatedUser, error: error2 } = await supabase
      .from("userInfoEcoms")
      .update({ email: newEmail })
      .eq("email", oldEmail)
      .eq("userId", currentUser.id);

    if (error2) {
      return {
        data: null,
        error: { message: "Failed to update email." },
      };
    }

    const { data, error3 } = await supabase.auth.updateUser({
      email: newEmail,
    });

    if (error3) {
      return {
        data: null,
        error: { message: "Failed to update email." },
      };
    }

    return { updatedUser, error: null };
  } catch (error) {
    return {
      data: null,
      error: { message: "An unexpected error occurred." },
    };
  }
}

export async function updatePassword(email, oldPass, newPass) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: oldPass,
  });

  if (error) {
    return {
      data,
      error: {
        message: "The password you entered is incorrect.",
      },
    };
  }

  const { data: updatedUser, error1 } = await supabase.auth.updateUser({
    password: newPass,
  });

  if (error) {
    return {
      data: null,
      error: { message: "Failed to update password." },
    };
  }

  return { data, error: null };
}

export async function updateUsername(id, oldUsername, newUsername) {
  const { data, error } = await supabase
    .from("userInfoEcoms")
    .update({ username: newUsername })
    .eq("username", oldUsername)
    .eq("userId", id)
    .select();

  if (error) {
    return {
      data: null,
      error: { message: "An error occurred while updating the username." },
    };
  }

  if (data.length === 0) {
    return {
      data: null,
      error: { message: "Please enter your current username correctly." },
    };
  }

  return { data, error: null };
}
