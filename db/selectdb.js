require("dotenv").config({ quiet: true });

const { NODE_ENV, LOCAL_DB_URL, REMOTE_DB_URL } = process.env;

function getUrl() {
    switch(NODE_ENV){
        case 'dev':
            return LOCAL_DB_URL;
        case 'prod': 
            return REMOTE_DB_URL; 
    };
}

const dbURL = getUrl();

module.exports = {
    dbURL, 
    NODE_ENV
};
