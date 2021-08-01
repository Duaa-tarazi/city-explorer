import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '',
      lon: '',
      lat: '',
      showMap: false

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
            <Navbar.Brand href="#home">City Explorer</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
<br></br>
<br></br>
        <h5>Enter a name of the city you want  🗺️⬇️</h5>
        <br></br><br></br>
        
        <Form onSubmit={this.getLocationData}>
          <Row>
            <Col xs={7}>
              <Form.Control type='text' placeholder="Enter City" name='city' />
            </Col>

            <Col>
              <Button type='submit' variant="outline-dark">Get Location</Button>

            </Col> 
          </Row>
        </Form>
        <Row xs={6} md={4}>

          {this.state.displayName}
          

          
          {this.state.showMap &&
            <Image src={`https://maps.locationiq.com/v3/staticmap?key=pk.3fda50d4c58c160cd474872dbf430d3a&center=${this.state.lat},${this.state.lon}`} thumbnail 
            />
          }

        </Row>
        
      </>
    )
  }
}
export default App;