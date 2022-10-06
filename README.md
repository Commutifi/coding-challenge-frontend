# Weather Forecasting Microsite for Communiti

This is responsive microsite that display the weather forecast at the locations given in the white text box.

# Start

```
  cd frontend
  yarn install
  yarn start

  cd backend
  yarn install
  yarn start
```

## Functional requirements

- Has a simple onboarding screen that will trigger the weather forecast base on the geolocation API of the browser. <img src='https://www.clipartmax.com/png/full/37-379751_open-green-check-mark-svg.png' style='width: 15px; height:15px;'></img>
- Provide an user input where the user can change the location. <img src='https://www.clipartmax.com/png/full/37-379751_open-green-check-mark-svg.png' style='width: 15px; height:15px;'></img>
- Forecasts for: today, tomorrow and the day after tomorrow should be shown. <img src='https://www.clipartmax.com/png/full/37-379751_open-green-check-mark-svg.png' style='width: 15px; height:15px;'></img>
- For temperatures below 15ºC, blue color should be used, for temperatures above 35ºC, red should be used and yellow should be used for other temperatures. <img src='https://www.clipartmax.com/png/full/37-379751_open-green-check-mark-svg.png' style='width: 15px; height:15px;'></img>
- When there is no chosen location, gray should be used . If the user clicks on any temperature, the temperatures should be changed from Celsius to Fahrenheit or from Fahrenheit to Celsius. <img src='https://www.clipartmax.com/png/full/37-379751_open-green-check-mark-svg.png' style='width: 15px; height:15px;'></img>
- The color defined here can be use for the text color or the background, be creative. <img src='https://www.clipartmax.com/png/full/37-379751_open-green-check-mark-svg.png' style='width: 15px; height:15px;'></img>
- Components should flexible enough to display the day above or under the temperature.`Requirement not clear :(`

### You must give me bonus 

because I did
* Localization: support for multiple languages, you can add translation files and simply add to src/assets/locale/[country_code]
* Backend: mcache for get requests, protect API_KEYS

# Stack Used

`Node v16.15.1 React v18.2.0 Typescript v4.4.2`

* React, Typescript, TailwindCSS (for fast development), Redux/RTK for Front-end
* Express, mcache for Back-end

# Improvement Possibilities

- We can use animational backgrounds based on the weather, we can use
  - rainy effect https://codepen.io/jh3y/pen/WyNdMG
  - sunny effect https://codepen.io/t-n-l-ip/pen/LgBxdb
  - clouds effect https://codepen.io/Mark_Bowley/pen/LYZEBq
- We can store mostly-searched-history in localstorage
- We can check the history to prevent repeating the same request

## Front-end Structure
```
├── public                      # Public directory
├── src
│   ├── assets                  # Locale & Images
│   │   ├── locale              # Translation files for localization
│   ├── components              # UI components used in this application
│   ├── helper                  # Common functions like converting C=>F, F=>C
│   ├── redux                   # Redux-Toolkit directory with store and slices
│   ├── i18next.js              # Configuration for localization
├── package.json
├── tailwind.config.js          # TailwindCSS configuration
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.json               # Typescript compiler configuration
└── tsconfig.paths.json         # Typescript paths
```

## Backend-end Structure
```
├── src
│   ├── cache                   # Mcache for get requests
│   ├── controllers             # Controllers
│   ├── routes                  # Routes
│   ├── i18next.js              # Configuration for localization
├── config.js                   # Configuration fot the backend
├── express.js
└── package.json
```
