import React ,{Component}from "react"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class Search extends Component {
  getLocationData = async (event) => {
    event.preventDefault();
    
    let  cityName= event.target.city.value;
    try{
    let URL = `https://.${process.env.REACT_APP_LOCATIONIQ_URL}?key=${process.env.REACT_APP_KEY}}&q=${this.state.cityName}&format=json`
    let respons = await axios.get(URL);
    let locationData=response.
    })
  }
  render(){
    return(
<Form onSubmit={this.props.getLocationData}>
<Row>
  <Col xs={7}>
    <Form.Control type='text' placeholder="Enter City" name='this.state.cityName' />
  </Col>

  <Col>
    <Button type='submit' variant="outline-dark">Get Location</Button>

  </Col>
</Row>
</Form>
    )
}
}
export default Search;