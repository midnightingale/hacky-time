import './App.css';
import React from "react"; 
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import EventCard from "./components/EventCard";

class App extends React.Component { 
  constructor(props) { 
    super(props); 
    this.state = {
      events: [], 
      activeEvent: {},
      sidebarOpen: false,
      loggedIn: false
    };
  }

  componentDidMount() {
    fetch('https://api.hackthenorth.com/v3/graphql?query={ events { id name event_type permission start_time end_time description speakers { name profile_pic } public_url private_url related_events } }')
        .then(response => response.json())
        .then(dataIn => {
          //sort by start time
          let sortedEvents = dataIn.data.events.sort(
            (a, b) => a.start_time - b.start_time
          );
          //take out private events
          sortedEvents = sortedEvents.filter((e)=> e.permission === "public");
          this.setState({events: sortedEvents,
                         activeEvent: sortedEvents[0]});
        });
  } 

  render() { 
    return ( 
      <div className={(this.state.sidebarOpen) ? 
                      "left-shift main-container" : 
                      "main-container"}> 
        <Header />
        <Sidebar
          isOpen={this.state.sidebarOpen}
          event={this.state.activeEvent}
          events={this.state.events}
          changeEvent={(event) => { 
            this.setState({activeEvent: event})}}
          close={() => { 
            this.setState({sidebarOpen: false})}}
        />  
        <div className="events-container"> 
          {this.state.events.map((event) => (
            <EventCard 
              event={event} 
              update={() => { 
                this.setState({activeEvent: event,
                                sidebarOpen: true})
              }}/>
          ))}
        </div>
      </div>
    ); 
  } 
} 

export default App;
