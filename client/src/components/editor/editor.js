import React, { Fragment } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.core.css";
// const userActions = require ("../../actions/userActions")

import { uploadImageToServer } from "../../actions/userActions";

class Editor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorHtml: props.editorValue,
      theme: "snow",
    };
    this.quill = null;
    this.handleChange = this.handleChange.bind(this);
    this.imageHandler = this.imageHandler.bind(this);
    this.modules = {
      toolbar: {
        container: [
          [
            { header: "1" },
            { header: "2" },
            { header: [3, 4, 5, 6] },
            { font: [] },
          ],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image", "video"],
          ["clean"],
          ["code-block"],
        ],
        handlers: {
          image: this.imageHandler,
        },
      },
      clipboard: {
        matchVisual: false,
      },
    };
  }
  handleChange(html) {
    this.setState({ editorHtml: html });
    this.props.onChangeEditor(html, false);
  }
  imageHandler() {
    this.props.onInsertImage(this.quill);
  }

  render() {
    return (
      <Fragment>
        <ReactQuill
          ref={(el) => {
            this.quill = el;
          }}
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.props.isEditorToClear ? "" : this.state.editorHtml}
          modules={this.modules}
          formats={Editor.formats}
          bounds={".app"}
          placeholder={"Start typing here"}
        />
      </Fragment>
    );
  }
}
/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */

Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

/*
 * PropType validation
 */
Editor.propTypes = {
  placeholder: PropTypes.string,
};

export default Editor;
