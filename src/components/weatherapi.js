import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";




 export const fetchweatherApi = createAsyncThunk(
     'weatherApi/fetch',
     async(payload, {rejectWithValue,getState,dispatch})=>{
       var reports=[];
       for(let i=0;i<4;i++)
       {
        try {
            const{data}= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${payload[i]}&appid=a13f2be7290812666f81447c311a51b3&units=metric`
            );
        reports= [...reports,
            {
              id: i,
              City_name: data.name,
              Sunrise: data.sys.sunrise,
              Sunset: data.sys.sunset,
              Temperature: data.main.temp,
              humidity : data.main.humidity,
              weather: data.weather[0].main,
            }
        ];
        }
        catch (err){
            if(!err?.response)
            {
                throw err;
            }
            return rejectWithValue(err?.reponse?.data);
        }
      }
      return reports;
     }
 );


 
const weatherSlice = createSlice({
    name: "weather",
    initialState: {},
    extraReducers: builder => {
      //pending
      builder.addCase(fetchweatherApi.pending, (state, action) => {
        state.loading = true;
      });
      //fulfilled
      builder.addCase(fetchweatherApi.fulfilled, (state, action) => {
        state.weather = action?.payload;
        state.loading = false;
        state.error = undefined;
      });
      //rejected
      builder.addCase(fetchweatherApi.rejected, (state, action) => {
        state.loading = false;
        state.weather = undefined;
        state.error = action?.payload;
      });
    },
  });
  
  export default weatherSlice.reducer;