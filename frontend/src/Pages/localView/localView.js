//*****imports******//
import React, { Fragment, Component } from "react";
import { animateScroll as scroll } from "react-scroll";
//Containers
import NavigationBar from "../../containers/NavBar/navbar";
import LocalViewList from "../../containers/blogLists/localViewList";

//components
import TagsNavBar from "../../components/tagsNavBar/tagsNavBar";
import { Paging as Pagination } from "../../components/pagination/pagination";
import BackToTop from "../../components/buttons/backToTop/backToTop";
import Footer from "../../containers/Footer/Footer";
//Style & Bootstrap
import "./localView.scss";
//utilities
import { PAGINATIONTYPE } from "../../utils/enums";

//actions
import { getAllTags } from "../../actions/userActions";
import { getEntriesByType } from "../../actions/blogActions";
//***** main *****//

class LocalView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      tagsClicked: [],
      entries: [],
      pagination: [],
      currentPage: 1,
      maxPages: 1,
    };
    this.handleOnTagClick = this.handleOnTagClick.bind(this);
    this.handleBackToTop = this.handleBackToTop.bind(this);

    //pagination handlers
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  async componentDidMount() {
    const tags = await getAllTags();

    const data = await getEntriesByType(
      "local",
      this.state.currentPage,
      this.state.tagsClicked
    );
    if (tags && data.entries) {
      this.setState({
        tags: tags.body,
        entries: data.entries,
        maxPages: Math.ceil(data.maxEntries / 5),
      });
    } else {
      console.log("error");
    }
  }

  async handleOnTagClick(tagId) {
    const index = this.state.tagsClicked.indexOf(tagId);
    let newArray = [];
    if (index !== -1) {
      //tag was unclicked
      newArray = [...this.state.tagsClicked];
      newArray.splice(index, 1);
    } else {
      //tag was clicked
      newArray = [...this.state.tagsClicked, tagId];
    }
    const data = await getEntriesByType("local", 1, newArray);
    this.setState({
      tagsClicked: newArray,
      currentPage: 1,
      entries: data.entries,
      maxPages: Math.ceil(data.maxEntries / 5),
    });
  }
  handleBackToTop() {
    scroll.scrollToTop();
  }
  handleFirst() {
    console.log(1);
  }
  async handlePaginationClick(value, type) {
    let newPageNumber = 1;
    switch (type) {
      case PAGINATIONTYPE.NUMBER:
        newPageNumber = value;
        break;
      case PAGINATIONTYPE.FIRST:
        newPageNumber = 1;
        break;
      case PAGINATIONTYPE.NEXT:
        newPageNumber = Math.min(
          this.state.maxPages,
          this.state.currentPage + 1
        );
        break;
      case PAGINATIONTYPE.LAST:
        newPageNumber = this.state.maxPages;
        break;
      case PAGINATIONTYPE.PREV:
        newPageNumber = Math.max(1, this.state.currentPage - 1);
        break;
      case PAGINATIONTYPE.ELLIPSIS:
        newPageNumber =
          this.state.currentPage + 6 > this.state.maxPages
            ? this.state.currentPage + 6
            : this.state.maxPages;
        break;
      default:
        newPageNumber = 1;
    }
    const data = await getEntriesByType(
      "local",
      newPageNumber,
      this.state.tagsClicked
    );
    this.setState({
      entries: data.entries,
      maxPages: Math.ceil(data.maxEntries / 5),
      currentPage: newPageNumber,
    });
  }

  render() {
    return (
      <Fragment>
        {/* <NavigationBar> </NavigationBar> */}
        <div className="localView-main">
          <div className="col pr-0 pl-0 w-75 m-auto h-100">
            <TagsNavBar
              tags={this.state.tags}
              clickedTags={this.state.tagsClicked}
              onClick={(tagId) => this.handleOnTagClick(tagId)}
            />
            <LocalViewList entries={this.state.entries} />
            <div className="pagination m-auto">
              <Pagination
                activeItem={this.state.currentPage}
                maxPages={this.state.maxPages}
                clickFunction={(value, type) =>
                  this.handlePaginationClick(value, type)
                }
              />
            </div>
          </div>

          <BackToTop onBackToTop={() => this.handleBackToTop()} />
        </div>
        {/* <Footer></Footer> */}
      </Fragment>
    );
  }
}

export default LocalView;
