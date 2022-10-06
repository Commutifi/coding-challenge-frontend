import toggleTemperatureColor from '../helpers/temperatureColorToggle'


const black = 'black'
const red = 'red'
const yellow = 'yellow'
const blue = 'blue'
const mode = {
    scale: 'fahrenheit'
}

describe("Fahrenheit temperature color toggle tests", () => {

    test('30 fahrenheit should return blue', () => {
        expect(toggleTemperatureColor(30, mode)).toBe(blue)
    });

    test('98 fahrenheit should return red', () => {
        expect(toggleTemperatureColor(98, mode)).toBe(red)
    });

    test('70 fahrenheit should return yellow', () => {
        expect(toggleTemperatureColor(70, mode)).toBe(yellow)
    });

    test('unrecognized scale should return black', () => {
        mode.scale = 'volunteer'
        expect(toggleTemperatureColor(70, mode)).toBe(black)
    });

    test('unrecognized scale should return black', () => {
        mode.scale = 'volunteer'
        expect(toggleTemperatureColor(70, mode)).toBe(black)
    });

    test('string value temperature should return black', () => {
        expect(toggleTemperatureColor(70, mode)).toBe(black)
    });

    test('[] temperature should return black', () => {
        expect(toggleTemperatureColor(70, mode)).toBe(black)
    });

    test('boolean temperature should return black', () => {
        expect(toggleTemperatureColor(70, mode)).toBe(black)
    });

    test('{} temperature should return black', () => {
        expect(toggleTemperatureColor(70, mode)).toBe(black)
    });

    test('null temperature should return black', () => {
        expect(toggleTemperatureColor(70, mode)).toBe(black)
    });
})

describe("Celcius temperature color toggle tests", () => {
    const mode = {
        scale: 'celcius'
    }

    test('10 celcius should return blue', () => {
        expect(toggleTemperatureColor(10, mode)).toBe(blue)
    });

    test('36 celcius should return red', () => {
        expect(toggleTemperatureColor(36, mode)).toBe(red)
    });

    test('20 celcius should return yellow', () => {
        expect(toggleTemperatureColor(20, mode)).toBe(yellow)
    });
})

describe("temperature and scale tests with wrong data structures", () => {
    const mode = {
        scale: 'volunteer'
    }

    test('unrecognized scale should return black', () => {
        expect(toggleTemperatureColor(70, mode)).toBe(black)
    });

    test('string value temperature and scale should return black', () => {
        expect(toggleTemperatureColor('70', mode)).toBe(black)
    });

    test('[] temperature and scale should return black', () => {
        mode.scale = []
        expect(toggleTemperatureColor([70], mode)).toBe(black)
    });

    test('boolean temperature and scale should return black', () => {
        mode.scale = true
        expect(toggleTemperatureColor(true, mode)).toBe(black)
    });

    test('{} temperature and scale should return black', () => {
        expect(toggleTemperatureColor({}, {})).toBe(black)
    });

    test('null temperature and scale should return black', () => {
        mode.scale = null
        expect(toggleTemperatureColor(null, mode)).toBe(black)
    });


})
