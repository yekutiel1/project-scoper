import React, { Component } from 'react';
import { pageLinkes } from './linkes';

class MainScreen extends Component {
    render() {
      return (
        <div className='mainScreen'>
          <Route path={pageLinkes.mangementTools} component={ManagmentTools} />
          <Route path={pageLinkes.projectDescreption} component={AddProjectDescription} />
          <Route path={pageLinkes.actors} component={AddActors} />
          <Route path={pageLinkes.userStory} component={AddUserStories} />
          <Route path={pageLinkes.drow_io} component={AttechDrow} />
        </div>
      );
    }
  }
export default MainScreen  