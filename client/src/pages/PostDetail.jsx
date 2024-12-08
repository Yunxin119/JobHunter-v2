import React, { useEffect, useState } from "react";
import { BsHandThumbsUp, BsChatDots, BsTrash } from "react-icons/bs";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
const baseUrl = "http://localhost:5001/api/";
const PostDetail = () => {
  const userInfo = localStorage.getItem("userInfo");
  const currentUser = userInfo && JSON.parse(userInfo);
  const { id } = useParams();
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [data, setData] = useState({});
  const [comment, setComment] = useState("");
  const init = async () => {
    const res = await axios.get(`${baseUrl}posts/post/${id}`);
    if (res.status === 200 && res?.data?.post) {
      setData(res.data.post);
    }
  };
  const likePost = async () => {
    try {
      const res = await axios.post(`${baseUrl}posts/likePost/${id}`, {
        user: userInfo && JSON.parse(userInfo),
      });
      if (res.status === 200) {
        toast.success("success");
        init();
      }
    } catch (error) {
      toast.warning(error.response.data.msg);
    }
  };
  const commentPost = async () => {
    try {
      const res = await axios.post(`${baseUrl}posts/commentPost/${id}`, {
        user: userInfo && JSON.parse(userInfo),
        comment,
      });
      if (res.status === 200) {
        toast.success("success");
        init();
        setComment("");
        setShowCommentModal(false);
      }
    } catch (error) {
      toast.warning(error.response.data.msg);
    }
  };

  // Delete a post
  const deletePost = async () => {
    
  };

  // Delete a comment
  const deleteComment = async (commentId) => {

  };

  useEffect(() => {
    init();
  }, []);
  console.log(data)
  return (
    <>
      <Navbar />
      <div className="p-8">
        <div className="mb-2 flex items-center">
          <div className="flex-none mr-2">
            <img
              className="w-[40px] h-[40px] rounded-full"
              src={data?.userId?.profilePic}
              alt=""
            />
          </div>
          <div className="flex-none mr-2">{data?.userId?.username}</div>
        </div>
        {(currentUser.role === "admin" || currentUser._id === data?.userId?._id) && (
            <BsTrash
              className="text-red-500 cursor-pointer hover:text-red-700"
              onClick={deletePost}
            />
          )}
        <div className="ml-12 mb-2 text-lg font-bold">{data?.title}</div>
        <div className="ml-12">{data.content}</div>
        <div className="pl-12 mt-4 flex items-center">
          {currentUser.role !== "user" && (
            <div>
              <div className="mr-4 relative">
                <BsHandThumbsUp
                  className="cursor-pointer"
                  onClick={() => {
                    likePost();
                  }}
                />
                <div className="absolute -top-3 left-3 text-xs text-[orange]">
                  {data?.likes?.length > 0 ? data?.likes?.length : ""}
                </div>
              </div>
              <BsChatDots
                className="cursor-pointer"
                onClick={() => {
                  setShowCommentModal(true);
                }}
              />
            </div>
          )}
        </div>
        {data?.comments?.length > 0 &&
          data?.comments.map((item) => {
            return (
              <div key={item._id} className="ml-10">
                <div className="mb-2 mt-4 flex items-center">
                  <div className="flex-none mr-2">
                    <img
                      className="w-[40px] h-[40px] rounded-full"
                      src={item.profilePic}
                      alt=""
                    />
                  </div>
                  <div className="flex-none mr-2">{item.username}</div>
                </div>
                {(currentUser.role === "admin" || currentUser._id === item.userId) && (
                    <BsTrash
                      className="text-red-500 cursor-pointer hover:text-red-700"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this comment? This action cannot be undone."
                          )
                        ) {
                          deleteComment(item._id);
                        }
                      }}
                    />
                  )}
                <div className="ml-12">{item.content}</div>
              </div>
            );
          })}
        {showCommentModal && (
          <div className="w-1/2 p-2 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded bg-[#FFF]">
            <textarea
              onChange={(e) => {
                setComment(e.target.value);
              }}
              rows="6"
              className="w-full border p-1"
            ></textarea>
            <div className="flex justify-end pr-4">
              <button
                className="border py-1 px-2 rounded mr-2 cursor-pointer"
                onClick={() => {
                  setShowCommentModal(false);
                }}
              >
                Cancel
              </button>
              <button
                className="bg-[#4945ed] text-white py-1 px-2 rounded cursor-pointer"
                onClick={() => {
                  commentPost();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PostDetail;
