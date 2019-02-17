import * as React from "react";

import COLORSCHEME from "./ColorScheme"

import RoutingItems from "../Types/RoutingItems"
import SideBarLink from "./SideBarLink"

import { faBars, faTimesCircle } from "@fortawesome/pro-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Route, Switch } from 'react-router'
import { Link } from "react-router-dom"

interface ISideBarNavState {
    sideBarExtended: boolean
}

class SideBarNav extends React.Component<{}, ISideBarNavState> {
    public constructor(props: any) {
        super(props)

        this.closeSideBar = this.closeSideBar.bind(this)
        this.openSideBar = this.openSideBar.bind(this)
        this.toggleSideBar = this.toggleSideBar.bind(this)

        this.state = {
            sideBarExtended: false
        }
    }

    public render() {
        const sideNavigationStyle: React.CSSProperties = {
            backgroundColor: COLORSCHEME.primaryLight,
            height: "100%",
            justifyItems: "center",
            left: 0,
            overflowX: "hidden",
            overflowY: "hidden",
            position: "fixed",
            top: 0,
            transition: "0.25s",
            width: this.state.sideBarExtended ? "100%" : 0,
            zIndex: 1,
        }

        const sideBarLinksContainerStyle: React.CSSProperties = {
            display: "grid",
            gridTemplate: "auto / 1fr",
            height: "90vh",
            width: "100%",
        }

        return (
            <React.Fragment>
                <header className="App-header" style={{ alignItems: "center", backgroundColor: COLORSCHEME.primary, display: "flex", justifyContent: "space-between", height: "10vh" }}>
                    <a onPointerUp={this.toggleSideBar}>
                        <FontAwesomeIcon icon={faBars} style={{ color: COLORSCHEME.primaryText, cursor: "pointer", fontSize: "6vh", margin: "2vh" }} />
                    </a>
                    <Switch>
                        {/*
                            We don't want the "KDSU {KDSU LOGO}" (this.homeHeader) elements to show up on the home page
                            because we basically already have it showing about the radio, so filter it out of the routes
                            that will show the this.homeHeader Component
                            NOTE: we filter it out by the text, so if the text for the home component changes in
                            ./src/Types/RoutingItems.tsx then this will not work properly
                         */}
                        {RoutingItems.filter((routingItem) => routingItem.text != "Home").map((routingItem, index) => <Route key={index} path={routingItem.route} render={this.homeHeader} />)}
                    </Switch>
                    <FontAwesomeIcon icon={faBars} style={{ color: "rgba(0,0,0,0)", fontSize: "6vh", margin: "2vh" }} />
                </header>
                <div id="mySidenav" className="sidenav" style={sideNavigationStyle}>
                    <div onClick={this.closeSideBar} style={{ alignItems: "center", backgroundColor: COLORSCHEME.primary, color: COLORSCHEME.primaryText, display: "flex", height: "10vh", justifyContent: "center", width: "100%" }}>
                        <a onPointerUp={this.toggleSideBar} style={{ cursor: "pointer", display: "flex", justifyContent: "center", width: "100%", }}>
                            <FontAwesomeIcon icon={faTimesCircle} style={{ color: COLORSCHEME.primaryText, fontSize: "6vh", margin: "2vh" }} />
                        </a>
                    </div>
                    <div style={sideBarLinksContainerStyle}>
                        {RoutingItems.filter((routingItem) => routingItem.text !== "").map((routingItem, index) => (
                                <SideBarLink action={this.closeSideBar} hover={{ backgroundColor: COLORSCHEME.primaryDark }} key={index} normal={{ backgroundColor: COLORSCHEME.primaryLight }} route={routingItem.route} >
                                    {routingItem.text}
                                </SideBarLink>
                            )
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }

    public closeSideBar() {
        this.setState({
            sideBarExtended: false
        })
    }

    public homeHeader() {
        return (
            <Link to="/" style={{ alignItems: "center", display: "flex", height: "100%", padding: "2%", textDecoration: "none", width: "auto", }}>
                <span style={{ color: COLORSCHEME.primaryText, fontSize: "6vh", paddingRight: "2vh", paddingTop: "1vh" }}>
                    SafetyNet
                </span>
                {/* <img alt="logo" height="1336" src={kdsuLogo} width="1136" style={{ display: "inline-block", maxHeight: 1136, maxWidth: 1336, height: "100%", width: "auto" }} /> */}
            </Link>
        )
    }

    public openSideBar() {
        this.setState({
            sideBarExtended: true
        })
    }

    public toggleSideBar(event: React.PointerEvent<HTMLAnchorElement>) {
        this.setState({
            sideBarExtended: !this.state.sideBarExtended
        })

        event.preventDefault()
        event.stopPropagation()
    }
}

export default SideBarNav;
