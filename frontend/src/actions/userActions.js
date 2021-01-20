import axios from "axios";

const login = async (username, password) => {
  try {
    const data = {
      username: username,
      password: password,
    };
    const url = "http://localhost:5000/user/login";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log("response: ", response);
  } catch (err) {
    console.log("error: ", err);
  }
};
const saveBlog = async (newEntry, title, tags) => {
  try {
    const data = {
      newBlogEntry: newEntry,
      title: title,
      tags:tags
    };
    const url = "http://localhost:5000/user/blogmanage/savenewentry";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log("response: ", response);
    return true;
  } catch (err) {
    console.log("error: ", err);
    return err;
  }
};

const updateBlog = async (updatedEntry, title, blogId,tags) => {
  try {
    const data = {
      entryToUpdate: updatedEntry,
      title: title,
      id: blogId,
      tags:tags
    };
    const url = "http://localhost:5000/user/blogmanage/updateentry";

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return true;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const getSingleBlogEntry = async (entryId) => {
  try {
    const url =
      "http://localhost:5000/user/blogmanage/getnewentry?blogId=" + entryId;
    const result = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
    },
  };
  try {
    return axios
      .post(
        "http://localhost:5000/user/blogmanage/uploadimage",
        formData,
        config
      )
      .then((res) => res.data.imageUrl);
  } catch (error) {
    console.log(error);
  }
};

const getBlogPostHeaders = async () => {
  try {
    const resp = await axios.get(
      "http://localhost:5000/user/blogmanage/getAllPosts"
    );
    return resp.data;
  } catch (error) {
    return { error: "error", errorText: error };
  }
};

const deleteEntries = async (blogIds) => {
  try {
    const url = "http://localhost:5000/user/blogmanage/deleteEntries";
    const reply = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogIds),
    });

    return handleApiBoolReply(reply);
  } catch (error) {
    return error;
  }
};

const publishEntries = async (blogIds) => {
  try {
    const url = "http://localhost:5000/user/blogmanage/publishEntries";
    const reply = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogIds),
    });

    return handleApiBoolReply(reply);
  } catch (error) {
    return error;
  }
};

const unPublishEntries = async (blogIds) => {
  try {
    const url = "http://localhost:5000/user/blogmanage/unPublishEntries";
    const reply = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogIds),
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
  saveBlog,
  getSingleBlogEntry,
  uploadImageToServer,
  getBlogPostHeaders,
  deleteEntries,
  publishEntries,
  unPublishEntries,
  updateBlog,
};
