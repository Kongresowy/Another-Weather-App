import React from 'react';
import ReactDOM from 'react-dom';

class Weather extends React.Component {
    render() {
        return (
            <div>
                {this.props.city && this.props.country && <p>Location: {this.props.city}, {this.props.country}</p>}
                {this.props.temperature && <p>Temperature: {this.props.temperature} °C</p>}
                {this.props.wind_speed && this.props.wind_dir && <p>Wind: {this.props.wind_dir} {this.props.wind_speed} km/h</p>}
                {this.props.pressure && <p>Pressure: {this.props.pressure} hPa</p>}
                {this.props.humidity && <p>Humidity: {this.props.humidity} %</p>}
                {this.props.description && <p>Description: {this.props.description}</p>}
                {this.props.error && <p>{this.props.error}</p>}
            </div>
        );
    }
}

class Inputs extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <form onSubmit={this.props.getWeather}>
                <input type="text" name="city" placeholder="City..."></input>
                <input type="text" name="country" placeholder="Country..."></input>
                <button>Get Weather</button>
            </form>
        );
    }
}

class Title extends React.Component {
    render() {
        return (
            <div>
                <h1>Weather App Title</h1>
                <p>Paragraph near title for all awesomeness</p>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temperature: undefined,
            city: undefined,
            country: undefined,
            wind_speed: undefined,
            wind_dir: undefined,
            pressure: undefined,
            humidity: undefined,
            description: undefined,
            error: undefined
        }
        this.getWeather = this.getWeather.bind(this);
    }
    getWeather(e) {
        e.preventDefault();
        const API_KEY = "ccfe788d74e091c463fa98b02243bc94";
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`;
        fetch(URL).then(r => {
            return r.json()
        }).then(data => {
            console.log(data.cod);
            if (city && country) {
                this.setState({
                    temperature: data.main.temp,
                    city: data.name,
                    country: data.sys.country,
                    wind_speed: data.wind.speed,
                    wind_dir: data.wind.deg,
                    pressure: data.main.pressure,
                    humidity: data.main.humidity,
                    description: data.weather[0].description,
                    error: ""
                });
            } else {
                this.setState({
                    temperature: undefined,
                    city: undefined,
                    country: undefined,
                    wind_speed: undefined,
                    wind_dir: undefined,
                    pressure: undefined,
                    humidity: undefined,
                    description: undefined,
                    error: "Please enter a city and country symbol (for ex. UK)."
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <Title></Title>
                <Inputs getWeather={this.getWeather}></Inputs>
                <Weather temperature={this.state.temperature} city={this.state.city} country={this.state.country} wind_speed={this.state.wind_speed} wind_dir={this.state.wind_dir} pressure={this.state.pressure} humidity={this.state.humidity} description={this.state.description} error={this.state.error}></Weather>
            </div>
        );
    }
}

document.addEventListener("DOMContentLoaded", function () {
    ReactDOM.render(<App />, document.getElementById("root"));
});