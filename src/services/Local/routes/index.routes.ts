import { RouterFunction, SessionedRequest } from "@interfaces/express.middlewares";
import { IRouter, Request, Response, Router } from "express";

import multer from "multer";
import {
    GET_FILES_DIR,
    GET_READ_FILE,
    POST_UPLOAD_FILES_LOCAL,
    PUT_MOVE_FILE,
    DELETE_REMOVE_FILE,
    GET_TEST_AUTHORIZATION,
    GET_DOWNLOAD_FILE,
    PUT_RENAME_FILE,
    DELETE_REMOVE_FOLDER,
    POST_CREATE_FOLDER,
    HEALTH_CHECK,
    GET_DOWNLOAD_EXT_FILE,
    PUT_EXT_MOVE_FILE,
    PUT_EXT_RENAME_FILE,
    POST_EXT_UPLOAD_FILES_LOCAL,
    POST_EXT_CREATE_FOLDER,
    POST_COPY_FILE
} from "@services/Local/controllers/index.controller";
import config from "@constants/company.data";
import { authorizeRequest } from '@middlewares/Authorization/index.authorization';
import { externalAuthorizeRequest } from '@middlewares/Authorization/external.authorization';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./files/${config?.COMPANY}/TMP`);
    },
    filename: function (req, file, cb) {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString(
            'utf8',
        );
        const extension = file.originalname.split('.').pop();
        const filename = file.originalname.split("." + extension)[0] + "-" + Date.now().toString() + "." + extension;
        cb(null, filename);
    }
});

const upload = multer({
    storage: storage
});

const LocalRouterFn: RouterFunction = (router) => {

    /* External Operation Routes: Start */
    router.get("/local/ext/download/:key", externalAuthorizeRequest, GET_DOWNLOAD_EXT_FILE);
    router.put("/local/ext/files/move/:key", externalAuthorizeRequest, PUT_EXT_MOVE_FILE);
    router.put("/local/ext/files/rename/:key", externalAuthorizeRequest, PUT_EXT_RENAME_FILE);
    router.post("/local/ext/files", [externalAuthorizeRequest, upload.array("files", 20)], POST_EXT_UPLOAD_FILES_LOCAL);
    router.post("/local/ext/folders", externalAuthorizeRequest, POST_EXT_CREATE_FOLDER);
    /* External Operation Routes: End */

    /**
     * MOVE FILES
     */

    router.put("/local/files/move/:key", authorizeRequest, PUT_MOVE_FILE);

    /*
    * RENAME FILE
    */

    router.put("/local/files/rename/:key", authorizeRequest, PUT_RENAME_FILE);

    /**
     * COPY FILES
     */
    router.post("/local/files/copy/:key", authorizeRequest, POST_COPY_FILE);

    /**
     * READ FILES UNDER FOLDERS
     */
    router.get("/local/folder/files/:key", authorizeRequest, GET_FILES_DIR)

    /**
     * READ FILE
     */

    router.get("/local/files/:key", authorizeRequest, GET_READ_FILE);

    /**
     * DOWNLOAD FILE
     */

    router.get("/local/download/:key", authorizeRequest, GET_DOWNLOAD_FILE);


    /**
     * UPLOAD FILES
     */

    router.post("/local/files", [authorizeRequest, upload.array("files", 20)], POST_UPLOAD_FILES_LOCAL);



    router.delete("/local/files/:key", authorizeRequest, DELETE_REMOVE_FILE);
    router.get("/local/authorize/test", authorizeRequest, GET_TEST_AUTHORIZATION)
    router.post("/local/folders", authorizeRequest, POST_CREATE_FOLDER);
    router.delete("/local/folders/:key", authorizeRequest, DELETE_REMOVE_FOLDER);
    /* Health Check */
    router.get("/health/check", authorizeRequest, HEALTH_CHECK);
    router.post("/health/check", authorizeRequest, HEALTH_CHECK);
}

export default LocalRouterFn;