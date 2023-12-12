"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const index_controller_1 = require("../controllers/index.controller");
const company_data_1 = __importDefault(require("../../../constants/company.data"));
const index_authorization_1 = require("../../../middlewares/Authorization/index.authorization");
const external_authorization_1 = require("../../../middlewares/Authorization/external.authorization");
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./files/${company_data_1.default === null || company_data_1.default === void 0 ? void 0 : company_data_1.default.COMPANY}/TMP`);
    },
    filename: function (req, file, cb) {
        file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8');
        const extension = file.originalname.split('.').pop();
        const filename = file.originalname.split("." + extension)[0] + "-" + Date.now().toString() + "." + extension;
        cb(null, filename);
    }
});
const upload = (0, multer_1.default)({
    storage: storage
});
const LocalRouterFn = (router) => {
    /* External Operation Routes: Start */
    router.get("/local/ext/download/:key", external_authorization_1.externalAuthorizeRequest, index_controller_1.GET_DOWNLOAD_EXT_FILE);
    router.put("/local/ext/files/move/:key", external_authorization_1.externalAuthorizeRequest, index_controller_1.PUT_EXT_MOVE_FILE);
    router.put("/local/ext/files/rename/:key", external_authorization_1.externalAuthorizeRequest, index_controller_1.PUT_EXT_RENAME_FILE);
    router.post("/local/ext/files", [external_authorization_1.externalAuthorizeRequest, upload.array("files", 20)], index_controller_1.POST_EXT_UPLOAD_FILES_LOCAL);
    router.post("/local/ext/folders", external_authorization_1.externalAuthorizeRequest, index_controller_1.POST_EXT_CREATE_FOLDER);
    /* External Operation Routes: End */
    /**
     * MOVE FILES
     */
    router.put("/local/files/move/:key", index_authorization_1.authorizeRequest, index_controller_1.PUT_MOVE_FILE);
    /*
    * RENAME FILE
    */
    router.put("/local/files/rename/:key", index_authorization_1.authorizeRequest, index_controller_1.PUT_RENAME_FILE);
    /**
     * COPY FILES
     */
    router.post("/local/files/copy/:key", index_authorization_1.authorizeRequest, index_controller_1.POST_COPY_FILE);
    /**
     * READ FILES UNDER FOLDERS
     */
    router.get("/local/folder/files/:key", index_authorization_1.authorizeRequest, index_controller_1.GET_FILES_DIR);
    /**
     * READ FILE
     */
    router.get("/local/files/:key", index_authorization_1.authorizeRequest, index_controller_1.GET_READ_FILE);
    /**
     * DOWNLOAD FILE
     */
    router.get("/local/download/:key", index_authorization_1.authorizeRequest, index_controller_1.GET_DOWNLOAD_FILE);
    /**
     * UPLOAD FILES
     */
    router.post("/local/files", [index_authorization_1.authorizeRequest, upload.array("files", 20)], index_controller_1.POST_UPLOAD_FILES_LOCAL);
    router.delete("/local/files/:key", index_authorization_1.authorizeRequest, index_controller_1.DELETE_REMOVE_FILE);
    router.get("/local/authorize/test", index_authorization_1.authorizeRequest, index_controller_1.GET_TEST_AUTHORIZATION);
    router.post("/local/folders", index_authorization_1.authorizeRequest, index_controller_1.POST_CREATE_FOLDER);
    router.delete("/local/folders/:key", index_authorization_1.authorizeRequest, index_controller_1.DELETE_REMOVE_FOLDER);
    /* Health Check */
    router.get("/health/check", index_authorization_1.authorizeRequest, index_controller_1.HEALTH_CHECK);
    router.post("/health/check", index_authorization_1.authorizeRequest, index_controller_1.HEALTH_CHECK);
};
exports.default = LocalRouterFn;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgucm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2VzL0xvY2FsL3JvdXRlcy9pbmRleC5yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxvREFBNEI7QUFDNUIsbUZBa0JzRDtBQUN0RCwyRUFBNkM7QUFDN0Msd0ZBQWtGO0FBQ2xGLDhGQUE2RjtBQUM3RixNQUFNLE9BQU8sR0FBRyxnQkFBTSxDQUFDLFdBQVcsQ0FBQztJQUMvQixXQUFXLEVBQUUsVUFBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDaEMsRUFBRSxDQUFDLElBQUksRUFBRSxXQUFXLHNCQUFNLGFBQU4sc0JBQU0sdUJBQU4sc0JBQU0sQ0FBRSxPQUFPLE1BQU0sQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDRCxRQUFRLEVBQUUsVUFBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUNqRSxNQUFNLENBQ1QsQ0FBQztRQUNGLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3JELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUM7UUFDN0csRUFBRSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN2QixDQUFDO0NBQ0osQ0FBQyxDQUFDO0FBRUgsTUFBTSxNQUFNLEdBQUcsSUFBQSxnQkFBTSxFQUFDO0lBQ2xC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