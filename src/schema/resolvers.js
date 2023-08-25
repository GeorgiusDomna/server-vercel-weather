import 'dotenv/config';

const apiKey = process.env.API_KEY;

export const resolvers = {
    Query: {
        weather: async (_, args) => {
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${args.inpValue}&aqi=no`
        
        try {
          let response = await fetch(url);
          let data = await response.json();
          if (!response.ok) {
            throw new Error(data.error.message);
          }
          return {
            location: {
                city: data.location.name,
                country: data.location.country,
                localtime: data.location.localtime.split('-').join('/'),
            },
            values: {
                temp: data.current.temp_c,
                pressure: data.current.pressure_mb,
                humidity: data.current.humidity,
                precip: data.current.precip_mm,
                windDir: data.current.wind_dir,
                windSpeed: data.current.wind_kph,
                windGust: data.current.gust_kph,
                cloud: data.current.cloud,
                vis: data.current.vis_km
            }
          }
        } catch (error) {
          throw new Error(error);
        }
      }
    }
};