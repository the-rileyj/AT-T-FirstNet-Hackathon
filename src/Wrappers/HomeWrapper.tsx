import * as React from "react"

import Home from "../NavagationComponents/Home"
import Updater from "../Types/Updater"

const HomeWrapper = (updater: Updater, geolocation: any) => {
    return () => <Home updater={updater} geolocation={geolocation} />
}

export default HomeWrapper