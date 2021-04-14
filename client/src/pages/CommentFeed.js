import axios from "axios";
import { useState, useRef, useEffect, createRefs } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import { useStatusUrl } from "../contexts/statusUrl";
import { useUser } from "../contexts/user";
import Comment from "./Comment";
import "./styles/CommentFeed.scss";

const CommentFeed = ({ id }) => {
  const { serverUrl } = useStatusUrl();
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [commentBody, setCommentBody] = useState("");
  const [repliedCommentId, setRepliedCommentId] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [reply, setReply] = useState(false);

  const getComments = () => {
    axios
      .get(`${serverUrl}/api/get-comments/${id}`)
      .then((res) => {
        setComments([...res.data]);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const getReplies = () => {
    axios
      .get(`${serverUrl}/api/get-replies/${id}`)
      .then((res) => setReplies([...res.data]))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getComments();
    getReplies();
  }, []);

  const showReplyInput = (commentId) => {
    let replyDiv = document.getElementById(`${commentId}`);
    let allReplyDivs = document.querySelectorAll(".replyFormParent");
    for (let i = 0; i < allReplyDivs.length; i++) {
      console.log(allReplyDivs[i]);
      allReplyDivs[i].style.display = "none";
    }
    replyDiv.style.display = "flex";
    setRepliedCommentId(commentId);
  };

  const addComment = (e) => {
    e.preventDefault();

    let date = moment().format("MMMM Do YYYY");
    let time = moment().format("LT");

    axios
      .post(`${serverUrl}/api/post-comment`, {
        threadId: id,
        userId: user.id,
        repliedCommentId,
        username: user.username,
        mainText: commentBody,
        dateCreated: date,
        timeCreated: time,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  if (isLoading) {
    return (
      <div className="commentsLoading">
        <span></span>
      </div>
    );
  }

  return (
    <div className="commentsContainer">
      {user && (
        <form className="commentForm" onSubmit={(e) => addComment(e)}>
          <div className="commentInputParent">
            <textarea
              className="commentTextarea"
              placeholder="Leave a comment"
              onChange={(e) => setCommentBody(e.target.value)}
            />
          </div>

          <button>Submit</button>
        </form>
      )}
      {comments &&
        comments.map((comment, i) => (
          <Comment
            comment={comment}
            i={i}
            user={user}
            showReplyInput={showReplyInput}
            setCommentBody={setCommentBody}
            addComment={addComment}
            replies={replies}
            setReply={setReply}
          />
        ))}
    </div>
  );
};

export default CommentFeed;
