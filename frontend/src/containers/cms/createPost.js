import React, { useState } from "react";
import "./cmsComponent.scss";
import Editor from "../../components/editor/editor"
import getBlog from "../../actions/userActions";
import saveBlog  from "../../actions/userActions";

export default function CreatePost() {

    const [htmlEditor, setHtmlEditor] = useState("");


    const savePost= ()=> {
      console.log("saved post",htmlEditor);
      // saveBlog(htmlEditor);
    }
    const getHtmlValue = (htmlValue) =>{
      // console.log("html value",htmlValue)


      // setHtmlEditor(htmlValue);

    }
    const getPost =() =>{
      console.log("hi1");
      getBlog();
    }
  
    return (
      <div className="w-75 m-auto" >
        <div  className="w-50 pb-3 pt-5 m-auto">
          <span className="pr-3"><strong>Title:</strong></span><input type="text" name="entryName" className="w-100"></input>
        </div>
        <span className="pr-3"><strong>Blog:</strong></span>
         <Editor onChangeEditor={(htmlValue)=>getHtmlValue(htmlValue)}  />

          <button className="bt btn-primary" onClick={()=>{savePost()}} >Save Post</button>

          <button className="bt btn-primary" onClick={()=>{getPost()}} >get Post</button>
          
      </div>
    );
  }