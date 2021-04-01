import React from "react";
//bootstrap items
import Table from "react-bootstrap/Table";
//style
import "./cmsComponent.scss";
//utilites

export default function ViewPosts(props) {
  const tags = props.tagsToShow;
  const checkedItems = props.checkedTags;
  const handleChange = (event) => {
    const item = event.target;
    props.onTagsCheckbox(item.name, item.checked);
  };
  return (
    <div className="w-75 m-auto">
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Tag Name</th>
          </tr>
        </thead>
        <tbody>
          {tags.map(function (item, i) {
            return (
              <tr key={i} value={item.id}>
                <td>
                  <input
                    type="checkbox"
                    name={item.id}
                    onChange={handleChange}
                    checked={
                      checkedItems.includes(item.id.toString()) ? true : false
                    }
                  ></input>
                </td>
                <td>{item.id}</td>
                <td>{item.name}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
