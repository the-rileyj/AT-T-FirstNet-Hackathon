import * as React from "react"

import { RouteComponentProps } from "react-router-dom"

import Event from "../NavagationComponents/Event"
import Updater from "../Types/Updater"

interface MatchParams {
    eid: string
}

interface Props extends RouteComponentProps<MatchParams> {
}

const EventWrapper = (updater: Updater, geolocation: any) => {
    return (props: Props) => <Event eventID={props.match.params.eid} updater={updater} geolocation={geolocation} />
}

export default EventWrapper