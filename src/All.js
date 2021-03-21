import React,{Component} from 'react';
import './App.css';
import Clear from './resource/Clear.png';
import CloudBackground from './resource/Cloud-background.png';
import Hail from './resource/Hail.png';
import HeavyCloud from './resource/HeavyCloud.png';
import HeavyRain from './resource/HeavyRain.png';
import LightCloud from './resource/LightCloud.png';
import LightRain from './resource/LightRain.png';
import Shower from './resource/Shower.png';
import Sleet from './resource/Sleet.png';
import Snow from './resource/Snow.png';
import Thunderstorm from './resource/Thunderstorm.png';
import LocationLogo from './resource/locationLogo.svg';
import SearchImage from './resource/SearchImage.svg';
import CloseImage from './resource/CloseImage.svg';

class All extends Component
{
    
    APIKey = "76abb76dc88863627b9d282988ecd431";
    state = {
        ActuallyCity : "",
        ActuallyState : "",
        ActuallyLongitude : null,
        ActuallyLatitude : null,
        ActuallyWeather : "",
        ActuallyDaraja : "",
        ActuallyLogo : null,
        ActuallyAirPressure : 0,
        ActuallyVisibility : 0,
        ActuallyWindStatus : 0,
        ActuallyHumidity : 0,
        ActuallyDirectionOfWind : "",
        units : "metric",

        SearchBar : {
            value : ""
        }
    }
    
