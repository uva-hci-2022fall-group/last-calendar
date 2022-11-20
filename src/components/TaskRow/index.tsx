import {EventTask} from "../../models/eventTask";
import { Badge, Card } from 'antd'
import {useState} from "react";


const priorityColor = ["red", "yellow", "green"]
const priorityText = ["critical", "warning", "normal"]

const TaskRow = (props: {
    event: EventTask
}) => {
    const {title, priority, start, end} = props.event

    return (
        <Badge.Ribbon text={priorityText[priority]} color={priorityColor[priority]}>
            <Card title={title} size="small" style={{width: 500}}>
                {
                    "" + start.hour + ":" + start.minute + " to " + end.hour + ":" + end.minute
                }
            </Card>
        </Badge.Ribbon>

    )
}

export default TaskRow