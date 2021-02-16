import React, { Fragment, Component } from "react";
//containers
import CreatePost from "./createPost";
import ViewPosts from "./viewPosts";
import ViewTags from "./viewTags";
import TagsNavBar from "../../components/tagsNavBar/tagsNavBar";
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
  getAllTags,
  saveNewTag,
  deleteTag,
} from "../../actions/userActions";
//utilites
import { CMSVIEWMODES, CMSTABS } from "../../utils/enums";
import { stringToArray } from "../../utils/helperFunctions";
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
      tags: [],
      checkedTags: [],
      tagMode: "view",
      tagInput: "",
      seoTagsInput: "",
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
    this.handleOnTagClick = this.handleOnTagClick.bind(this);

    //Display Tab Binds
    this.handlePublish = this.handlePublish.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSeeAll = this.handleSeeAll.bind(this);
    this.handleSeeDrafts = this.handleSeeDrafts.bind(this);
    this.handleSeePublished = this.handleSeePublished.bind(this);
    this.handleUnPublish = this.handleUnPublish.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    //tags binds
    this.handleShowAllTags = this.handleShowAllTags.bind(this);
    this.handleCreateNewTag = this.handleCreateNewTag.bind(this);
    this.handleSaveNewTag = this.handleSaveNewTag.bind(this);
    this.handleDeleteTags = this.handleDeleteTags.bind(this);
    this.handleTagsCheckbox = this.handleTagsCheckbox.bind(this);
    this.handleTagEdit = this.handleTagEdit.bind(this);
    this.raiseTagsModal = this.raiseTagsModal.bind(this);
    //modal binds
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleDeny = this.handleDeny.bind(this);
    this.closeModal = this.closeModal.bind(this);
    //refs
    this.tagsInput = React.createRef();
    this.seoTagsInput = React.createRef();
  }

  async componentDidMount() {
    const tags = await getAllTags();
    this.setState({
      tags: tags.body,
      checkedTags: [],
    });
  }

  async toggleView(pane) {
    const headers = await getBlogPostHeaders();
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
    this.seoTagsInput.current.value = "food";
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
    const tags = this.state.checkedTags;
    console.log(tags);
    const seoTags = stringToArray(this.seoTagsInput.current.value);
    let response;
    if (this.state.isEdit) {
      response = await updateBlog(
        this.state.editor,
        this.state.postTitle,
        this.state.entryEditId,
        tags,
        seoTags
      );
    } else {
      response = await saveBlog(
        this.state.editor,
        this.state.postTitle,
        tags,
        seoTags
      );
    }

    if (response === true) {
      this.setState({
        modalStatus: true,
        modalTitle: "Success",
        modalText: "YOu have succeeded",
        editor: "",
        postTitle: "",
        isEdit: false,
        entryEditId: "",
        checkedTags: [],
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
      checkedTags: [],
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
        modalStatus: true,
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
          checkedTags: reply.body.tags,
        });

        const tagsToDisplay = reply.body.seoTags?.join(", ");
        this.seoTagsInput.current.value = tagsToDisplay;
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

  async handleShowAllTags() {
    const tags = await getAllTags();
    console.log(tags);
    this.setState({
      tags: tags.body,
      tagMode: "view",
    });
  }
  handleCreateNewTag() {
    console.log("create");
    this.setState({
      tagMode: "create",
    });
  }
  handleTagEdit(event) {
    this.setState({
      tagInput: event.target.value,
    });
  }
  async handleSaveNewTag() {
    console.log("save");
    const reply = await saveNewTag(this.state.tagInput);
    this.raiseTagsModal(reply, "save");
  }
  handleDeleteTags() {
    console.log("delete");
    const reply = deleteTag(this.state.checkedTags);
    this.raiseTagsModal(reply, "delete");
  }

  raiseTagsModal(reply, text) {
    if (reply) {
      this.setState({
        tagsInput: "",
        modalStatus: true,
        modalTitle: "Success",
        modalText: "Tag is " + text,
        modalType: "error",
      });
    } else {
      this.setState({
        tagsInput: "",
        modalStatus: true,
        modalTitle: "Error",
        modalText: "Error",
        modalType: "success",
      });
    }
  }

  handleTagsCheckbox(checkedTag, checkedStatus) {
    let newCheckedtags = this.state.checkedTags;
    if (checkedStatus) {
      newCheckedtags.push(checkedTag);
    } else {
      const index = newCheckedtags.indexOf(checkedTag);
      newCheckedtags.splice(index, 1);
    }
    this.setState({
      checkedItems: newCheckedtags,
    });
  }
  closeModal() {
    this.setState({
      modalStatus: false,
      modalType: "",
      modalTitle: "",
      modalText: "",
    });
  }

  async handleOnTagClick(tagId) {
    const index = this.state.checkedTags.indexOf(tagId);
    let newArray = [];
    if (index !== -1) {
      //tag was unclicked
      newArray = [...this.state.checkedTags];
      newArray.splice(index, 1);
    } else {
      //tag was clicked
      newArray = [...this.state.checkedTags, tagId];
    }
    this.setState({
      checkedTags: newArray,
    });
  }

  /************************************************* */
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
            <Button
              className="nav-pane-btn"
              variant="secondary"
              onClick={() => {
                this.toggleView(CMSTABS.TAGS_MANAGER);
              }}
            >
              Tags
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
              onShowAllTags={() => this.handleShowAllTags()}
              onSaveTag={() => this.handleSaveNewTag()}
              onDeleteTag={() => this.handleDeleteTags()}
              onCreateNewTag={() => this.handleCreateNewTag()}
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
                  <label htmlFor="seoTags" className="mr-3">
                    <strong>SEO tag:</strong>
                  </label>
                  <input
                    ref={this.seoTagsInput}
                    type="text"
                    key="seoTags"
                    id="seoTags"
                    className="w-100"
                    defaultValue="food"
                  ></input>
                  <TagsNavBar
                    tags={this.state.tags}
                    clickedTags={this.state.checkedTags}
                    onClick={(tagId) => this.handleOnTagClick(tagId)}
                  ></TagsNavBar>
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
            {this.state.activeTab === CMSTABS.TAGS_MANAGER ? (
              <div id={CMSTABS.TAGS_MANAGER}>
                {this.state.tagMode === "view" ? (
                  <ViewTags
                    tagsToShow={this.state.tags}
                    onTagsCheckbox={(checkedTag, checkedStatus) =>
                      this.handleTagsCheckbox(checkedTag, checkedStatus)
                    }
                    checkedTags={this.state.checkedTags}
                  ></ViewTags>
                ) : (
                  <>
                    <span className="pr-3">
                      <strong>Tag Name:</strong>
                    </span>
                    <input
                      type="text"
                      name="entryName"
                      className="w-25"
                      placeholder="enter a tag name"
                      value={this.state.tagInput}
                      onChange={this.handleTagEdit}
                    ></input>
                  </>
                )}
              </div>
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
