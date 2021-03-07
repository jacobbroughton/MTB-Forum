import axios from "axios"
import { useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import moment from "moment"
import { useStatusUrl } from "../contexts/statusUrl"
import { useUser } from "../contexts/user"
import "./styles/ThreadFeed.scss"

const ThreadFeed = () => {

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
        <div className="commentFeed">
            {
                comments && comments.map(comment =>
                    <div className="commentContainer">
                        <p>{comment.main_text}</p>
                        <p>{comment.username}</p>
                        <p>{comment.date_created}</p>
                        <p>{comment.time_created}</p>
                    </div>
                )
            }
            {
                user &&
                <form onSubmit={(e) => addComment(e)}>
                    <input onChange={(e) => setMainText(e.target.value)} />
                    <button>Submit</button>
                </form>
            }

        </div>
    )
}

export default ThreadFeed