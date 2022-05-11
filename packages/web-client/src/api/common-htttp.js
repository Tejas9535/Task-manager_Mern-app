import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      "Content-type": "application/json"
    }
  });
  // const instance = axios.create({
  //   baseURL: 'https://some-domain.com/api/',
  //   timeout: 1000,
  //   headers: {'Authorization': 'Bearer '+token}
  // });

  