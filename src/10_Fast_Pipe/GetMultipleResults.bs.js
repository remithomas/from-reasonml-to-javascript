'use strict';


var random = (Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5););

var myData = "abc";

function getLeft(data) {
  return random + (data + "_left");
}

function getMiddle(data) {
  return random + (data + "_middle");
}

function getRight(data) {
  return random + (data + "_right");
}

var left = getLeft(myData);

var middle = getMiddle(myData);

var right = getRight(myData);

exports.random = random;
exports.myData = myData;
exports.getLeft = getLeft;
exports.getMiddle = getMiddle;
exports.getRight = getRight;
exports.left = left;
exports.middle = middle;
exports.right = right;
/* random Not a pure module */
