import axios from "axios";
import { getBaseUrl } from "./utils";

const login = async (username, password) => {
  try {
    const data = {
      username: username,
      password: password,
    };

    const baseUrl = getBaseUrl();
    const url = baseUrl + "user/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const token = await response.json();

    if (token.auth) {
      localStorage.setItem("token", token.token);
      return true;
    } else {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }

      return false;
    }
  } catch (err) {
    console.log("error: ", err);
  }
};

const signup = async (name, username, password) => {
  const data = {
    name: name,
    username: username,
    password: password,
  };
  const baseUrl = getBaseUrl();
  const url = baseUrl + "user/signup";
  console.log("sign up", data);
  console.log("url");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({ data: data }),
  });

  const newUser = await response.json();

  if (newUser) {
    console.log(newUser);
    return true;
  } else {
    return false;
  }
};
const saveBlog = async (newEntry, title, tags, seoTags) => {
  try {
    const data = {
      newBlogEntry: newEntry,
      title: title,
      tags: tags,
      seoTags: seoTags,
    };
    const baseUrl = getBaseUrl();
    const url = baseUrl + "user/blogmanage/savenewentry";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(data),
    });
    console.log("response: ", response);
    return true;
  } catch (err) {
    console.log("error: ", err);
    return err;
  }
};

const updateBlog = async (updatedEntry, title, blogId, tags, seoTags) => {
  try {
    const data = {
      entryToUpdate: updatedEntry,
      title: title,
      id: blogId,
      tags: tags,
      seoTags: seoTags,
    };
    const baseUrl = getBaseUrl();
    const url = baseUrl + "user/blogmanage/updateentry";

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ data: data }),
    });
    return true;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const getSingleBlogEntry = async (entryId) => {
  try {
    const baseUrl = getBaseUrl();
    const url = baseUrl + "user/blogmanage/getnewentry?blogId=" + entryId;

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

const uploadImageToServer = async (formData) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
      "x-access-token": localStorage.getItem("token"),
    },
  };
  try {
    const baseUrl = getBaseUrl();
    const url = baseUrl + "user/blogmanage/uploadimage";
    return axios.post(url, formData, config).then((res) => res.data.imageUrl);
  } catch (error) {
    console.log(error);
  }
};

const getBlogPostHeaders = async () => {
  const config = {
    headers: {
      "content-type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  };
  try {
    const baseUrl = getBaseUrl();
    const url = baseUrl + "user/blogmanage/getAllPosts";
    const resp = await axios.get(url, config);
    return resp.data;
  } catch (error) {
    return { error: "error", errorText: error };
  }
};

const deleteEntries = async (blogIds) => {
  try {
    const baseUrl = getBaseUrl();
    const url = baseUrl + "user/blogmanage/deleteEntries";
    const reply = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(blogIds),
    });

    return handleApiBoolReply(reply);
  } catch (error) {
    return error;
  }
};

const publishEntries = async (blogIds) => {
  try {
    const baseUrl = getBaseUrl();
    const url = baseUrl + "user/blogmanage/publishEntries";
    const reply = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(blogIds),
    });

    return handleApiBoolReply(reply);
  } catch (error) {
    return error;
  }
};

const unPublishEntries = async (blogIds) => {
  try {
    const baseUrl = getBaseUrl();
    const url = baseUrl + "user/blogmanage/unPublishEntries";
    const reply = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify(blogIds),
    });

    return handleApiBoolReply(reply);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const isLogin = async () => {
  const token = localStorage.getItem("token");

  if (token) {
    const baseUrl = getBaseUrl();
    const url = baseUrl + "user/isLogin";
    const reply = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });

    return handleApiBoolReply(reply);
  } else {
    return false;
  }
};

const getAllTags = async () => {
  try {
    const baseUrl = getBaseUrl();
    const url = baseUrl + "user/blogmanage/getAllTags";
    const reply = await fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (handleApiBoolReply(reply)) {
      const body = await reply.json();
      return body;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

const saveNewTag = async (tag) => {
  const token = localStorage.getItem("token");
  try {
    const baseUrl = getBaseUrl();
    const url = baseUrl + "user/blogmanage/saveNewTag";
    const reply = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify([tag]),
    });
    console.log(reply);
    return handleApiBoolReply(reply);
  } catch (error) {
    console.log(error);
    return false;
  }
};
const deleteTag = async (tags) => {
  try {
    console.log(tags);
    const baseUrl = getBaseUrl();
    const url = baseUrl + "user/blogmanage/deleteTag";
    const token = localStorage.getItem("token");

    const reply = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(tags),
    });

    return handleApiBoolReply(reply);
  } catch (error) {
    console.log(error);
    return false;
  }
};

const handleApiBoolReply = (reply) => {
  return reply.status === 200 ? true : false;
};

export {
  login,
  signup,
  saveBlog,
  getSingleBlogEntry,
  uploadImageToServer,
  getBlogPostHeaders,
  deleteEntries,
  publishEntries,
  unPublishEntries,
  updateBlog,
  isLogin,
  getAllTags,
  saveNewTag,
  deleteTag,
};
