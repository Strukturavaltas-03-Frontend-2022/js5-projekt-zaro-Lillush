"use strict";

export const url = "http://localhost:3000/users";

let userData = [];

export const updateOptions = {
  method: "",
  body: "",
  headers: { "Content-Type": "application/json" },
};

export const fetchUserData = async (url) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const data = await response.json();

    data.forEach((data) => {
      userData.push({
        id: data.id,
        name: data.name,
        email: data.email,
        address: data.address,
      });
    });
  } catch (error) {
    console.error(`Something went wrong fetching your request: ${error}`);
  }

  return userData;
};

export const updateUserData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const data = await response.json();
  } catch (error) {
    console.error(`Something went wrong fetching your request: ${error}`);
  }
};

// export const deleteUserData = async (url) => {
//   try {
//     const response = await fetch(url, {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json" },
//     });
//     const data = await response.json();
//   } catch (error) {
//     console.error(`Something went wrong: ${error}`);
//   }
// };

// export const postUserData = async (url, user) => {
//   let newData = {
//     id: id,
//     name: user.name,
//     emailAddress: user.email,
//     address: user.address,
//   }
//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       body: JSON.stringify(newData),
//       headers: { "Content-Type": "application/json" },
//     });
//     const data = await response.json();
//     userData.push(newData);

//   } catch (error) {
//     console.error(`Something went wrong: ${error}`);
//   }
// };
