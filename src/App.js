import React, { Component } from 'react';
import './App.css'
import TabList from './Components/TabList';
import Body from './Components/Body';
// import config from './config'

// const firebase = require('firebase')


export class App extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: 1
    }
    this.changeTab = (id) => {
      this.setState({
        activeTab: id
      })
    }
  }
  // componentDidMount(){
  //   firebase.initializeApp(config)
  //   let ref = firebase.database.ref('data')
  //   ref.on('value', snapshot => {
  //     const data = snapshot.val()
  //     this.setState({data: data})
  //   })
  // }
  // componentDidUpdate(prevProps, prevState, snapshoyt){
  //   //only call set state here if it is wrapped in a condition
  //   //if you initialize this.state.shouldUpdate and have not changed it yet then this will not run
  //   if(this.state.shouldUpdate != prevState.shouldUpdate){
  //     //same code as above to retrieve the data 
  //   }
  // }
  render() {
    const tabs = [
      {
        id: 1,
        title: 'Home'
      },
      {
        id: 2,
        title: 'Images'
      },
      {
        id: 3,
        title: 'Videos'
      },
      {
        id: 4,
        title: 'Projects'
      },
      {
        id: 5,
        title: 'Movies'
      },
      {
        id: 6,
        title: 'Graph'
      },
      {
        id: 7,
        title: 'Messages'
      },
      {
        id: 8,
        title: 'My GitHub Page'
      }
    ]
    
    return (
      <div className="body">
        <div className="nav-bar">
          <TabList tabs={tabs} changeTab={this.changeTab} activeTab={this.state.activeTab}/>
        </div>
        <div className="main-body">
          <Body activeTab={this.state.activeTab}/>
        </div>
        
      </div>
    );
  }
}

export default App;