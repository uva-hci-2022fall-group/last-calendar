
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

const compareTimeInDay = (a: TimeInDay, b: TimeInDay) => {
    const minuteA = a.hour * 60 + a.minute
    const minuteB = b.hour * 60 + b.minute
    return minuteB - minuteA
}


export type {TimeInDay, EventTask}
export {compareTimeInDay}