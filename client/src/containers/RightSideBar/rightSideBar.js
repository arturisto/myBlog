import { Component, Fragment } from "react";
import "./rightSideBar.scss";
import SubscribeOnBlog from "../../components/forms/subscribeOnBlog";
import RecentPosts from "../../components/recentPosts/recentPostsSideBar";
import { subscribe, getLatestBlogs } from "../../actions/blogActions";
class RightSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: 0,
      subscribeView: true,
      subscribeSubmitError: false,
      recentPosts: [],
    };

    this.handleSubscribe = this.handleSubscribe.bind(this);
  }

  async handleSubscribe(event) {
    event.preventDefault();
    console.log("subscribed!", event.target.elements.email.value);
    const email = event.target.elements.email.value;
    const reply = await subscribe(email);
    console.log(reply);
    if (reply.status === 200) {
      this.setState({
        subscribeView: false,
      });
    } else {
      this.setState({
        subscribeView: false,
        subscribeSubmitError: true,
      });
    }
  }

  async componentDidMount() {
    const recentPosts = await getLatestBlogs();
    this.state.recentPosts = recentPosts;
  }
  render() {
    return (
      <div className="rightSideBar">
        <SubscribeOnBlog
          onSubscribe={this.handleSubscribe}
          view={this.state.subscribeView}
          isError={this.state.subscribeSubmitError}
        />
        <RecentPosts posts={this.state.recentPosts} />
        <div> ads</div>
      </div>
    );
  }
}
export default RightSideBar;
