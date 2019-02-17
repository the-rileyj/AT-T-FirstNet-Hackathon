import * as React from "react";

import ShadowBoxing from "shadowboxing"

import COLORSCHEME from "../Support/ColorScheme"
import FirePoliceEms from "../Photos/PoliceFireEMS.jpg"
import Updater from "../Types/Updater";


interface HomeProps {
    updater: Updater
    geolocation: any
}

class Home extends React.Component<HomeProps> {
    public constructor(props: HomeProps) {
        super(props)
    }

    public render() {
        const componentWrapperStyle: React.CSSProperties = {
            backgroundColor: COLORSCHEME.primaryLight,
            width: "100%",
        }

        return (
            <div style={componentWrapperStyle}>
                <div style={{ position: "relative", height: "90vh", overflow: "hidden", width: "100%" }}>
                    <img src={FirePoliceEms} style={{ height: "90vh", overflow: "hidden", minWidth: "100%", maxWidth: "auto" }} />
                    <div style={{ top: "50%", left: "50%", position: "absolute", transform: "translate(-50%, -25%)" }} >
                        <ShadowBoxing level={4} style={{ alignItems: "center", borderRadius: "2.5rem", justifyContent: "space-evenly", display: "flex", backgroundColor: COLORSCHEME.primary, height: "18vw" }}>
                            <span style={{ color: COLORSCHEME.primaryText, fontSize: "7vw", padding: "1vw 5% 1vw 5%" }}>
                                SafetyNet
                            </span>
                        </ShadowBoxing>
                    </div>
                </div>
                <div>
                    GEOLOCATION EVENTS HERE
                </div>
            </div>
        );
    }
}

export default Home;
