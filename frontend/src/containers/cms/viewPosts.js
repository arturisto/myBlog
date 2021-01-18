import React, { useState } from "react";
//bootstrap items
import Table from "react-bootstrap/Table";
//style
import "./cmsComponent.scss";
//utilites
import { CMSVIEWMODES } from "../../utils/enums";

const filterPosts = (posts, viewMode) => {
  let filtered = [];
  switch (viewMode) {
    case CMSVIEWMODES.PUBLISHED:
      posts.forEach((post) => (post.published ? filtered.push(post) : ""));
      break;
    case CMSVIEWMODES.DRAFTS:
      posts.forEach((post) => (post.published ? "" : filtered.push(post)));
      break;
    default:
      return posts;
  }
  return filtered;
};

export default function ViewPosts(props) {
  const postHeaders = filterPosts(props.postHeaders, props.viewMode);
  const checkedItems = props.checkedItems;
  const handleChange = (event) => {
    const item = event.target;
    props.onCheckbox(item.name, item.checked);
  };
  return (
    <div className="w-75 m-auto">
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>id</th>
            <th>Title</th>
            <th>Published</th>
            <th>Published At</th>
            <th>Created At</th>
            <th>updated At</th>
            <th>summary</th>
          </tr>
        </thead>
        <tbody>
          {postHeaders.map(function (item, i) {
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
                <td>{item.title}</td>
                <td>{item.published ? "Published" : "Not Published"}</td>
                <td>{item.publichedAt}</td>
                <td>{item.createdAt}</td>
                <td>{item.updatedAt}</td>
                <td>{item.summary}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
