import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import axios from "axios"
import moment from "moment"
import { useUser } from "../contexts/user"
import { useStatusUrl } from "../contexts/statusUrl"
import { ForumBoards } from "../ForumBoards.js";

const ForumPostPage = () => {

    const { user } = useUser();
    const { category } = useParams()
    const [title, setTitle] = useState("")
    const [mainText, setMainText] = useState("")

    const history = useHistory();
    const { serverUrl } = useStatusUrl()


    const newForumPost = (e) => {
        e.preventDefault()
        let date = moment().format('MMMM Do YYYY')
        let time = moment().format('LT')
        axios
        .post(`${serverUrl}/api/newpost`, {
            userId: user.id,
            title,
            mainText,
            category,
            dateCreated: date,
            timeCreated: time
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))

        history.push(`/forum/${category}`)
        
    }

    return(
        <div className="taskPageFull">
            <h1>Forum Post Page</h1>
            <form onSubmit={(e) => newForumPost(e)}>
                <input onChange={e => setTitle(e.target.value)}></input>
                <textarea onChange={e => setMainText(e.target.value)}></textarea>
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}

export default ForumPostPage;