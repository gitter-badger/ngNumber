(function () {
    'use strict';
    (angular.module('ngNumber', ['ng'])).directive('ngNumber', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                var fn = function (n, c, d, t) {
                    c = isNaN(c = Math.abs(c)) ? 2 : c;
                    d = d === undefined ? "." : d;
                    t = t === undefined ? "," : t;
                    var s = n < 0 ? "-" : "";
                    var i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "";
                    var j = (j = i.length) > 3 ? j % 3 : 0;
                    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
                };
                var $formatters = function (value) {
                    if (value && value.toString().trim() !== '') {
                        return fn(value, 0, '.', ',');
                    } else {
                        return '';
                    }
                };
                var $parsers = function (value) {
                    if (value.trim() !== '') {
                        if (isNaN(parseInt(value.trim().replace(/,/g, '')))) {
                            var newValue = value.trim().toUpperCase().replace(/[A-Z]/g, '');
                            element.val(newValue);
                            return newValue;
                        } else {
                            return parseInt(value.trim().replace(/,/g, ''));
                        }
                    } else {
                        return '';
                    }
                };
                element.bind('propertychange blur', function () {
                    if (element.val().trim() !== '') {
                        element.val(fn(element.val().trim().replace(/,/g, ''), 0, '.', ','));
                    } else {
                        element.val('');
                    }
                });
                ctrl.$formatters.push($formatters);
                ctrl.$parsers.push($parsers);
            }
        };
    });
})(window, document);
