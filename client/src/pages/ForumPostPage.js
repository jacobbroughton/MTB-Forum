import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import moment from "moment"
import { useUser } from "../contexts/user"
import { useStatusUrl } from "../contexts/statusUrl"
import "./styles/TaskPage.scss"

const ForumPostPage = () => {

    const { user } = useUser();
    // const [tasks, setTasks] = useState([])
    const [mainText, setMainText] = useState("Main Text")
    const [tldr, setTldr] = useState("this is a tldr")
    const [bikeYear, setBikeYear] = useState("2021")
    const [bikeBrand, setBikeBrand] = useState("Commencal")
    const [bikeModel, setBikeModel] = useState("Meta TR 29")
    const [bikeSpec, setBikeSpec] = useState("Race")

    const history = useHistory();
    const { serverUrl } = useStatusUrl()

    // useEffect(() => {
    //     axios
    //     .get(`${serverUrl}/api/gettasks/${user.id}`)
    //     .then(res => setTasks([...res.data]))
    //     .catch(err => console.log(err))
    // }, [])

    const newForumPost = () => {
        let date = moment().format('MMMM Do YYYY')
        let time = moment().format('LT')
        axios
        .post(`${serverUrl}/api/newpost`, {
            userId: user.id,
            mainText,
            tldr,
            bikeYear,
            bikeBrand,
            bikeModel,
            bikeSpec,
            dateCreated: date,
            timeCreated: time
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))

        history.push("/feed")
    }

    return(
        <div className="taskPageFull">
            <h1>Forum Post Page</h1>
            <button onClick={() => newForumPost()}>New Post</button>
        </div>
    )
}

export default ForumPostPage;