import * as React from "react";

import ShadowBoxing from "shadowboxing"

import COLORSCHEME from "../Support/ColorScheme"
import Updater from "../Types/Updater"
import styled from "styled-components";


interface SenderProps {
    sendMsg: (n: string) => void
}

interface SenderState {
    message: string
}

class Event extends React.Component<SenderProps, SenderState> {
    public constructor(props: SenderProps) {
        super(props)

        this.state = {
            message: ""
        }

        this.handleMessage = this.handleMessage.bind(this)
        this.handleEnter = this.handleEnter.bind(this)
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

        let SearchInput = styled.input`
            grid-area: search;
            background-color: ${COLORSCHEME.primary};
            border: none;
            caret-color: ${COLORSCHEME.primaryText}
            color: ${COLORSCHEME.primaryText};
            width: 100%;

            &:focus, &:focus{
                outline: none;
            }

            &::placeholder {
                color: ${COLORSCHEME.primaryText};
                opacity: 1;
            }
        `
        return (
            <ShadowBoxing level={6} style={componentWrapperStyle} >
                <SearchInput onChange={this.handleMessage} value={this.state.message} placeholder="send a message..." />
            </ShadowBoxing>
        );
    }

    private handleMessage(event: React.SyntheticEvent<HTMLInputElement>) {
        this.setState({ message: event.currentTarget.value });
    }

    private handleEnter(event: React.SyntheticEvent<HTMLInputElement>) {
        this.setState({ message: event.currentTarget.value });
    }
}

export default Event;
