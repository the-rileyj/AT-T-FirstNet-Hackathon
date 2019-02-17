import * as React from "react";

import ShadowBoxing from "shadowboxing"

import COLORSCHEME from "../Support/ColorScheme"
import Updater from "../Types/Updater"

import styled from "styled-components"
import { string } from "prop-types";
import { Redirect } from "react-router";


interface JoinEventProps {
    updater: Updater
    geolocation: any
}

interface JoinEventState {
    error: string
    redirect: string
    submitEnabled: boolean
}

class CreateEvent extends React.Component<JoinEventProps, JoinEventState> {
    fieldValues: Map<string, string>
    fieldLabels: Array<string>

    public constructor(props: JoinEventProps) {
        super(props)

        this.state = {
            error: "",
            redirect: "",
            submitEnabled: true,
        }

        this.fieldValues = new Map<string, string>()
        this.fieldLabels = [
            "Name",
            "Name of Location",
            "Full Address",
        ]

        this.fieldHandler = this.fieldHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
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

        if (this.state.redirect !== "")
            return <Redirect to={this.state.redirect} />

        return (
            <ShadowBoxing level={6} style={componentWrapperStyle}>
                <CreateEventWrapper>
                    <ErrorDiv>
                        {this.state.error}
                    </ErrorDiv>
                    {this.fieldLabels.map((value, index) => {
                        return (
                            <CreateEventFieldWrapper>
                                    <EventLabelSpan>
                                        {value}
                                    </EventLabelSpan>
                                    <EventFieldInput type="text" onChange={this.fieldHandler(value)} />
                            </CreateEventFieldWrapper>
                        )
                    })}
                    <CreateEventButton onClick={this.submitHandler} disabled={!this.state.submitEnabled}>
                        Submit
                    </CreateEventButton>
                </CreateEventWrapper>
            </ShadowBoxing>
        );
    }

    private submitHandler() {
        let data = new Object()

        this.fieldLabels.forEach((val) => {
            let nv = val.substring(val.lastIndexOf(" ") + 1).toLowerCase()
            let tv = this.fieldValues.get(val)

            if (!tv)
                tv = ""

            // @ts-ignore
            data[nv] = tv
        })

        this.props.updater.Request(data, "create-event").then((value) => {
            this.setState({
                redirect: value.data,
            })
        }).catch((error) => {
            console.log(error)
            this.setState({error, submitEnabled: true})
        })

        this.setState({
            submitEnabled: false,
        })
    }

    private fieldHandler(name: string) {
        let self = this

        return (event: React.SyntheticEvent<HTMLInputElement>) => {
            self.fieldValues.set(name, event.currentTarget.value)
        }
    }
}

export default CreateEvent
