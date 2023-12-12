"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HEALTH_CHECK = exports.DELETE_REMOVE_FOLDER = exports.POST_EXT_CREATE_FOLDER = exports.POST_CREATE_FOLDER = exports.GET_DOWNLOAD_EXT_FILE = exports.GET_DOWNLOAD_FILE = exports.GET_TEST_AUTHORIZATION = exports.POST_EXT_UPLOAD_FILES_LOCAL = exports.POST_UPLOAD_FILES_LOCAL = exports.DELETE_REMOVE_FILE = exports.PUT_EXT_RENAME_FILE = exports.POST_COPY_FILE = exports.PUT_RENAME_FILE = exports.PUT_EXT_MOVE_FILE = exports.PUT_MOVE_FILE = exports.GET_READ_FILE = exports.GET_FILES_DIR = void 0;
const path_1 = __importDefault(require("path"));
const dir_to_json_1 = __importDefault(require("dir-to-json"));
const fs_1 = __importDefault(require("fs"));
const mime_types_1 = __importDefault(require("mime-types"));
const index_errors_1 = __importDefault(require("../../../error/api-errors/index.errors"));
const index_successes_1 = __importDefault(require("../../../error/api-successes/index.successes"));
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const company_data_1 = __importDefault(require("../../../constants/company.data"));
const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
const GET_FILES_DIR = async (req, res) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    const { key } = req.params;
    let response;
    try {
        response = await req.jetlexaApi.get(`/cdn/folders/${key}`);
    }
    catch (error) {
        throw new ApiError_1.default(index_errors_1.default.FOLDER_NOT_FOUND);
    }
    const filesDir = path_1.default.resolve((_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.folder) === null || _c === void 0 ? void 0 : _c.folderPath);
    try {
        const files = await (0, dir_to_json_1.default)(filesDir);
        res.status(index_successes_1.default.READ_FILES_UNDER_FOLDER.status).json({
            response: index_successes_1.default.READ_FILES_UNDER_FOLDER,
            node: Object.assign(Object.assign({}, files), { "path": (_f = (_e = (_d = response === null || response === void 0 ? void 0 : response.data) === null || _d === void 0 ? void 0 : _d.node) === null || _e === void 0 ? void 0 : _e.folder) === null || _f === void 0 ? void 0 : _f.folderPath, "name": (_j = (_h = (_g = response === null || response === void 0 ? void 0 : response.data) === null || _g === void 0 ? void 0 : _g.node) === null || _h === void 0 ? void 0 : _h.folder) === null || _j === void 0 ? void 0 : _j.foldername, "type": "directory", "children": (files === null || files === void 0 ? void 0 : files.children) || [] })
        });
    }
    catch (error) {
        res.status(index_successes_1.default.READ_FILES_UNDER_FOLDER.status).json({
            response: index_successes_1.default.READ_FILES_UNDER_FOLDER,
            node: {
                "path": (_m = (_l = (_k = response === null || response === void 0 ? void 0 : response.data) === null || _k === void 0 ? void 0 : _k.node) === null || _l === void 0 ? void 0 : _l.folder) === null || _m === void 0 ? void 0 : _m.folderPath,
                "name": (_q = (_p = (_o = response === null || response === void 0 ? void 0 : response.data) === null || _o === void 0 ? void 0 : _o.node) === null || _p === void 0 ? void 0 : _p.folder) === null || _q === void 0 ? void 0 : _q.foldername,
                "type": "directory",
                "children": []
            }
        });
    }
};
exports.GET_FILES_DIR = GET_FILES_DIR;
const GET_READ_FILE = async (req, res) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const { key } = req.params;
    try {
        const response = await (req === null || req === void 0 ? void 0 : req.jetlexaApi.get(`/cdn/files/${key}`));
        const filePath = path_1.default.resolve((_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.file) === null || _c === void 0 ? void 0 : _c.filePath);
        if (fs_1.default.existsSync(filePath)) {
            const fileType = path_1.default.extname(filePath);
            const mimeType = mime_types_1.default.lookup(fileType);
            console.log(mimeType);
            if (mimeType) {
                console.log(fileType);
                res.setHeader("Content-Type", mimeType);
                res.setHeader("Content-Disposition", `filename=${(_f = (_e = (_d = response === null || response === void 0 ? void 0 : response.data) === null || _d === void 0 ? void 0 : _d.node) === null || _e === void 0 ? void 0 : _e.file) === null || _f === void 0 ? void 0 : _f.filename}`);
                res.setHeader("filename", `${(_j = (_h = (_g = response === null || response === void 0 ? void 0 : response.data) === null || _g === void 0 ? void 0 : _g.node) === null || _h === void 0 ? void 0 : _h.file) === null || _j === void 0 ? void 0 : _j.filename}`);
                const file = fs_1.default.readFileSync(filePath);
                res.status(index_successes_1.default.FILE_DOWNLOADED.status).send(file);
            }
            else {
                res.status(index_successes_1.default.FILE_DOWNLOADED.status).sendFile(filePath);
            }
        }
        else {
            throw new ApiError_1.default(index_errors_1.default.FILE_NOT_FOUND);
        }
    }
    catch (error) {
        console.log("ERROR::", error);
        throw new ApiError_1.default(index_errors_1.default.FILE_NOT_FOUND);
    }
};
exports.GET_READ_FILE = GET_READ_FILE;
const PUT_MOVE_FILE = async (req, res) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    const { key } = req.params;
    const { newFolderKey } = req.body;
    console.log('BURADA!!!');
    try {
        const fileResponse = await req.jetlexaApi.get(`/cdn/files/${key}`);
        const newFolderResponse = await req.jetlexaApi.get(`/cdn/folders/${newFolderKey}`);
        const filePath = path_1.default.resolve((_c = (_b = (_a = fileResponse === null || fileResponse === void 0 ? void 0 : fileResponse.data) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.file) === null || _c === void 0 ? void 0 : _c.filePath);
        const newFolderPath = path_1.default.resolve((_f = (_e = (_d = newFolderResponse === null || newFolderResponse === void 0 ? void 0 : newFolderResponse.data) === null || _d === void 0 ? void 0 : _d.node) === null || _e === void 0 ? void 0 : _e.folder) === null || _f === void 0 ? void 0 : _f.folderPath);
        const newFilePath = path_1.default.resolve(path_1.default.join((_j = (_h = (_g = newFolderResponse === null || newFolderResponse === void 0 ? void 0 : newFolderResponse.data) === null || _g === void 0 ? void 0 : _g.node) === null || _h === void 0 ? void 0 : _h.folder) === null || _j === void 0 ? void 0 : _j.folderPath, (_m = (_l = (_k = fileResponse === null || fileResponse === void 0 ? void 0 : fileResponse.data) === null || _k === void 0 ? void 0 : _k.node) === null || _l === void 0 ? void 0 : _l.file) === null || _m === void 0 ? void 0 : _m.filename));
        if (!fs_1.default.existsSync(filePath)) {
            throw new ApiError_1.default(index_errors_1.default.FILE_NOT_FOUND);
        }
        if (!fs_1.default.existsSync(newFolderPath)) {
            fs_1.default.mkdirSync(newFolderPath);
        }
        fs_1.default.renameSync(filePath, newFilePath);
        const dirname = path_1.default.join(__dirname, '../../../../', 'files', company_data_1.default === null || company_data_1.default === void 0 ? void 0 : company_data_1.default.COMPANY).toString();
        const updateCDNFile = await req.jetlexaApi.put(`/cdn/files/${(_q = (_p = (_o = fileResponse === null || fileResponse === void 0 ? void 0 : fileResponse.data) === null || _o === void 0 ? void 0 : _o.node) === null || _p === void 0 ? void 0 : _p.file) === null || _q === void 0 ? void 0 : _q.key}`, {
            file: {
                filePath: newFilePath,
                folder: (_t = (_s = (_r = newFolderResponse === null || newFolderResponse === void 0 ? void 0 : newFolderResponse.data) === null || _r === void 0 ? void 0 : _r.node) === null || _s === void 0 ? void 0 : _s.folder) === null || _t === void 0 ? void 0 : _t.key,
            }
        });
        res.status(index_successes_1.default.FILE_MOVED.status).json({
            response: index_successes_1.default.FILE_MOVED,
            node: {
                __dirname: dirname,
                oldFilePath: filePath,
                newFilePath: newFilePath,
                newFolderPath: newFolderPath,
                updatedFile: Object.assign({}, (_u = updateCDNFile.data.node) === null || _u === void 0 ? void 0 : _u.file)
            }
        });
    }
    catch (error) {
        throw new ApiError_1.default(index_errors_1.default.FILE_NOT_FOUND);
    }
};
exports.PUT_MOVE_FILE = PUT_MOVE_FILE;
const PUT_EXT_MOVE_FILE = async (req, res) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
    const { key } = req.params;
    const { newFolderKey } = req.body;
    try {
        const fileResponse = await req.jetlexaApi.get(`/cdn/ext/files/${key}`);
        const newFolderResponse = await req.jetlexaApi.get(`/cdn/ext/folders/${newFolderKey}`);
        const filePath = path_1.default.resolve((_c = (_b = (_a = fileResponse === null || fileResponse === void 0 ? void 0 : fileResponse.data) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.file) === null || _c === void 0 ? void 0 : _c.filePath);
        const newFolderPath = path_1.default.resolve((_f = (_e = (_d = newFolderResponse === null || newFolderResponse === void 0 ? void 0 : newFolderResponse.data) === null || _d === void 0 ? void 0 : _d.node) === null || _e === void 0 ? void 0 : _e.folder) === null || _f === void 0 ? void 0 : _f.folderPath);
        const newFilePath = path_1.default.resolve(path_1.default.join((_j = (_h = (_g = newFolderResponse === null || newFolderResponse === void 0 ? void 0 : newFolderResponse.data) === null || _g === void 0 ? void 0 : _g.node) === null || _h === void 0 ? void 0 : _h.folder) === null || _j === void 0 ? void 0 : _j.folderPath, (_m = (_l = (_k = fileResponse === null || fileResponse === void 0 ? void 0 : fileResponse.data) === null || _k === void 0 ? void 0 : _k.node) === null || _l === void 0 ? void 0 : _l.file) === null || _m === void 0 ? void 0 : _m.filename));
        if (!fs_1.default.existsSync(filePath)) {
            throw new ApiError_1.default(index_errors_1.default.FILE_NOT_FOUND);
        }
        if (!fs_1.default.existsSync(newFolderPath)) {
            fs_1.default.mkdirSync(newFolderPath);
        }
        fs_1.default.renameSync(filePath, newFilePath);
        const dirname = path_1.default.join(__dirname, '../../../../', 'files', company_data_1.default === null || company_data_1.default === void 0 ? void 0 : company_data_1.default.COMPANY).toString();
        const updateCDNFile = await req.jetlexaApi.put(`/cdn/files/${(_q = (_p = (_o = fileResponse === null || fileResponse === void 0 ? void 0 : fileResponse.data) === null || _o === void 0 ? void 0 : _o.node) === null || _p === void 0 ? void 0 : _p.file) === null || _q === void 0 ? void 0 : _q.key}`, {
            file: {
                filePath: newFilePath,
                folder: (_t = (_s = (_r = newFolderResponse === null || newFolderResponse === void 0 ? void 0 : newFolderResponse.data) === null || _r === void 0 ? void 0 : _r.node) === null || _s === void 0 ? void 0 : _s.folder) === null || _t === void 0 ? void 0 : _t.key,
            }
        });
        res.status(index_successes_1.default.FILE_MOVED.status).json({
            response: index_successes_1.default.FILE_MOVED,
            node: {
                __dirname: dirname,
                oldFilePath: filePath,
                newFilePath: newFilePath,
                newFolderPath: newFolderPath,
                updatedFile: Object.assign({}, (_u = updateCDNFile.data.node) === null || _u === void 0 ? void 0 : _u.file)
            }
        });
    }
    catch (error) {
        throw new ApiError_1.default(index_errors_1.default.FILE_NOT_FOUND);
    }
};
exports.PUT_EXT_MOVE_FILE = PUT_EXT_MOVE_FILE;
const PUT_RENAME_FILE = async (req, res) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const { key } = req.params;
    let { filename } = req.body;
    try {
        const fileResponse = await req.jetlexaApi.get(`/cdn/files/${key}`);
        const filePath = path_1.default.resolve((_c = (_b = (_a = fileResponse === null || fileResponse === void 0 ? void 0 : fileResponse.data) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.file) === null || _c === void 0 ? void 0 : _c.filePath);
        const extension = path_1.default.extname(filePath);
        if (!filename.endsWith(extension)) {
            filename = filename + extension;
        }
        const newFilePath = path_1.default.resolve(filePath.replace((_f = (_e = (_d = fileResponse === null || fileResponse === void 0 ? void 0 : fileResponse.data) === null || _d === void 0 ? void 0 : _d.node) === null || _e === void 0 ? void 0 : _e.file) === null || _f === void 0 ? void 0 : _f.filename, filename));
        console.log("NEW_FILE_PATH::", newFilePath);
        if (!fs_1.default.existsSync(filePath)) {
            throw new ApiError_1.default(index_errors_1.default.FILE_NOT_FOUND);
        }
        fs_1.default.renameSync(filePath, newFilePath);
        const dirname = path_1.default.join(__dirname, '../../../../', 'files', company_data_1.default === null || company_data_1.default === void 0 ? void 0 : company_data_1.default.COMPANY).toString();
        const updateCDNFile = await req.jetlexaApi.put(`/cdn/files/${(_j = (_h = (_g = fileResponse === null || fileResponse === void 0 ? void 0 : fileResponse.data) === null || _g === void 0 ? void 0 : _g.node) === null || _h === void 0 ? void 0 : _h.file) === null || _j === void 0 ? void 0 : _j.key}`, {
            file: {
                filePath: newFilePath,
                filename: filename
            }
        });
        res.status(index_successes_1.default.FILE_RENAMED.status).json({
            response: index_successes_1.default.FILE_RENAMED,
            node: {
                __dirname: dirname,
                oldFilePath: filePath,
                newFilePath: newFilePath,
                updatedFile: Object.assign({}, (_k = updateCDNFile.data.node) === null || _k === void 0 ? void 0 : _k.file)
            }
        });
    }
    catch (error) {
        throw new ApiError_1.default(index_errors_1.default.FILE_NOT_FOUND);
    }
};
exports.PUT_RENAME_FILE = PUT_RENAME_FILE;
const POST_COPY_FILE = async (req, res) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const { key } = req.params;
    let { filename } = req.body;
    try {
        const fileResponse = await req.jetlexaApi.get(`/cdn/files/${key}`);
        const filePath = path_1.default.resolve((_c = (_b = (_a = fileResponse === null || fileResponse === void 0 ? void 0 : fileResponse.data) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.file) === null || _c === void 0 ? void 0 : _c.filePath);
        const extension = path_1.default.extname(filePath);
        if (!filename.endsWith(extension)) {
            filename = filename + extension;
        }
        const newFilePath = path_1.default.resolve(filePath.replace((_f = (_e = (_d = fileResponse === null || fileResponse === void 0 ? void 0 : fileResponse.data) === null || _d === void 0 ? void 0 : _d.node) === null || _e === void 0 ? void 0 : _e.file) === null || _f === void 0 ? void 0 : _f.filename, filename));
        console.log("NEW_FILE_PATH::", newFilePath);
        if (!fs_1.default.existsSync(filePath)) {
            throw new ApiError_1.default(index_errors_1.default.FILE_NOT_FOUND);
        }
        // Dosyayı yeni bir isimle kopyalama
        fs_1.default.copyFileSync(filePath, newFilePath);
        const dirname = path_1.default.join(__dirname, '../../../../', 'files', company_data_1.default === null || company_data_1.default === void 0 ? void 0 : company_data_1.default.COMPANY).toString();
        console.log('BURADA 1::');
        const updateCDNFile = await req.jetlexaApi.post(`/cdn/files`, {
            file: {
                filePath: newFilePath,
                filename: filename
            }
        });
        console.log('BURADA 2::');
        res.status(index_successes_1.default.FILE_COPIED.status).json({
            response: index_successes_1.default.FILE_COPIED,
            node: {
                __dirname: dirname,
                originalFilePath: filePath,
                newFilePath: newFilePath,
                copiedFile: Object.assign({}, (_g = updateCDNFile.data.node) === null || _g === void 0 ? void 0 : _g.file)
            }
        });
    }
    catch (error) {
        throw new ApiError_1.default(index_errors_1.default.FILE_OPERATION_FAILED);
    }
};
exports.POST_COPY_FILE = POST_COPY_FILE;
const PUT_EXT_RENAME_FILE = async (req, res) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const { key } = req.params;
    let { filename } = req.body;
    try {
        const fileResponse = await req.jetlexaApi.get(`/cdn/ext/files/${key}`);
        const filePath = path_1.default.resolve((_c = (_b = (_a = fileResponse === null || fileResponse === void 0 ? void 0 : fileResponse.data) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.file) === null || _c === void 0 ? void 0 : _c.filePath);
        const extension = path_1.default.extname(filePath);
        if (!filename.endsWith(extension)) {
            filename = filename + extension;
        }
        const newFilePath = path_1.default.resolve(filePath.replace((_f = (_e = (_d = fileResponse === null || fileResponse === void 0 ? void 0 : fileResponse.data) === null || _d === void 0 ? void 0 : _d.node) === null || _e === void 0 ? void 0 : _e.file) === null || _f === void 0 ? void 0 : _f.filename, filename));
        console.log("NEW_FILE_PATH::", newFilePath);
        if (!fs_1.default.existsSync(filePath)) {
            throw new ApiError_1.default(index_errors_1.default.FILE_NOT_FOUND);
        }
        fs_1.default.renameSync(filePath, newFilePath);
        const dirname = path_1.default.join(__dirname, '../../../../', 'files', company_data_1.default === null || company_data_1.default === void 0 ? void 0 : company_data_1.default.COMPANY).toString();
        const updateCDNFile = await req.jetlexaApi.put(`/cdn/files/${(_j = (_h = (_g = fileResponse === null || fileResponse === void 0 ? void 0 : fileResponse.data) === null || _g === void 0 ? void 0 : _g.node) === null || _h === void 0 ? void 0 : _h.file) === null || _j === void 0 ? void 0 : _j.key}`, {
            file: {
                filePath: newFilePath,
                filename: filename
            }
        });
        res.status(index_successes_1.default.FILE_RENAMED.status).json({
            response: index_successes_1.default.FILE_RENAMED,
            node: {
                __dirname: dirname,
                oldFilePath: filePath,
                newFilePath: newFilePath,
                updatedFile: Object.assign({}, (_k = updateCDNFile.data.node) === null || _k === void 0 ? void 0 : _k.file)
            }
        });
    }
    catch (error) {
        throw new ApiError_1.default(index_errors_1.default.FILE_NOT_FOUND);
    }
};
exports.PUT_EXT_RENAME_FILE = PUT_EXT_RENAME_FILE;
const DELETE_REMOVE_FILE = async (req, res) => {
    var _a, _b, _c;
    const { key } = req.params;
    const fileResponse = await req.jetlexaApi.get(`/cdn/files/${key}`);
    const file = (_b = (_a = fileResponse === null || fileResponse === void 0 ? void 0 : fileResponse.data) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.file;
    const filePath = path_1.default.resolve(file === null || file === void 0 ? void 0 : file.filePath);
    if (!fs_1.default.existsSync(filePath)) {
        throw new ApiError_1.default(index_errors_1.default.FILE_NOT_FOUND);
    }
    fs_1.default.unlinkSync(filePath);
    const deletedFileResponse = await req.jetlexaApi.delete(`/cdn/files/${key}`);
    const dirname = path_1.default.join(__dirname, '../../../../', 'files', company_data_1.default === null || company_data_1.default === void 0 ? void 0 : company_data_1.default.COMPANY).toString();
    res.status(index_successes_1.default.FILE_MOVED.status).json({
        response: index_successes_1.default.FILE_MOVED,
        node: {
            __dirname: dirname,
            removedFile: true,
            file: Object.assign({}, (_c = deletedFileResponse.data.node) === null || _c === void 0 ? void 0 : _c.file)
        }
    });
};
exports.DELETE_REMOVE_FILE = DELETE_REMOVE_FILE;
const POST_UPLOAD_FILES_LOCAL = async (req, res) => {
    var _a, _b, _c, _d;
    try {
        const files = req.files;
        let { contract } = req.body;
        console.log("DEFAULT_CONTRACT:::", contract);
        const filesArray = (files || []).map((file, index) => {
            console.log(index, ". FILE:::", file);
            return {
                filename: file === null || file === void 0 ? void 0 : file.filename,
                folderPath: path_1.default.resolve(path_1.default.join(__dirname, '../../../../', 'files', company_data_1.default === null || company_data_1.default === void 0 ? void 0 : company_data_1.default.COMPANY, 'TMP')),
                foldername: 'TMP',
                filePath: path_1.default.resolve(path_1.default.join(__dirname, '../../../../', file === null || file === void 0 ? void 0 : file.path)),
                fileSize: file === null || file === void 0 ? void 0 : file.size,
                formattedFileSize: formatBytes(file === null || file === void 0 ? void 0 : file.size),
                fileType: file === null || file === void 0 ? void 0 : file.mimetype
                /* CONTINUE HERE */
            };
        });
        let response = await req.jetlexaApi.post('/cdn/files', {
            files: filesArray
        });
        console.log("RESPONSE:", response === null || response === void 0 ? void 0 : response.data);
        const filesResponse = await req.jetlexaApi.post('/cdn/custom/files', {
            files: (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.files.map((file) => {
                return Object.assign({}, file);
            })
        });
        const promises = filesArray.map((file, index) => {
            return new Promise(async (resolve, reject) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                const filePath = path_1.default.resolve(file === null || file === void 0 ? void 0 : file.filePath);
                const newFilePath = path_1.default.resolve(path_1.default.join(file === null || file === void 0 ? void 0 : file.folderPath, (_c = (_b = (_a = filesResponse === null || filesResponse === void 0 ? void 0 : filesResponse.data) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.files[index]) === null || _c === void 0 ? void 0 : _c.filename));
                console.log("FILE_PATH_AFTER_UPLOAD:::", filePath);
                console.log("NEW_FILE_PATH_AFTER_UPLOAD:::", newFilePath);
                if (file) {
                    if (!fs_1.default.existsSync(filePath)) {
                        throw new ApiError_1.default(index_errors_1.default.FILE_NOT_FOUND);
                    }
                    fs_1.default.renameSync(filePath, newFilePath);
                    const updateCDNFile = await req.jetlexaApi.put(`/cdn/files/${(_f = (_e = (_d = filesResponse === null || filesResponse === void 0 ? void 0 : filesResponse.data) === null || _d === void 0 ? void 0 : _d.node) === null || _e === void 0 ? void 0 : _e.files[index]) === null || _f === void 0 ? void 0 : _f.key}`, {
                        file: {
                            filePath: newFilePath,
                            filename: (_j = (_h = (_g = filesResponse === null || filesResponse === void 0 ? void 0 : filesResponse.data) === null || _g === void 0 ? void 0 : _g.node) === null || _h === void 0 ? void 0 : _h.files[index]) === null || _j === void 0 ? void 0 : _j.filename
                        }
                    });
                    if (contract) {
                        (_k = req === null || req === void 0 ? void 0 : req.jetlexaApi) === null || _k === void 0 ? void 0 : _k.put(`/cdn/files/contract/${(_o = (_m = (_l = filesResponse === null || filesResponse === void 0 ? void 0 : filesResponse.data) === null || _l === void 0 ? void 0 : _l.node) === null || _m === void 0 ? void 0 : _m.files[index]) === null || _o === void 0 ? void 0 : _o.uid}`, {
                            contract: contract
                        }).then((res) => {
                            console.log("DONE_ADDING_CONTRACT:::", true);
                        }).catch((error) => {
                            console.log("ERROR_ADDING_CONTRACT:::", error);
                        });
                    }
                    resolve(true);
                }
            });
        });
        Promise.all(promises).then((res) => { }).catch((error) => { });
        console.log("CREATE FILES:", filesResponse === null || filesResponse === void 0 ? void 0 : filesResponse.data);
        res.status(index_successes_1.default.FILES_CREATED.status).json({
            response: index_successes_1.default.FILES_CREATED,
            node: {
                files: (_d = (_c = filesResponse === null || filesResponse === void 0 ? void 0 : filesResponse.data) === null || _c === void 0 ? void 0 : _c.node) === null || _d === void 0 ? void 0 : _d.files
            }
        });
    }
    catch (error) {
        throw new ApiError_1.default(index_errors_1.default.FILES_NOT_UPLOADED);
    }
};
exports.POST_UPLOAD_FILES_LOCAL = POST_UPLOAD_FILES_LOCAL;
const POST_EXT_UPLOAD_FILES_LOCAL = async (req, res) => {
    var _a, _b, _c, _d;
    try {
        const files = req.files;
        let { contract } = req.body;
        console.log("DEFAULT_CONTRACT:::", contract);
        const filesArray = (files || []).map((file, index) => {
            console.log(index, ". FILE:::", file);
            return {
                filename: file === null || file === void 0 ? void 0 : file.filename,
                folderPath: path_1.default.resolve(path_1.default.join(__dirname, '../../../../', 'files', company_data_1.default === null || company_data_1.default === void 0 ? void 0 : company_data_1.default.COMPANY, 'TMP')),
                foldername: 'TMP',
                filePath: path_1.default.resolve(path_1.default.join(__dirname, '../../../../', file === null || file === void 0 ? void 0 : file.path)),
                fileSize: file === null || file === void 0 ? void 0 : file.size,
                formattedFileSize: formatBytes(file === null || file === void 0 ? void 0 : file.size),
                fileType: file === null || file === void 0 ? void 0 : file.mimetype
                /* CONTINUE HERE */
            };
        });
        let response = await req.jetlexaApi.post('/cdn/ext/files', {
            files: filesArray
        });
        console.log("RESPONSE:", response === null || response === void 0 ? void 0 : response.data);
        const filesResponse = await req.jetlexaApi.post('/cdn/ext/custom/files', {
            files: (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.files.map((file) => {
                return Object.assign({}, file);
            })
        });
        const promises = filesArray.map((file, index) => {
            return new Promise(async (resolve, reject) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                const filePath = path_1.default.resolve(file === null || file === void 0 ? void 0 : file.filePath);
                const newFilePath = path_1.default.resolve(path_1.default.join(file === null || file === void 0 ? void 0 : file.folderPath, (_c = (_b = (_a = filesResponse === null || filesResponse === void 0 ? void 0 : filesResponse.data) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.files[index]) === null || _c === void 0 ? void 0 : _c.filename));
                console.log("FILE_PATH_AFTER_UPLOAD:::", filePath);
                console.log("NEW_FILE_PATH_AFTER_UPLOAD:::", newFilePath);
                if (file) {
                    if (!fs_1.default.existsSync(filePath)) {
                        throw new ApiError_1.default(index_errors_1.default.FILE_NOT_FOUND);
                    }
                    fs_1.default.renameSync(filePath, newFilePath);
                    const updateCDNFile = await req.jetlexaApi.put(`/cdn/ext/files/${(_f = (_e = (_d = filesResponse === null || filesResponse === void 0 ? void 0 : filesResponse.data) === null || _d === void 0 ? void 0 : _d.node) === null || _e === void 0 ? void 0 : _e.files[index]) === null || _f === void 0 ? void 0 : _f.key}`, {
                        file: {
                            filePath: newFilePath,
                            filename: (_j = (_h = (_g = filesResponse === null || filesResponse === void 0 ? void 0 : filesResponse.data) === null || _g === void 0 ? void 0 : _g.node) === null || _h === void 0 ? void 0 : _h.files[index]) === null || _j === void 0 ? void 0 : _j.filename
                        }
                    });
                    if (contract) {
                        (_k = req === null || req === void 0 ? void 0 : req.jetlexaApi) === null || _k === void 0 ? void 0 : _k.put(`/cdn/ext/files/contract/${(_o = (_m = (_l = filesResponse === null || filesResponse === void 0 ? void 0 : filesResponse.data) === null || _l === void 0 ? void 0 : _l.node) === null || _m === void 0 ? void 0 : _m.files[index]) === null || _o === void 0 ? void 0 : _o.uid}`, {
                            contract: contract
                        }).then((res) => {
                            console.log("DONE_ADDING_CONTRACT:::", true);
                        }).catch((error) => {
                            console.log("ERROR_ADDING_CONTRACT:::", error);
                        });
                    }
                    resolve(true);
                }
            });
        });
        Promise.all(promises).then((res) => { }).catch((error) => { });
        console.log("CREATE FILES:", filesResponse === null || filesResponse === void 0 ? void 0 : filesResponse.data);
        res.status(index_successes_1.default.FILES_CREATED.status).json({
            response: index_successes_1.default.FILES_CREATED,
            node: {
                files: (_d = (_c = filesResponse === null || filesResponse === void 0 ? void 0 : filesResponse.data) === null || _c === void 0 ? void 0 : _c.node) === null || _d === void 0 ? void 0 : _d.files
            }
        });
    }
    catch (error) {
        throw new ApiError_1.default(index_errors_1.default.FILES_NOT_UPLOADED);
    }
};
exports.POST_EXT_UPLOAD_FILES_LOCAL = POST_EXT_UPLOAD_FILES_LOCAL;
const GET_TEST_AUTHORIZATION = async (req, res) => {
    res.json(req.user);
};
exports.GET_TEST_AUTHORIZATION = GET_TEST_AUTHORIZATION;
const GET_DOWNLOAD_FILE = async (req, res) => {
    var _a, _b, _c;
    const { key } = req.params;
    try {
        const response = await (req === null || req === void 0 ? void 0 : req.jetlexaApi.get(`/cdn/files/${key}`));
        const filePath = path_1.default.resolve((_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.file) === null || _c === void 0 ? void 0 : _c.filePath);
        if (fs_1.default.existsSync(filePath)) {
            res.status(index_successes_1.default.FILE_DOWNLOADED.status).download(filePath);
        }
        else {
            throw new ApiError_1.default(index_errors_1.default.FILE_NOT_FOUND);
        }
    }
    catch (error) {
        console.log("ERROR::", error);
        throw new ApiError_1.default(index_errors_1.default.FILE_NOT_FOUND);
    }
};
exports.GET_DOWNLOAD_FILE = GET_DOWNLOAD_FILE;
const GET_DOWNLOAD_EXT_FILE = async (req, res) => {
    var _a, _b, _c;
    const { key } = req.params;
    try {
        const response = await (req === null || req === void 0 ? void 0 : req.jetlexaApi.get(`/cdn/ext/files/${key}`));
        const filePath = path_1.default.resolve((_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.file) === null || _c === void 0 ? void 0 : _c.filePath);
        if (fs_1.default.existsSync(filePath)) {
            res.status(index_successes_1.default.FILE_DOWNLOADED.status).download(filePath);
        }
        else {
            throw new ApiError_1.default(index_errors_1.default.FILE_NOT_FOUND);
        }
    }
    catch (error) {
        console.log("ERROR::", error);
        throw new ApiError_1.default(index_errors_1.default.FILE_NOT_FOUND);
    }
};
exports.GET_DOWNLOAD_EXT_FILE = GET_DOWNLOAD_EXT_FILE;
const POST_CREATE_FOLDER = async (req, res) => {
    var _a;
    const { foldername } = req.body;
    const folderPath = path_1.default.resolve(path_1.default.join(__dirname, '../../../../', 'files', company_data_1.default === null || company_data_1.default === void 0 ? void 0 : company_data_1.default.COMPANY, foldername));
    if (!fs_1.default.existsSync(folderPath)) {
        let response = null;
        try {
            fs_1.default.mkdirSync(folderPath);
            response = await req.jetlexaApi.post('/cdn/folders', {
                folder: {
                    foldername: foldername,
                    folderPath: folderPath
                }
            });
            res.status(index_successes_1.default.FOLDER_CREATED.status).json({
                response: index_successes_1.default.FOLDER_CREATED,
                node: Object.assign({}, (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.node)
            });
        }
        catch (error) {
            console.log("CUSTOM_CDN_FOLDER_CREATE_ERROR_1", error);
            throw new ApiError_1.default(index_errors_1.default.CREATE_FOLDER_ERROR);
        }
    }
    else {
        console.log("CUSTOM_CDN_FOLDER_CREATE_ERROR_2");
        throw new ApiError_1.default(index_errors_1.default.CREATE_FOLDER_ERROR);
    }
};
exports.POST_CREATE_FOLDER = POST_CREATE_FOLDER;
const POST_EXT_CREATE_FOLDER = async (req, res) => {
    var _a;
    const { foldername } = req.body;
    const folderPath = path_1.default.resolve(path_1.default.join(__dirname, '../../../../', 'files', company_data_1.default === null || company_data_1.default === void 0 ? void 0 : company_data_1.default.COMPANY, foldername));
    if (!fs_1.default.existsSync(folderPath)) {
        let response = null;
        try {
            fs_1.default.mkdirSync(folderPath);
            response = await req.jetlexaApi.post('/cdn/ext/folders', {
                folder: {
                    foldername: foldername,
                    folderPath: folderPath
                }
            });
            res.status(index_successes_1.default.FOLDER_CREATED.status).json({
                response: index_successes_1.default.FOLDER_CREATED,
                node: Object.assign({}, (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.node)
            });
        }
        catch (error) {
            console.log("CUSTOM_CDN_FOLDER_CREATE_ERROR_1", error);
            throw new ApiError_1.default(index_errors_1.default.CREATE_FOLDER_ERROR);
        }
    }
    else {
        console.log("CUSTOM_CDN_FOLDER_CREATE_ERROR_2");
        throw new ApiError_1.default(index_errors_1.default.CREATE_FOLDER_ERROR);
    }
};
exports.POST_EXT_CREATE_FOLDER = POST_EXT_CREATE_FOLDER;
const DELETE_REMOVE_FOLDER = async (req, res) => {
    var _a, _b, _c, _d;
    const { key } = req.params;
    console.log("DELETING_LOCAL_FOLDER:::", key);
    let folderInfo;
    try {
        folderInfo = await req.jetlexaApi.get(`/cdn/folders/${key}`);
    }
    catch (error) {
        throw new ApiError_1.default(index_errors_1.default.FOLDER_NOT_FOUND);
    }
    console.log(folderInfo);
    const folderPath = path_1.default.resolve((_c = (_b = (_a = folderInfo === null || folderInfo === void 0 ? void 0 : folderInfo.data) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.folder) === null || _c === void 0 ? void 0 : _c.folderPath);
    let response;
    try {
        response = await req.jetlexaApi.delete(`/cdn/folders/${key}`);
    }
    catch (error) {
        throw new ApiError_1.default(index_errors_1.default.REMOVE_FOLDER_ERROR);
    }
    if (fs_1.default.existsSync(folderPath)) {
        fs_1.default.rmdirSync(folderPath);
    }
    res.status(index_successes_1.default.FOLDER_DELETED.status).json({
        response: index_successes_1.default.FOLDER_DELETED,
        node: Object.assign({}, (_d = response === null || response === void 0 ? void 0 : response.data) === null || _d === void 0 ? void 0 : _d.node)
    });
};
exports.DELETE_REMOVE_FOLDER = DELETE_REMOVE_FOLDER;
const HEALTH_CHECK = async (req, res) => {
    res.json({
        timestamp: Date.now(),
        serverUp: true
    });
};
exports.HEALTH_CHECK = HEALTH_CHECK;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9Mb2NhbC9jb250cm9sbGVycy9pbmRleC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLGdEQUF3QjtBQUN4Qiw4REFBb0M7QUFDcEMsNENBQW9CO0FBQ3BCLDREQUE4QjtBQUM5QixrRkFBMkQ7QUFDM0QsMkZBQW1FO0FBQ25FLCtEQUF1QztBQUV2QywyRUFBNkM7QUFHN0MsTUFBTSxXQUFXLEdBQUcsQ0FBQyxLQUFhLEVBQUUsV0FBbUIsQ0FBQyxFQUFFLEVBQUU7SUFDeEQsSUFBSSxLQUFLLEtBQUssQ0FBQztRQUFFLE9BQU8sU0FBUyxDQUFDO0lBQ2xDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNmLE1BQU0sRUFBRSxHQUFHLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ3ZDLE1BQU0sS0FBSyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUV4RSxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BELE9BQU8sVUFBVSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3RSxDQUFDLENBQUM7QUFFSyxNQUFNLGFBQWEs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