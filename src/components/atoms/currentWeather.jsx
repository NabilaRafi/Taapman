var React = require('react');
var classNames = require('classnames');

var Api = require('./utils/api');


var query = ''; // Expects something like this ?city=London,Paris,Berlin,Madrid
var selectedCityWeather;
var currentCity = 0; // Index of current city displayed
var currentCityName='London';
