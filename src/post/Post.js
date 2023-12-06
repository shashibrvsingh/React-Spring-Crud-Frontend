import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [openAddModal, setOpenAddModal] = useState("modal");
  const [openModal, setOpenModal] = useState("modal");
  const [openPostViewModal, setOpenPostViewModal] = useState("modal");
  const [openDeleteModal, setOpenDeleteModal] = useState("modal");

  //  function for to add post
  function openAddPostModal() {
    setOpenAddModal("modal is-active");
  }

  function closePostModal() {
    setOpenAddModal("modal");
    setPost({
      name: "",
      title: "",
      description: "",
      author: "",
    });
  }

  function closeUpdatePostModal() {
    setOpenModal("modal");

    setUpdatePost({
      name: "",
      title: "",
      description: "",
      author: "",
    });
  }

  // ************************

  // function for post viewing

  const [viewPost, setViewPost] = useState({
    name: "",
    title: "",
    description: "",
    author: "",
  });
  function addPostViewModal(id) {
    loadSinglePost(id);

    setOpenPostViewModal("modal is-active");
  }

  function closePostViewModal() {
    setOpenPostViewModal("modal");
  }

  const loadSinglePost = async (id) => {
    console.log(id);
    const result = await axios.get(`http://localhost:8080/post/${id}`);
    setViewPost(result.data);
  };
  // *************************************

  // for the update the form

  const [updatePost, setUpdatePost] = useState({
    name: "",
    title: "",
    description: "",
    author: "",
  });
  const getSinglePost = async (id) => {
    console.log(id);
    const result = await axios.get(`http://localhost:8080/post/${id}`);
    setUpdatePost(result.data);
  };

  function updatePostModal(id) {
    getSinglePost(id);
    setOpenModal("modal is-active");
  }

  const onUpdateSubmit = async (e, id) => {
    e.preventDefault();
    console.log(updatePost);

    await axios.post(`http://localhost:8080/post/update/${id}`, updatePost);
    setUpdatePost({
      name: "",
      title: "",
      description: "",
      author: "",
    });
    closeUpdatePostModal();
    loadPosts();
    navigate("/post");
  };

  // const { updateName, updateTitle, updateDescription, updateAuthor } =
  //   updatePost;
  const onInputUpdate = (e) => {
    setUpdatePost({ ...updatePost, [e.target.name]: e.target.value });
  };
  // ********************************************************************
  // for add post form
  let navigate = useNavigate();
  const [post, setPost] = useState({
    name: "",
    title: "",
    description: "",
    author: "",
  });

  console.log("line no 115 " + posts);
  // const { name, title, description, author } = post;

  const onInputChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const onPostSubmit = async (e) => {
    console.log("second");
    console.log("line no 117 " + post);
    e.preventDefault();
    await axios.post("http://localhost:8080/post", post);
    setPost({
      name: "",
      title: "",
      description: "",
      author: "",
    });
    closePostModal();
    loadPosts();
    navigate("/post");
  };

  // const { id } = useParams();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const result = await axios.get("http://localhost:8080/posts");
    setPosts(result.data);
  };

  const [deletePostId, setDeletePostId] = useState();

  // for delete the form
  function deletePostModal(id) {
    setOpenDeleteModal("modal is-active");
    setDeletePostId(id);
  }

  function closeDeleteModal() {
    setOpenDeleteModal("modal");
  }

  async function deletePost() {
    await axios.delete(`http://localhost:8080/post/delete/${deletePostId}`);
    closeDeleteModal();
    loadPosts();
  }

  return (
    <div style={{ height: "150vh" }} className="container">
      {/* navigation */}
      <div className="mt-6 mb-4">
        <Link
          className="button is-info is-size-5 mr-3 "
          onClick={openAddPostModal}
        >
          Add Post
        </Link>

        <Link
          className="button is-primary is-outlined is-link is-size-5 "
          to="/"
        >
          Main Page
        </Link>
      </div>

      {/* Add form */}
      <div className={openAddModal}>
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Post Form</p>
            <button
              class="delete"
              aria-label="close"
              onClick={closePostModal}
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
                    value={post.name}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Title</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={post.title}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Description</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={post.description}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Author</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Author"
                    name="author"
                    value={post.author}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
            </section>
            <footer class="modal-card-foot">
              <button
                type="submit"
                onClick={(e) => onPostSubmit(e)}
                class="button is-success"
              >
                Save
              </button>
              <button
                class="button is-link is-light"
                onClick={(e) => {
                  e.preventDefault();
                  closePostModal();
                }}
              >
                Cancel
              </button>
            </footer>
          </form>
        </div>
      </div>

      {/* update form */}
      <div className={openModal}>
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Update Form</p>
            <button
              class="delete"
              aria-label="close"
              onClick={closeUpdatePostModal}
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
                    value={updatePost.name}
                    onChange={(e) => onInputUpdate(e)}
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Title</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={updatePost.title}
                    onChange={(e) => onInputUpdate(e)}
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Description</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Description"
                    name="description"
                    value={updatePost.description}
                    onChange={(e) => onInputUpdate(e)}
                  />
                </div>
              </div>

              <div class="field">
                <label class="label">Author</label>
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Author"
                    name="author"
                    value={updatePost.author}
                    onChange={(e) => onInputUpdate(e)}
                  />
                </div>
              </div>
            </section>
            <footer class="modal-card-foot">
              <button
                type="submit"
                onClick={(e) => {
                  onUpdateSubmit(e, updatePost.id);
                }}
                class="button is-success"
              >
                Save
              </button>
              <button
                class="button is-link is-light"
                onClick={(e) => {
                  e.preventDefault();
                  closeUpdatePostModal();
                }}
              >
                Cancel
              </button>
            </footer>
          </form>
        </div>
      </div>

      {/* delete form */}

      <div className={openDeleteModal}>
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Delete Post</p>
            <button
              class="delete"
              aria-label="close"
              onClick={closeDeleteModal}
            ></button>
          </header>
          <section class="modal-card-body">
            <p className="is-size-4">Are You Sure To Delete The Post</p>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success" onClick={deletePost}>
              Yes
            </button>
            <button class="button" onClick={closeDeleteModal}>
              No
            </button>
          </footer>
        </div>
      </div>

      {/* view Post form */}

      <div className={openPostViewModal}>
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">View Post</p>
            <button
              class="delete"
              aria-label="close"
              onClick={closePostViewModal}
            ></button>
          </header>
          <section class="modal-card-body">
            <div className="is-size-4">
              <p>Name : {viewPost.name}</p>
              <p>Title : {viewPost.title}</p>
              <p>Description : {viewPost.description}</p>
              <p>Author : {viewPost.author}</p>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button" onClick={closePostViewModal}>
              Cancel
            </button>
          </footer>
        </div>
      </div>

      {/* table */}
      <div className="is-flex mt-5">
        <table className="table is-bordered is-striped is-narrow is-hoverable ">
          <thead>
            <tr>
              <th className="is-size-4">Id</th>
              <th className="is-size-4">Name</th>
              <th className="is-size-4">Title</th>
              <th className="is-size-4">Description</th>
              <th className="is-size-4">Author</th>
              <th className="is-size-4">Comments No</th>
              <th className="is-flex  is-justify-content-center is-size-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr className="is-size-5">
                <td>{post.id}</td>
                <td>{post.name}</td>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td>{post.author}</td>
                <td>{post.comments.length}</td>
                <td>
                  <button
                    className="button is-success is-size-5 mr-3 "
                    onClick={() => addPostViewModal(post.id)}
                  >
                    View
                  </button>

                  <button
                    className="button is-warning is-size-5 mr-3 "
                    onClick={() => updatePostModal(post.id)}
                  >
                    Update
                  </button>

                  <button
                    className="button is-danger is-size-5 mr-3 "
                    onClick={() => deletePostModal(post.id)}
                  >
                    Delete
                  </button>
                  <Link
                    className="button is-info is-size-5 "
                    to={`/post/${post.id}/comments`}
                  >
                    View Comments
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
