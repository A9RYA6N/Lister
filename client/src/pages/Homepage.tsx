import axios from "axios"
import { useState, useEffect } from "react"
import TaskList from "./Task";

interface Task{
    id: number,
    user_id: number,
    task: string
}

const Homepage = () => {
    const [tasks, setTasks]=useState<Task[]>([]);
    const [userTask, setUserTask]=useState('');

    const handleDelete = (id: number) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    useEffect(()=>{
        const fetchTasks=async()=>{
            try {
                const res=await axios({
                    method:"GET",
                    url:`${import.meta.env.VITE_TASK_API}`,
                    withCredentials:true
                })
                setTasks(res.data.data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchTasks();
    }, []);

    const handleAddTask=async()=>{
        if(userTask.length!=0)
        {
            try {
                const result=await axios({
                    method:"POST",
                    url:`${import.meta.env.VITE_TASK_API}`,
                    data:{task: userTask},
                    withCredentials:true
                })
                console.log(result)
                setTasks(t=>[...t, result.data.data])
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <div>
            <p></p>
            <div className="input">
                <input type="text" placeholder="Enter your task" onChange={(e)=>{setUserTask(e.target.value)}}/>
                <button onClick={handleAddTask}>Add</button>
            </div>
            <div className="tasks">
            <TaskList tasks={tasks} onDelete={handleDelete}/>
            </div>
        </div>
    )
}

export default Homepage
