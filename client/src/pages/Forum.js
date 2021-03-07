import { ForumBoards } from "../ForumBoards.js";
import { Link } from "react-router-dom"
import "./styles/Forum.scss"

const Forum = () => {
    return (
        <div className="forumContainer">
            {
                ForumBoards.map((board, key) => 
                    <div className="forumBoardContainer">
                        <h3 className="boardCategory">{ board.category }</h3>
                        <ul className="boardList">
                            {
                                board.includedGroups.length === 0
                                ? 
                                <span>No boards to show</span>
                                :
                                board.includedGroups.map((group, key) => 
                                    <li className="boardListItem"><Link to={`/forum/${group.url}`}>{ group.name }</Link></li>
                                )
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default Forum;