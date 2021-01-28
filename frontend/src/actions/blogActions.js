import axios from "axios";
import { getBaseUrl } from "./utils";

const getLatestBlogs = async (req, res) => {
  const baseUrl = getBaseUrl();
  const url = baseUrl + "blog/getlatest";

  const config = {
    headers: {
      "content-type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  };
  try {
    const response = await axios.get(url, config);
    const blogs = response.data.posts;
    return blogs;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { getLatestBlogs };
