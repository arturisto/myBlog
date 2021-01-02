import React, { useState } from "react";
import "./cmsComponent.scss";
//Quill
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import Editor from "../../components/editor/editor"
import getBlog from "../../actions/userActions";
import saveBlog  from "../../actions/userActions";

export default function CreatePost() {

    const [htmlEditor, setHtmlEditor] = useState("");


    const savePost= ()=> {
      // console.log("saved post",htmlEditor);
      saveBlog(htmlEditor);
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
      <div className="quillContainer" >
         <Editor onChangeEditor={(htmlValue)=>getHtmlValue(htmlValue)} />

          <button className="bt btn-primary" onClick={()=>{savePost()}} >Save Post</button>

          <button className="bt btn-primary" onClick={()=>{getPost()}} >get Post</button>
          
      </div>
    );
  }