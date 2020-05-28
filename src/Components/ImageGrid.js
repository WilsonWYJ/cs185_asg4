import React, { Component } from 'react';

class ImageGrid extends Component {

    render() {
        return (
            <div className="image-grid">
                {this.props.items}
            </div>
        );
    }
}

export default ImageGrid;