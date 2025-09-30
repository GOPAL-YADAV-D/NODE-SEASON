var math = require('../modules/math');

exports.test_add = function (test) {
    test.equal(math.add(1,1), 2);
    test.equal(math.add(-1,1), 0);
    test.equal(math.add(-1,-1), -2);
    test.done();
}

exports.test_subtract = function (test){
    test.equal(math.subtract(1,1), 0);
    test.equal(math.subtract(-1,-1), 0);
    test.equal(math.subtract(-1,1), -2);
    test.done();
}

exports.test_multiply = function(test){
    test.equal(math.multiply(1,2), 2);
    test.equal(math.multiply(-1,-2), 2);
    test.equal(math.multiply(3,0), 0);
    test.done();
}

exports.test_divide = function(test){
    test.equal(math.divide(4,2), 2);
    test.equal(math.divide(-4,-2), 2);
    test.equal(math.divide(3,0), null);
    test.done();
}