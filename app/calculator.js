var assert = require('assert');

function add(first, last) {
    assertIsDefined(first, last);
    first = Number.parseFloat(first);
    last = Number.parseFloat(last);
    assertIsNumber(first, last);

    return first + last;
}

function sub(first, last) {
    assertIsDefined(first, last);
    first = Number.parseFloat(first);
    last = Number.parseFloat(last);
    assertIsNumber(first, last);

    return first - last;
}

function mul(first, last) {
    assertIsDefined(first, last);
    first = Number.parseFloat(first);
    last = Number.parseFloat(last);
    assertIsNumber(first, last);

    return first * last;
}

function div(first, last) {
    assertIsDefined(first, last);
    first = Number.parseFloat(first);
    last = Number.parseFloat(last);
    assertIsNumber(first, last);

    assert.notEqual(first, 0, 'Cannot divide by 0');
    assert.notEqual(last, 0, 'Cannot divide by 0');

    return first / last;
}

function assertIsDefined(first, last) {
    assert.notEqual(first, undefined, 'Argument first is undefined');
    assert.notEqual(last, undefined, 'Argument last is undefined');
}

function assertIsNumber(first, last) {
    assert.equal(true, Number.isSafeInteger(first), 'Argument first is not a number');
    assert.equal(true, Number.isSafeInteger(last), 'Argument last is not a number');
}

module.exports = {
    add,
    sub,
    mul,
    div
};