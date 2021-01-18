import React, { Fragment, Component } from "react";
//containers
import CreatePost from "./createPost";
import ViewPosts from "./viewPosts";
//components
import CmsMainScreenToolBar from "../../components/cmsManagerNav/cmsMainScreenToolBar";
//boostrap items
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
//styles
import "./cmsComponent.scss";
//actions
import {
  getBlogPostHeaders,
  getSingleBlogEntry,
  saveBlog,
  deleteEntries,
  publishEntries,
  unPublishEntries,
  updateBlog,
} from "../../actions/userActions";
//utilites
import { CMSVIEWMODES } from "../../utils/enums";

class CmsManager extends Component {
  constructor(props) {
    super(props);
    //state
    this.state = {
      activeTab: "create",
      postsToShow: [],
      modalStatus: false,
      modalTitle: "",
      modalText: "",
      editor: "",
      postTitle: "",
      editorToClear: false,
      checkedItems: [],
      viewMode: CMSVIEWMODES.ALL,
      isEdit: false,
      entryEditId: "",
    };
    //binds
    this.toggleView = this.toggleView.bind(this);
    this.handleSaveEditorToState = this.handleSaveEditorToState.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    //create tab binds
    this.handleSaveEditor = this.handleSaveEditor.bind(this);
    this.handleSaveTitleToState = this.handleSaveTitleToState.bind(this);
    this.handleClearEditor = this.handleClearEditor.bind(this);
    this.handlePreviewEditor = this.handlePreviewEditor.bind(this);

    //Display Tab Binds
    this.handlePublish = this.handlePublish.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSeeAll = this.handleSeeAll.bind(this);
    this.handleSeeDrafts = this.handleSeeDrafts.bind(this);
    this.handleSeePublished = this.handleSeePublished.bind(this);
    this.handleUnPublish = this.handleUnPublish.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  async toggleView(pane) {
    const headers = await getBlogPostHeaders();
    if (headers.error === "error") {
      this.setState({
        activeTab: pane,
        modalError: true,
        errorText: headers.errorText,
      });
    } else {
      this.setState({
        activeTab: pane,
        postsToShow: headers.body,
      });
    }
  }
  handleCloseModal() {
    this.setState({
      modalStatus: false,
    });
  }
  handleSaveTitleToState(title) {
    this.setState({
      postTitle: title,
    });
  }
  handleSaveEditorToState(value) {
    this.setState({
      editor: value,
      editorToClear: false,
    });
  }

  async handleSaveEditor() {
    let response;
    if (this.state.isEdit) {
      response = await updateBlog(
        this.state.editor,
        this.state.postTitle,
        this.state.entryEditId
      );
    } else {
      response = await saveBlog(this.state.editor, this.state.postTitle);
    }

    if (response === true) {
      this.setState({
        modalStatus: true,
        modalTitle: "Success",
        modalText: "YOu have succedded",
        editor: "",
        postTitle: "",
        isEdit: false,
        entryEditId: "",
      });
    } else {
      this.setState({
        modalStatus: true,
        modalTitle: "Error",
        modalText: response,
      });
    }
  }
  handleClearEditor() {
    this.setState({
      editorToClear: true,
    });
  }
  handlePreviewEditor() {
    console.log("preview Editor");
  }

  async handlePublish() {
    const reply = await publishEntries(this.state.checkedItems);
    if (reply) {
      this.handleListDataRender();
    } else {
      this.setState({
        modalStatus: true,
        modalTitle: "Error",
        modalText: "Something went Wrong",
        checkedItems: [],
      });
    }
  }

  async handleUnPublish() {
    const reply = await unPublishEntries(this.state.checkedItems);
    if (reply) {
      this.handleListDataRender();
    } else {
      this.setState({
        modalStatus: true,
        modalTitle: "Error",
        modalText: "Something went Wrong",
        checkedItems: [],
      });
    }
  }
  async handleEdit() {
    const length = this.state.checkedItems.length;
    const id = this.state.checkedItems[0];
    if (length === 0) {
      this.setState({
        modaStatus: true,
        modalTitle: "Wrong Selection",
        modalText: "Please choose one item",
      });
    } else if (length > 1) {
      this.setState({
        modaStatus: true,
        modalTitle: "Wrong Selection",
        modalText: "Please choose only one item",
      });
    } else {
      const reply = await getSingleBlogEntry(id);
      if (reply.hasOwnProperty("msg")) {
        this.setState({
          postTitle: reply.body.title,
          editor: reply.body.content,
          activeTab: "create",
          isEdit: true,
          entryEditId: id,
        });
      } else {
        this.setState({
          modalStatus: true,
          modalTitle: "Error",
          modalText: reply,
        });
      }
    }
  }
  async handleDelete() {
    const reply = await deleteEntries(this.state.checkedItems);
    if (reply) {
      this.handleListDataRender();
    } else {
      this.setState({
        modalError: true,
        checkedItems: [],
        errorText: "Something went Wrong",
      });
    }
  }
  handleSeeAll() {
    this.setState({
      viewMode: CMSVIEWMODES.ALL,
    });
  }
  handleSeeDrafts() {
    this.setState({
      viewMode: CMSVIEWMODES.DRAFTS,
    });
  }
  handleSeePublished() {
    this.setState({
      viewMode: CMSVIEWMODES.PUBLISHED,
    });
  }

  handleCheckbox(checkedItem, checkedStatus) {
    let newCheckedItems = this.state.checkedItems;

    if (checkedStatus) {
      newCheckedItems.push(checkedItem);
    } else {
      const index = newCheckedItems.indexOf(checkedItem);
      newCheckedItems.splice(index, 1);
    }
    this.setState({
      checkedItems: newCheckedItems,
    });
  }

  async handleListDataRender() {
    const headers = await getBlogPostHeaders();
    if (headers.error === "error") {
      this.setState({
        modalError: true,
        checkedItems: [],
        errorText: headers.errorText,
      });
    } else {
      this.setState({
        checkedItems: [],
        postsToShow: headers.body,
      });
    }
  }

  render() {
    return (
      <Fragment>
        <Modal show={this.state.modalStatus}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.modalTitle}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{this.state.modalText}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="container-row">
          <div className="navPane">
            <Button
              className="nav-pane-btn"
              variant="secondary"
              onClick={() => {
                this.toggleView("create");
              }}
            >
              Create
            </Button>

            <Button
              className="nav-pane-btn"
              variant="secondary"
              onClick={() => {
                this.toggleView("display");
              }}
            >
              Display
            </Button>
          </div>
          <div className="tabPane">
            <CmsMainScreenToolBar
              option={this.state.activeTab}
              onSaveEditor={() => this.handleSaveEditor()}
              onClearEditor={() => this.handleClearEditor()}
              onPreviewEditor={() => this.handlePreviewEditor()}
              onPublish={() => this.handlePublish()}
              onUnPublish={() => this.handleUnPublish()}
              onEdit={() => this.handleEdit()}
              onDelete={() => this.handleDelete()}
              onSeeAll={() => this.handleSeeAll()}
              onSeeDrafts={() => this.handleSeeDrafts()}
              onSeePublished={() => this.handleSeePublished()}
            ></CmsMainScreenToolBar>
            {this.state.activeTab === "create" ? (
              <div className="createEntry" id="createEntry">
                <CreatePost
                  onChangeEditor={(value) =>
                    this.handleSaveEditorToState(value)
                  }
                  onChangeTitle={(title) => this.handleSaveTitleToState(title)}
                  title={this.state.postTitle}
                  isEditorToClear={this.state.editorToClear}
                  editorValue={this.state.editor}
                ></CreatePost>
              </div>
            ) : (
              <div className="showEntires" id="showEntires">
                <ViewPosts
                  postHeaders={this.state.postsToShow}
                  viewMode={this.state.viewMode}
                  onSeeAll={() => this.handleSeeAll()}
                  onSeePublished={() => this.handleSeePublished()}
                  onSeeDrafts={() => this.handleSeeDrafts()}
                  onPublish={() => this.handlePublish()}
                  onEdit={() => this.handleEdit()}
                  onDelete={() => this.handleDelete()}
                  onCheckbox={(checkedItem, checkedStatus) =>
                    this.handleCheckbox(checkedItem, checkedStatus)
                  }
                  checkedItems={this.state.checkedItems}
                ></ViewPosts>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}
export default CmsManager;
