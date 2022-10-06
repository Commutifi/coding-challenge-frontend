# Weather Forecasting Microsite for Communiti

This is responsive microsite that display the weather forecast at the locations given in the white text box.

## Functional requirements

- Has a simple onboarding screen that will trigger the weather forecast base on the geolocation API of the browser. <img src='https://www.clipartmax.com/png/full/37-379751_open-green-check-mark-svg.png' width={15} height={15}></img>
- Provide an user input where the user can change the location. <img src='https://www.clipartmax.com/png/full/37-379751_open-green-check-mark-svg.png' width={15} height={15}></img>
- Forecasts for: today, tomorrow and the day after tomorrow should be shown. <img src='https://www.clipartmax.com/png/full/37-379751_open-green-check-mark-svg.png' width={15} height={15}></img>
- For temperatures below 15ºC, blue color should be used, for temperatures above 35ºC, red should be used and yellow should be used for other temperatures. <img src='https://www.clipartmax.com/png/full/37-379751_open-green-check-mark-svg.png' width={15} height={15}></img>
- When there is no chosen location, gray should be used . If the user clicks on any temperature, the temperatures should be changed from Celsius to Fahrenheit or from Fahrenheit to Celsius. <img src='https://www.clipartmax.com/png/full/37-379751_open-green-check-mark-svg.png' width={15} height={15}></img>
- The color defined here can be use for the text color or the background, be creative. <img src='https://www.clipartmax.com/png/full/37-379751_open-green-check-mark-svg.png' width={15} height={15}></img>
- Components should flexible enough to display the day above or under the temperature.`Requirement not clear :(`

### You must give me bonus 

because I did
* Localization: support for multiple languages, you can add translation files and simply add to src/assets/locale/[country_code]
* Backend: mcache for get requests, protect API_KEYS

# Stack Used

`Node v16.15.1 React v18.2.0 Typescript v4.4.2`

* React, Typescript, TailwindCSS (for fast development), Redux/RTK for Front-end
* Express, mcache for Back-end

# Project Design & Possibilities

`It took me 4 days to build this microsite, so 2 days for research and designing the project, 2 days for implementation`

- UI/UX improvement possibilities
  - We can use animational backgrounds based on the weather, we can use
    - rainy effect https://codepen.io/jh3y/pen/WyNdMG
    - sunny effect https://codepen.io/t-n-l-ip/pen/LgBxdb
    - clouds effecthttps://codepen.io/Mark_Bowley/pen/LYZEBq
  - We can store mostly-searched-history in localstorage
- 