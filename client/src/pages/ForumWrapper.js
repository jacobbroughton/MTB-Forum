import CategoryList from "./CategoryList"
import ThreadFeed from "./ThreadFeed"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import SingleThread from "./SingleThread"
import "./styles/ForumWrapper.scss"

const ForumWrapper = ({ forumView }) => {

    const { id } = useParams()
    const [category, setCategory] = useState()
    // const [forumView, setForumView] = useState("")

    // useEffect(() => {
    //     setForumView('single') : setForumView('category')
    // }, [])

    return (
        <div className="forumWrapper">
            <CategoryList setCategory={setCategory}/>
            { forumView === 'single' ? <SingleThread/> : <ThreadFeed category={category}/> }
            
        </div>
    )
}

export default ForumWrapper