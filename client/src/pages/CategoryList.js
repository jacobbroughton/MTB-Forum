import { ForumBoards } from "../ForumBoards.js";
import { Link } from "react-router-dom";
import "./styles/CategoryList.scss";

const CategoryList = ({ setCategory }) => {
  return (
    <div className="forumContainer">
      {ForumBoards.map((board, key) => (
        <div className="forumBoardContainer" key={key}>
          <h3 className="boardCategory">{board.category}</h3>
          <ul className="boardList">
            {board.includedGroups.length === 0 ? (
              <p className="noBoardsText">No boards to show</p>
            ) : (
              board.includedGroups.map((group, key) => (
                <Link
                  onClick={() => setCategory(group.name)}
                  key={key}
                  to={`/forum/${group.url}/1`}
                >
                  <li className="boardListItem">{group.name}</li>
                </Link>
              ))
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
