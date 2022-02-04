import Cookies from "js-cookie";

const token = Cookies.get("jwt");
console.log("token2", token);
const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
    jwt: token,
    Authorization: `Bearer ${token}`,
  },
  sessionStorage: { jwt: token },
};

export { config };
