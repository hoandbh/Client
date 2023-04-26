// import fetch from "node-fetch";

// const makeGet = (domain: string, jwt: string) => async (path: string) => {
//   const res = await fetch(`${domain}${path}`, {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${jwt}`,
//   },
//   });

//   // if (!res.ok) return res;
//   // return res.json();
// };

// const makePost =
//   (domain: string, jwt: string) => async (path: string, body: any) => {
//   // const res = await fetch(`${domain}${path}`, {
//   //   method: "POST",
//   //   headers: {
//   //   "Content-Type": "application/json",
//   //   Authorization: `Bearer ${jwt}`,
//   //   },
//   //   body: JSON.stringify(body),
//   // });

//   // if (!res.ok) return res;
//   // return res.json();
//   };

// const makePut =
//   (domain: string, jwt: string) => async (path: string, body: any) => {
//   // const res = await fetch(`${domain}${path}`, {
//   //   method: "PUT",
//   //   headers: {
//   //   "Content-Type": "application/json",
//   //   Authorization: `Bearer ${jwt}`,
//   //   },
//   //   body: JSON.stringify(body),
//   // });

//   // if (!res.ok) return res;
//   // return res.json();
//   };
// const makeDelete =
//   (domain: string, jwt: string) => async (path: string, body: any) => {
//   //   const res = await fetch(`${domain}${path}`, {
//   //   method: "DELETE",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //     Authorization: `Bearer ${jwt}`,
//   //   },
//   //   body: JSON.stringify(body),
//   //   });

//   //   if (!res.ok) return res;
//   //   return res.json();
//   };
// export { makeGet, makePost, makeDelete, makePut };