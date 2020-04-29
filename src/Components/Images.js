import React, { Component } from 'react';
import Image from "react-image-enlarger";
import ScrollUpButton from "react-scroll-up-button";

import manz from './images/manz.jpg';
import an125 from './images/an125.jpg';
import flower0 from './images/flower0.jpg';
import flower1 from './images/flower1.jpg';
import flower2 from './images/flower2.jpg';
import flower3 from './images/flower3.jpg';
import lagoon from './images/lagoon.jpg';
import ocean from './images/ocean.jpg';
import pool from './images/pool.jpg';
import rainbow from './images/rainbow.jpg';
import sunset from './images/sunset.jpg';
import ucen from './images/ucen.jpg';

const images = [
    manz,
    an125,
    flower1,
    lagoon,
    ocean,
    flower0,
    pool,
    sunset,
    flower2,
    ucen,
    rainbow,
    flower3
];

function SingleSource({ src }) {
    const [zoomed, setZoomed] = React.useState(false);
    return (
      <div>
        <Image
          zoomed={zoomed}
          src={src}
          onClick={() => setZoomed(true)}
          onRequestClose={() => setZoomed(false)}
        />
      </div>
    );
}

export class Images extends Component {
    render() {
        return (
            <div>
                <h1>Images</h1>
                <div class="img-container">
                    {images.map(image => (
                        <SingleSource key={image} src={image} />
                    ))}
                </div>
                <ScrollUpButton />
            </div>
        )
    }
}


export default Images;