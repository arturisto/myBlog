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
const saveBlog = async (newEntry)=>{

    try {
        const data = {
           newBlogEntry: newEntry,  
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
        await fetch (url, {
            method:"POST",
            headers:{ "Content-Type": "application/json"}
        }           
            )
        .then(function (response){
            console.log("hi",response.json())
        })    
    } catch (error) {
        
    }

}


const uploadImageToBucket = async (image) => {
    let image_location
    const formData = new FormData();
    formData.append('image',image)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    try {
        const response = axios.post("http://localhost:5000/user/blogmanage/uploadimage",formData,config)
     
        image_location = response.then((response)=>response.data.imageUrl);
        console.log("img loc", image_location)

        return image_location;
    } catch (error) {
        
    }


}

export default (login, saveBlog, getBlog, uploadImageToBucket)