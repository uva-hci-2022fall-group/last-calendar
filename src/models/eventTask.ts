
type TimeInDay = {
    hour: number,
    minute: number
}

type EventTask = {
    title: string
    priority: number
    start: TimeInDay
    end: TimeInDay
}


export type {TimeInDay, EventTask}