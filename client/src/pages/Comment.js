const Comment = ({ comment, i, user, showReplyInput, setCommentBody, addComment, replies  }) => {
  return (
<div key={i} className="commentContainer">
            <div className="textAndInfoParent">
              <div className="profilePictureParent">
                <img
                  className="profilePicture"
                  src="https://mtbforum.s3.amazonaws.com/placeholderPerson.png"
                  alt={`${comment.username}'s profile picture`}
                />
              </div>
              <div className="commentBody">
                <p className="username">{comment.username}</p>
                <p className="mainText">{comment.main_text}</p>
              </div>
            </div>
            {user && (
              <div className="replyButtonDiv">
                <button onClick={() => showReplyInput(comment.id)}>
                  Reply
                </button>
              </div>
            )}

            <div className="repliesFeed">
              {replies.map(
                (rep) =>
                  rep.replied_comment_id === comment.id && (
                    <div className="replyContainer">
                      <img
                        className="profilePicture"
                        src="https://mtbforum.s3.amazonaws.com/placeholderPerson.png"
                        alt={`${comment.username}'s profile picture`}
                      />
                      <div className="commentBody">
                        <p className="username">{rep.username}</p>
                        <p className="mainText">{rep.main_text}</p>
                      </div>
                      <div className="replyInfo"></div>
                    </div>
                  )
              )}
            </div>
            {user && (
              <>
                <div id={comment.id} className="replyFormParent">
                  <form className="replyForm" onSubmit={(e) => addComment(e)}>
                    <input
                      placeholder={`Reply to ${comment.username}`}
                      name="mainTextInput"
                      onChange={(e) => setCommentBody(e.target.value)}
                    />
                  </form>
                </div>
              </>
            )}
          </div>
  );
};

export default Comment;
