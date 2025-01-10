import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import { Weather } from "./Weather";

function SeeMore() {
    const location = useLocation();
    const city = location.state.city || 'New York';
    const [record, setRecord] = useState(null);
    const navigate = useNavigate();

    const fetchWeather = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2d08f5966211819f53a4848246c3b3a9&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            setRecord(data);
            console.log(data);
        } catch {
            alert('Ooops... Something went wrong');
        }
    }

    const handleButtonTp = () => {
        navigate('/');
    }

    useEffect(() => {
        fetchWeather();
    }, [])
    return (
        <div className="bg-second-bg h-screen flex items-center justify-center">
            <div className="backdrop-blur-lg bg-white/30 p-8 rounded-xl shadow-lg w-96">
               {record ? (
                <div>
                    <h1 className="text-2xl font-bold text-center mb-4 text-gray-900">Weather in {record.name}</h1>
                    <div className="text-center text-lg text-gray-900">
                        <p className="mb-2">Country: <span className="font-medium">{record.sys.country}</span></p>
                        <p className="mb-2">Temperature: <span className="font-medium">{record.main.temp} °C</span></p>
                        <p className="mb-2">Feels like: <span className="font-medium">{record.main.feels_like} °C</span></p>
                        <p className="mb-2">Wind: <span className="font-medium">{record.wind.speed} km/h</span></p>
                        <p className="mb-2">Condition: {record.weather
                                ? record.weather.map((item, index) => {
                                      return (
                                          <span
                                              key={index}
                                              className="text-lg text-gray-600"
                                          >
                                              {item.main}
                                          </span>
                                      )
                                  })
                                : null}</p>
                        <p className="mb-2">Humidity: <span className="font-medium">{record.main.humidity}%</span></p>
                    </div>
                    <div className="text-center text-sm text-gray-700 mt-4">
                        <p className="mb-1">Sunrise: <span className="font-medium">{record.sys.sunrise}</span></p>
                        <p>Sunset: <span className="font-medium">{record.sys.sunset}</span></p>
                    </div>
                </div>
               ) : null}
               <div className="mt-4 text-center">
                        <button onClick={handleButtonTp} className="text-blue-600 font-semibold hover:text-blue-800">Back</button>
                </div>
            </div>
        </div>
    );
}

export { SeeMore };