import { useEffect, useState } from "react"
import axios from "axios"
import moment from "moment"
import { useUser } from "../contexts/user"
import { useStatusUrl } from "../contexts/statusUrl"
import "./styles/TaskPage.scss"

const TaskPage = () => {

    const { user } = useUser();
    const [tasks, setTasks] = useState([])
    const [mainText, setMainText] = useState("Main Text")
    const [tags, setTags] = useState("blue,red")
    const [board, setBoard] = useState("personal")
    const { serverUrl } = useStatusUrl()
    // const [dateCreated, setDateCreated] = useState("")
    // const [timeCreated, setTimeCreated] = useState("")

    useEffect(() => {
        axios
        .get(`${serverUrl}/api/gettasks/${user.id}`)
        .then(res => setTasks([...res.data]))
        .catch(err => console.log(err))
    }, [])

    const addTask = () => {
        let date = moment().format('MMMM Do YYYY')
        let time = moment().format('LT')
        axios
        .post(`${serverUrl}/api/posttask`, {
            userId: user.id,
            mainText,
            tags,
            board,
            dateCreated: date,
            timeCreated: time
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return(
        <div className="taskPageFull">
            {
                tasks.map(task => <>
                    <h1>{task.main_text}</h1>
                </>)
            }
            <button onClick={() => addTask()}>Add Task</button>
        </div>
    )
}

export default TaskPage;