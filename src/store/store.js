import { createStore } from 'redux'
import { urlLinks } from '../linkes.js'
import { createNewProject, getData, saveData, editData, deleteData } from './axios'
import pricingData from '../rest_API_example_of_task_container.json';

var state = {
    projectsArray: [],
    versionsArray: [],
    currentProject: '',
    oldVersionNumber: '',
    oldVersionData: null,
    currentActor: '',
    projectDescription: '',
    generalAssumptions: [],
    currentAssumptions: [],
    actorsArray: [],
    subjects: [],

    pricing: [],
    grandTotalPrice: null,
    discount: '',
    additionalPricing: '',

    diagram: ''
}

var reduser = function (state, action) {
    let url = '';
    var newState = { ...state };
    switch (action.type) {

        case "GET_PROJECTS":
            url = `${urlLinks.getProjects}`;
            getData(url,'UPDATE_STATE_PROJECTS');
            return newState;
            break;

        case "UPDATE_STATE_PROJECTS":
            newState.projectsArray = action.payload;
            return newState;
            break;

        case "UPDATE_CURRENT_PROJECT_ID":
            newState.currentProject = action.payload;
            return newState;
            break;

        case "GET_ALL_DATA":
            url = `${urlLinks.getAllData}/${newState.currentProject}`;
            getData(url,'UPDATE_STATE');
            return newState;
            break;

        case "UPDATE_STATE":
            newState.projectDescription = action.payload.projectDescription;
            newState.actorsArray = action.payload.allActors;
            newState.generalAssumptions = action.payload.generalAssumptions;
            newState.currentAssumptions = action.payload.currentAssumptions;
            newState.currentVersion = action.payload._id;
            newState.subjects = action.payload.subjects;

            newState.pricing = action.payload.pricing;
            newState.grandTotalPrice = action.payload.grandTotalPrice;
            newState.discount = action.payload.discount;
            newState.additionalPricing = action.payload.additionalPricing;
            console.log(action.payload);
            
            return newState;
            break;

        case "CREATE_NEW_PROJECT":
            url = urlLinks.createNewProject;
            createNewProject(url, action.payload);
            return newState
            break;

        case "CREATE_NEW_VERSION":
            url = `${urlLinks.createNewVersion}/${newState.currentProject}`;
            saveData(url, {editorName: action.payload}, 'GET_ALL_DATA');
            return newState
            break;

        case "REJECTION_EXPLENATION":
            url = `${urlLinks.rejectionExplenation}/${newState.currentProject}`
            saveData(url, {rejectionExplenation: action.payload}, '');
            return newState
            break;

        case "PROJECT_DESCREPTION":
            url = `${urlLinks.projectDescription}/${newState.currentProject}`;
            saveData(url, { projectDescription: action.payload }, 'GET_ALL_DATA');
            return newState;
            break;


        case "GET_VERSIONS":
            url = `${urlLinks.getVersions}/${newState.currentProject}`;
            getData(url,'UPDATE_STATE_VERSIONS');
            return newState;
            break;

        case "UPDATE_STATE_VERSIONS":
            newState.versionsArray = action.payload;
            return newState;
            break;

        case "UPDATE_OLD_VERSION_NUMBER":
            newState.oldVersionNumber = action.payload;
            return newState;
            break;

        case "GET_OLD_VERSION_DATA":
            url = `${urlLinks.getAldVersionData}/${newState.currentProject}/${newState.oldVersionNumber}`;
            getData(url, 'UPDATE_STATE_OLD_VERSION_DATA');
            return newState;
            break;

        case "UPDATE_STATE_OLD_VERSION_DATA":
            newState.oldVersionData = action.payload;
            return newState;
            break;


        case "GET_DATA_FROM_PRICING":

            url = 'http://fromPricing';
            getData(url, 'SAVE_PRICING_DATA')
            return newState;
            break;

        case "SAVE_PRICING_DATA":
            url = `${urlLinks.savePricing}/${newState.currentProject}`;
            saveData(url, action.payload, 'GET_ALL_DATA');
            return newState;
            break;

        case 'ADD_PRICE_TO_CONTAINER':
            newState.pricing[action.payload.ProcessIndex].containers[action.payload.containerIndex].price = action.payload.price;
            return newState;
            break;

        case 'ADD_COMMENT_TO_PROCESS':
            newState.pricing[action.payload.ProcessIndex].comment = action.payload.processComment;
            url = `${urlLinks.saveComment}/${newState.currentProject}/${action.payload.ProcessIndex}`;
            console.log(newState);
            
            saveData(url, {comment: action.payload.processComment}, '')
            return newState;
            break;

        case 'SAVE_DISCOUNT':
            url = `${urlLinks.saveDiscount}/${newState.currentProject}`;
            saveData(url, action.payload, '')
            return newState;
            break;

        case 'SAVE_ADDITIONAL_PRICING':
            url = `${urlLinks.saveAdditionalPricing}/${newState.currentProject}`;
            saveData(url, {additionalPricing: action.payload}, '')
            return newState;
            break;

        case "SAVE_ACTOR":
            var actorTemplate = {
                name: action.payload.name,
                description: action.payload.description,
            };
            url = `${urlLinks.saveActor}/${newState.currentProject}`;
            saveData(url, actorTemplate, 'GET_ALL_DATA')
            return newState;
            break;

        case "SAVE_SUBJECT":
            var subjectTemplate = {
                name: action.payload.name,
                description: action.payload.description,
            };
            url = `${urlLinks.saveSubject}/${newState.currentProject}`;
            saveData(url, subjectTemplate, 'GET_ALL_DATA');
            return newState;
            break;

        case "SAVE_USER_STORY":
            url = `${urlLinks.saveUserStory}/${newState.currentProject}/${action.payload.indexOfActor}`;
            saveData(url, action.payload.userStory, 'GET_ALL_DATA');
            return newState
            break;

        case "SAVE_GENERAL_ASSUMPTIONS":
            url = `${urlLinks.saveGeneralAssumptions}/${newState.currentProject}`;
            saveData(url, { generalAssumptions: action.payload }, 'GET_ALL_DATA')
            return newState;
            break;

        case "SAVE_ASSUMPTION":
            url = `${urlLinks.saveAssumption}/${newState.currentProject}`;
            saveData(url, { assumption: action.payload }, 'GET_ALL_DATA')
            return newState;
            break;

        case "EDIT_ASSUMPTION":
            url = `${urlLinks.editAssumption}/${newState.currentProject}/${action.payload.index}`;
            editData(url, { assumption: action.payload.assumption }, 'GET_ALL_DATA')
            return newState;
            break;

        case "EDIT_ACTOR":
            var actorTemplate = {
                name: action.payload.name,
                description: action.payload.description,
            };
            url = `${urlLinks.editActor}/${newState.currentProject}/${action.payload.editActorIndex}`;
            editData(url, actorTemplate, 'GET_ALL_DATA');
            return newState;
            break;

        case "EDIT_SUBJECT":
            var subjectTemplate = {
                name: action.payload.name,
                description: action.payload.description,
            };
            url = `${urlLinks.editActor}/${action.payload.currentActorId}`;
            editData(url, actorTemplate, 'GET_ALL_DATA');
            return newState;
            break;

        case "EDIT_USER_STORY":
            url = `${urlLinks.editUserStory}/${newState.currentProject}/${action.payload.indexOfActor}/${action.payload.editUserStoryIndex}`;
            editData(url, action.payload.userStory, 'GET_ALL_DATA')
            return newState;
            break;

        case "DELETE_ACTOR":
            url = `${urlLinks.deleteActor}/${newState.currentProject}/${action.payload.index}`
            deleteData(url, 'GET_ALL_DATA');
            return newState;
            break;

        case "DELETE_SUBJECT":
            // var url = `${urlLinks.deleteActor}/${newState.currentVersion}/${action.payload.index}`
            // deleteData(url, 'GET_ALL_DATA');
            return newState;
            break;

        case "DELETE_ASSUMPTION":
            url = `${urlLinks.deleteAssumption}/${newState.currentProject}/${action.payload}`
            deleteData(url, 'GET_ALL_DATA');
            return newState;
            break;

        case "DELETE_USER_STORY":
            url = `${urlLinks.deleteUserStory}/${newState.currentProject}/${action.payload.indexOfActor}/${action.payload.storyLocation}`
            deleteData(url, 'GET_ALL_DATA');
            return newState;
            break;

        case "SAVE_DIAGRAM":
            newState.diagram = action.payload;
            return newState;
            break;



        default:
            return newState;
            break;
    }
}

var store = createStore(reduser, state)
export default store

