import { useEffect, useState } from "react"
import "./timerTodo.css"
const TimerTodo = () => {
    const [taskData, setTaskData] = useState({ starttime: "", Endtime: "", minutes: "", task: "", id: Date.now() * Math.random(10) })
    const [listData, setListData] = useState([])
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const [starttimeStr, startperiod] = taskData.starttime.split(" ");
        const [starthoursStr, startminutesStr] = starttimeStr.split(":");
        let starthours = parseInt(starthoursStr);
        let startmins = parseInt(startminutesStr);
        if (startperiod === "PM" && starthours < 12) {
            starthours += 12;
        } else if (startperiod === "AM" && starthours === 12) {
            starthours = 0;
        }
        startmins = starthours * 60 + startmins

        const [endtimeStr, endperiod] = taskData.Endtime.split(" ");
        const [endhoursStr, endminutesStr] = endtimeStr.split(":");
        let endhours = parseInt(endhoursStr);
        let endmins = parseInt(endminutesStr);
        if (endperiod === "PM" && endhours < 12) {
            endhours += 12;
        } else if (endperiod === "AM" && endhours === 12) {
            endhours = 0;
        }
        endmins = endhours * 60 + endmins
        let diff = endmins - startmins

        setTaskData({ ...taskData, minutes: diff })
    }, [taskData, setTaskData])

    const Addlist = () => {

        if (taskData.task.trim() !== "") {
            setListData((prev) => [...prev, taskData])
            // setTaskData({})
        }
    }

    const handleEdit = (id, Task) => {
        setListData((prev) =>
            prev.map((task) => {
                if (task.id === id) {
                    return { ...task, task: Task };
                }
                return task;
            })
        );
        setEditId(null);
    }
    // console.log(listData)
    const DeleteData = (id) => {
        setListData((prev) => prev.filter((items) => (items.id !== id)))
    }


    // console.log(listData)
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
                    <input type="time" placeholder="Start time" id="start-time" value={taskData.starttime} onChange={(e) => { setTaskData({ ...taskData, starttime: e.target.value }) }} required />
                </span>
                <span >
                    <label className="end-label">End Time:- </label>
                    <input type="time" min="09:00" max="18:00" value={taskData.Endtime} onChange={(e) => { setTaskData({ ...taskData, Endtime: e.target.value }) }} />
                </span>
                <span style={{ width: "20%" }}>
                    <input type="text" placeholder="Add task" className="task-input" onChange={(e) => { setTaskData({ ...taskData, task: e.target.value }) }} style={{ width: "100%", marginRight: "14px" }} />
                </span>
                <span>
                    <button onClick={() => { Addlist() }} style={{ width: "70%" }}>Add</button>
                </span>
            </div>

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
                            <td>{items.minutes}</td>
                            <td>{items.task}</td>
                            <td>
                                <button onClick={() => { handleEdit(items.id, prompt('Enter updated task:', items.task)) }}>Edit</button>

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