import { Col, Row, Select } from 'antd'
import TaskList from "../../components/TaskList";
import {EventTask} from "../../models/eventTask";

const demoEvents: EventTask[] = [
    {
        title: "Jerk off",
        priority: 1,
        start: {
            hour: 10,
            minute: 0
        },
        end: {
            hour: 11,
            minute: 0
        }
    },
    {
        title: "Watch porn",
        priority: 2,
        start: {
            hour: 12,
            minute: 0
        },
        end: {
            hour: 13,
            minute: 0
        }
    }
]


const DayViewPage = () => {

    return (
        <Row>
            <Col span={12}>
                <div>left</div>
            </Col>
            <Col span={10}>
                <TaskList events={demoEvents}/>
            </Col>
        </Row>
    )
}


export default DayViewPage