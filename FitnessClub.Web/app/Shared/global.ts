export class Global {
    public static BASE_CLIENT_ENDPOINT = 'api/clientapi/';

    public static AllSports = [
        { SportId: 1, Name: 'Тренажерный зал', Selected: false },
        { SportId: 2, Name: 'Групповые занятия', Selected: false },
        { SportId: 3, Name: 'Бассейн', Selected: false },
    ];

    public static Countries = [
        { value: 'Россия', viewValue: 'Россия' },
        { value: 'Германия', viewValue: 'Германия' },
        { value: 'Франция', viewValue: 'Франция' },
        { value: 'Великобритания', viewValue: 'Великобритания' }
    ];   
}