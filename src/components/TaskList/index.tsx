import {Col, List, Radio, Row} from "antd";
import TaskRow from "../TaskRow";
import {EventTask} from "../../models/eventTask";
import {useEffect, useState} from "react";


const TaskList = (props: {
    events: EventTask[]
}) => {
    const {events} = props
    const [sortByPriority, setSortByPriority] = useState(false)
    const [sortedTasks, setSortedTasks] = useState(events)
    useEffect(() => {
        setSortedTasks(sortedTasks.sort((a, b) => {
            return 0
        }))
    }, [sortByPriority])
    return (
        <>
            <Row style={{marginTop: 10}}>
                <Col span={12}>
                    <Radio.Group defaultValue="a">
                        <Radio.Button value="a">order by time</Radio.Button>
                        <Radio.Button value="b">order by priority</Radio.Button>
                    </Radio.Group>
                </Col>
                <Col span={12}>
                    <Radio.Group defaultValue="a">
                        <Radio.Button value="a">asc</Radio.Button>
                        <Radio.Button value="b">desc</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
            <List
                itemLayout="horizontal"
                dataSource={events}
                renderItem={item => <List.Item>
                    <TaskRow event={item}/>
                </List.Item>}
            >

            </List>
        </>
    )
}

export default TaskList