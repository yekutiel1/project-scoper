import store from '../store/store.js'
import {sendActor, getActors, deleteActor,Actor} from '../axios'


export const state1 = {
    projectDescription: '',
    actorsArray: []
}


const reducer = function (state, action) {
    var newState={...state1}
    switch (action.type) {
        case "ADD_DESCRIPTION":
        newState.projectDescription = action.payload;
        
            return newState
            break;

        case "SAVE_ACTOR":
        // Actor();
            let actorTemplate = {
                actorName: action.payload.actorName,
                actorDescription: action.payload.actorDescription,
                // userStoryArr: []
            };
            // console.log(actorTemplate);
            
            // newState.actorsArray.push(actorTemplate);
            sendActor(actorTemplate);
            // getActors();
            // return newState;
            break;

        case "GET_ACTORS_DB":
            getActors();
            // return newState;
            break;

        case "UPDATE_STATE":
            return newState.actorsArray = action.payload;;
            break;

        case "DELETE_ACTOR":
        deleteActor(action.payload);
            // return newState;
            break;

        case "ADD_USER_STORY":
            newState.actorsArray.map((elm) => {
                if (elm.id === action.payload.id) {
                    // console.log(elm, action.payload);
                    elm.userStoryArr.push(action.payload.userStory);
                }
            })
            return newState
            break;

        default:
            return newState;
            break;
    }
    return newState;
}
export default reducer;