import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

export default class ReservationList extends Component {
  
  render(){
    // console.log("IM IN RES LIST", this.props)
    if (this.props && this.props.reservations !== []){
    let reservations = this.props.reservations.map((rObj, index)=> {
    return (<li key={index}> <h3>From {rObj.start}:00 to {rObj.end}:00  </h3>  {rObj.description}<Divider/> </li>)

    })
    return (
      <ul>
     {reservations}
     </ul>
    );
    }
  } 
};

