import React, { Component } from 'react'
import { Container } from '@material-ui/core';
import Timer from '../../components/Timer/Timer';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Container style={{marginTop:10}}  >
                    <Timer />
                </Container>
            </div>
        )
    }
}

