import { useEffect, useState } from "react"
import "./timerTodo.css"
const TimerTodo = () => {
    const [taskData, setTaskData] = useState({ starttime: "", Endtime: "", task: "", id: "" })
    const [startTime, setStartTime] = useState("")
    const [EndTime, setEndTime] = useState("")
    const [Task, setTask] = useState("")
    const [listData, setListData] = useState([])
    const [edit, setEdit] = useState(null)
    const [updateTask, setupdate] = useState({ starttime: "", Endtime: "", task: "" })
    const [timeStr, period] = startTime.split(" ");
    const [hoursStr, minutesStr] = startTime.split(":");

    // const [endtimeStr, endperiod] = EndTime.split(" ");
    // const [endhoursStr, endminutesStr] = EndTime.split(":");

    // let Endhours = parseInt(endhoursStr);
    // if (endperiod === "PM" && Endhours < 12) {
    //     hours += 12;
    // } else if (endperiod === "AM" && Endhours === 12) {
    //     hours = 0;
    // }
    // const endpaddedHours = hours.toString().padStart(2, "0");
    // const endpaddedMinutes = endminutesStr.padStart(2, "0");



    let hours = parseInt(hoursStr);
    if (period === "PM" && hours < 12) {
        hours += 12;
    } else if (period === "AM" && hours === 12) {
        hours = 0;
    }
    const paddedHours = hours.toString().padStart(2, "0");
    const paddedMinutes = minutesStr.padStart(2, "0");
    const Starttime24hr = `${paddedHours}:${paddedMinutes}`;


    useEffect(() => {
        // setId((id)=>(id+1))
        setTaskData({ starttime: startTime, Endtime: EndTime, task: Task, id: Date.now() * Math.random(10) })
    }, [startTime, EndTime, Task])

    const Addlist = () => {
        if (!edit) {
            setListData([...listData, taskData])
            setTask("")
        } else {
            handleupdate(Task, edit.id)
            setTask("")
        }

    }

    const handleEdit = (id) => {
        const findTodo = listData.find((todo) => todo.id === id)
        setEdit(findTodo)
    }

    const handleupdate = (task, id) => {
        const newData = listData.map((items, i) => (
            items.id === id ? (task, id) : items
        ))
        setListData(newData)
        setEdit("")

    }

    useEffect(() => {
        if (edit) {
            setTask(edit.Task)
        } else {
            setTask("")
        }
    }, [setTask, edit])

    const DeleteData = (id) => {
        setListData((prev) => prev.filter((items) => (items.id !== id)))
    }


    console.log(listData)
    console.log(taskData)

    return (
        <div className="main-div">
            <div className="header">
                <span>
                    <label>Select Date: </label>
                    <input type="date" />
                </span>
                <span>
                    <button>Load</button>
                </span>
                <span>
                    <button>Export TimeSheet As PNG</button>
                </span>
            </div>
            <div className="nav">
                <span>
                    <label className="start-label" htmlFor="start-time">Start Time:- </label>
                    <input type="time" placeholder="Start time" id="start-time" value={startTime} onChange={(e) => { setStartTime(e.target.value) }} required />
                </span>
                <span >
                    <label className="end-label">End Time:- </label>
                    <input type="time" min="09:00" max="18:00" value={EndTime} onChange={(e) => { setEndTime(e.target.value) }} />
                </span>
                <span style={{ width: "20%" }}>
                    <input type="text" placeholder="Add task" className="task-input" onChange={(e) => { setTask(e.target.value) }} style={{ width: "100%", marginRight: "14px" }} />
                </span>
                <span>
                    <button onClick={() => { Addlist() }} style={{ width: "70%" }}>Add</button>
                </span>
            </div>
            {/* <div style={{width:"100%"}}> */}
            <table>
                <tr>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Minutes</th>
                    <th>Task Description</th>
                    <th></th>
                </tr>
                {listData && listData.map((items, i) => {
                    return (
                        <tr key={i}>
                            <td>{items.starttime}</td>
                            <td>{items.Endtime}</td>
                            <td>Minutes</td>
                            <td>{items.task}</td>
                            <td>
                                {edit === items.id ? (
                                    <button onClick={() => { handleupdate(items.task, items.id) }}>save</button>)
                                    :
                                    (<button onClick={() => { handleEdit(items.id) }}>Edit</button>)

                                }
                                <button onClick={() => DeleteData(items.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                })}


            </table>
            {/* </div> */}
        </div>
    )
}
export default TimerTodo