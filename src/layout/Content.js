import React from "react";
import { Link } from "react-router-dom";
export default function Content() {
  return (
    <div>
      <div className="container">
        <div className="columns">
          <div style={{ height: "60vh" }} className="column  box mr-6">
            <div class="has-text-centered">
              <Link
                className="button is-link is-outlined pl-5 pr-5 "
                to="/post"
              >
                Add Post
              </Link>
            </div>
          </div>
          <div className="column is-fullheight box ml-6 mb-5">
            <div className="has-text-centered">
              <button class="button is-link is-outlined"> Add Task</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
