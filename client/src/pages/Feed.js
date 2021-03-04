import { useState, useEffect } from "react";
import { useStatusUrl } from "../contexts/statusUrl"
import { useUser } from "../contexts/user"
import NavBar from "../components/Navbar"
import axios from "axios";

const Feed = () => {

    const [posts, setPosts] = useState([])

    const { serverUrl } = useStatusUrl()
    const { user } = useUser()

    useEffect(() => {
        axios
        .get(`${serverUrl}/api/getposts`)
        .then(res => setPosts([...res.data]))
        .catch(err => console.log(err))
    }, [])

    return (
        <>
            {
                posts && posts.map(post => 
                    <div>
                        <h1>{ post.main_text } {posts.length}</h1>
                    </div>
                )
            }
        </>
    )
}

export default Feed