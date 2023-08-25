export const typeDefs = `
    type Location {
        city: String!
        country: String
        localtime: String
    }

    type Values {
        temp: Float
        pressure: Float
        humidity: Float
        precip: Float
        windDir: String
        windSpeed: Float
        windGust: Float
        cloud: Float
        vis: Float
    }

    type WeatherData {
        location: Location!
        values: Values!
    }

  type Query {
    weather(inpValue: String): WeatherData!
  }
`;