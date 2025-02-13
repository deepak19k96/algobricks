const json_data = {
  tickets: [
    {
      EventName: 'Dayton Dragons vs. Fort Wayne Tincaps',
      Venue: 'Day Air Ballpark',
      EventDate: 'Apr 19',
      EventTime: '7:05 PM',
      basicBarcode: '846032322067626330e',
      exitPortal: 'BUTLER LAWN D',
      seat: '20',
      row: 'D07',
      section: 'LAWND',
      background_color: '#026CDF',
      header_color: '#FFFFFF',
      barcode:
        'eyJiIjoiODQ2MDMyMzIyMDY3NjI2MzMwRSIsInQiOiJCV2tCQU1vbEIzRCtjaEh1blpNQ1Fxd1JBQVRpdHZYcXJJdnhjZktRNndaakpJWmx6Z1Y3WVFmNERoL1RPTkhaIiwiY2siOiIzNjZhODYzMzJmMTQ0ODA1MzllZTQ4MzBmMjM4MzczODcxYjRiZDc1IiwiZWsiOiJhY2EyZjA3MDJkNzE3ZmYyZjAyMTYwZjIwOTU3OTBlODY0YWQ3M2I0IiwicnQiOiJyb3RhdGluZ19zeW1ib2xvZ3kifQ==',
      jwt: 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJ0aWNkLXdhbGxldC1wcm9kQHRpY2QtcHJvZC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imdvb2dsZSIsInR5cCI6InNhdmV0b2FuZHJvaWRwYXkiLCJpYXQiOjE3MTM1NDY5MDAsInBheWxvYWQiOnsiZXZlbnRUaWNrZXRPYmplY3RzIjpbeyJjbGFzc0lkIjoiMzIzOTU2MzI2NzczNzU3MzE5Mi5wcm9kLjFBcFprdnBHa2RubzRCXy5PUEVOX1BMQVRGT1JNLjNlMzMyMWZkYTQzNWY0YzY5MWU5ZmEwNmQxMWEwYmM5OTFkZWRhMzEiLCJkaXNhYmxlRXhwaXJhdGlvbk5vdGlmaWNhdGlvbiI6dHJ1ZSwiaWQiOiIzMjM5NTYzMjY3NzM3NTczMTkyLnByb2QuMUFwWmt2cEdrZG5vNEJfLk9QRU5fUExBVEZPUk0uODQ2MDMyMzIyMDY3NjI2MzMwLjI1MzM3OTQ0NDMuSE9TVC5BTkRST0lELk5GQyIsInN0YXRlIjoiYWN0aXZlIiwidmVyc2lvbiI6MX1dfSwib3JpZ2lucyI6WyJodHRwOi8vd3d3LnRpY2tldG1hc3Rlci5jb20iLCJodHRwczovL3d3dy50aWNrZXRtYXN0ZXIuY29tIl19.cgbQ5m-r-JGsDESRTWLgGev5Pcgip-ZTvD6r9InSeKnBRNHpAAjvxiwbk2lSdcGVxCReEXr_aER07hd76BxWP-0HKWvsX-a2cGG79GKEJq68DyNDNIHruhJeplhUd_mLNX2NzeRUjDJFANeEQelkZ8h-T5qr4DuhycfNeHgYPBBaRaW_XlRABAeSLqoX8HMA0a96M1tw1h4XwWiZn7fT1IKHxAEU_cK3zc4T3X5cii4yi9xtP1_QS18Cy_OQU1CSK0JaDVbW9dIRF3F8zMQk4RCPXcMaN09P_kPHWGdZVQ470zjJrHygjuxDV82iTbLFgy_5ZSHGRDTj8lVtj3dn5g'
    }

    // {
    // 	"EventName": "Bad Bunny",
    // 	"Venue": "BRIDGESTONE ARENA",
    // 	"EventDate": "May 11",
    // 	"EventTime": "8 pm",
    // 	"basicBarcode": "255971111525758845e",
    // 	"exitPortal": "BUD LIGHT LEVEL",
    // 	"seat": "1",
    // 	"row": "M",
    // 	"section": "316",
    // 	"background_color": "#026CDF",
    // 	"header_color": "#FFFFFF",
    // 	"barcode": "eyJiIjoiMjU1OTcxMTExNTI1NzU4ODQ1RSIsInQiOiJCWEVLQUtWZzFUSDlDQkh1cGJJQ1Fxd1JBQVN2M0FuVjQyd0IwM1ZORzIyY3lCNTBsbzUvd1ZnZzZBVG03MkNRIiwiY2siOiIwNTc0ZDhkMTk3MGE5OGVmODRhMzkwNTYzMGYwOTRkZTU5Yjg3OGU5IiwiZWsiOiI2ZWRlYzNiYzVjMmYxNDkxZjkxZmJhODMwMjYwMDE3OTc5ZjEwZTRlIiwicnQiOiJyb3RhdGluZ19zeW1ib2xvZ3kifQ==",
    // 	"jwt": "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJ0aWNkLXdhbGxldC1wcm9kQHRpY2QtcHJvZC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imdvb2dsZSIsInR5cCI6InNhdmV0b2FuZHJvaWRwYXkiLCJpYXQiOjE3MTMzOTI0MDMsInBheWxvYWQiOnsiZXZlbnRUaWNrZXRPYmplY3RzIjpbeyJjbGFzc0lkIjoiMzIzOTU2MzI2NzczNzU3MzE5Mi5wcm9kLkc1dmlaOWd1VDF2OEYuT1BFTl9QTEFURk9STS5lZGVjYTI1MzIzMmJjZDE5OTZlZWM0YTcyNGEwMGM3YjFmMjk0MzNkIiwiZGlzYWJsZUV4cGlyYXRpb25Ob3RpZmljYXRpb24iOnRydWUsImlkIjoiMzIzOTU2MzI2NzczNzU3MzE5Mi5wcm9kLkc1dmlaOWd1VDF2OEYuT1BFTl9QTEFURk9STS4yNTU5NzExMTE1MjU3NTg4NDUuMzUwOTMyNzQ3NS5IT1NULkFORFJPSUQuTkZDIiwic3RhdGUiOiJhY3RpdmUiLCJ2ZXJzaW9uIjoxfV19LCJvcmlnaW5zIjpbImh0dHA6Ly93d3cudGlja2V0bWFzdGVyLmNvbSIsImh0dHBzOi8vd3d3LnRpY2tldG1hc3Rlci5jb20iXX0.eGjOi-YZclR0WlfI02eBCmjSett6L8Abo92mt6-msuwBAgV__wk64JsbN2XATMcQDFsAO2qQ_INHMYgXneNysbsx84rjUYlzXYeMzOacoBgtgvMHSXSAjIqlbE36bhs7ETpSurol0VPRIxBSUtTSsDLvRq_PSTjMqvXor-hnmNQVVOU0ijHjdJ2c7-ERupD0HYXgxqQfsvUF9MipkYcMTw5RZn3S4eE00oc3VKtcPUkx0vLqXR02VdaowzvKmB9TuvpEJeUR2OiZ1EBYebYwqxVkZmcwnrev4sLpmxJvK8zNMAjsMjhc2_Rn_hpspEpF-LgVsY3HDx49aFAebucNJg"
    // },
    // {
    // 	"EventName": "Bad Bunny",
    // 	"Venue": "BRIDGESTONE ARENA",
    // 	"EventDate": "Apr 26",
    // 	"EventTime": "8 pm",
    // 	"event_date": "2024-04-26T20:00:00Z",
    // 	"basicBarcode": "255971111525758845e",
    // 	"exitPortal": "BUD LIGHT LEVEL",
    // 	"seat": "1",
    // 	"row": "M",
    // 	"section": "316",
    // 	"background_color": "#026CDF",
    // 	"header_color": "#FFFFFF",
    // 	"barcode": "eyJiIjoiMjU1OTcxMTExNTI1NzU4ODQ1RSIsInQiOiJCWEVLQUtWZzFUSDlDQkh1cGJJQ1Fxd1JBQVN2M0FuVjQyd0IwM1ZORzIyY3lCNTBsbzUvd1ZnZzZBVG03MkNRIiwiY2siOiIwNTc0ZDhkMTk3MGE5OGVmODRhMzkwNTYzMGYwOTRkZTU5Yjg3OGU5IiwiZWsiOiI2ZWRlYzNiYzVjMmYxNDkxZjkxZmJhODMwMjYwMDE3OTc5ZjEwZTRlIiwicnQiOiJyb3RhdGluZ19zeW1ib2xvZ3kifQ==",
    // 	"jwt": "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJ0aWNkLXdhbGxldC1wcm9kQHRpY2QtcHJvZC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imdvb2dsZSIsInR5cCI6InNhdmV0b2FuZHJvaWRwYXkiLCJpYXQiOjE3MTMzOTI0MDMsInBheWxvYWQiOnsiZXZlbnRUaWNrZXRPYmplY3RzIjpbeyJjbGFzc0lkIjoiMzIzOTU2MzI2NzczNzU3MzE5Mi5wcm9kLkc1dmlaOWd1VDF2OEYuT1BFTl9QTEFURk9STS5lZGVjYTI1MzIzMmJjZDE5OTZlZWM0YTcyNGEwMGM3YjFmMjk0MzNkIiwiZGlzYWJsZUV4cGlyYXRpb25Ob3RpZmljYXRpb24iOnRydWUsImlkIjoiMzIzOTU2MzI2NzczNzU3MzE5Mi5wcm9kLkc1dmlaOWd1VDF2OEYuT1BFTl9QTEFURk9STS4yNTU5NzExMTE1MjU3NTg4NDUuMzUwOTMyNzQ3NS5IT1NULkFORFJPSUQuTkZDIiwic3RhdGUiOiJhY3RpdmUiLCJ2ZXJzaW9uIjoxfV19LCJvcmlnaW5zIjpbImh0dHA6Ly93d3cudGlja2V0bWFzdGVyLmNvbSIsImh0dHBzOi8vd3d3LnRpY2tldG1hc3Rlci5jb20iXX0.eGjOi-YZclR0WlfI02eBCmjSett6L8Abo92mt6-msuwBAgV__wk64JsbN2XATMcQDFsAO2qQ_INHMYgXneNysbsx84rjUYlzXYeMzOacoBgtgvMHSXSAjIqlbE36bhs7ETpSurol0VPRIxBSUtTSsDLvRq_PSTjMqvXor-hnmNQVVOU0ijHjdJ2c7-ERupD0HYXgxqQfsvUF9MipkYcMTw5RZn3S4eE00oc3VKtcPUkx0vLqXR02VdaowzvKmB9TuvpEJeUR2OiZ1EBYebYwqxVkZmcwnrev4sLpmxJvK8zNMAjsMjhc2_Rn_hpspEpF-LgVsY3HDx49aFAebucNJg"
    // },
    // {
    // 	"EventName": "Bad Bunny 2",
    // 	"Venue": "BRIDGESTONE ARENA 2",
    // 	"EventDate": "May 11",
    // 	"EventTime": "8 pm",
    // 	"basicBarcode": "255971111525758845b",
    // 	"exitPortal": "BUD LIGHT LEVEL 2",
    // 	"seat": "1",
    // 	"row": "M",
    // 	"section": "316",
    // 	"background_color": "#86198f",
    // 	"header_color": "#FFFFFF",
    // 	"barcode": "eyJiIjoiMjU1OTcxMTExNTI1NzU4ODQ1RSIsInQiOiJCWEVLQUtWZzFUSDlDQkh1cGJJQ1Fxd1JBQVN2M0FuVjQyd0IwM1ZORzIyY3lCNTBsbzUvd1ZnZzZBVG03MkNRIiwiY2siOiIwNTc0ZDhkMTk3MGE5OGVmODRhMzkwNTYzMGYwOTRkZTU5Yjg3OGU5IiwiZWsiOiI2ZWRlYzNiYzVjMmYxNDkxZjkxZmJhODMwMjYwMDE3OTc5ZjEwZTRlIiwicnQiOiJyb3RhdGluZ19zeW1ib2xvZ3kifQ==",
    // 	"jwt": "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJ0aWNkLXdhbGxldC1wcm9kQHRpY2QtcHJvZC5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsImF1ZCI6Imdvb2dsZSIsInR5cCI6InNhdmV0b2FuZHJvaWRwYXkiLCJpYXQiOjE3MTMzOTI0MDMsInBheWxvYWQiOnsiZXZlbnRUaWNrZXRPYmplY3RzIjpbeyJjbGFzc0lkIjoiMzIzOTU2MzI2NzczNzU3MzE5Mi5wcm9kLkc1dmlaOWd1VDF2OEYuT1BFTl9QTEFURk9STS5lZGVjYTI1MzIzMmJjZDE5OTZlZWM0YTcyNGEwMGM3YjFmMjk0MzNkIiwiZGlzYWJsZUV4cGlyYXRpb25Ob3RpZmljYXRpb24iOnRydWUsImlkIjoiMzIzOTU2MzI2NzczNzU3MzE5Mi5wcm9kLkc1dmlaOWd1VDF2OEYuT1BFTl9QTEFURk9STS4yNTU5NzExMTE1MjU3NTg4NDUuMzUwOTMyNzQ3NS5IT1NULkFORFJPSUQuTkZDIiwic3RhdGUiOiJhY3RpdmUiLCJ2ZXJzaW9uIjoxfV19LCJvcmlnaW5zIjpbImh0dHA6Ly93d3cudGlja2V0bWFzdGVyLmNvbSIsImh0dHBzOi8vd3d3LnRpY2tldG1hc3Rlci5jb20iXX0.eGjOi-YZclR0WlfI02eBCmjSett6L8Abo92mt6-msuwBAgV__wk64JsbN2XATMcQDFsAO2qQ_INHMYgXneNysbsx84rjUYlzXYeMzOacoBgtgvMHSXSAjIqlbE36bhs7ETpSurol0VPRIxBSUtTSsDLvRq_PSTjMqvXor-hnmNQVVOU0ijHjdJ2c7-ERupD0HYXgxqQfsvUF9MipkYcMTw5RZn3S4eE00oc3VKtcPUkx0vLqXR02VdaowzvKmB9TuvpEJeUR2OiZ1EBYebYwqxVkZmcwnrev4sLpmxJvK8zNMAjsMjhc2_Rn_hpspEpF-LgVsY3HDx49aFAebucNJg"
    // }
  ]
}

export default json_data
