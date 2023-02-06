import axios from "axios";
import Config from "../config";

export default {
  async baseApi(sub_url, method, json_data, cb) {
    let user = localStorage.currentUser
      ? JSON.parse(localStorage.currentUser)
      : null;
    try {
      let request = {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      if (user && user.jwt) {
        request.headers.Authorization = "Bearer " + user["jwt"];
      }
      if (method == "POST" || method == "PUT") {
        request["body"] = JSON.stringify(json_data);
      }
      let response = await fetch(Config.SERVICE_API_URL + sub_url, request);
      let responseJson = await response.json();
      if (response.status == 200) {
        cb(null, responseJson);
      } else {
        cb(responseJson);
      }
    } catch (error) {
      cb(error);
    }
  },

  async baseApiWithoutAuth(sub_url, method, json_data, cb) {
    let user = localStorage.currentUser;
    try {
      let request = {
        method,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      if (method == "POST" || method == "PUT") {
        request["body"] = JSON.stringify(json_data);
      }
      let response = await fetch(Config.SERVICE_API_URL + sub_url, request);
      let responseJson = await response.json();
      if (response.status == 200) {
        cb(null, responseJson);
      } else {
        cb(responseJson);
      }
    } catch (error) {
      cb(error);
    }
  },

  contactUs(data, cb) {
    this.baseApiWithoutAuth("/customers/contact_us", "POST", data, cb);
  },

  listCustomers(offset, limit, sort, cb) {
    this.baseApiWithoutAuth("/customers?_sort="+sort+':asc&_start='+offset+'&_limit='+limit, "GET", {}, cb);
  },
};
