import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import axios from "axios"
import moment from "moment"
import { useUser } from "../contexts/user"
import { useStatusUrl } from "../contexts/statusUrl"
import "./styles/ForumPostPage.scss"

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
            
            <form className="forumPostForm" onSubmit={(e) => newForumPost(e)}>
                <h1 className="pageHeader">Create a new thread</h1>
                <div className="inputParent">
                    <input className="titleInput" name="title" onChange={e => setTitle(e.target.value)}></input>
                    <label for="title">Title</label>
                </div>
                <div className="inputParent">
                    <textarea name="mainContent" onChange={e => setMainText(e.target.value)}></textarea>
                    <label for="mainContent">Main Content</label>
                </div>
                
                <button className="createButton" type="submit">Create Post</button>
            </form>
        </div>
    )
}

export default ForumPostPage;