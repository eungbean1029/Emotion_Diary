import React, { Component } from 'react';

const API_KEY = '397bbfd4e3213da0fc7650096004d846';

class Weather2 extends Component {
    state = {
      lat:null,
      lon:null,
      main : '',
      name : '',
      temp : '',
      temp_min : '',
      temp_max : '',
      icon : '',
    
    };

    // 컴포넌트 생성 후 날씨 정보 조회
    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
              fetch (
                `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`
              ).then(res => {
                return res.json();
              })
              .then(result => {
                const {
                  main: {temp, temp_max,temp_min},
                  weather:[{main,icon,description}],
                } = result;
                const {name} = result;
                this.setState({
                  main:main,
                  name:name,
                  temp:temp,
                  temp_min:temp_min,
                  temp_max:temp_max,
                  icon:icon,
                  desc:description,
                });
    
              })
              .then(err => this.setState({ errorOpenWeatherMessage: err }));
            },
            error => this.setState({erorMessage: error.message})
        );
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
export default Weather2;