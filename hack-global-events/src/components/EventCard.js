import React from "react";
// import "../styles/eventcard.css";
// import '../styles/global.css';
import { Link } from 'react-router-dom'

function EventCard({event}){

  return(
    <Link>
    <h3> {event.title} </h3>
    <TypeTag type={events.event_type}/>
    </Link>
  )
}