import react  from "react";

const test = async e => {

    console.log("hooo")
    try {

        const data = {
            title: "hello",
            metatitle: "meta",
            content: "hello there all!",
        };
    
        let { id, title, metatitle, content } = data;

       
        const url = "http://localhost:5000/blog/add"
        console.log("url: ",url)
        const response  = await fetch (url, {
            method:"POST",
            headers:{ "Content-Type": "application/json"},
            body:  JSON.stringify(data)
        }
            
            );
            console.log("response: ",response);
   
    } catch (err) {

        console.log("error: ", err)
        
    }
}

export default test
