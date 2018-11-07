import axios from 'axios';
import store from '../store/store.js';
import {urlLinks} from '../linkes.js'

//=== getting all projects ===> returns all the names and id's of all projects  ===

export var getData = (url, type) => {
    console.log(url, type);
    
    axios.get(url)
    .then(function(res) {
        console.log(res);
        store.dispatch({type: type, payload: res.data});
    });
}
export var getProjects = (url) => {
    
    axios.get(url)
    .then(function(res) {
        console.log(res);
        store.dispatch({type: 'UPDATE_STATE_PROJECTS', payload: res.data});
    });
}

export var getVersions = (url) => {
    axios.get(url)
    .then(function(res) {
        console.log(res);
        store.dispatch({type: 'UPDATE_STATE_VERSIONS', payload: res.data});
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

