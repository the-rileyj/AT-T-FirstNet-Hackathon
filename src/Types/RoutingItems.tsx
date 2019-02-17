import * as React from "react"

import Home from "../NavagationComponents/Home"
import CreateEvent from "../NavagationComponents/CreateEvent"
import Dashboard from "../NavagationComponents/Dashboard"
import CreateEventWrapper from "../Wrappers/CreateEventWrapper"
import EventWrapper from "../Wrappers/EventWrapper"
import HomeWrapper from "../Wrappers/HomeWrapper"
import JoinEvent from "../NavagationComponents/JoinEvent"
import Profile from "../NavagationComponents/Profile"
import Updater from "./Updater";


interface IRoutingItem {
    component: (updater: Updater, geolocation: any) => (props: any) => any
    route: string
    text: string
}

const RoutingItems: IRoutingItem[] = [
    // { component: About, route: "/about", text: "About" },
    // { component: Contact, route: "/contact", text: "Contact" },
    // { component: DiskJockeys, route: "/djs", text: "DJs" },
    // { component: JoinEvent, route: "/join-event", text: "Join Event" },
    { component: CreateEventWrapper, route: "/create-event", text: "Create Event" },
    { component: EventWrapper, route: "/event/:eid", text: "" },
    // Always keep the home route as the last item,
    // when the routes are registered in "App.tsx" they will match
    // the URL based off of the order of registration, so if this is put
    // before another route, the other route will never show because the "/"
    // path will match every route
    { component: HomeWrapper, route: "/", text: "Home" },
    // { route: "/requests", text: "Requests" },
]

export default RoutingItems