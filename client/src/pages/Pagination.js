import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Pagination = ({ categoryUrl, serverUrl, page }) => {
  const [threadCount, setThreadCount] = useState(0);
  const [buttonArr, setButtonArr] = useState([]);

  const getThreadCount = () => {
    axios
      .get(`${serverUrl}/api/get-thread-count/${categoryUrl}`)
      .then((res) => setThreadCount(res.data.count))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getThreadCount();
  }, [categoryUrl]);

  useEffect(() => {
    setButtonArr([])
    console.log(threadCount);
    if (threadCount >= 20) {
      let buttonCount = Math.ceil(threadCount / 20);
      for (let i = 1; i <= buttonCount; i++) {
        setButtonArr((buttonArr) => [...buttonArr, i]);
      }
    }
  }, [threadCount]);


  return (
    <div className="pagination">
        {/* {buttonArr} */}

      {buttonArr.map(button => 
        <Link className="paginationBtn" to={`/forum/${categoryUrl}/${button}`}>
          {button}
        </Link>
      )}
    </div>
  );
};

export default Pagination;
