import React, { Component } from 'react'
import { Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap'

var styles = {
    savings : {
        textDecoration : 'underline'
    },
    totalSavings : {
        color : "red",
        fontWeight : 800
    }
}
export default class Savings extends Component {
    render() {
        const tooltip = (
            <Tooltip id="tooltip">
                <p>Picking up your order in store helps you save more in cost.</p>
            </Tooltip>
        )
        

        return (
            <div>
                <Row className="show-grid">
                    <Col md={6}>
                        <OverlayTrigger placcement="bottom" overlay={tooltip}>
                            <div style={styles.savings}>Savings</div>
                        </OverlayTrigger>
                    </Col>
                <Col style={styles.totalSavings} md={6}>{`$ ${this.props.price}`}</Col>
                </Row>
            </div>
        )
    }
}
