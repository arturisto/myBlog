import React, { useState } from "react";
import "./cmsComponent.scss";
import Editor from "../../components/editor/editor";
import { saveBlog, uploadImageToServer } from "../../actions/userActions";
import Table from "react-bootstrap/Table";

export default function ViewPosts(headers) {
  const postHeaders = headers.postHeaders;
  console.log(headers.postHeaders);
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
                <td>-</td>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.published ? "published" : "not published"}</td>
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
