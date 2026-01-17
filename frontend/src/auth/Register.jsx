import api from "../axios/axios.js";
import { useEffect } from "react";

const Register = () => {
  useEffect(() => {
    api
      .get("/")
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);

  
  return <h1>Testing api</h1>;
};

export default Register;
