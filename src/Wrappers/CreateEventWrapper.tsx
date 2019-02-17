import * as React from "react"

import { RouteComponentProps } from "react-router-dom"

import CreateEvent from "../NavagationComponents/CreateEvent"
import Updater from "../Types/Updater"

interface MatchParams {
    eid: string
}

interface Props extends RouteComponentProps<MatchParams> {
}

const EventWrapper = (updater: Updater, geolocation: any) => {
    return (props: Props) => <CreateEvent updater={updater} geolocation={geolocation} />
}

export default EventWrapper