    componentDidMount(){
             
    }
    toTextualDescription(degree){
        let compassSector = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"];
        let r = (degree / 22.5).toFixed(0)
        let res = compassSector[r];
        console.log("th resu  " + res + "   " + r)
        return res + " "
    }
    allRequest(){
          
            if(this.state.ActuallyLatitude!==null&&this.state.ActuallyLongitude!==null&&this.state.ActuallyCity===""){
                fetch(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.ActuallyLatitude}+${this.state.ActuallyLongitude}&key=cb4b6096cba545528c453da3226c124b`)
                .then(response=> {
                    response.json()
                    .then(res => {
                        if(res.results[0]){
                            this.setState({
                                ActuallyCity : res.results[0].components.town
                            })
                            console.log("bien on fait un setstate a l'instant")
                        }else{
                            if(this.state.ActuallyCity===""){
                                this.setState({
                                    ActuallyCity : "paris"
                                })
                                console.log("bien on fait un setstate a l'instant")
                            }
                        }
                    })
                })
        }
    }
    render(){
        let MyPosition = this.state.ActuallyCity;

        let DAY = new Date();
        let actuallyTime = DAY.toLocaleString('en-EN',{weekday:"long",day:"numeric",month:"long"})
        navigator.geolocation.getCurrentPosition(function(position){
            MyPosition = position;
        });

        navigator.geolocation.getCurrentPosition(p=>{
          this.setState({
            ActuallyLongitude : p.coords.longitude,
            ActuallyLatitude : p.coords.latitude
          })
        })
       
        
        //Event function

        const OnChargementPage = () => {
            let Span1 = document.querySelector(".pointSpan1");
            let Span2 = document.querySelector(".pointSpan2");
            let Span3 = document.querySelector(".pointSpan3");

            setTimeout(() => {
                if(Span1){
                    Span1.classList.remove("none")
                }
            }, 1000);
            setTimeout(() => {
                if(Span2){
                    Span2.classList.remove("none")
                }
            }, 2000);
            setTimeout(() => {
                if(Span3){
                    Span3.classList.remove("none")
                }
            }, 3000);
            setTimeout(() => {
                if(Span1&&Span2&&Span1){
                    Span1.classList.add("none");
                    Span2.classList.add("none");
                    Span3.classList.add("none");
                }
            }, 4000);

        }
      
        
        const InClickInCloseButtonOfSearchBar = e => {
            let SearchBar = document.querySelector(".SearchBar");
            SearchBar.classList.add("none");
        }
        const InClickInSearchCityButton = e => {
            let SearchBar = document.querySelector(".SearchBar");
            SearchBar.classList.remove("none");
        }
        const OnCickInInputBarForSearchBar = e => {
            this.setState({
                SearchBar : {
                    value : e.target.value
                }
            })
        }
        const OnClickInButtonSearchBar = e => {
            e.preventDefault();
            let SearchBar = document.querySelector(".SearchBar");
                let API = "https://api.openweathermap.org/data/2.5/"
                this.setState({
                    ActuallyCity : this.state.SearchBar.value
                })
                setTimeout(() => {
                    fetch(`${API}weather?q=${this.state.ActuallyCity}&units=${this.state.units}&appid=${this.APIKey}`)
                    .then(response => response.json())
                    .then(a => {
                        let Image;
                        if(a.weather[0].main === "Clouds"){
                            Image = HeavyCloud
                        }
                        if(a.weather[0].main === "Clear"){
                            Image = Clear
                        }
                        if(a.weather[0].main === "Rain"){
                            Image = HeavyRain
                        }
                        this.setState({
                            ActuallyDaraja : a.main.temp,
                            ActuallyWeather : a.weather[0].main,
                            ActuallyLogo : Image,
                            ActuallyAirPressure : a.main.pressure,
                            ActuallyHumidity : a.main.humidity,
                            ActuallyVisibility : a.visibility,
                            ActuallyWindStatus : a.wind.speed,
                            ActuallyDirectionOfWind : this.toTextualDescription(a.wind.deg)
                        })
                        let HumidityProgressionBar = document.querySelector(".GridTypeOne .ProgressionBar .ArrierePlanBar .HumidityBar");
                        HumidityProgressionBar.style.width = `${a.main.humidity}%`
                        SearchBar.classList.add("none") 
                        
                    })
                    .catch(a=>{
                        let Container = document.querySelector("section .container");
                        let ErrorPage = document.querySelector(".errorPage");
            
                        Container.classList.add("none");
                        ErrorPage.classList.remove("none");
                    })
                    
                }, 100);
        }
        let isNotLoad = true;

        //Get DATA part        
        let API = "https://api.openweathermap.org/data/2.5/"
        if(this.state.ActuallyCity!==null&&this.state.ActuallyCity!==""){
                if(this.state.ActuallyAirPressure===0||this.state.ActuallyHumidity===0||this.state.ActuallyWindStatus===0||this.state.ActuallyDirectionOfWind===0||this.state.ActuallyDaraja===""){
                console.log("bonjour le monde nous some dans la classe ")
                fetch(`${API}weather?q=${this.state.ActuallyCity}&units=${this.state.units}&appid=${this.APIKey}`)
                .then(response => response.json())
                .then(a => {
                    let Image;
                    if(a.weather[0].main === "Clouds"){
                        Image = HeavyCloud
                    }
                    if(a.weather[0].main === "Clear"){
                        Image = Clear
                    }
                    if(a.weather[0].main === "Rain"){
                        Image = HeavyRain
                    }
                    
                    this.setState({
                        ActuallyDaraja : a.main.temp,
                        ActuallyWeather : a.weather[0].main,
                        ActuallyLogo : Image,
                        ActuallyAirPressure : a.main.pressure,
                        ActuallyHumidity : a.main.humidity,
                        ActuallyVisibility : a.visibility,
                        ActuallyWindStatus : a.wind.speed,
                        ActuallyDirectionOfWind : this.toTextualDescription(a.wind.deg)
                        }) 
                        console.log("bien on fait un setstate a l'instant")
                        let HumidityProgressionBar = document.querySelector(".GridTypeOne .ProgressionBar .ArrierePlanBar .HumidityBar");
                        HumidityProgressionBar.style.width = `${a.main.humidity}%`
                    
                    
                    console.log(a);
                })
                .catch(()=>{
                    fetch(`${API}weather?q=${this.state.ActuallyState}&units=${this.state.units}&appid=${this.APIKey}`)
                    .then(response => response.json())
                    .then(a => {
                        let Image;
                        if(a.weather[0].main === "Clouds"){
                            Image = HeavyCloud
                        }
                        if(a.weather[0].main === "Clear"){
                            Image = Clear
                        }
                        if(a.weather[0].main === "Rain"){
                            Image = HeavyRain
                        }
                        
                        this.setState({
                            ActuallyDaraja : a.main.temp,
                            ActuallyWeather : a.weather[0].main,
                            ActuallyLogo : Image,
                            ActuallyAirPressure : a.main.pressure,
                            ActuallyHumidity : a.main.humidity,
                            ActuallyVisibility : a.visibility,
                            ActuallyWindStatus : a.wind.speed,
                            ActuallyDirectionOfWind : this.toTextualDescription(a.wind.deg)
                            }) 
                            console.log("bien on fait un setstate a l'instant")
                            let HumidityProgressionBar = document.querySelector(".GridTypeOne .ProgressionBar .ArrierePlanBar .HumidityBar");
                            HumidityProgressionBar.style.width = `${a.main.humidity}%`
        
                        console.log(a);
                    }).catch(()=>{
                        console.log("erreur de merde")
                    })
                })  
                } 
            }
        window.onLoad = ()=>{
            isNotLoad = false;

        };
        
        if(this.state.ActuallyLatitude!==null&&this.state.ActuallyLongitude!==null){
         
                fetch(`https://api.opencagedata.com/geocode/v1/json?q=${this.state.ActuallyLatitude}+${this.state.ActuallyLongitude}&key=0f2e16a879f84f31bae83bf7f0d6d10c`)
                .then(response=> {
                    response.json()
                    .then(res => {
                        console.log(res.results)
                        if(res.results[0]){
                            this.setState({
                                ActuallyCity : res.results[0].components.town,
                                ActuallyState : res.results[0].components.state
                            })
                            console.log("bien on fait un setstate a l'instant")
                        }else{
                            if(this.state.ActuallyCity===""){
                                this.setState({
                                    ActuallyCity : "london"
                                })
                                console.log("bien on fait un setstate a l'instant ")
                            }
                        }
                    })
                })
            }
        return(
         <section>
              <div className = "container">
                    <div className = "left">
                            <button onClick = {InClickInSearchCityButton} className = "btn SearchPlacesButton">Search for places</button>
                            <div className = "ImageZone">
                                <img className = "CloudBackground" src = {CloudBackground}/>
                                <img className = "MeteoIllustration" src = {this.state.ActuallyLogo} />
                            </div>
                            <div className = "InformationZone">
                                <h2 className = "degreeChaleur">{this.state.ActuallyDaraja}<span className = "DegreeSpan">⁰C</span></h2>
                                <h3 className = "WeatherDay">{this.state.ActuallyWeather}</h3>

                                <div className = "BonusInformations">
                                    <p><span className="FirstSpan">Today</span>•<span className = "Date"> {actuallyTime.toString()}</span></p>
                                    <div className = "Location"><img src = {LocationLogo}/><p>{MyPosition} </p></div>
                                </div>
                            </div>
                            <div className = "SearchBar none">
                                <div onClick = {InClickInCloseButtonOfSearchBar} className = "CloseTab">
                                    <img src = {CloseImage}/>
                                </div>
                                <form className = "SearchZone">
                                    <input onInput = {OnCickInInputBarForSearchBar} type = "text" placeholder = "Search Location"></input>
                                    <button onClick = {OnClickInButtonSearchBar} className = "SubmitButtonToResearchCity">Search City</button>
                                </form>
                            </div>
                    </div>
                    
                    <div className = "right">
                        <div className = "containe">
                            <div className = "buttons">
                                <div>
                                    <button id = "Celsus">⁰C</button>
                                    <button id = "F">⁰F</button>
                                </div>
                            </div>

                            <div className = "containWeatherCards">
                                <div className = "WeatherCards">
                                    <div className = "WeatherCard">
                                        <div className = "TheDay">
                                            <p>Tomorrow</p>
                                        </div>
                                        <div className = "WeatherImageRepresentation">
                                            <img src = {LightCloud}/>
                                        </div>
                                        <div className = "MoreInformation">
                                            <p className = "DegreeMatin">19 ⁰C</p>
                                            <p className = "DegreeSoir">11 ⁰C</p>
                                        </div>
                                    </div>
                                    <div className = "WeatherCard">
                                        <div className = "TheDay">
                                            <p>Tomorrow</p>
                                        </div>
                                        <div className = "WeatherImageRepresentation">
                                            <img src = {Hail}/>
                                        </div>
                                        <div className = "MoreInformation">
                                            <p className = "DegreeMatin">19 ⁰C</p>
                                            <p className = "DegreeSoir">11 ⁰C</p>
                                        </div>
                                    </div>
                                    <div className = "WeatherCard">
                                        <div className = "TheDay">
                                            <p>Tomorrow</p>
                                        </div>
                                        <div className = "WeatherImageRepresentation">
                                            <img src = {LightRain}/>
                                        </div>
                                        <div className = "MoreInformation">
                                            <p className = "DegreeMatin">19 ⁰C</p>
                                            <p className = "DegreeSoir">11 ⁰C</p>
                                        </div>
                                    </div>
                                    <div className = "WeatherCard">
                                        <div className = "TheDay">
                                            <p>Tomorrow</p>
                                        </div>
                                        <div className = "WeatherImageRepresentation">
                                            <img src = {Sleet}/>
                                        </div>
                                        <div className = "MoreInformation">
                                            <p className = "DegreeMatin">19 ⁰C</p>
                                            <p className = "DegreeSoir">11 ⁰C</p>
                                        </div>
                                    </div>
                                    <div className = "WeatherCard">
                                        <div className = "TheDay">
                                            <p>Tomorrow</p>
                                        </div>
                                        <div className = "WeatherImageRepresentation">
                                            <img src = {HeavyCloud}/>
                                        </div>
                                        <div className = "MoreInformation">
                                            <p className = "DegreeMatin">19 ⁰C</p>
                                            <p className = "DegreeSoir">11 ⁰C</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className = "SecondPartOfRightPart">
                                <div className = "TwothForRightPart">
                                    <h1 className = "TitleForSecondPage">Today's Highlights</h1>
                                    <div className = "TheGrids">
                                        <div className = "GridTypeOne">
                                            <p className = "GridSTitle">Wind status</p>
                                            <div className = "Value"><h1 className = "ValueForWindStatus">{this.state.ActuallyWindStatus}</h1><h2 className = "TheWihda">mph</h2></div>
                                            <p className = "Redirection">{this.state.ActuallyDirectionOfWind}</p>
                                        </div>
                                        <div className = "GridTypeOne">
                                            <p className = "HumidityTitle">Humidity</p>
                                            <h1 className = "Value">{this.state.ActuallyHumidity}%</h1>
                                            <div className = "ProgressionBar">
                                                <div className="ArrierePlanBar">
                                                    <div className = "IndicationTextZone">
                                                        <p>0</p><p>50</p><p>100</p>
                                                    </div>
                                                    <div className = "Bars">
                                                        <div className = "HumidityBarArrierePlan"></div>
                                                        <div className = "HumidityBar"></div>
                                                    </div>
                                                    <div className = "pourcentage">
                                                        <p>%</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className = "GridTypeTwo">
                                            <p>Visibility</p>
                                            <h1>{this.state.ActuallyVisibility} miles</h1>
                                        </div>
                                        <div className = "GridTypeTwo Alx5Ezfgdslox">
                                            <p>Air Pressure</p>
                                            <h1>{this.state.ActuallyAirPressure} mb</h1>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                    <div className = "chargementScreen none">
                        <h3>Chargement de la page <span className = "pointSpan1 none">.</span> <span className = "pointSpan2 none">.</span> <span className = "pointSpan3 none">.</span></h3>
                    </div>
           
                </div>
                <div className = "errorPage none">
                    <h1>Ooops, une erreur est parvenue a nous echaper</h1>
                </div>
            </section>
            
        )
    }
}

export default All