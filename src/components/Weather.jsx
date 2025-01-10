import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Weather({}) {
    const [text, setText] = useState('');
    const [record, setRecord] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const citiesTop = [
        'Kyiv',
        'Warsaw',
        'Berlin',
        'New York',
        'Lviv',
        'Oslo',
        'Amsterdam',
        'Helsinki',
        'Rotterdam',
        'Washington',
    ]
    const citiesBottom = [
        'Wroclaw',
        'Minsk',
        'Bratislava',
        'Budapest',
        'Sophia',
        'Ankara',
        'Tbilisi',
        'Bucharest',
        'Rome',
    ]

    const fetchWeather = async (t = '') => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${t.trim()}&appid=2d08f5966211819f53a4848246c3b3a9&units=metric`
        try {
            const response = await fetch(url)

            if (response.ok) {
                const data = await response.json()
                setRecord(data)
            } else {
                const data = await response.json()
                setErrorMessage(data)
            }
        } catch {
            alert('Oops... Something went wrong')
        }
    }

    const handleText = (e) => {
        const value = e.target.value
        setText(value)
    }

    const handleSearch = async () => {
        await fetchWeather(text)
    }

    const handleAddToInput = (item) => {
        setText(item)
    }

    const handleButtonTp = () => {
        navigate('/SeeMore', { state: { city: text } });
    }

    return (
        <div className="bg-main-bg h-screen flex flex-col justify-center items-center">
            <marquee direction="left" className="w-full overflow-hidden py-2">
                <div className="flex justify-around items-center">
                    {citiesTop.map((item) => {
                        return (
                            <button
                                key={item}
                                onClick={() => {
                                    handleAddToInput(item)
                                }}
                                className="cursor-pointer text-xl"
                            >
                                {item}
                            </button>
                        )
                    })}
                </div>
            </marquee>
            <div className="container mx-auto my-auto flex justify-center items-center">
                <div className="border-2 bg-white/30 backdrop-blur-md p-6 rounded-2xl">
                    <div className="text-center mb-4">
                        <h1 className="text-5xl font-bold">Weather App</h1>
                        <input
                            className="w-full h-10 rounded-2xl pl-3 outline-none mt-4 bg-white/50 backdrop-blur-sm"
                            type="text"
                            value={text}
                            onChange={handleText}
                            placeholder="Search your city"
                        />
                        <button
                            onClick={handleSearch}
                            className="w-full text-2xl mt-3 border-2 rounded-2xl bg-blue-500 text-white py-2 hover:bg-blue-600 transition-all"
                        >
                            Search
                        </button>
                    </div>

                    {errorMessage ? <p>{errorMessage.message}</p> : null}
                    {record ? (
                        <div className="text-center mt-6 transition-all">
                            <p className="text-2xl font-semibold">
                                {record.name}
                            </p>
                            {record.weather
                                ? record.weather.map((item, index) => {
                                      return (
                                          <p
                                              key={index}
                                              className="text-lg text-gray-600"
                                          >
                                              {item.main}
                                          </p>
                                      )
                                  })
                                : null}
                            <p className="text-3xl font-bold">
                                {record.main.temp} °C
                            </p>
                            <p className="text-lg text-gray-500">
                                {record.wind.speed} km/h
                            </p>
                            <button onClick={handleButtonTp} className="flex justify-center items-center underline text-blue-500 cursor-pointer">
                                See more
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>
            <marquee className="w-full overflow-hidden py-2">
                <div className="flex justify-around items-center">
                    {citiesBottom.map((item) => {
                        return (
                            <button
                                key={item}
                                onClick={() => {
                                    handleAddToInput(item)
                                }}
                                className="cursor-pointer text-xl"
                            >
                                {item}
                            </button>
                        )
                    })}
                </div>
            </marquee>
        </div>
    )
}

export { Weather }
