import axios from "axios";

interface Task{
    id: number,
    user_id: number,
    task: string
}

interface TaskProps {
    tasks: Task[],
    onDelete: (id: number) => void
}

const TaskList = ({tasks, onDelete}: TaskProps) => {
    const handleDelete=async(task: Task)=>{
        try {
            const apiObj={
                id:task.id
            }
            const res=await axios({
                method:"DELETE",
                url:`${import.meta.env.VITE_TASK_API}`,
                data:apiObj,
                withCredentials:true
            })
            onDelete(res.data.data.id)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            {tasks.length>0 ? tasks.map((t)=>{
                return(
                    <div key={t.id}>
                        <p>{t.task}</p>
                        <button onClick={()=>handleDelete(t)}>Delete</button>
                    </div>
                )
            }) : "No tasks!, why dont you enter one ;)"}
        </>
    )
}

export default TaskList
