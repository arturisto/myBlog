(this["webpackJsonpmr-mrs-app"]=this["webpackJsonpmr-mrs-app"]||[]).push([[12],{214:function(t,e,r){},215:function(t,e,r){},216:function(t,e,r){},217:function(t,e,r){},341:function(t,e,r){"use strict";r.r(e);var n=r(54),a=r.n(n),c=r(55),s=r(61),i=r(62),o=r(66),u=r(65),l=r(1),b=r(0),d=r.n(b),p=r(67),j=(r(214),r(123)),h=r(58);function v(t){console.log(t);var e=t.onSubscribe,r=t.view,n=t.isError;return Object(l.jsx)(l.Fragment,{children:r?Object(l.jsxs)(j.a,{className:"w-75 m-auto",onSubmit:function(t){return e(t)},children:[Object(l.jsx)("h6",{children:"?\u05e8\u05d5\u05e6\u05d4 \u05dc\u05e7\u05d1\u05dc \u05e2\u05d3\u05db\u05d5\u05e0\u05d9\u05dd \u05dc\u05e4\u05e0\u05d9 \u05db\u05d5\u05dc\u05dd"}),Object(l.jsx)("p",{}),Object(l.jsxs)(j.a.Group,{controlId:"formBasicEmail",children:[Object(l.jsx)(j.a.Label,{children:"\u05d4\u05e8\u05e9\u05dd \u05db\u05d0\u05df \u05d5\u05e7\u05d1\u05dc \u05e2\u05d3\u05db\u05d5\u05e0\u05d9\u05dd \u05d9\u05e9\u05d9\u05e8\u05d5\u05ea \u05dc\u05de\u05d9\u05d9\u05dc \u05d1\u05e8\u05d2\u05e2 \u05e9\u05de\u05e9\u05d4\u05d5 \u05d8\u05e2\u05d9\u05dd \u05de\u05ea\u05e4\u05e8\u05e1\u05dd"}),Object(l.jsx)(j.a.Control,{type:"email",placeholder:"Enter email",name:"email"})]}),Object(l.jsx)(h.a,{variant:"primary",type:"submit",children:"\u05d4\u05e8\u05e9\u05dd"})]}):n?Object(l.jsx)("div",{children:"\u05d0\u05d5\u05e4\u05e1! \u05d4\u05d9\u05d9\u05ea\u05d4 \u05e9\u05d2\u05d9\u05e2\u05d4, \u05ea\u05e0\u05e1\u05d5 \u05d9\u05d5\u05ea\u05e8 \u05de\u05d0\u05d5\u05d7\u05e8"}):Object(l.jsx)("div",{children:"\u05ea\u05d5\u05d3\u05d4, \u05e0\u05d4\u05d9\u05d4 \u05d1\u05e7\u05e9\u05e8 :)"})})}r(215);var O=r(56);var f=function(t){var e=t.data;console.log(e);var r=Object(O.a)(e.id)+"blogpage/"+e.id;return Object(l.jsx)("div",{className:"recent-posts",children:Object(l.jsx)("div",{className:"card mb-3",children:Object(l.jsxs)("div",{className:"row no-gutters",children:[Object(l.jsx)("div",{className:"col-md-4",children:Object(l.jsx)("img",{src:e.previewImageUrl,className:"card-img",alt:"..."})}),Object(l.jsxs)("div",{className:"col-md-8 pr-2 pt-3 d-flex flex-column justify-content-around ",children:[Object(l.jsx)("div",{children:Object(l.jsx)("div",{className:"recent-post-title",children:Object(l.jsx)("a",{href:r,alt:"blog post "+e.title,children:e.title})})}),Object(l.jsxs)("div",{className:"card-bottom published-at ",children:["Published ",e.publishedAt]})]})]})})})};var m=function(t){var e=t.posts;return Object(l.jsx)("div",{className:"recent-posts",children:e.map((function(t,e){return Object(l.jsx)(f,{data:t},e)}))})},x=r(72),g=function(t){Object(o.a)(r,t);var e=Object(u.a)(r);function r(t){var n;return Object(s.a)(this,r),(n=e.call(this,t)).state={state:0,subscribeView:!0,subscribeSubmitError:!1,recentPosts:[]},n.handleSubscribe=n.handleSubscribe.bind(Object(p.a)(n)),n}return Object(i.a)(r,[{key:"handleSubscribe",value:function(){var t=Object(c.a)(a.a.mark((function t(e){var r,n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.preventDefault(),console.log("subscribed!",e.target.elements.email.value),r=e.target.elements.email.value,t.next=5,Object(x.d)(r);case 5:n=t.sent,console.log(n),200===n.status?this.setState({subscribeView:!1}):this.setState({subscribeView:!1,subscribeSubmitError:!0});case 8:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var t=Object(c.a)(a.a.mark((function t(){var e;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(x.b)();case 2:e=t.sent,this.state.recentPosts=e;case 4:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){return Object(l.jsxs)("div",{className:"rightSideBar",children:[Object(l.jsx)(v,{onSubscribe:this.handleSubscribe,view:this.state.subscribeView,isError:this.state.subscribeSubmitError}),Object(l.jsx)(m,{posts:this.state.recentPosts}),Object(l.jsx)("div",{children:" ads"})]})}}]),r}(b.Component),E=r(26),S=r(143),_=r(3),y=r(8),w=r(52),N=r.n(w),P=r(53),T=["xl","lg","md","sm","xs"],D=d.a.forwardRef((function(t,e){var r=t.bsPrefix,n=t.className,a=t.noGutters,c=t.as,s=void 0===c?"div":c,i=Object(y.a)(t,["bsPrefix","className","noGutters","as"]),o=Object(P.a)(r,"row"),u=o+"-cols",l=[];return T.forEach((function(t){var e,r=i[t];delete i[t];var n="xs"!==t?"-"+t:"";null!=(e=null!=r&&"object"===typeof r?r.cols:r)&&l.push(""+u+n+"-"+e)})),d.a.createElement(s,Object(_.a)({ref:e},i,{className:N.a.apply(void 0,[n,o,a&&"no-gutters"].concat(l))}))}));D.displayName="Row",D.defaultProps={noGutters:!1};var R=D,C=(r(216),r(217),r(110));function A(t){var e=t.blogData?Object(C.a)(t.blogData.content):"",r=t.blogData?Object(C.a)(t.blogData.title):"";return Object(l.jsxs)("div",{className:"mt-3 ml-5 mr-5 blog-fragment ",children:[Object(l.jsx)("h2",{children:Object(l.jsx)("i",{children:r})}),e]})}var k=function(t){Object(o.a)(r,t);var e=Object(u.a)(r);function r(t){var n;return Object(s.a)(this,r),(n=e.call(this,t)).state={blogData:!1,isPreview:!1,isLoading:!0},n}return Object(i.a)(r,[{key:"componentDidMount",value:function(){var t=Object(c.a)(a.a.mark((function t(){var e,r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=this.props.match.params.id,t.next=3,Object(x.c)(e);case 3:r=t.sent,console.log(r.body),this.setState({blogData:r.body,isLoading:!1});case 6:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){return Object(l.jsx)(b.Fragment,{children:Object(l.jsxs)(R,{className:"blogPageMain",children:[Object(l.jsx)(S.a,{lg:8,children:this.state.isLoading?Object(l.jsx)(E.a,{}):Object(l.jsx)(A,{blogData:this.state.blogData})}),Object(l.jsx)(S.a,{lg:3,children:Object(l.jsx)(g,{})})]})})}}]),r}(b.Component);e.default=k},56:function(t,e,r){"use strict";r.d(e,"a",(function(){return n})),r.d(e,"b",(function(){return a}));var n=function(){return"dev"===Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_DEV_FRONTEND:"http://localhost:3000/",REACT_APP_DEV_SERVER:"http://localhost:5000/"}).REACT_APP_ENV?"http://localhost:3000/":Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_DEV_FRONTEND:"http://localhost:3000/",REACT_APP_DEV_SERVER:"http://localhost:5000/"}).REACT_APP_PROD_FRONTEND},a=function(){return window.location.origin}},72:function(t,e,r){"use strict";r.d(e,"b",(function(){return u})),r.d(e,"a",(function(){return l})),r.d(e,"c",(function(){return b})),r.d(e,"d",(function(){return d}));var n=r(54),a=r.n(n),c=r(55),s=r(63),i=r.n(s),o=r(56),u=function(){var t=Object(c.a)(a.a.mark((function t(){var e,r,n,c,s;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=Object(o.b)(),r=e+"/blog/getlatest",n={headers:{"content-type":"application/json"}},t.prev=3,t.next=6,i.a.get(r,n);case 6:return c=t.sent,s=c.data.posts,t.abrupt("return",s);case 11:return t.prev=11,t.t0=t.catch(3),console.log(t.t0),t.abrupt("return",!1);case 15:case"end":return t.stop()}}),t,null,[[3,11]])})));return function(){return t.apply(this,arguments)}}(),l=function(){var t=Object(c.a)(a.a.mark((function t(e,r,n){var c,s,u,l,b;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c=Object(o.b)(),s=c+"/blog/getEntriesByType",u={headers:{"content-type":"application/json"},body:{entryType:e,pageNumber:r,tags:n}},t.prev=3,t.next=6,i.a.post(s,u);case 6:return l=t.sent,b=l.data,t.abrupt("return",b);case 11:return t.prev=11,t.t0=t.catch(3),console.log(t.t0),t.abrupt("return",!1);case 15:case"end":return t.stop()}}),t,null,[[3,11]])})));return function(e,r,n){return t.apply(this,arguments)}}(),b=function(){var t=Object(c.a)(a.a.mark((function t(e){var r,n,c,s;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r=Object(o.b)(),n=r+"/blog/getnewentry?blogId="+e,t.next=5,fetch(n,{method:"GET",headers:{"Content-Type":"application/json","x-access-token":localStorage.getItem("token")}});case 5:return c=t.sent,t.next=8,c.json();case 8:return s=t.sent,t.abrupt("return",s);case 12:return t.prev=12,t.t0=t.catch(0),t.abrupt("return",t.t0);case 15:case"end":return t.stop()}}),t,null,[[0,12]])})));return function(e){return t.apply(this,arguments)}}(),d=function(){var t=Object(c.a)(a.a.mark((function t(e){var r,n,c;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,r=Object(o.b)(),n=r+"/blog/subscribe",t.next=5,fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})});case 5:return c=t.sent,t.abrupt("return",c);case 9:return t.prev=9,t.t0=t.catch(0),t.abrupt("return",t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}()}}]);
//# sourceMappingURL=12.b2274db8.chunk.js.map