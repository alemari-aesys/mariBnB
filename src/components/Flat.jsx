import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
require("dotenv").config();

function Flat() {
    const { param } = useParams();
    const [flats, setFlats] = useState([]);
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState();
    const weatherApiKey = process.env.local.APIKEY;

    const sunny = "data:image/jpeg;base64,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"
    const cloudy = "https://www.teleradiopace.tv/wp-content/uploads/2015/01/nuvoloso.png"
    const rainy = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST1T5vEKh4Mz0pGRvlJU-iDJUSbiqaGDyRCA&usqp=CAU"
    // const section = window.location.href.split("/")[4];
    
    useEffect(() => {
        axios.get("http://localhost:8080/Apartments")
            .then(res => res.data)
            .then(data => data.filter((x) => {
                return x.name === param
            }))
            .then(apts => apts.map((y) => {
                return (
                    {
                        image: y.image,
                        name: y.name,
                        city: y.city,
                        desc: y.description,
                        price: y.price
                    }
                )
            }))
            .then(response => setFlats(response));
    }, [])

    useEffect(() => {
        if (flats.length > 0) {
            setCity(flats[0].city)
        }
    }, [flats])

    useEffect(() => {
        if(city !== "") {
            axios.get(`https://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=${weatherApiKey}`)
            .then(res => setWeather(res.data.list[0]));
        }
    }, [city])

    useEffect(() => {
        console.log(weather);
    }, [weather])

    return(
        <div style={{padding: 100}}>
        {
            flats[0] && 
            <div>
                <img src={flats[0].image} alt="" />
                <h1>{flats[0].name}</h1>
                <h2>{flats[0].city}</h2>
                <p>{flats[0].desc}</p>
                <h3>Price: {flats[0].price} per night</h3>
                {city && weather &&
                    <div>
                        <h1>Weather in {city} :</h1>
                        <p>The temperature in {city} is {weather.main.temp} °C. <br />
                            {weather.weather[0].main === "Clouds" && <img sy src={cloudy}></img>}
                            {weather.weather[0].main === "Clear" && <img sy src={sunny}></img>}
                        </p>
                    </div>
                }
            </div>
        }
        </div>
    )
}

export default Flat;