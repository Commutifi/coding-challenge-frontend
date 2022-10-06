function cToF(celsius) {
    return Math.round((celsius * 9 / 5 + 32));
}

function fToC(fahrenheit) {
    return Math.round((fahrenheit - 32) * 5 / 9);
}

export { cToF, fToC }