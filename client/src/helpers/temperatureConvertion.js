function cToF(celsius) {
    if(typeof celsius !== 'number' || !celsius) return null
    return Math.round((celsius * 9 / 5 + 32))
}

function fToC(fahrenheit) {
    if(typeof fahrenheit !== 'number' || !fahrenheit) return null
    return Math.round((fahrenheit - 32) * 5 / 9)
}

export { cToF, fToC }