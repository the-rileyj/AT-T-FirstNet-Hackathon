import * as React from "react";

import ShadowBoxing from "shadowboxing"

import COLORSCHEME from "../Support/ColorScheme"
import Updater from "../Types/Updater"
import styled from "styled-components"
// import Sender from "../Support/Sender"


interface EventProps {
    eventID: string
    updater: Updater
    geolocation: any
}

interface EventState {
    messages: Array<string>
    people: Array<string>
}

class Event extends React.Component<EventProps, EventState> {
    // updatr: Updater

    public constructor (props: EventProps) {
        super(props)

        this.state = {
            messages: [],
            people: [ this.props.updater.name ]
        }

        this.handleWebsocketMessage = this.handleWebsocketMessage.bind(this)
        this.getPeople = this.getPeople.bind(this)

        this.props.updater.Request(this.props.updater.name, "event-people")

        // this.updatr = new Updater(`/ws/event/${this.props.eventID}`, this.handleWebsocketMessage, true)
    }

    public render() {
        const componentWrapperStyle: React.CSSProperties = {
            backgroundColor: COLORSCHEME.secondaryLight,
            display: "block",
            margin: "5%",
            maxWidth: "100%",
            minHeight: "auto",
            padding: "5%",
            width: "90%",
        }

        const CreateEventWrapper = styled.div`
            display: grid;
            grid-row-gap: 1rem;
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            justify-content: space-between;
            width: 100%;
        `

        const CreateEventFieldWrapper = styled.div`
            display: grid;
            grid-row-gap: 1rem;
            grid-template-areas: "Label Field";
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 1fr;
            justify-content: space-between;
            overflow-y: scroll;
            width: 100%;
        `

        const EventLabelSpan = styled.span`
            grid-area: Label;
        `

        const EventFieldInput = styled.input`
            grid-area: Field;
        `

        const CreateEventButton = styled.button`
            width: 100%;
        `

        const ErrorDiv = styled.div`
            color: red;
            text-align: center;
            width: 100%;
        `

        return (
            <ShadowBoxing level={6} style={componentWrapperStyle}>
                <CreateEventWrapper>
                    {this.state.people.map((value, index) => {
                        return (
                            <CreateEventFieldWrapper >
                                {value}
                            </CreateEventFieldWrapper>
                        )
                    })}
                </CreateEventWrapper>
                {/* <Sender sendMsg={(n: string) => { this.updatr.Request({"msg": n, "eid": this.props.eventID}, "event-msg")}} /> */}
            </ShadowBoxing>
        );
    }

    // private this.handleWebsocketConnect(message) {

    // }

    private getPeople() {
        this.props.updater.Request({"event": this.props.eventID, "need": "people"}, "people").then((value) => {
            let n = Array<string>(value.data).filter((dat) => {dat !== this.props.updater.name})

            n.push(this.props.updater.name)
            this.setState({
                people: n
            })
        })
    }

    private handleWebsocketMessage(message: MessageEvent) {
        // TYPE RESPONSE
        let response: any = JSON.parse(message.data)

        let nea = this.state.messages

        Array<string>(response.data.message).forEach((mes) => {
            nea.push(mes)
        })

        this.setState({
            messages: nea
        })
    }
}

export default Event;
