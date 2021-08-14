// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
// import Search from './Search';
// import Nav from 'react-bootstrap/Nav';
// // import Button from 'react-bootstrap/Button';
// // import Form from 'react-bootstrap/Form';
// // import Row from 'react-bootstrap/Row';
// // import Col from 'react-bootstrap/Col';
// import Card from 'react-bootstrap/Card';
// import ListGroupItem from 'react-bootstrap/ListGroupItem';
// import ListGroup from 'react-bootstrap/ListGroup';

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       display: '',
//       lon: '',
//       lat: '',
//       showMap: false,
//       showCard:false

//     }
//   }

//   // getLocationData = async (event) => {
//   //   event.preventDefault();
//   //   let  cityName= event.target.city.value;
//   //   let URL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}}&q=${this.state.cityName}&format=json`
//   //   let axiosreq = await axios.get(URL);
//   //   this.setState({
//   //     displayName: axiosreq.data[0].display_name,
//   //     lon: axiosreq.data[0].lon,
//   //     lat: axiosreq.data[0].lat,
//   //     showMap: true,
//   //     showCard:true
//   //   })
//   // }

//   render() {
//     return (
//       <>

//         <Navbar bg="dark" variant="dark">
//           <Container>
//             <Navbar.Brand href="#home">City Explorer</Navbar.Brand>
//             <Nav className="me-auto">
//               <Nav.Link href="#home">Home</Nav.Link>
//               <Nav.Link href="#features">Features</Nav.Link>
//               <Nav.Link href="#pricing">Pricing</Nav.Link>
//             </Nav>
//           </Container>
//         </Navbar>
//         <br></br>
//         <br></br>
//         <h5>Enter a name of the city you want  🗺️⬇️</h5>
//         <br></br><br></br>
//         <Search> </Search>

//         {/* <Form onSubmit={this.getLocationData}>
//           <Row>
//             <Col xs={7}>
//               <Form.Control type='text' placeholder="Enter City" name='city' />
//             </Col>

//             <Col>
//               <Button type='submit' variant="outline-dark">Get Location</Button>

//             </Col>
//           </Row>
//         </Form> */}
//         <br></br><br></br>

//         {this.state.showCard&&

//         <Card style={{ width: '18rem' }}>

//             <Card.Img variant="top" src={`https://maps.locationiq.com/v3/staticmap?key=pk.3fda50d4c58c160cd474872dbf430d3a&center=${this.state.lat},${this.state.lon}`} />
//           <Card.Body>
//             <Card.Title>City:{this.state.displayName}</Card.Title>
//           </Card.Body>
//           <ListGroup className="list-group-flush">
//             <ListGroupItem>{this.state.displayName}  longitude:<br></br>{this.state.lon}
//             </ListGroupItem>
//             <ListGroupItem>{this.state.displayName}  Latitude:<br></br>{this.state.lat}</ListGroupItem>

//           </ListGroup>

//         </Card>}

//       </>
//     )
//   }
// }
// export default App;

import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Map from './components/Map';
import Weather from './components/Weather';
// import Movies from './components/Movies';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Footer from './components/Footer';
import Header from './components/Header';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayName: '',
      lon: '',
      lat: '',
      errorMsg: '',
      displayErr: false,
      showMap: false,
      showCard: false,
      weather: [],
      movies: [],
    }
  }
  getLocationData = async (event) => {
    event.preventDefault();
    const city = event.target.city.value;
    const URL = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_KEY}&q=${city}&format=json`;
    const urlServer = `${process.env.REACT_APP_SERVER_URL}/weather?lat=${this.state.lat}&lon=${this.state.lon}&city=${city}`
    const urlMovies = `${process.env.REACT_APP_SERVER_URL}/movies?city=${city}`;

    try {

      // sending request to the API, added await to prevent JS from skipping it
      let locationResult = await axios.get(URL);

      // console.log(cityResult.data[0].display_name); 
      // ^ accessing the data that we need from the API, data[0] is the number of the index that we choosed from the array
      this.setState({
        displayName: locationResult.data[0].display_name,
        lon: locationResult.data[0].lon,
        lat: locationResult.data[0].lat,
        showMap: true,
        displayErr: false,
      });

      let weatherResult = await axios.get(urlServer);
      this.setState({
        weather: weatherResult.data,
        showCard: true
      });

      let moviesResult = await axios.get(urlMovies)
      this.setState({
        movies: moviesResult.data.data
      });

    }
    catch (error) {
      this.setState({
        showMap: false,
        displayErr: true,
        showCard: false,
        // errorMsg: 'ERROR',

      });

    }
    let weatherData = await axios.get(URL);
    this.setState({
      weatherInfoArr: weatherData.data
    });
  }

  render() {
    return (
      <>

        <Header/>
        <br></br>
        <br></br>
        <section className="backgroundColor">
          


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
         <br></br><br></br>

          <Map
            displayName={this.state.displayName}
            lon={this.state.lon}
            lat={this.state.lat}
            showMap={this.state.showMap}
            displayErr={this.state.displayErr}
            errorMsg={this.state.errorMsg}
            showCard={this.state.showCard}

          />
          <Weather showCard={this.state.showCard} weather={this.state.weather} ></Weather>
          {/* <Movies showCard={this.state.showCard} movies={this.state.movies} ></Movies> */}
          
        </section>
        <Footer/>
      </>
    )
  }

}

export default App;