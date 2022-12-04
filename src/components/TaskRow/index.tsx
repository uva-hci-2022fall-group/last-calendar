import {EventTask} from "../../models/eventTask";
import {Badge, Card} from 'antd'


import {priorityText, priorityColor, backgroundColors, textColors} from '../../themes'

const TaskRow = (props: {
    event: EventTask
}) => {
    const {title, priority, start, end} = props.event

    return (
        <>
            <Badge.Ribbon text={<div style={{color: "black"}}>{priorityText[priority]}</div>} color={priorityColor[priority]} >
                <Card title={<div style={{color: textColors[priority], fontSize: 20}}>{title}</div>} size="small"
                      style={{width: 500, backgroundColor: backgroundColors[priority], color: textColors[priority]}}>
                    {
                        "" + start.hour + ":" + start.minute + " to " + end.hour + ":" + end.minute
                    }
                </Card>
            </Badge.Ribbon>
        </>


    )
}

export default TaskRow