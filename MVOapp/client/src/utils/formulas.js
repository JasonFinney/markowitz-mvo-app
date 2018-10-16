var riskfreeRate = 0.024;
console.log(riskfreeRate);

const reducer = (accumulator, currentValue) => accumulator + currentValue;

var closeArray1 = [];
var expectedArray1 = [];
for (let i = 0; i < history1.length; i++) {
    var close1 = history1[i].close;
    closeArray1.push(close1);
};
for (let o = 1; o < history1.length; o++) {
    var expect = history1[o] / history1[o--];
    var expected = expect - 1;
    expectedArray1.push(expected);
};
console.log(closeArray1);
console.log(expectedArray1);
var Er1 = (expectedArray1.reduce(reducer) / history1.length);
console.log(Er1);
ErMatrix.push(Er1);
standardDeviation(expectedArray1);
function standardDeviation(values) {
    console.log("Within STD : " + Er1);
    var squareDiffs = values.map(function (value) {
        var diff = value - Er1;
        var sqrDiff = diff * diff;
        return sqrDiff;
    });
    var avgSquareDiff = (squareDiffs.reduce(reducer));
    var stdDev = Math.sqrt(avgSquareDiff);
    StdMatrix.push(stdDev);
