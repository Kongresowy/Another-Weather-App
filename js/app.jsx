import React from 'react';
import ReactDOM from 'react-dom';

class Weather extends React.Component {
    render() {
        const arrowDir = {
            transform: `rotate(${-90 + this.props.wind_dir}deg)`
        };
        return (
            <div className="data-wrapper">
                {this.props.city && this.props.country && <div>Location: {this.props.city}, {this.props.country}</div>}
                {this.props.temperature && <div>Temperature: {this.props.temperature} °C</div>}
                {this.props.wind_speed && this.props.wind_dir && <div>Wind: <div id="arrow" style={arrowDir}>&#10168;</div> {this.props.wind_speed} km/h</div>}
                {this.props.pressure && <div>Pressure: {this.props.pressure} hPa</div>}
                {this.props.humidity && <div>Humidity: {this.props.humidity} %</div>}
                {this.props.description && <div>Description: {this.props.description}</div>}
                {this.props.error && <div>{this.props.error}</div>}
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
            <div className="title-wrapper">
                <h1>Another Weather App</h1>
                <p>Check Your Local Weather Conditions And Enjoy !</p>
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
        const URL = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`;
        fetch(URL).then(r => {
            return r.json()
        }).then(data => {
            console.log(data);
            if (city && country && data.cod == 200) {
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
                    error: "Please enter a city and country (for ex. UK)."
                });
            }
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div className="main-wrapper">
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