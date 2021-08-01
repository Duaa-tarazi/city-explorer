import React from 'react';
import axios from 'axios';

// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';

class App extends React.Component {
constructor(props){
  super(props);
this.state={
  display:'',
  lon:'',
  lat:''

}
}

  getLocationData=async(event)=>{
    event.preventDefault();
    let cityName=event.target.city.value;
    console.log(cityName);
    let URL=`https://eu1.locationiq.com/v1/search.php?key=pk.3fda50d4c58c160cd474872dbf430d3a&q=${cityName}&format=json`
    let axiosreq = await axios.get(URL);
    this.setState({
      displayName:axiosreq.data[0].display_name,
    lon: axiosreq.data[0].lon,
    lat: axiosreq.data[0].lat,
    showMap:true
    })
  }

  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <form onSubmit={this.getLocationData}>
          <input type='text' placeholder='Enter City' name='city'/>
          <button type='submit'>Get Location</button>
        </form>
        {this.state.displayName}
        {<img src={`https://maps.locationiq.com/v3/staticmap?key=pk.3fda50d4c58c160cd474872dbf430d3a&center=${this.state.lat},${this.state.lon}`} alt='map'/>}
        
      </>
    )
  }
}
export default App;