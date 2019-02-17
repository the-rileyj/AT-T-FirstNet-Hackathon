package main

// // speechToTextHandler := melody.New()

// 	// speechToTextHandler.Upgrader.

// 	speechToTextHandler.HandleMessage(func(s *melody.Session, byts []byte) {
// 		mu := struct {
// 			data []int16
// 		}{}

// 		err := json.Unmarshal(byts, &mu)

// 		if err != nil {
// 			log.Fatal(err)
// 		}

// 		if len(mu.data) == 0 {
// 			return
// 		}

// 		wbuf := new(bytes.Buffer)

// 		err = binary.Write(wbuf, binary.LittleEndian, mu.data)

// 		if err != nil {
// 			fmt.Println("binary.Write failed:", err)
// 		}
// 		byts = wbuf.Bytes()

// 		fmt.Println("TEST")
// 		os.Setenv("GOOGLE_APPLICATION_CREDENTIALS", "./credentials.json")
// 		ctx := context.Background()

// 		// [START speech_transcribe_streaming_mic]
// 		client, err := speech.NewClient(ctx)

// 		if err != nil {
// 			log.Fatal(err)
// 		}
// 		// stream, err := client.StreamingRecognize(ctx)
// 		// if err != nil {
// 		// 	log.Fatal(err)
// 		// }
// 		// Send the initial configuration message.
// 		resp, err := client.Recognize(ctx,
// 			&speechpb.RecognizeRequest{
// 				Config: &speechpb.RecognitionConfig{
// 					Encoding:        speechpb.RecognitionConfig_LINEAR16,
// 					SampleRateHertz: 16000,
// 					LanguageCode:    "en-US",
// 				},
// 				Audio: &speechpb.RecognitionAudio{
// 					AudioSource: &speechpb.RecognitionAudio_Content{Content: byts},
// 				},
// 			},
// 		)

// 		if err != nil {
// 			fmt.Println(err)
// 		}

// 		for _, result := range resp.Results {
// 			for _, alt := range result.Alternatives {
// 				fmt.Printf("\"%v\" (confidence=%3f)\n", alt.Transcript, alt.Confidence)
// 			}
// 		}
// 	})

// 	api.GET("/ws/stt", func(c *gin.Context) {
// 		speechToTextHandler.HandleRequest(c.Writer, c.Request)
// 	})
