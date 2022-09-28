# Commutifi coding challenge frontend

Your challenge is to build a responsive microsite that display the weather forecast at the locations given in the white text box.

## Functional requirements

- Has a simple onboarding screen that will trigger the weather forecast base on the geolocation API of the browser.
- Provide an user input where the user can change the location.
- Forecasts for: today, tomorrow and the day after tomorrow should be shown.
- For temperatures below 15ºC, blue color should be used, for temperatures above 35ºC, red should be used and yellow should be used for other temperatures.
- When there is no chosen location, gray should be used . If the user clicks on any temperature, the temperatures should be changed from Celsius to Fahrenheit or from Fahrenheit to Celsius.
- The color defined here can be use for the text color or the background, be creative.

## Non-functional requirements

- Challenge is submitted as pull request against this repo ([fork it](https://help.github.com/articles/fork-a-repo/) and [create a pull request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/).
- The microsite should be deployed and usable.

### Bonus

* Localization: support for multiple languages (English, French, ...)
* Backend: proxy the request, handle better the quota (cache?)
### Remarks

* You can setup your microsite any way you like; we're partial to NodeJS, ExpressJS and React
* CSS can be written using SASS, LESS or similar higher-level language

### Things that are important to us

- Code quality, maintainability and readability
- Attention to the User Experience

### Things you'll not be evaluated on

- Features we didn't list in this README
- The quantity of code you write

# Documentation

## Supporting API

- To consult the weather forecast, you can use [OpenWeather](https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&appid=b81cd1a66eaee287ea9830aa66250511] using the API key `b81cd1a66eaee287ea9830aa66250511`. If necessary, create a new account.
- To convert latitude and longitude to a location use [OpenCage](https://api.opencagedata.com/geocode/v1/json?q=%7B%7Blatitude%7D%7D,%7B%7Blongitude%7D%7D&key=066c930b1b9f4d9bb89733fb93e9827b&language=en) using the API key `066c930b1b9f4d9bb89733fb93e9827b`. If necessary, create a new account.


# Evaluation criteria

- Organization of code
- Clarity: Does the README explain briefly what the problem is and how can I run the application?
- Assertiveness: Is the application doing what is expected?
- Code readability
- Security: Are there any clear vulnerabilities?
- Test coverage
- History of commits (structure and quality)
- UX: Is the interface user-friendly and self-explanatory? Is the API intuitive?
- Technical choices

# Doubts

Any questions you may have, open an [issue](https://github.com/Commutifi/coding-challenge-frontend). But take time to think before :)