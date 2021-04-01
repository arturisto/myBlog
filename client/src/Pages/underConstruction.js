import { Fragment } from "react";
export default function underConstruction() {
  const divStyle = {
    maxHeight: "50%",
    maxWidth: "100%",
  };
  const imgStyle = {
    maxHeight: "50%",
    maxWidth: "50%",
  };
  return (
    <Fragment>
      <div className="col">
        <div style={divStyle}>
          <img
            style={imgStyle}
            src="/maintenance.png"
            alt="under construction"
          />
        </div>
      </div>
    </Fragment>
  );
}
