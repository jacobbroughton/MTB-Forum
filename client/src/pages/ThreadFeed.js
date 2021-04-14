import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useStatusUrl } from "../contexts/statusUrl";
import { useUser } from "../contexts/user";
// import moment from "moment";
import "./styles/ThreadFeed.scss";
import axios from "axios";
import ThreadFeedListItem from "./ThreadFeedListItem";
import Pagination from "./Pagination";

const ThreadFeed = ({ category }) => {
  const [threads, setThreads] = useState([]);
  const [lastId, setLastId] = useState(0)
  const { serverUrl } = useStatusUrl();
  const { categoryUrl, page } = useParams();
  const { user } = useUser();

  const getThreads = () => {
    switch (categoryUrl) {
      case "uc-recent":
        axios
          .get(`${serverUrl}/api/get-recent-threads`)
          .then((res) => {
            setThreads([...res.data])
            console.log(res.data[res.data.length-1].id)
          })
          .catch((err) => console.log(err));
        break;

      default:
        axios
          .get(`${serverUrl}/api/get-threads/${categoryUrl}/${lastId}`)
          .then((res) => {
            setThreads([...res.data]);
  
          })
          .catch((err) => console.log(err));
    }
  };

  const setTheLastId = () => {

  }

  useEffect(() => {
    getThreads();
  }, [category]);

  useEffect(() => {
    getThreads();
  }, [page]);

  useEffect(() => {
    console.log(lastId)
  }, [lastId])


  return (
    <div className="threadFeed">
      <div className="threadFeedHeader">
        {category && <h1 className="feedCategory">{category}</h1>}
        {user && (
          <Link className="newPost" to={`/post/${categoryUrl}`}>
            New Thread
          </Link>
        )}
      </div>

      {threads && (
        <div className="feedList">
          {threads.map((post) => (
            <ThreadFeedListItem categoryUrl={categoryUrl} post={post} />
          ))}
        </div>
      )}
      <Pagination categoryUrl={categoryUrl} page={page} serverUrl={serverUrl} />
    </div>
  );
};

export default ThreadFeed;
