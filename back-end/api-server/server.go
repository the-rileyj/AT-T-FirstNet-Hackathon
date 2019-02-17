package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/olahol/melody"
	uuid "github.com/satori/go.uuid"
)

type globalMessage struct {
	ID   string      `json:"id"`
	PID  string      `json:"pid"`
	Type string      `json:"type"`
	Data interface{} `json:"data"`
}

type globalResponse struct {
	ID   string `json:"id"`
	PID  string `json:"pid"`
	Type string `json:"type"`
	Data string `json:"data"`
}

type addEventMessage struct {
	ID   string `json:"id"`
	PID  string `json:"pid"`
	Type string `json:"type"`
	Data struct {
		Name     string `json:"name"`
		Location string `json:"location"`
		Address  string `json:"address"`
	} `json:"data"`
}

type connectMessage struct {
	ID   string `json:"id"`
	PID  string `json:"pid"`
	Type string `json:"type"`
	Data struct {
		Name string `json:"name"`
		PID  string `json:"pid"`
	} `json:"data"`
}

var (
	events           map[string]map[string]*melody.Session
	people           map[string]string
	sessionsToIDs    map[*melody.Session]string
	idToSessions     map[string]*melody.Session
	sessionsToEvents map[*melody.Session]string
	eventMessages    map[string][]string
)

func init() {
	events = make(map[string]map[string]*melody.Session)
	people = make(map[string]string)
	sessionsToIDs = make(map[*melody.Session]string)
	idToSessions = make(map[string]*melody.Session)
	sessionsToEvents = make(map[*melody.Session]string)
	eventMessages = make(map[string][]string)
}

func globalMessageHandler(s *melody.Session, msg []byte) {
	var err error
	globalMessage := addEventMessage{}

	err = json.Unmarshal(msg, &globalMessage)

	switch globalMessage.Type {
	case "create-event":

		addEvent := addEventMessage{}

		json.Unmarshal(msg, &addEvent)

		nid := getUUID()

		_, exists := events[nid][addEvent.PID]

		if !exists {
			events[nid] = make(map[string]*melody.Session)
		}

		events[nid][addEvent.PID] = s

		eventMessages[nid] = make([]string, 0)

		response := globalResponse{ID: addEvent.ID, Data: "/event/" + nid}

		b, _ := json.Marshal(response)

		s.Write(b)
	case "connect":
		connect := connectMessage{}

		json.Unmarshal(msg, &connect)

		people[connect.PID] = connect.Data.Name
		sessionsToIDs[s] = connect.PID
		idToSessions[connect.PID] = s
	case "people":

	}

	if err != nil {
		fmt.Println(err)
	}
}

func getUUID() string {
	var err error
	var uid uuid.UUID

	for uid, err = uuid.NewV4(); err != nil; {
		uid, err = uuid.NewV4()
	}

	return uid.String()
}

func main() {
	debug := flag.Bool("d", false, "Sets debugging mode, Cross-Origin Resource Sharing policy won't discriminate against the request origin (\"Access-Control-Allow-Origin\" header is \"*\")")

	flag.Parse()

	router := gin.Default()
	global := melody.New()
	// event := melody.New()

	api := router.Group("/api")

	if *debug {
		api.Use(func(c *gin.Context) {
			c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

			c.Next()
		})
	}

	// api.GET("/ws/event/:eid/:pid", func(c *gin.Context) {
	// 	err := event.HandleRequest(c.Writer, c.Request)

	// 	if err != nil {
	// 		fmt.Println(err)
	// 	}
	// })

	// event.HandleConnect(func(s *melody.Session) {
	// 	nid := sessionsToEvents[s]
	// 	pid := sessionsToIDs[s]

	// 	messages := append([]string{}, eventMessages[nid]...)

	// 	b, _ := json.Marshal(messages)

	// 	events[nid][pid] = s

	// 	response := globalResponse{ID: addEvent.ID, Data: "/event/" + nid}

	// 	b, _ := json.Marshal(response)

	// 	s.Write(b)
	// })

	global.HandleMessage(globalMessageHandler)

	global.HandleDisconnect(func(s *melody.Session) {
		id, exists := sessionsToIDs[s]

		if exists {
			delete(idToSessions, id)
			delete(sessionsToIDs, s)
		}
	})

	api.GET("/ws/global", func(c *gin.Context) {
		err := global.HandleRequest(c.Writer, c.Request)

		if err != nil {
			fmt.Println(err)
		}
	})

	log.Fatal(router.Run(":8001"))
}
