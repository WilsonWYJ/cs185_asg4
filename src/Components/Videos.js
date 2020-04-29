import React, { Component } from 'react';
import ScrollUpButton from "react-scroll-up-button";

import desert from './videos/desert.mp4';
import lamb from './videos/lamb.mp4';
import burger from './videos/burger.mp4';
import plane from './videos/plane.mp4';
import tea from './videos/tea.mp4';

export class Videos extends Component {
    render() {
        return (
            <div>
                <h1>Videos</h1>
                <div class="video-container">
                    <video controls="controls"><source src={desert} type="video/mp4"/></video>
                    <video controls="controls"><source src={lamb} type="video/mp4"/></video>
                    <video controls="controls"><source src={burger} type="video/mp4"/></video>
                    <video controls="controls"><source src={plane} type="video/mp4"/></video>
                    <video controls="controls"><source src={tea} type="video/mp4"/></video>
                </div>
                <ScrollUpButton />
            </div>
        )
    }
}

export default Videos;