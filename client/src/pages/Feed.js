import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useStatusUrl } from "../contexts/statusUrl"
import { useUser } from "../contexts/user"
import "./styles/Feed.scss"
import axios from "axios"

const Feed = () => {

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
        <>
            <Link to={`/post/${category}`}>Post</Link>
            <h1 className="feedCategory">{category}</h1>
            {
                posts &&
                <div className="feedList">
                    {posts.map(post =>
                        <div className="feedListItem">
                            <Link to={`/forum/${category}/${post.id}`}><p className="feedListTitle">{post.title}</p></Link>
                            <p className="feedListDateTime">{post.date_created} {post.time_created}</p>
                        </div>
                    )}
                </div>


            }
        </>
    )
}

export default Feed