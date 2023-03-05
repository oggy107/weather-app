const getWeather = async (cityName) => {
    const BASE_URL =
        "https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=";

    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key":
                "4f005d65e2mshc555866a4dd6983p1cb008jsnb67c4514cb1b",
            "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
        },
    };

    return new Promise((resolve, reject) => {
        fetch(BASE_URL + cityName, options)
            .then((response) => {
                console.log(response.status);

                if (response.status != 200) reject(response);

                return response.json();
            })
            .then((response) => {
                if (response.messages) reject(response.messages);
                else resolve(response);
            });
    });
};

const updateWeatherFields = (data, cardNo) => {
    const weatherFields = [
        "temp",
        "feels_like",
        "humidity",
        "max_temp",
        "min_temp",
        "wind_speed",
        "wind_degrees",
    ];

    weatherFields.forEach((weatherField) => {
        const weatherFieldElement = document.querySelector(
            `#card${cardNo} .${weatherField}`
        );
        weatherFieldElement.innerHTML = data[weatherField];
    });
};

const updateCard = (cityName, cardNo) => {
    getWeather(cityName)
        .then((response) => {
            updateWeatherFields(response, cardNo);
            document.querySelector(`#card${cardNo} .card_title`).innerHTML =
                cityName;
        })
        .catch((error) => {
            console.error(error);
            window.stop();
        });
};

const main = () => {
    updateCard("delhi", 1);
    updateCard("surrey", 2);
    updateCard("patiala", 3);

    document.querySelector("#submit").addEventListener("click", (e) => {
        e.preventDefault();

        updateCard(document.querySelector("#card2 .card_title").innerHTML, 3);
        updateCard(document.querySelector("#card1 .card_title").innerHTML, 2);
        updateCard(document.getElementById("search-city").value, 1);
    });
};

main();
