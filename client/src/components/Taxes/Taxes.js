import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'

export default class Taxes extends Component {
    render() {
        return (
            <div>
                <br/>
            <Row className="show-grid">
                <Col md={6}>Taxes & fees</Col>
                <Col md={6}>{`$ ${this.props.taxes}`}</Col>
            </Row>
            </div>
        )
    }
}
