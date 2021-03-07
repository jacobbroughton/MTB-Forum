import axios from "axios"
import { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import moment from "moment"
import { useStatusUrl } from "../contexts/statusUrl"
import { useUser } from "../contexts/user"
import "./styles/CommentFeed.scss"

const CommentFeed = () => {

    const { serverUrl } = useStatusUrl()
    const { user } = useUser()
    const { id } = useParams()
    const [comments, setComments] = useState([])
    const [mainText, setMainText] = useState("")
    const [isLoading, setLoading] = useState(true)


    const getComments = () => {
        axios
            .get(`${serverUrl}/api/get-comments/${id}`)
            .then(res => {
                setComments([...res.data])
                setLoading(false)
            })
            .catch(err => console.log(err))
    }


    useState(() => {
        getComments()
    }, [])



    const addComment = (e) => {
        e.preventDefault()

        let date = moment().format('MMMM Do YYYY')
        let time = moment().format('LT')

        axios
            .post(`${serverUrl}/api/post-comment`, {
                threadId: id,
                userId: user.id,
                username: user.username,
                mainText,
                dateCreated: date,
                timeCreated: time
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    if (isLoading) {
        return <div className="App">
            <h1>Loading...</h1>
        </div>
    }

    return (
        <div className="commentsContainer">
            {
                user &&
                <form className="commentForm" onSubmit={(e) => addComment(e)}>
                    <div className="commentInputParent">
                        <label>Comment</label>
                        <input onChange={(e) => setMainText(e.target.value)} />
                        
                    </div>

                    <button>Submit</button>
                </form>
            }
            {
                comments && comments.map(comment =>
                    <div className="commentContainer">
                        <p className="mainText">{comment.main_text}</p>
                        <div className="commentInfo">
                            <span className="usernameParent">Posted by &nbsp;
                            <p className="username">{comment.username}</p>
                            </span>
                            <div className="dateTime">
                                <p className="date">{comment.date_created}</p>
                            &nbsp; &nbsp;
                            <p className="time">{comment.time_created}</p>
                            </div>
                        </div>


                    </div>
                )
            }


        </div>
    )
}

export default CommentFeed