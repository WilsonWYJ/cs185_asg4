import React, { Component } from 'react';

import my from './images/my.jpg';

export class Home extends Component {
    render() {
        return (
            <div>
                <h1>Hi! Welcome to Yujie Wang's Website!</h1>
                <div style={{display: "flex"}}>
                    
                    <div>
                    <img id="myjpg" src={my}/>
                    </div>
                    
                    <p>
                        Hi! My name is Yujie Wang. I am a second year Computer Science major student at UCSB. I came from Xiamen (Amoy), a small island located in southeast China. My hobbies include listening to music (especially Cantonese songs), watching movies, and travelling. I’ve been to most of provinces in China and 6 states in the US, and I am looking forward to exploring more! Nice to meet you all!
                    </p>
                </div>
            </div>
        )
    }
}

export default Home;