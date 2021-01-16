import React, { Fragment, Component } from "react";
//containers
import CreatePost from "./createPost";
import ViewPosts from "./viewPosts";
//components
import CmsMainScreenToolBar from "../../components/cmsManagerNav/cmsMainScreenToolBar";

//boostrap items
import Button from "react-bootstrap/Button";
//styles
import "./cmsComponent.scss";
//actions
import { getBlogPostHeaders,saveBlog } from "../../actions/userActions";

class CmsManager extends Component {
  constructor(props) {
    super(props);
    //state
    this.state = {
      activeTab: "create",
      postsToShow: [],
      modalError: false,
      errorText: "",
      editor: "",
      postTitle: "",
    };
    //binds
    this.toggleView = this.toggleView.bind(this);
    this.handleSaveEditorToState = this.handleSaveEditorToState.bind(this);
    this.handleSaveEditor = this.handleSaveEditor.bind(this);
    this.handleSaveTitleToState = this.handleSaveTitleToState.bind(this);
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

  handleSaveTitleToState(title) {
    this.setState({
        postTitle: title,
    });
  }
  handleSaveEditorToState(value) {
    this.setState({
      editor: value,
    });
  }

  handleSaveEditor() {
    saveBlog(this.state.editor, this.state.postTitle)
  }

  render() {
    return (
      <Fragment>
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
            ></CmsMainScreenToolBar>
            {this.state.activeTab === "create" ? (
              <div className="createEntry" id="createEntry">
                <CreatePost
                  onChangeEditor={(value) =>
                    this.handleSaveEditorToState(value)
                  }
                  onChangeTitle={(value)=>this.handleSaveTitleToState(value)}
                  title={this.state.postTitle}
                ></CreatePost>
              </div>
            ) : (
              <div className="showEntires" id="showEntires">
                <ViewPosts postHeaders={this.state.postsToShow}></ViewPosts>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}
export default CmsManager;
