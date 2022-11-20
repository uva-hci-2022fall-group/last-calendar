import {Col, List, Radio, Row} from "antd";
import TaskRow from "../TaskRow";
import {compareTimeInDay, EventTask} from "../../models/eventTask";
import {useEffect, useState} from "react";

const TaskList = (props: {
    events: EventTask[]
}) => {
    const {events} = props
    const [sortedTasks, setSortedTasks] = useState<EventTask[]>(events)
    const [sort, setSort] = useState<'asc' | 'desc'>('asc')
    useEffect(() => {
        const sign = sort === 'asc' ? 1 : -1
        setSortedTasks(sortedTasks.sort((a, b) => sign * compareTimeInDay(a.start, b.start)))
    }, [sort, sortedTasks])
    return (
        <>
            <Row style={{marginTop: 10}}>
                <Col span={12}>
                    <Radio.Group value={sort} onChange={e => {
                        console.log("changed")
                        setSort(e.target.value)
                    }}>
                        <Radio.Button value={'asc'}>asc</Radio.Button>
                        <Radio.Button value={'desc'}>desc</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
            <List
                itemLayout="horizontal"
                dataSource={sortedTasks}
                renderItem={item => <List.Item>
                    <TaskRow event={item}/>
                </List.Item>}
            >

            </List>
        </>
    )
}

export default TaskList