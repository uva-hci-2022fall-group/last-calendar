import {Tabs, DatePicker, Form, InputNumber, Checkbox, Button, Input} from "antd";
import SingleEventTab from "./SingleEventTab";
import RepetitiveRoutineTab from "./RepetitiveRoutineTab";
import MultipleEventTab from "./MultipleEventTab";
import LongTermPlanTab from "./LongTermPlanTab";


const EventCreationPage = () => {

    return (
        <Tabs defaultActiveKey="1" centered={true}>
            <Tabs.TabPane tab="Single Event" key="1">
                <SingleEventTab/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Repetitive Routine" key="2">
                <RepetitiveRoutineTab/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Multiple Event" key="3">
                <MultipleEventTab/>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Long-Term Plan" key="4">
                <LongTermPlanTab/>
            </Tabs.TabPane>
        </Tabs>
    )
}

export default EventCreationPage