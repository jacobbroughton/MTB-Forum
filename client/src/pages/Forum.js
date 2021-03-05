import { ForumBoards } from "../ForumBoards.js";
import { Link } from "react-router-dom"

const Forum = () => {
    return (
        <>
            {
                console.log(ForumBoards),
                ForumBoards.map((board, key) => 
                    <div>
                        <h3>{ board.category }</h3>
                        <ul>
                            {
                                board.includedGroups.map((group, key) => 
                                    <li><Link to={`/forum/${group.url}`}>{ group.name }</Link></li>
                                )
                            }
                        </ul>
                    </div>
                )
            }
        </>
    )
}

export default Forum;