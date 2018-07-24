import React from 'react';
import {render} from 'react-dom';
import {
  interaction, layer, custom, control, //name spaces
  Interactions, Overlays, Controls,     //group
  Map, Layers, Overlay, Util    //objects
} from "react-openlayers";

class Container extends React.Component{  
  
  showPopup() {
    console.log('popup');
  }
  
  render () {
    return (
      <div>
      </div>
    );
  }
  
}
  
export default Container;