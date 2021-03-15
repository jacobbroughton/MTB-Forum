import { ForumBoards } from "../ForumBoards.js"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useStatusUrl } from "../contexts/statusUrl"
import axios from "axios"
import "./styles/Forum.scss"
import { useEffect } from "react"

const Forum = () => {

    const { serverUrl } = useStatusUrl()
    const [boards, setBoards] = useState([])

    const getBoards = () => {
        axios
        .get(`${serverUrl}/api/get-boards`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getBoards()
    }, [])

    useEffect(() => {
        console.log(boards)
    }, [boards])

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