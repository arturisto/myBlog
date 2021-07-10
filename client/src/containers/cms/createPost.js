import React, { useState } from "react";
import "./cmsComponent.scss";
import Editor from "../../components/editor/editor";
import { uploadImageToServer } from "../../actions/userActions";


export default function CreatePost(props) {
  const getHtmlValue = (htmlValue, clearValue) => {
    props.onChangeEditor(htmlValue, clearValue);
  };
  const handleTitle = (event) => {
    props.onChangeTitle(event.target.value);
  };

  const editorValue = props.editorValue
  const imageHandler = (quill) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);
      console.log(input.files[0]);
      // Save current cursor state
      const range = quill.getEditor().getSelection(true);
      // // Move cursor to right side of image (easier to continue typing)
      quill.getEditor().setSelection(range.index + 1);
      // const img = await uploadImageToBucket(this.state.uploadedPictures, this.state.title)
      let reader = new FileReader();
      reader.readAsDataURL(input.files[0])
      console.log(reader.result);
      // let reader = readAsDataURL(file);
      let img = await uploadImageToServer(formData);

      quill.getEditor().insertEmbed(range.index, "image", reader.result);
    };
  };

  return (
    <div className="w-75 m-auto">
      <div className="w-50 pb-3 pt-5 m-auto">
        <span className="pr-3">
          <strong>Title:</strong>
        </span>
        <input
          type="text"
          name="entryName"
          className="w-100"
          value={props.title}
          onChange={handleTitle}
        ></input>
      </div>
      <span className="pr-3">
        <strong>Blog:</strong>
      </span>
      <Editor
        onChangeEditor={(htmlValue, clearValue) =>
          getHtmlValue(htmlValue, clearValue)
        }
        onInsertImage={(quill) => imageHandler(quill)}
        isEditorToClear={props.isEditorToClear}
        editorValue = {editorValue}
      />
    </div>
  );
}
