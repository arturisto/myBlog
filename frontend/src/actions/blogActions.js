import axios from "axios";
import { getBaseUrl } from "./utils";

const getLatestBlogs = async () => {
  const baseUrl = getBaseUrl();
  const url = baseUrl + "blog/getlatest";

  const config = {
    headers: {
      "content-type": "application/json",
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

const getEntriesByType = async (type, pageNumber, tags) => {
  const baseUrl = getBaseUrl();
  const url = baseUrl + "blog/getEntriesByType";

  const config = {
    headers: {
      "content-type": "application/json",
    },
    body: {
      entryType: type,
      pageNumber: pageNumber,
      tags: tags,
    },
  };
  try {
    const response = await axios.post(url, config);
    const blogs = response.data;
    return blogs;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getSingleBlogEntry = async (entryId) => {
  try {
    const baseUrl = getBaseUrl();
    const url = baseUrl + "blog/getnewentry?blogId=" + entryId;

    const result = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const returnData = await result.json();
    return returnData;
  } catch (error) {
    return error;
  }
};

export { getLatestBlogs, getEntriesByType, getSingleBlogEntry };
