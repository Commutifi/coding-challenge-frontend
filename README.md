# CommutiCast App
![CommutiCast](https://ibb.co/5FZw2PN)

Commuticast is a microsite made in React that displays the weather forecast for any given location, allowing the user to interact with a simple, yet easy-to-use interface.
This project was made within a day as a frontend coding challenge. The main purpose of this web application is to test my current experience and development knowledge with HTML, CSS, JavaScript, and ReactJS.
[LIVE DEMO](https://github.com/facebook/create-react-app).


### Gallery

![Main Menu](https://ibb.co/vDJTnmr)
![Minimized Card](https://ibb.co/hKcdJHx)
![Card Design](https://ibb.co/pvZhV3c)
![Search Input](https://ibb.co/vcYwGhR)

### How to run application locally

1. Clone repo to your local computer
2. Open folder with desired Code Editor
3. Run `npm install` in Terminal to install missing dependencies
4. Run `npm start` in Terminal
5. Navigate to the `localhost` instance for previewing

## Characteristics

- Onboarding screen that welcomes users and asks for a specific city for future previewing. 
- User input that allows for new searches and provides new city suggestions.
- Custom cards with the weather forecasts for: today, tomorrow, and the day after tomorrow.
- Cards can be minimized and removed. Temperature units are changed when clicked from ºF to ºC and vice-versa.
- Functional components made with the following hooks: useState, useEffect, useRef.


### Main concerns 

* Working code
* Code readability and usability
* Good coding practices
* User experience
* Aesthetically pleasing user interfaces

### Dependencies

* @heroicons
* react-dotenv
* sass

### API Calls

* [OpenWeather GEOCODING](https://openweathermap.org/api/geocoding-api) (Direct geocoding given Location)
* [OpenWeather FORECAST](https://openweathermap.org/forecast5) (Weather forecast given Coordinates) 


### Bonuses

* Used .env variables for hiding API_KEY from React components
* Generated custom icons, animations, and mockup components such as Header and Footer in order to match the company's identity.
* Simple responsiveness for mobile and desktop using Grid and Flexbox
* Links to company official site and my Github account


### Possible improvements

I believe there is still plenty of room for improvements and although I am pleased with the end result, I was able to recognize my weak spots during the app's development. 
This microwebsite could be highly improved in the following aspects: 

- Separate my main Weather component logic into smaller components
- Better search parameters and options when searching for cities
- Create Parameters component that allows user to customize which data to show in each WeatherCard
- Implement a feature that recognizes the browsers' current location
- Learn how to add custom cookies to the application so that active sessions can be saved
- Support multiple languages 
- Cleaner Sass code, avoid React inline styling
- Find better names for my variables and functions
- Among many other stuff (Happy to read your feedback, by the way!)


## Contact

**If you would like to see more of my work, check out my online portfolio at** [http://devtoti.vercel.app](http://devtoti.vercel.app)


toti.webdev@gmail.com

Sincerely,
Antonio.

Last update: October 14th, 2022

