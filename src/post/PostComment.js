import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
// onClick={openPostCommentModal}
export default function PostComment() {
  let navigate = useNavigate();
  const { id } = useParams();
  const postId = parseInt(id, 10);

  console.log(postId);
  const [comments, setComments] = useState([]);

  console.log(comments);
  useEffect(() => {
    console.log(postId);
    loadPostComments(postId);
  }, [postId]); // Add postId to the dependency array

  const loadPostComments = async (postId) => {
    try {
      const result = await axios.get(
        `http://localhost:8080/post/${postId}/comments`
      );
      setComments(result.data);
    } catch (error) {
      console.error("Error loading post comments:", error);
    }
  };

  const [openCommentModal, setOpenCommentModal] = useState("modal");

  function addCommentModal() {
    setOpenCommentModal("modal is-active");
  }

  function closePostCommentModal() {
    setOpenCommentModal("modal");
  }

  const [postComment, setPostComment] = useState({
    name: "",
    comment: "",
  });

  const { name, comment } = postComment;

  const onInputChange = (e) => {
    setPostComment({ ...postComment, [e.target.name]: e.target.value });
  };

  const postCommentSubmit = async (e) => {
    e.preventDefault();
    console.log("lineno 41" + postId + " " + typeof postId);
    console.log(postComment);
    const result = await axios.post(
      `http://localhost:8080/post/${postId}/comments`,
      postComment
    );
    closePostCommentModal();
    setPostComment({
      name: "",
      comment: "",
    });
    navigate(`/post/${id}/comments`);
  };

  return (
    <div style={{ height: "100vh" }} className="container">
      <div className="mt-3 mb-4">
        <Link
          className="button is-info is-size-5 mr-3 "
          onClick={addCommentModal}
        >
          Add Comment
        </Link>

        <Link
          className="button is-primary is-outlined is-link is-size-5 mr-3 "
          to="/post"
        >
          Post Page
        </Link>
        <Link
          className="button is-primary is-outlined is-link is-size-5 "
          to="/"
        >
          Main Page
        </Link>
      </div>

      {/*Form for post the comments */}

      <div className={openCommentModal}>
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Add Comment</p>
            <button
              class="delete"
              aria-label="close"
              onClick={closePostCommentModal}
            ></button>
          </header>
          {/* form body */}
          <form>
            <section class="modal-card-body">
              <div class="field">
                <label class="label">Name</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Comment</label>
                <div class="control">
                  <textarea
                    class="textarea is-primary"
                    type="text"
                    placeholder="Comment"
                    name="comment"
                    value={comment}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
            </section>
            <footer class="modal-card-foot">
              <button
                type="submit"
                onClick={(e) => postCommentSubmit(e)}
                class="button is-success"
              >
                Save
              </button>
              <button
                class="button is-link is-light"
                onClick={(e) => {
                  e.preventDefault();
                  closePostCommentModal();
                }}
              >
                Cancel
              </button>
            </footer>
          </form>
        </div>
      </div>

      {/* table to show the comments  */}

      <div className="columns">
        <div className="column is-three-fifths">
          <div style={{ height: "60vh" }} className="box">
            <div className="">
              <p className="is-size-4 has-text-weight-bold">Title: </p>
              {comments.map((i) => (
                <div className="box">
                  <div className="columns">
                    <div className="column is-half">
                      <p>
                        <i class="fa-regular fa-user is-size-5 mr-2"></i>
                        <span className="is-size-5 has-text-weight-bold">
                          User: {i.name}
                        </span>
                      </p>
                    </div>

                    <div className="column auto ">
                      <p className="is-size-5 has-text-weight-bold">Comment:</p>
                      <p>{i.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="column auto"></div>
      </div>
    </div>
  );
}
