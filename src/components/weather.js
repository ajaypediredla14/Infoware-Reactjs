import react from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './weather.css';
import { fetchweatherApi } from "./weatherapi";
import { Col,Row } from 'react-bootstrap';
import { Card } from 'semantic-ui-react';



function Weather() {
  //dispatch action
  const [cities,setCities]=useState(["Delhi","New York","London","Mumbai"])
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchweatherApi(cities));
  }, []);

  const state = useSelector(state => state);
  const { weather, loading, error } = state;
  const cards=[];
  if(weather)
  {
  for(let i=0;i<4;i++)
  {
    var date = new Date(weather[i].Sunset*1000);
    var risedate=new Date(weather[i].Sunrise*1000);
    cards.push(<Col key={weather[i].id} xl={3} md={6} xs={12} style={{alignItems: "center"}}>
    <Card>
    <Card.Content>
        <Card.Header className="header">Location :<span> {weather[i].City_name}</span></Card.Header>
        <Row>
        <p><span>Temparature: </span>{weather[i].Temperature} &deg;C</p>
        <p><span>Sunrise: </span>{ date.getHours()+" hrs : "+date.getMinutes()+" mins : "+date.getSeconds()+" secs"}</p>
        <p><span>Sunset: </span>{ risedate.getHours()+" hrs : "+risedate.getMinutes()+" mins : "+risedate.getSeconds()+" secs"}</p>
        <p><span>Weather: </span>{weather[i].weather}</p>
        <p><span>Humidity:</span> {weather[i].humidity}%</p>
        <p><span>Current Date & time:</span> {Date(weather[i].Sunset*1000)}</p>
        </Row>
    </Card.Content>
    </Card>
    </Col>);
  }
  }
  return (
    <div>
      <section className="relative bg-gray-900  min-h-screen">
        <div className="relative container pt-12 px-4 mb-20 mx-auto text-center">
          <h2 className="mt-8 mb-8 lg:mb-12 text-white text-4xl lg:text-6xl font-semibold">
            Weather App
          </h2>
          <Row>
              {cards}
          </Row>
        </div>
      </section>
    </div>
  );
}

export default Weather;