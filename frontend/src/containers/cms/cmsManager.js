import React, { Fragment, Component } from "react";
//containers
import CreatePost from "./createPost";
import ViewPosts from "./viewPosts";
import Preview from "./preview";
//components
import CmsMainScreenToolBar from "../../components/cmsManagerNav/cmsMainScreenToolBar";
import Modal from "../../components/modals/Modal";
//boostrap items
import Button from "react-bootstrap/Button";

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
import { CMSVIEWMODES, CMSTABS } from "../../utils/enums";

class CmsManager extends Component {
  constructor(props) {
    super(props);
    //state
    this.state = {
      activeTab: CMSTABS.CREATE,
      postsToShow: [],
      editor: "",
      postTitle: "",
      editorToClear: false,
      checkedItems: [],
      viewMode: CMSVIEWMODES.ALL,
      isEdit: false,
      entryEditId: "",
      modalStatus: false,
      modalType: "",
      modalTitle: "",
      modalText: "",
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
    this.handleCreateNewEntry = this.handleCreateNewEntry.bind(this);

    //Display Tab Binds
    this.handlePublish = this.handlePublish.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSeeAll = this.handleSeeAll.bind(this);
    this.handleSeeDrafts = this.handleSeeDrafts.bind(this);
    this.handleSeePublished = this.handleSeePublished.bind(this);
    this.handleUnPublish = this.handleUnPublish.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    //modal binds
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleDeny = this.handleDeny.bind(this);
    this.closeModal = this.closeModal.bind(this);
    //refs
    this.tagsInput = React.createRef();
  }

  async toggleView(pane) {
    const headers = await getBlogPostHeaders();
    console.log(headers);
    if (headers.error === "error") {
      this.setState({
        activeTab: pane,
        modalStatus: true,
        modalTitle: "Error",
        modalText: "Server error",
        modalType: "error",
      });
    } else {
      this.setState({
        activeTab: pane,
        postsToShow: headers.body,
      });
    }
  }
  handleCreateNewEntry() {
    this.tagsInput.current.value = "food";
    this.setState({
      editor: "",
      postTitle: "",
      editorToClear: true,
      checkedItems: [],
      isEdit: false,
      entryEditId: "",
    });
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
    const tags = this.tagsInput.current.value;

    const arrayTags =
      tags.length >= 1
        ? tags.split(",").map(function (tag) {
            return tag.trim();
          })
        : "";
    let response;
    if (this.state.isEdit) {
      response = await updateBlog(
        this.state.editor,
        this.state.postTitle,
        this.state.entryEditId,
        arrayTags
      );
    } else {
      response = await saveBlog(
        this.state.editor,
        this.state.postTitle,
        arrayTags
      );
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
    this.tagsInput.current.value = "food";
    this.setState({
      editorToClear: true,
      postTitle: "",
    });
  }
  handlePreviewEditor() {
    this.setState({
      activeTab:
        this.state.activeTab === CMSTABS.CREATE
          ? CMSTABS.PREVIEW
          : CMSTABS.CREATE,
    });
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
        modalType: "error",
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
        modalType: "error",
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
        modalType: "error",
      });
    } else if (length > 1) {
      this.setState({
        modalStatus: true,
        modalTitle: "Wrong Selection",
        modalText: "Please choose only one item",
        modalType: "error",
      });
    } else {
      const reply = await getSingleBlogEntry(id);
      if (reply.hasOwnProperty("msg")) {
        this.setState({
          postTitle: reply.body.title,
          editor: reply.body.content,
          activeTab: CMSTABS.CREATE,
          isEdit: true,
          entryEditId: id,
        });

        const tagsToDisplay = reply.body.tags.join(", ");
        this.tagsInput.current.value = tagsToDisplay;
      } else {
        this.setState({
          modalStatus: true,
          modalTitle: "Error",
          modalText: reply,
          modalType: "error",
        });
      }
    }
  }
  handleDelete() {
    this.setState({
      modalStatus: true,
      modalType: "delete",
      modalTitle: "Confirm Deletion",
      modalText: "Are you sure you want to delete?",
    });
  }
  handleConfirm(type) {
    switch (type) {
      case "delete":
        this.performDelete();
        break;
      default:
        this.handleDeny();
        break;
    }
  }
  async performDelete() {
    const reply = await deleteEntries(this.state.checkedItems);
    if (reply) {
      this.closeModal();
      this.handleListDataRender();
    } else {
      this.setState({
        modalStatus: true,
        modalType: "error",
        modalTitle: "error",
        checkedItems: [],
        modalText: "Something went Wrong",
      });
    }
  }
  handleDeny() {
    this.closeModal();
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
        modalStatus: true,
        checkedItems: [],
        modalText: headers.errorText,
      });
    } else {
      this.setState({
        checkedItems: [],
        postsToShow: headers.body,
      });
    }
  }

  closeModal() {
    this.setState({
      modalStatus: false,
      modalType: "",
      modalTitle: "",
      modalText: "",
    });
  }
  render() {
    return (
      <Fragment>
        <Modal
          showStatus={this.state.modalStatus}
          modalTitle={this.state.modalTitle}
          modalText={this.state.modalText}
          modalType={this.state.modalType}
          onConfirm={(type) => this.handleConfirm(type)}
          onDeny={() => this.handleDeny()}
        ></Modal>
        <div className="container-row">
          <div className="nav-pane">
            <Button
              className="nav-pane-btn"
              variant="secondary"
              onClick={() => {
                this.toggleView(CMSTABS.CREATE);
              }}
            >
              Create
            </Button>

            <Button
              className="nav-pane-btn"
              variant="secondary"
              onClick={() => {
                this.toggleView(CMSTABS.DISPLAY);
              }}
            >
              Display
            </Button>
          </div>
          <div className="tab-pane">
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
              onCreateNewEntry={() => this.handleCreateNewEntry()}
            ></CmsMainScreenToolBar>

            {this.state.activeTab === CMSTABS.CREATE ? (
              <div id={CMSTABS.CREATE}>
                <CreatePost
                  onChangeEditor={(value) =>
                    this.handleSaveEditorToState(value)
                  }
                  onChangeTitle={(title) => this.handleSaveTitleToState(title)}
                  title={this.state.postTitle}
                  isEditorToClear={this.state.editorToClear}
                  editorValue={this.state.editor}
                ></CreatePost>
                <div className="tags-wrapper m-auto p-3 w-75">
                  <label htmlFor="tags" className="mr-3">
                    <strong>Tags:</strong>
                  </label>
                  <input
                    ref={this.tagsInput}
                    type="text"
                    key="tags"
                    id="tags"
                    className="w-100"
                    defaultValue="food"
                  ></input>
                </div>
              </div>
            ) : (
              ""
            )}

            {this.state.activeTab === CMSTABS.DISPLAY ? (
              <div id={CMSTABS.DISPLAY}>
                {this.state.postsToShow.length >= 0 ? (
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
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            {this.state.activeTab === CMSTABS.PREVIEW ? (
              <Preview
                blogData={this.state.editor}
                blogTitle={this.state.postTitle}
              ></Preview>
            ) : (
              ""
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}
export default CmsManager;
