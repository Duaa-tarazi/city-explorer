import React from 'react';
import axios from 'axios';

// import Form from 'react-bootstrap/Form';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';

class App extends React.Component {
  getLocationData=async(event)=>{
    event.preventDefault();
    let cityName=event.target.city.value;
    console.log(cityName);
    let URL=`https://eu1.locationiq.com/v1/search.php?key=pk.3fda50d4c58c160cd474872dbf430d3a&q=Amman&format=json`
    let axiosreq = await axios.get(URL);
  }

  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <form onSubmit={this.getLocationData}>
          <input type='text' placeholder='Enter City' name='city'/>
          <button type='submit'>Get Location</button>
        </form>
        
      </>
    )
  }
}
export default App;