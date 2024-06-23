export interface WeatherData {
    city : string,
    temperature : number,
    condition : string,
    windSpeed : number,
    humidity : number,
    icon : string,
}

export const weatherData : WeatherData[] = [
    {
        city : "Guayaquil",
        temperature : 29,
        condition : "Sunny",
        windSpeed : 19 ,
        humidity : 22,
        icon : "sunny"
    },
    {
        city: "Tokyo",
        temperature: 26,
        condition: "Cloudy",
        windSpeed: 15,
        humidity: 28,
        icon: "cloudy"
      },
]