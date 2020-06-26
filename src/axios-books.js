import axios from "axios";

const instance = axios.create({
  baseURL: "https://mybook-3531d.firebaseio.com/",
});

export default instance;
