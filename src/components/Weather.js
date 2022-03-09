import React, { Component } from 'react';
import axios from 'axios';


class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = { temp: 0, desc: '', icon: '', loading: true }
    }
    // 컴포넌트 생성 후 날씨 정보 조회
    componentDidMount() {
        const cityName = 'Korea';
        const apiKey = '397bbfd4e3213da0fc7650096004d846';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        axios.get(url)
        .then(responseData => {
            console.log(responseData);
            const data = responseData.data;
            this.setState({
                temp: data.main.temp,
                temp_min : data.main.temp_min,
                temp_max : data.main.temp_max,
                desc: data.weather[0].description,
                icon: data.weather[0].icon,
                name :data.name,
                loading: false
            });
        })
        .catch(error => console.log(error));

}
// 날씨 정보 출력
render() {
    const imgSrc = `http://openweathermap.com/img/w/${this.state.icon}.png`;
    if (this.state.loading) {
        return <p>Loading</p>;
    } else {
        return (
            <div className="Weather">
                <div className="Weather_img">
                <img src={imgSrc} />
                <p>위치 : {this.state.name}</p>
                <p>현재온도 : {this.state.temp}℃</p>
                </div>
                <div className="Weather_info">
                <div className="Weather_temp">
                <div style={{color:"red"}}>최고온도 : {this.state.temp_max}℃</div>
                <div style={{color:"blue"}}>최저온도 : {this.state.temp_min}℃</div>
                <div>현재 날씨 : {this.state.desc}</div>
                </div>
                </div>
            </div>
        );
    }
}
}
export default Weather;