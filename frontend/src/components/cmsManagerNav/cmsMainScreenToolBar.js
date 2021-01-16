import React, { Fragment, Component } from "react";

//styles
import "./cmsToolBar.scss";

//boostrap items
import Button from "react-bootstrap/Button";

export default function cmsToolBar(props) {
  const activePane = props.option;
  const createButtonsOptions = [
    { size: "sm", name: "Save", onclick:props.onSaveEditor},
    { size: "sm", name: "Preview", onclick:props.onSaveEditor},
    { size: "sm", name: "Clear Editor", onclick:props.onSaveEditor},
  ];

  const displayButtonsOptions = [
    { size: "sm", name: "Publish" },
    { size: "sm", name: "Edit" },
    { size: "sm", name: "Delete" },
    { size: "sm", name: "See All" },
    { size: "sm", name: "See Drafts" },
    { size: "sm", name: "See Published" },
  ];
  return (
    <div className="toolbarWrapper">
      {activePane === "create" ? (
        <>
          {createButtonsOptions.map(function (item, i) {
            return (
              <Button key={"btn" + item.name} size={item.size} className="m-1" onClick={() => item.onclick()}>
                {item.name}
              </Button>
            );
          })}
        </>
      ) : activePane === "display" ? (
        <>
          {displayButtonsOptions.map(function (item, i) {
            return (
              <Button key={"btn" + item.name} size={item.size} className="m-1">
                {item.name}
              </Button>
            );
          })}
        </>
      ) : (
        //edit pane
        <></>
      )}
    </div>
  );
}
