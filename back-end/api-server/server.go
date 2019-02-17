package main

import (
	"flag"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	debug := flag.Bool("d", false, "Sets debugging mode, Cross-Origin Resource Sharing policy won't discriminate against the request origin (\"Access-Control-Allow-Origin\" header is \"*\")")

	flag.Parse()

	router := gin.Default()

	api := router.Group("/api")

	if *debug {
		api.Use(func(c *gin.Context) {
			c.Writer.Header().Set("Access-Control-Allow-Origin", "*")

			c.Next()
		})
	}

	log.Fatal(router.Run(":8001"))
}
