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
  const url = "http://localhost:5000/user/signup";
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });

  const newUser = await response.json();

  if (newUser) {
    console.log(newUser);
    return true;
  } else {
    return false;
  }
};
const saveBlog = async (newEntry, title, tags) => {
  try {
    const data = {
      newBlogEntry: newEntry,
      title: title,
      tags: tags,
    };
    const url = "http://localhost:5000/user/blogmanage/savenewentry";
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

const updateBlog = async (updatedEntry, title, blogId, tags) => {
  try {
    const data = {
      entryToUpdate: updatedEntry,
      title: title,
      id: blogId,
      tags: tags,
    };
    const url = "http://localhost:5000/user/blogmanage/updateentry";

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
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
  const config = {
    headers: {
      "content-type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  };
  try {
    const resp = await axios.get(
      "http://localhost:5000/user/blogmanage/getAllPosts",
      config
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
    const url = "http://localhost:5000/user/blogmanage/publishEntries";
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
    const url = "http://localhost:5000/user/blogmanage/unPublishEntries";
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
    const url = "http://localhost:5000/user/isLogin";
   const reply =await  fetch(url, {
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
};
