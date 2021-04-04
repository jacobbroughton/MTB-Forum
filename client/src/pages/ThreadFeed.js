import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useStatusUrl } from "../contexts/statusUrl"
import { useUser } from "../contexts/user"
import moment from "moment"
import "./styles/ThreadFeed.scss"
import axios from "axios"

const ThreadFeed = ({ category }) => {

    const [threads, setThreads] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [date, setDate] = useState()
    // const [category, setCategory] = useState(null)

    const { serverUrl } = useStatusUrl()
    const { categoryUrl } = useParams();
    const { user } = useUser()

    // const getBoard = axios.get(`${serverUrl}/api/get-board/${categoryUrl}`)
    // const getThreads =  axios.get(`${serverUrl}/api/get-threads/${categoryUrl}`)

    // const getBoardAndThreads = () => {
    //     axios
    //         .all([getBoard, getThreads]).then(axios.spread((...responses) => {
    //             const responseOne = responses[0]
    //             const responseTwo = responses[1]
    //             // setCategory({ ...responseOne.data })
    //             setThreads([...responseTwo.data])
    //             setLoading(false)
    //         })).catch(err => console.log(err))
    // }

    const getThreads = () => {
        console.log(categoryUrl)
        axios
        .get(`${serverUrl}/api/get-threads/${categoryUrl}`)
        .then(res => {
            setThreads([...res.data])
            setLoading(false)
        })
        .catch(err => console.log(err))
    }


    useEffect(() => {
        console.log(moment().format(`YYYYDDMM`))
        let tempDate = moment("20210403", "YYYYMMDD").fromNow()
        setDate(tempDate)
    }, [])

    useEffect(() => {
        getThreads()
        // getBoardAndThreads()
    }, [category])


    if (isLoading) {
        return <div className="App">
            <h1>Loading...</h1>
        </div>
    }



    return (
        <div className="threadFeedContainer">
            <div className="threadFeedHeader">
                { category && <h1 className="feedCategory">{category}</h1> }
                {
                    user && <Link className="newPost" to={`/post/${categoryUrl}`}>New Thread</Link>
                }
            </div>

            {
                threads &&
                <div className="feedList">
                    {threads.map(post =>
                        <Link className="feedListItem" to={`/forum/${categoryUrl}/${post.id}`}>
                            <p className="feedItemTitle">{post.title}</p>
                            <div className="threadInfo">
                                <span className="usernameParent">
                                <p className="username">@{post.username}</p>
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