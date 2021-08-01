import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
      lon: '',
      lat: ''

    }
  }

  getLocationData = async (event) => {
    event.preventDefault();
    let cityName = event.target.city.value;
    console.log(cityName);
    let URL = `https://eu1.locationiq.com/v1/search.php?key=pk.3fda50d4c58c160cd474872dbf430d3a&q=${cityName}&format=json`
    let axiosreq = await axios.get(URL);
    this.setState({
      displayName: axiosreq.data[0].display_name,
      lon: axiosreq.data[0].lon,
      lat: axiosreq.data[0].lat,
      showMap: true
    })
  }

  render() {
    return (
      <>

        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <h1>City Explorer</h1>
        <form onSubmit={this.getLocationData}>
          <input type='text' placeholder='Enter City' name='city' />
          <button type='submit'>Get Location</button>
        </form>
        {this.state.displayName}
        <Image src={`https://maps.locationiq.com/v3/staticmap?key=pk.3fda50d4c58c160cd474872dbf430d3a&center=${this.state.lat},${this.state.lon}`} thumbnail />
        {/* {<img src={`https://maps.locationiq.com/v3/staticmap?key=pk.3fda50d4c58c160cd474872dbf430d3a&center=${this.state.lat},${this.state.lon}`} alt='map'/>} */}







      </>
    )
  }
}
export default App;