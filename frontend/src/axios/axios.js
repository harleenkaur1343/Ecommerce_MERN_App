import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

/* REQUEST INTERCEPTOR */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    //console.log("Authorizaton axios: request interceptor", config);
    if (token) {
      //Add the header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("Error axios", error);
    Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (originalRequest.url.includes("/refresh/refresh-token")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.get("/refresh/refresh-token");

        localStorage.setItem("accessToken", res.data.accessToken);

        originalRequest.headers.Authorization =
          `Bearer ${res.data.accessToken}`;

        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        console.log("Interceptor error", err)
        //window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);


export default api;
//every api request is sent through this, reduces code repetition
