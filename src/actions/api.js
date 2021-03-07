///FOR CONFIGURING HTTP REQUESTS

import axios from "axios";

const baseUrl = "https://react-nodejs-crud-app.herokuapp.com/";

export default {
  postMessage(url = baseUrl + "postMessages/") {
    return {
      fetchAll: () => axios.get(url),
      fetchById: (id) => axios.get(url + id),
      create: (newRecord) => axios.post(url, newRecord),
      update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
      delete: (id) => axios.delete(url + id),
    };
  },
};
