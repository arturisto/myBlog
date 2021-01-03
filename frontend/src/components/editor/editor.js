import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.core.css';
import uploadImageToBucket from "../../actions/userActions";
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: '', theme: 'snow' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html, Event, source, editor) {
    // console.log(Event )
    // console.log(source)
    // console.log(editor.getContents())
    // // const imgString = Event.ops[0].insert.image
    // // console.log("html", imgString)
    // console.log(`${ window.location.origin }`)
    // this.setState({ editorHtml: html });
    // this.props.onChangeEditor(this.state.editorHtml);
  }


  imageHandler (){

    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
        const file = input.files[0];
        console.log("file",file)
        // const formData = new FormData();
        // formData.append('image', file);
        // Save current cursor state
        const range = this.quill.getSelection(true);

        // Move cursor to right side of image (easier to continue typing)
        this.quill.setSelection(range.index + 1);
        const img = await uploadImageToBucket(file)  

        console.log("img",img)
        // Insert uploaded image
        // this.quill.insertEmbed(range.index, 'image', res.body.image);
        this.quill.insertEmbed(range.index, 'image',img);

    };
}
  
  
  render() {
    return (
      <Fragment>
        {/* <img src="https://mrandmrseatmedia.s3.us-east-2.amazonaws.com/test/test.jpg" alt="hi"></img> */}
        <ReactQuill
          ref={el => {
            this.quill = el;
          }}
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.state.editorHtml}
           modules={{
            toolbar: {
                container: [
                    [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
                    [{ size: [] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image', 'video'],
                    ['clean'],
                    ['code-block']
                ],
                handlers: {
                    image: this.imageHandler
                }
            }
        }}
          formats={Editor.formats}
          bounds={'.app'}
          placeholder={this.props.placeholder}
        />

      </Fragment>
    );
  }
}
/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */

const toolbarOptions =[
  [{ header: '1' }, { header: '2' }, { font: [] }],
  [{ size: [] }],
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [
    { list: 'ordered' },
    { list: 'bullet' },
    { indent: '-1' },
    { indent: '+1' },
  ],
  ['link', 'image', 'video'],
  ['clean'],
  []
]; 

 Editor.modules = {
  toolbar:{
    container: toolbarOptions,
                handlers:{
                  image:Editor.imageHandler,
                }
  } ,
  clipboard: {
    matchVisual: false,
  },
};

Editor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

/*
 * PropType validation
 */
Editor.propTypes = {
  placeholder: PropTypes.string,
};

export default Editor;
