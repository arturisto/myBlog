import React from "react";

//styles
import "./cmsToolBar.scss";

//boostrap items
import Button from "react-bootstrap/Button";

export default function cmsToolBar(props) {
  const activePane = props.option;
  const toggleBackPreviewButtonName =
    activePane === "create" ? "Preivew" : "Back";
  const createButtonsOptions = [
    { size: "sm", name: "Save", onclick: props.onSaveEditor },
    {
      size: "sm",
      name: toggleBackPreviewButtonName,
      onclick: props.onPreviewEditor,
    },
    { size: "sm", name: "Clear Editor", onclick: props.onClearEditor },
    { size: "sm", name: "New Entry", onclick: props.onCreateNewEntry },
  ];

  const displayButtonsOptions = [
    { size: "sm", name: "See All", onclick: props.onSeeAll },
    { size: "sm", name: "See Drafts", onclick: props.onSeeDrafts },
    { size: "sm", name: "See Published", onclick: props.onSeePublished },
    { size: "sm", name: "Publish", onclick: props.onPublish },
    { size: "sm", name: "Edit", onclick: props.onEdit },
    { size: "sm", name: "Delete", onclick: props.onDelete },
    { size: "sm", name: "Unpublish", onclick: props.onUnPublish },
  ];

  return (
    <div className="toolbarWrapper">
      {activePane === "create" || activePane === "preview" ? (
        <>
          {createButtonsOptions.map(function (item, i) {
            return (
              <Button
                key={"btn" + item.name}
                size={item.size}
                className="m-1"
                onClick={() => item.onclick()}
              >
                {item.name}
              </Button>
            );
          })}
        </>
      ) : activePane === "display" ? (
        <>
          {displayButtonsOptions.map(function (item, i) {
            return (
              <Button
                key={"btn" + item.name}
                size={item.size}
                className="m-1"
                onClick={() => item.onclick()}
              >
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
