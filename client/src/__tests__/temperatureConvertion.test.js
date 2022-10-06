import { fToC, cToF } from '../helpers/temperatureConvertion'

describe("Fahrenheit to Celcius convertion tests", () => {
  test('36 fahrenheit should return 2 celcius', () => {
    expect(fToC(36)).toBe(2);
  });

  test('39 fahrenheit should return 4 celcius', () => {
    expect(fToC(39)).toBe(4);
  });

  test('undefined fahrenheit should return null', () => {
    expect(fToC(undefined)).toBe(null);
  })

  test('null fahrenheit should return null', () => {
    expect(fToC(null)).toBe(null);
  })

  test('empty string fahrenheit should return null', () => {
    expect(fToC('')).toBe(null);
  })

  test('[] fahrenheit should return null', () => {
    expect(fToC('')).toBe(null);
  })

  test('{} fahrenheit should return null', () => {
    expect(fToC('')).toBe(null);
  })

  test('boolean fahrenheit should return null', () => {
    expect(fToC(true)).toBe(null);
  })
})

describe("Celcius to Fahrenheit convertion tests", () => {
  test('20 celcius should return 68 fahrenheit', () => {
    expect(cToF(20)).toBe(68);
  });

  test('32 celcius should return 90 fahrenheit', () => {
    expect(cToF(32)).toBe(90);
  });

  test('26.7 celcius should return 79 fahrenheit', () => {
    expect(cToF(26.7)).toBe(80);
  });

  test('undefined celcius should return null', () => {
    expect(cToF(undefined)).toBe(null);
  })

  test('null celcius should return null', () => {
    expect(cToF(null)).toBe(null);
  })

  test('empty string celcius should return null', () => {
    expect(cToF('')).toBe(null);
  })

  test('[] celcius should return null', () => {
    expect(cToF([])).toBe(null);
  })

  test('{} celcius should return null', () => {
    expect(cToF({})).toBe(null);
  })

  test('boolean celcius should return null', () => {
    expect(cToF(true)).toBe(null);
  })
})