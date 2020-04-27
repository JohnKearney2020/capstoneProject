import React, { Component } from 'react'
import { Button, Collapse, Card, Media, Row, Col } from 'react-bootstrap'

export default class ItemDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false      //This toggles the collapse to be false
        }
    }
    render() {
        return (
            <div>
                <Button className="item-details-button" variant="link" onClick={() => this.setState({open: !this.state.open})}>
                { this.state.open === false ? `See` : `Hide`} Item details
                { this.state.open === false ? `+` : `-`}
                </Button>
                <Collapse in={this.state.open}>
                    
                        <Card>
                            <Media>
                                
                                    <img  width={64} height={64} alt="thumbnail" src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6403/6403801_sd.jpg;maxHeight=1000;maxWidth=1000"/>
                                
                            
                            <Media.Body>
                                <p>EVGA - KO ULTRA GAMING NVIDIA GeForce RTX 2060 6GB GDDR6 PCI Express 3.0 Graphics Card</p>
                                <Row className="show-grid">
                                    <Col md={6}>
                                        <strong>{`$ ${this.props.price}`}</strong>
                                        <br />
                                        <strong className="price-strike">{`$ ${this.props.price}`}</strong>
                                    </Col>
                                    <Col md={6}>
                                        Qty : 1
                                    </Col>
                                </Row>
                            </Media.Body>
                            </Media>
                        </Card>
                </Collapse>
            </div>
        )
    }
}
