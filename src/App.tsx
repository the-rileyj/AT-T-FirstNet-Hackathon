import * as React from "react";

import COLORSCHEME from "./Support/ColorScheme"
import Header from "./Support/Header"

import RoutingItems from "./Types/RoutingItems"

import { Route, Switch } from 'react-router'



class App extends React.Component {
    public render() {
        return (
            <div className="App" style={{ backgroundColor: COLORSCHEME.primaryLight, minHeight: "100vh", }}>
                <Header />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Switch>
                        {RoutingItems.map((routingItem, index) => <Route key={index} path={routingItem.route} component={routingItem.component} />)}
                    </Switch>
                </div>
            </div>
        );
    }

    // private handleClick() {
    //     this.ws = new WebSocket("ws://localhost:8001/api/ws/stt")

    //     let prom = this.audioContext.resume()

    //     this.ws.onerror = (err) => {
    //         console.log(err)
    //     }

    //     this.ws.onclose = (ev) => {
    //         console.log(ev)
    //     }

    //     this.ws.onopen = () => {
    //         prom.then(() => {
    //             navigator.mediaDevices.getUserMedia({ "audio": true, "video": false }).then(this.handleSuccess).catch(this.handleError);
    //         })
    //     }

    // }

    // private handleSuccess(stream: MediaStream) {
    //     const audioTracks = stream.getAudioTracks();
    //     console.log('Got stream with constraints:', { "audio": true, "video": false });
    //     console.log('Using audio device: ' + audioTracks[0].label);
    //     stream.oninactive = function () {
    //         console.log('Stream ended');
    //     };
    //     // window.stream = stream; // make variable available to browser console
    //     const handleSize = 256
    //     var source = this.audioContext.createMediaStreamSource(stream)
    //     var proc = this.audioContext.createScriptProcessor(handleSize, 2, 2)

    //     source.connect(proc)

    //     proc.connect(this.audioContext.destination)

    //     let logonce = true

    //     let self = this
    //     let rate = 0
    //     let limit = 100

    //     proc.onaudioprocess = function (event) {
    //         let audio_data = event.inputBuffer.getChannelData(0) || null

    //         // let conversion = Array<Int16Array>(audio_data.length)
    //         // audio_data.

    //         // for (let i = 0; i < audio_data.length; i++) {
    //         //     for (let j = 0; j < audio_data[i].length; )
    //         // }

    //         // let conversion = audio_data.map(({array}) => array.map((fl) => int16(32767 * flt)))
    //         // let conversion = Array.from(audio_data).map((n, i, arr) => {
    //         //     return arr.map(())
    //         // })

    //         let length = audio_data.length
    //         let buf = new Array(handleSize)

    //         while (length--) {
    //             // s = Math.max(-1, Math.min(1, samples[l]));
    //             buf[length] = Math.trunc(audio_data[length] * 0x7FFF);
    //             //buf[l] = buffer[l]*0xFFFF; //old   //convert to 16 bit
    //         }

    //         let res = JSON.stringify(buf)

    //         if (self.ws !== undefined && rate % limit === 0) {
    //             self.ws.send(res)
    //             rate = 0

    //             // console.log(res)
    //         }

    //         rate++

    //         // console.log(res)

    //         // if (audio_data !== null && logonce) {
    //         //     logonce = false
    //         //     console.log(audio_data[0])
    //         //     console.log(audio_data.map((val) => Math.trunc(val * 32767)))
    //         // }

    //         // console.log(audio_data)
    //         // send audio_data to server
    //     }
    // }

    // private handleError(error: any) {
    //     console.log('navigator.MediaDevices.getUserMedia error: ', error.message, error.name);
    // }
}

export default App;
