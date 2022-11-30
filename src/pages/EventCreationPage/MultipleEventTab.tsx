import {Button, DatePicker, Form, Input, InputNumber, Tag} from "antd";
import {
    createDateStampFromMoment,
    DateStamp,
    TimeInDay,
    TimeSlot,
    TaskPart,
    FlexibleEvent
} from "../../models/eventTask";
import moment from "moment";
import {useContext, useState} from "react";
import {MultipleEventsContext} from "../../contexts/MultipleEventsContext";

const MultipleEventTab = () => {
    const [label, setLabel] = useState("")
    const [date, setDate] = useState<DateStamp>({
        year: 2022,
        month: 11,
        day: 25
    })
    const [start, setStart] = useState<TimeInDay>({
        hour: 10,
        minute: 0
    })
    const [end, setEnd] = useState<TimeInDay>({
        hour: 11,
        minute: 0
    })
    const [slots, setSlots] = useState<TimeSlot[]>([])
    const [taskParts, setTaskParts] = useState<TaskPart[]>([])

    const [taskLabel, setTaskLabel] = useState("")
    const [taskPeriod, setTaskPeriod] = useState(10)

    const {multipleEvents, setMultipleEvents} = useContext(MultipleEventsContext)
    const [priority, setPriority] = useState(1)
    const onAddEvent = () => {
        const event: FlexibleEvent = new FlexibleEvent(label, priority, slots, taskParts)
        setMultipleEvents([...multipleEvents, event])
    }

    const addSlot = () => {
        setSlots([...slots, new TimeSlot(date, start, end)])
    }

    const addTaskPart = () => {
        setTaskParts([...taskParts, {
            name: taskLabel,
            period: taskPeriod
        }])
    }

    const removeSlot = (index: number) => {
        const newSlots = [...slots.slice(0, index), ...slots.slice(index + 1)]
        setSlots(newSlots)
    }

    const removeTaskPart = (index: number) => {
        const newParts = [...taskParts.slice(0, index), ...taskParts.slice(index + 1)]
        setTaskParts(newParts)
    }

    return (
        <Form
            name="basic"
            labelCol={{span: 8}}
            wrapperCol={{span: 8}}
            initialValues={{remember: true}}
            autoComplete="off"
        >
            <Form.Item
                label="label"
            >
                <Input value={label} onChange={e => setLabel(e.target.value)} style={{width: 400}}/>
            </Form.Item>

            <Form.Item
                label="Priority"
            >
                <InputNumber addonBefore="low(1)" addonAfter={"high(5)"} value={priority}
                             onChange={e => setPriority(e ?? 1)} min={1} max={5}/>
            </Form.Item>

            <Form.Item
                label="slots"
            >
                <div>
                    {
                        slots.map((s, i) => <Tag key={"" + i} closable={true}
                                                 onClose={() => removeSlot(i)}>{s.format()}</Tag>)
                    }
                </div>
            </Form.Item>

            <Form.Item
                label="date"
            >
                <DatePicker style={{width: 400}} onChange={e => {
                    if (e !== null) {
                        setDate(createDateStampFromMoment(e))
                    }
                }}/>
            </Form.Item>

            <Form.Item
                label="Start"
            >
                <InputNumber addonBefore="hour" defaultValue={start.hour} value={start.hour}
                             onChange={e => setStart({hour: e ?? start.hour, minute: start.minute})} min={0}
                             max={23}/>
                <InputNumber addonBefore={"min"} defaultValue={start.minute}
                             onChange={e => setStart({hour: start.hour, minute: e ?? start.minute})}
                             min={0} max={59} style={{marginLeft: 10}}/>
            </Form.Item>

            <Form.Item
                label="End"
            >
                <InputNumber addonBefore="hour" defaultValue={end.hour} value={end.hour}
                             onChange={e => setEnd({hour: e ?? end.hour, minute: end.minute})} min={0}
                             max={23}/>
                <InputNumber addonBefore={"min"} defaultValue={end.minute} min={0}
                             onChange={e => setEnd({hour: end.hour, minute: e ?? end.minute})}
                             max={59} style={{marginLeft: 10}}/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" onClick={addSlot}>
                    Add Time Slot
                </Button>
            </Form.Item>

            <Form.Item
                label="tasks"
            >
                <div>
                    {
                        taskParts.map((p, i) => <Tag key={"" + i} closable={true} onClose={() => removeTaskPart(i)}>{
                            `${p.name}(${p.period}mins)`
                        }</Tag>)
                    }
                </div>
            </Form.Item>
            <Form.Item
                label="task label"
            >
                <Input value={taskLabel} onChange={e => setTaskLabel(e.target.value)} style={{width: 400}}/>
            </Form.Item>
            <Form.Item
                label="task period"
            >
                <InputNumber addonBefore={"min"} defaultValue={0} min={0} max={120} value={taskPeriod}
                             onChange={e => setTaskPeriod(e ?? taskPeriod)}/>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" onClick={addTaskPart}>
                    Add Task
                </Button>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type="primary" onClick={onAddEvent}>
                    Add
                </Button>
            </Form.Item>
        </Form>
    )
}

export default MultipleEventTab