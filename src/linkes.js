export const pageLinkes = {
    // mangementTools:'/scoping/managment-tools',
    mangementTools:'/',
    projectDescreption: '/scoping/project-descreption',
    actors: '/scoping/actors',
    subjects: '/scoping/subjects',
    userStory: '/scoping/user-story',
    assumptions: '/scoping/assumptions',
    diagram: '/scoping/diagram',
    pricing: '/scoping/pricing',
   
}

// const mainURL = "http://10.2.1.119:3000";
// const mainURL = "http://10.2.1.104:3000/api";
 const mainURL = "http://10.2.1.106:3000/api";


export const dispatchKeys = {
    actor: {
        saveActor: "SAVE_ACTOR",
    }
}

export const imgLinks = [
    "https://lh3.googleusercontent.com/SFMflSbOeLfUivop2EeoYHT15DQhIZAg76rbv6wPwNk5kTlDdjPZ4jKotW8_b011AnaVE__LvWEeCvHRQHXrgxGCjzkHNkPME7OfBO4",
    "https://lh4.googleusercontent.com/SjZwyeu0BvNZZGT7CakmI7UvYMWbA89iKxhgBs7TAaygxlQxW2J3rTNHFXFlRNxPTanFhQws6dpJVfi1jG2xqIkeufE6vJSYQkqmhNs",
    "https://lh5.googleusercontent.com/GdxJ2SfygYAoXG2ju-GpmZBFhIEo2K7hSuuNgcMHfxtTkxT1LwuzuG5KGGG_FBcKeSFVKDdNI-6oeImH54ixiSPBfznP96TF6b8WSi0",
    "https://lh5.googleusercontent.com/UpA8ALhLjByPZWdqxabgPA-QyuRaVqAs90WGzUTmI0St1L8qVjX9InIXTb9Vz8gJTxmkMlgE2YpaiZinSBm-9UKV0fzYgsBJTUdj4U0",
    "https://lh3.googleusercontent.com/kFOZKrvk8pTKDenuZoFSR5SjGK6eCoz3PnqFPuD-DcVKi1zhOfeKFu0Leb-S4bFJIOw0Hm0_SlT16j_xsdmJaLEBWODFzvCU8uK582GL",
    "https://lh5.googleusercontent.com/GYigeVpsmGoruqMDd4AGqd3TBNFwjhG_Frd0xY81Q_ukA2e-rfNb5ZOFPyptCQTAUyeCWvErfFmWgaX_oCdP7KxSa-Ap5xn_GSbCMzP5",
    "https://lh3.googleusercontent.com/DCkAAlv3Sq7okbsyX0cdNVYSAG3WijKXc13ayyDlaxfT1oD2Z7xUJodhK6XGJvBXA5kK0Tk5e2-TRLwo2mBCCDF4sX5-2vOhzuaYDeLe",
    "https://lh6.googleusercontent.com/uWXwHw4k7g-k7ukGiqR5sdmhI2dUhlhUjoZPuEvijnIGV92n2DcgJ5LIjbC1bbeQO3pwFDUXVPnHghnDkZFaJsj2xh2tl3xqVLBNkA5l",
]


export const urlLinks = {
    createNewProject: mainURL + '/project/newProject',
    createNewVersion: mainURL + '/project/newVersion',

    saveActor: mainURL + '/actor',
    saveSubject: mainURL + '/general/subject',
    saveUserStory: mainURL + '/userStory',
    saveGeneralAssumptions: mainURL + '/general/generalAssumptions',
    saveAssumption: mainURL + '/general/assumption',

    
    editActor: mainURL + '/actor',
    editSubject: mainURL + '/general/subjects',
    editUserStory: mainURL + '/userStory',
    editAssumption: mainURL + '/general/assumption',
    
    deleteActor: mainURL + '/actor',
    deleteSubject: mainURL + '/general/subjects',
    deleteUserStory: mainURL + '/userStory',
    deleteAssumption: mainURL + '/general/assumption',
    
    rejectionExplenation: mainURL + '/general/rejection',
    projectDescription: mainURL + '/general/projectDescription',

    getProjects: mainURL + '/project/allProjects',
    getVersions: mainURL + '/project/allVersions',
    getAldVersionData: mainURL + '/project/version',
    getAllData: mainURL + '/project/allData',
    getUserStories: mainURL + '/userStory/allStories',
}