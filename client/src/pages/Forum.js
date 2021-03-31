import { ForumBoards } from "../ForumBoards.js"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useStatusUrl } from "../contexts/statusUrl"
import axios from "axios"
import "./styles/Forum.scss"
import { useEffect } from "react"

const Forum = () => {

    // const { serverUrl } = useStatusUrl()
    // const [boards, setBoards] = useState([])

    // const getBoards = () => {

    //     const byDiscipline = axios.get(`${serverUrl}/api/get-boards/discipline`)
    //     const byMain = axios.get(`${serverUrl}/api/get-boards/maingroups`)
    //     const byUserCreated = axios.get(`${serverUrl}/api/get-boards/usercreated`)

    //     axios
    //     .all([byDiscipline, byMain, byUserCreated])
    //     .then(axios.spread((...responses) => {
    //         const responseOne = responses[0].data
    //         const responseTwo = responses[1].data
    //         const responseThree = responses[2].data
    //         console.log(responseOne)
    //     }))
    //     .catch(err => console.log(err))
    // }

    // useEffect(() => {
    //     getBoards()
    // }, [])

    // useEffect(() => {
    //     console.log(boards)
    // }, [boards])

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
                                    <Link to={`/forum/${group.url}`}><li className="boardListItem">{ group.name }</li></Link>
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