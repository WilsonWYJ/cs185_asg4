import React, { Component } from 'react';
import ScrollUpButton from "react-scroll-up-button";

import transease from './images/transease.jpg';
import meetup from './images/meetup.png';
import coderecipe from './images/coderecipe.png';

export class Projects extends Component {
    render() {
        return (
            <div>
                <h1>Projects</h1>
                <div class="project">
                    <img src={transease}/>
                    <span>Transease: The latest realtime translate app. Have been awarded Microsoft Imagine Cup 2018 World Top 50 Big Idea Challange</span>
                </div>
                <div class="project">
                    <img src={meetup}/>
                    <span>Meetup: The mobile app that based on Map mainly serve UCSB students to make more friends, post and find activities, and chat</span>
                </div>
                <div class="project">
                    <img src={coderecipe}/>
                    <span><a href="https://coderecipe.cn">CodeRecipe</a>: The website that helps students to learn programming using the latest and unprecedented methods</span>
                </div>
                <ScrollUpButton />
            </div>
        )
    }
}

export default Projects;