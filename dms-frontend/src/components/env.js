import { upload } from "@testing-library/user-event/dist/upload";

var env_var = {};

let env = process.env.REACT_APP_ENV;
let HOST = env?env+".dms-be":"localhost:8081";

//let HOST = "34.222.220.204:32076";
env_var = {
    HOST:HOST,
    LOGIN:"http://" + HOST + "/api/login",
    SIGNUP:"http://" + HOST + "/api/signup",
    DOWNLOAD:"http://" + HOST + "/api/file/download",
    UPLOAD:"http://" + HOST + "/api/file/upload",
    DELETE:"http://" + HOST + "/api/file",
    SHARE:"http://" + HOST + "/api/file/share",
    GETALL:"http://" + HOST + "/api/file",
    HEALTHCHECK:"http://" + HOST + "/api/healthcheck"
    
}

export default env_var;