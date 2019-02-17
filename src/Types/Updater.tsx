import serverURL from "../Support/ServerURL"


export function getNewResiliantWebsocket(wsConnectURL: string, onmessageFunc: any, retryFunc=()=>{}): WebSocket {
    let websocket: WebSocket = new WebSocket(wsConnectURL)

    const retry = () => {
        if (retryFunc !== undefined)
            retryFunc()
        websocket = getNewResiliantWebsocket(wsConnectURL, onmessageFunc, retryFunc)
    }

    websocket.onmessage = onmessageFunc

    websocket.onopen = () => {
        websocket.onerror = retry
        websocket.onclose = retry
    }

    return websocket
}


// const wsConnectURL: string = `/ws/song-title-updater`

class Updater {
    broker: Map<string, any>
    ws: WebSocket

    public constructor(connectionPath: string) {
        this.broker = new Map<string, any>()

        this.ws = getNewResiliantWebsocket(`ws://${serverURL}${connectionPath}`, this.handleWebsocketMessage)
    }

    public Request(data: any, type: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            const msgID = this.getID()
            let gotResponse = false, id: NodeJS.Timeout

            let handleCleanUp = () => {
                clearTimeout(id);
                gotResponse = true
            }

            let handleErrorResponse = (responseData: any) => {
                reject(responseData.msg)
                handleCleanUp()
            }

            let handleSuccessResponse = (responseData: any) => {
                resolve(responseData)
                handleCleanUp()
            }

            this.send(data, type, msgID)

            id = setTimeout(() => {
                handleCleanUp()
                reject("timeout")
            }, 5000)



            while (!gotResponse) {
                let response = this.broker.get(msgID)

                if (response !== undefined) {
                    if (response.err)
                        handleErrorResponse(response)
                    else
                        handleSuccessResponse(response)

                    return
                }
            }
        })
    }

    private send(data: any, type: string, id: string) {
        this.ws.send(JSON.stringify({data, type, id}))
    }

    private getID(): string {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    private handleWebsocketMessage(message: MessageEvent) {
        // TYPE RESPONSE
        let response: any = JSON.parse(message.data)

        this.broker.set(response.id, response)
    }
}

export default Updater;
