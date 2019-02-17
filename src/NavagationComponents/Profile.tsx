import * as React from "react";

import ShadowBoxing from "shadowboxing"

import COLORSCHEME from "../Support/ColorScheme"
import Updater from "../Types/Updater"


interface JoinEventProps {
    updater: Updater
    geolocation: any
}

class Profile extends React.Component<JoinEventProps> {
    public render() {
        const componentWrapperStyle: React.CSSProperties = {
            backgroundColor: COLORSCHEME.primaryLight,
            width: "100%",
        }

        return (
            <div style={componentWrapperStyle}>
                JoinEvent
            </div>
        );
    }
}

export default Profile;
