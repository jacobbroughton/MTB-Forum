import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useStatusUrl } from "../contexts/statusUrl"
import { useUser } from "../contexts/user"
import "./styles/ThreadFeed.scss"
import axios from "axios"

const ThreadFeed = () => {

    const [posts, setPosts] = useState([])
    const [isLoading, setLoading] = useState(true)

    const { serverUrl } = useStatusUrl()
    const { category } = useParams();
    const { user } = useUser()

    useEffect(() => {
        console.log("use effect")
        axios
            .get(`${serverUrl}/api/get-threads/${category}`)
            .then(res => {
                setPosts([...res.data])
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    if (isLoading) {
        return <div className="App">
            <h1>Loading...</h1>
        </div>
    }

    return (
        <div className="threadFeedContainer">
            {
                user && <Link className="newPost" to={`/post/${category}`}>New Thread</Link>
            }
            
            <h1 className="feedCategory">{category}</h1>
            {
                posts &&
                <div className="feedList">
                    {posts.map(post =>
                        <div className="feedListItem">
                            <Link to={`/forum/${category}/${post.id}`}><p className="feedItemTitle">{post.title}</p></Link>
                            <div className="threadInfo">
                                <span className="usernameParent">Created by &nbsp;
                                <p className="username">{post.username}</p>
                                </span>
                                <p className="feedListDateTime">{post.date_created} {post.time_created}</p>
                            </div>

                        </div>
                    )}
                </div>


            }
        </div>
    )
}

export default ThreadFeed