import { Link } from "react-router-dom";

const ThreadFeedListItem = ({ categoryUrl, post }) => {
    return (
        <Link
        className="feedListItem"
        to={`/forum/${categoryUrl}/single/${post.id}`}
      >
        <p className="feedItemTitle">{post.title}</p>
        <div className="threadInfo">
          <span className="usernameParent">
            <p className="username">@{post.username}</p>
          </span>
          <p className="feedListDateTime">
            {post.date_created} {post.time_created}
          </p>
        </div>
      </Link>
    )
}

export default ThreadFeedListItem