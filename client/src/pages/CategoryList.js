import { ForumBoards } from "../ForumBoards.js"
// import { useState } from "react"
import { Link } from "react-router-dom"
// import ThreadFeed from "./ThreadFeed"
import "./styles/CategoryList.scss"

const CategoryList = ({ setCategory }) => {

    // const [category, setCategory] = useState("");

    return (
        <div className="forumContainer">
            {
                ForumBoards.map((board, key) => 
                    <div className="forumBoardContainer" key={key}>
                        <h3 className="boardCategory">{ board.category }</h3>
                        <ul className="boardList">
                            {
                                board.includedGroups.length === 0
                                ? 
                                <p className="noBoardsText">No boards to show</p>
                                :
                                board.includedGroups.map((group, key) => 
                                    <Link onClick={() => setCategory(group.name)} key={key} to={`/forum/${group.url}`}><li className="boardListItem">{ group.name }</li></Link>
                                )
                            }
                        </ul>
                    </div>
                )
            }
            {/* <ThreadFeed category={category}/> */}
        </div>
    )
}

export default CategoryList;