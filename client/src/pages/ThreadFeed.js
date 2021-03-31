import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useStatusUrl } from "../contexts/statusUrl"
import { useUser } from "../contexts/user"
import "./styles/ThreadFeed.scss"
import axios from "axios"

const ThreadFeed = () => {

    const [posts, setPosts] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [category, setCategory] = useState(null)

    const { serverUrl } = useStatusUrl()
    const { categoryUrl } = useParams();
    const { user } = useUser()

    useEffect(() => {
        axios
            .get(`${serverUrl}/api/get-board/${categoryUrl}`)
            .then(res => setCategory({ ...res.data }))
            .catch(err => console.log(err))

        axios
            .get(`${serverUrl}/api/get-threads/${categoryUrl}`)
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

            <div className="threadFeedHeader">
                <h1 className="feedCategory">{category.name}</h1>
                {
                    user && <Link className="newPost" to={`/post/${category}`}>New Thread</Link>
                }
            </div>

            {
                posts &&
                <div className="feedList">
                    {posts.map(post =>
                        <Link className="feedListItem" to={`/forum/${categoryUrl}/${post.id}`}>
                            <p className="feedItemTitle">{post.title}</p>
                            <div className="threadInfo">
                                <span className="usernameParent">Created by &nbsp;
                                <p className="username">{post.username}</p>
                                </span>
                                <p className="feedListDateTime">{post.date_created} {post.time_created}</p>
                            </div>
</Link>
                        
                    )}
                </div>


            }
        </div>
    )
}

export default ThreadFeed