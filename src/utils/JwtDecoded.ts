import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");
let ownerId = "";

if (token) {
  const decoded: any = jwtDecode(token);
  ownerId = decoded.id; 
}
