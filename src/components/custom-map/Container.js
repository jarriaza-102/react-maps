import React from 'react';
import {render} from 'react-dom';
import GoogleApiComponent from './GoogleApiComponent';
import Map from './Map';

class Container extends React.Component{

    render(){
        const style = {
            width: '100vw',
            height: '100vh'
        };

        return (
            <div style={style} >
                <Map google={this.props.google}/>
            </div>
        );
    }
}

export default GoogleApiComponent({
    apiKey: 'AIzaSyAEbB6vii-fRG16LIlPZwBwMinJPO53sIU'
})(Container);