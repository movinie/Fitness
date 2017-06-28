"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Global = (function () {
    function Global() {
    }
    return Global;
}());
Global.BASE_CLIENT_ENDPOINT = 'api/clientapi/';
Global.AllSports = [
    { SportId: 1, Name: 'Тренажерный зал', Selected: false },
    { SportId: 2, Name: 'Групповые занятия', Selected: false },
    { SportId: 3, Name: 'Бассейн', Selected: false },
];
Global.Countries = [
    { value: 'Россия', viewValue: 'Россия' },
    { value: 'Германия', viewValue: 'Германия' },
    { value: 'Франция', viewValue: 'Франция' },
    { value: 'Великобритания', viewValue: 'Великобритания' }
];
exports.Global = Global;
//# sourceMappingURL=global.js.map