 import axios from "axios";  

 const login = async (username,password) => {

    console.log("user actions")
    try {
        const data = {
            username: username,
            password: password,    
        };   
        const url = "http://localhost:5000/user/login"
        console.log("url: ",data)
        const response  =await fetch (url, {
            method:"POST",
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify(data)
        }           
            );
            console.log("response: ",response);  
    } catch (err) {

        console.log("error: ", err)
       
    }
};
const saveBlog = async (newEntry, title)=>{

    // console.log("save blog", newEntry, title)
    // return "jo";
    try {
        const data = {
           newBlogEntry: newEntry,
           title:title  
        };   
        const url = "http://localhost:5000/user/blogmanage/savenewentry";
        const response  =await fetch (url, {
            method:"POST",
            headers:{ "Content-Type": "application/json"},
            body: JSON.stringify(data),
        }           
            );
            console.log("response: ",response);  
    } catch (err) {

        console.log("error: ", err)
       
    }

};

const getBlog = async ()=>{

    try {
        const url = "http://localhost:5000/user/blogmanage/getnewentry";
        const result = await fetch (url, {
            method:"POST",
            headers:{ "Content-Type": "application/json"}
        }           
            )
        const returnData =  await result.json();
        return returnData
  
    } catch (error) {
        
    }

}


const uploadImageToServer = async (formData) => {
    
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    try {
         return axios.post("http://localhost:5000/user/blogmanage/uploadimage",formData,config)
         .then(res=>res.data.imageUrl)
    } catch (error) {
        
    }


}

export {login, saveBlog, getBlog, uploadImageToServer}