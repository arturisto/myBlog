
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
}

module.exports = {login}