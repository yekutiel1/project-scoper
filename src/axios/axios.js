import axios from 'axios';
import store from '../store/store.js';
import {urlLinks} from '../linkes.js'

//=== getting all projects ===> returns all the names and id's of all projects  ===

export var getProjects = (url) => {
    axios.get(url)
    .then(function(res) {
        console.log(res);
        store.dispatch({type: 'UPDATE_STATE_PROJECTS', payload: res.data});
    });
}

export var createNewPrject = (url, data) => {
    axios.post(url, data)
    .then(function (response) {
        console.log(response);
        store.dispatch({ type: 'GET_PROJECTS' });
  });
}

// === ading rejection explenation to old version === 

export var rejectionExplenation = (url, rejectionExplenation) => {
    console.log(rejectionExplenation);
    
    axios.put(url, {rejectionExplenation})
    .then(function (res) {
        console.log(res);
    });
}

// === creating new version ===

export var createNewVersion = (url, editorName) => {
    axios.put(url, {editorName})
    .then(function (res) {
        console.log(res);
        store.dispatch({type: 'GET_ALL_DATA'});
    });
}

//=== Getting all data of current version of specific project ===

export var getAllData = (url) => {
    axios.get(url)
    .then(function(res) {
        console.log(res);
        store.dispatch({type: 'UPDATE_STATE', payload: res.data});
    });
}
export var getUserStories = (url, currentActorId, type) => {
    axios.get(url)
    .then(function(res) {
        console.log(res);
        store.dispatch({type: 'UPDATE_USER_STORIES', payload: {userStories: res.data, currentActorId: currentActorId}});
    });
}

// === Save Data === 

export var saveData = (url, data, type) => {
    console.log(url, data);
    axios.put(url,  data)
    .then(function (res) {
        store.dispatch({type: type});
        console.log(res);
    });
}

// === Edit Data === 

export var editData = (url, data, type) => {
    axios.put(url, data)
    .then(function(res) {
        console.log(res);
        
        store.dispatch({type: type});
    });
}

// === Delete Data === 

export var deleteData = (url, type) => {
    axios.delete(url)
    .then(function(res) {
        console.log(res);
        store.dispatch({type: type});
    });
}

/////////////////////////////////








// === ading project description to correct version === (צריך להוסיף מ.ז של גירסה)


export var projectDescription = (currentVersion, projectDescription) => {
    axios.put(`${urlLinks.projectDescription}/${currentVersion}`,  {projectDescription})
    .then(function (res) {
        // store.dispatch({type: 'GET_ALL_DATA '});
        console.log(res);
    });
}









   


// import axios from 'axios';
// import store from '../store/store.js';
// import {urlLinks} from '../linkes.js'


// export var rejectionExplenation = (correctProject, rejectionExplenation) => {
//     console.log(rejectionExplenation);
//     axios.put(`rejection/${correctProject}`, {rejectionExplenation})
//     .then(function (res) {
//         console.log(res);
//     });
// }
// export var createNewPrject = (correctProject, state) => {
//     axios.post(urlLinks.createNewProject, { projectName: state.projectName, editorName: state.editorName })
//     .then(function (response) {
//         console.log(response);
//         store.dispatch({ type: 'GET_PROJECTS_DB' });
//     });
// }
// export var createNewVersion = (correctProject, editorName) => {
//     console.log(editorName);
    
//     axios.put(`/newVersion/${correctProject}`, {editorName})
//     .then(function (res) {
//         // store.dispatch({type: 'GET_ACTORS_DB'});
//         console.log(res);
//     });
// }
// export var projectDescription = (correctProject, projectDescription) => {
//     axios.put(`/projectDescription/${correctProject}`,  {projectDescription})
//     .then(function (res) {
//         // store.dispatch({type: 'GET_ALL_DATA '});
//         console.log(res);
//     });
// }
// export var sendActor = (actor, correctProject) => {
    
//     axios.put(`${urlLinks.sendActor}/${correctProject}`,  actor)
//     .then(function (res) {
//         store.dispatch({type: 'GET_ACTORS_DB'});
//         console.log(res);
//     });
// }
// export var addSubject = (subject, correctProject) => {
    
//     axios.put(`/addSubject/${correctProject}`,  subject)
//     .then(function (res) {
//         // store.dispatch({type: 'GET_ACTORS_DB'});
//         console.log(res);
//     });
// }
// export var sendUserStory = (correctProject, indexOfActor, userStory) => {
//     axios.put(`/userStoreis/${correctProject}/${indexOfActor}`,  {userStory})
//     .then(function (res) {
//         store.dispatch({type: 'GET_ACTORS_DB'});
//         console.log(res);
//     });
// }

// export var deleteUserStory = (correctProject, userStory) => {
//     axios.delete(`${urlLinks.deleteUserStory}/${correctProject}/${userStory.indexOfActor}/${userStory.storyLocation}`)
//     .then(function(res) {
//         console.log(res);
//         store.dispatch({type: 'GET_ACTORS_DB'});
//     });
// }

// export var editUserStory = (correctProject, userStoryData) => {
//     console.log(userStoryData);
    
//     axios.put(`${urlLinks.editUserStory}/${correctProject}/${userStoryData.indexOfActor}/${userStoryData.editUserStoryIndex}`, {userStory: userStoryData.userStory})
//     .then(function(res) {
//         console.log(res);
//         store.dispatch({type: 'GET_ACTORS_DB'});
//     });
// }


// export var getActors = (correctProject) => {
//     axios.get(`${urlLinks.getActors}/${correctProject}`)
//     .then(function(response) {
//         console.log(response);
        
//         store.dispatch({type: 'UPDATE_STATE_ACTORS', payload: response.data});
//     });
// }
// export var getAllData = (correctProject) => {
//     axios.get(`allData/${correctProject}`)
//     .then(function(res) {
//         console.log(res);
        
//         store.dispatch({type: 'UPDATE_STATE', payload: res.data});
//     });
// }
// export var deleteActor = (correctProject, actorIndex) => {
//     // console.log(`${urlLinks.deleteActor}${correctProject}/${actorIndex}`);
    
//     axios.delete(`${urlLinks.deleteActor}${correctProject}/${actorIndex}`)
//     .then(function(res) {
//         console.log(res);
        
//         store.dispatch({type: 'GET_ACTORS_DB'});
//     });
// }
// export var editActor = (correctProject, actor) => {
//     // console.log(`${urlLinks.deleteActor}${correctProject}/${actorIndex}`);
    
//     axios.put(`${urlLinks.editActor}/${correctProject}/${actor.editActorIndex}`, {actorName: actor.actorName, actorDescription: actor.actorDescription})
//     .then(function(res) {
//         console.log(res);
        
//         store.dispatch({type: 'GET_ACTORS_DB'});
//     });
// }

// export var getProjects = () => {
//     axios.get(urlLinks.getProjects)
//     .then(function(response) {
//         store.dispatch({type: 'UPDATE_STATE_PROJECTS', payload: response.data});
//     });
// }
