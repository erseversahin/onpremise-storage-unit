import { SessionedAsyncControllerType } from "@interfaces/express.middlewares";
import multer from "multer";
import path from "path";
import dirToJson from "dir-to-json";
import fs from "fs";
import mime from "mime-types";
import ApiErrorStore from "@error/api-errors/index.errors";
import ApiSuccessStore from "@error/api-successes/index.successes";
import ApiError from "@error/ApiError";
import jetlexaApi from "@clients/api.jetlexa";
import config from "@constants/company.data";
import { AxiosResponse } from "axios";

const formatBytes = (bytes: number, decimals: number = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const GET_FILES_DIR: SessionedAsyncControllerType = async (req, res) => {
    const { key } = req.params;
    let response;
    try {
        response = await req.jetlexaApi.get(`/cdn/folders/${key}`);
    } catch (error) {
        throw new ApiError(ApiErrorStore.FOLDER_NOT_FOUND);
    }


    const filesDir = path.resolve(response?.data?.node?.folder?.folderPath);
    try {
        const files = await dirToJson(filesDir);
        res.status(ApiSuccessStore.READ_FILES_UNDER_FOLDER.status).json({
            response: ApiSuccessStore.READ_FILES_UNDER_FOLDER,
            node: {
                ...files,
                "path": response?.data?.node?.folder?.folderPath,
                "name": response?.data?.node?.folder?.foldername,
                "type": "directory",
                "children": files?.children || [

                ]
            }
        });
    } catch (error: any) {
        res.status(ApiSuccessStore.READ_FILES_UNDER_FOLDER.status).json({
            response: ApiSuccessStore.READ_FILES_UNDER_FOLDER,
            node: {
                "path": response?.data?.node?.folder?.folderPath,
                "name": response?.data?.node?.folder?.foldername,
                "type": "directory",
                "children": [

                ]
            }
        });
    }
}

export const GET_READ_FILE: SessionedAsyncControllerType = async (req, res) => {
    const { key } = req.params;
    try {
        const response = await req?.jetlexaApi.get(`/cdn/files/${key}`);
        const filePath = path.resolve(response?.data?.node?.file?.filePath);
        if (fs.existsSync(filePath)) {
            const fileType = path.extname(filePath);
            const mimeType: string | boolean = mime.lookup(fileType);
            console.log(mimeType)
            if (mimeType) {
                console.log(fileType)
                res.setHeader("Content-Type", mimeType);
                res.setHeader("Content-Disposition", `filename=${response?.data?.node?.file?.filename}`);
                res.setHeader("filename", `${response?.data?.node?.file?.filename}`);
                const file = fs.readFileSync(filePath);
                res.status(ApiSuccessStore.FILE_DOWNLOADED.status).send(file);
            } else {
                res.status(ApiSuccessStore.FILE_DOWNLOADED.status).sendFile(filePath);
            }

        } else {
            throw new ApiError(ApiErrorStore.FILE_NOT_FOUND);
        }
    } catch (error: any) {
        console.log("ERROR::", error)
        throw new ApiError(ApiErrorStore.FILE_NOT_FOUND);
    }

}

export const PUT_MOVE_FILE: SessionedAsyncControllerType = async (req, res) => {
    const { key } = req.params;
    const { newFolderKey } = req.body;
    console.log('BURADA!!!')

    try {

        const fileResponse = await req.jetlexaApi.get(`/cdn/files/${key}`);
        const newFolderResponse = await req.jetlexaApi.get(`/cdn/folders/${newFolderKey}`);
        const filePath = path.resolve(fileResponse?.data?.node?.file?.filePath);
        const newFolderPath = path.resolve(newFolderResponse?.data?.node?.folder?.folderPath);
        const newFilePath = path.resolve(path.join(newFolderResponse?.data?.node?.folder?.folderPath, fileResponse?.data?.node?.file?.filename));


        if (!fs.existsSync(filePath)) {
            throw new ApiError(ApiErrorStore.FILE_NOT_FOUND);
        }

        if (!fs.existsSync(newFolderPath)) {
            fs.mkdirSync(newFolderPath);
        }

        fs.renameSync(filePath, newFilePath);

        const dirname: string = path.join(__dirname, '../../../../', 'files', config?.COMPANY).toString();
        const updateCDNFile = await req.jetlexaApi.put(`/cdn/files/${fileResponse?.data?.node?.file?.key}`, {
            file: {
                filePath: newFilePath,
                folder: newFolderResponse?.data?.node?.folder?.key,
            }
        });

        res.status(ApiSuccessStore.FILE_MOVED.status).json({
            response: ApiSuccessStore.FILE_MOVED,
            node: {
                __dirname: dirname,
                oldFilePath: filePath,
                newFilePath: newFilePath,
                newFolderPath: newFolderPath,
                updatedFile: {
                    ...updateCDNFile.data.node?.file,
                }
            }
        })
    } catch (error) {
        throw new ApiError(ApiErrorStore.FILE_NOT_FOUND);
    }
}
export const PUT_EXT_MOVE_FILE: SessionedAsyncControllerType = async (req, res) => {
    const { key } = req.params;
    const { newFolderKey } = req.body;
    try {

        const fileResponse = await req.jetlexaApi.get(`/cdn/ext/files/${key}`);
        const newFolderResponse = await req.jetlexaApi.get(`/cdn/ext/folders/${newFolderKey}`);
        const filePath = path.resolve(fileResponse?.data?.node?.file?.filePath);
        const newFolderPath = path.resolve(newFolderResponse?.data?.node?.folder?.folderPath);
        const newFilePath = path.resolve(path.join(newFolderResponse?.data?.node?.folder?.folderPath, fileResponse?.data?.node?.file?.filename));


        if (!fs.existsSync(filePath)) {
            throw new ApiError(ApiErrorStore.FILE_NOT_FOUND);
        }

        if (!fs.existsSync(newFolderPath)) {
            fs.mkdirSync(newFolderPath);
        }

        fs.renameSync(filePath, newFilePath);

        const dirname: string = path.join(__dirname, '../../../../', 'files', config?.COMPANY).toString();
        const updateCDNFile = await req.jetlexaApi.put(`/cdn/files/${fileResponse?.data?.node?.file?.key}`, {
            file: {
                filePath: newFilePath,
                folder: newFolderResponse?.data?.node?.folder?.key,
            }
        });

        res.status(ApiSuccessStore.FILE_MOVED.status).json({
            response: ApiSuccessStore.FILE_MOVED,
            node: {
                __dirname: dirname,
                oldFilePath: filePath,
                newFilePath: newFilePath,
                newFolderPath: newFolderPath,
                updatedFile: {
                    ...updateCDNFile.data.node?.file,
                }
            }
        })
    } catch (error) {
        throw new ApiError(ApiErrorStore.FILE_NOT_FOUND);
    }
}

export const PUT_RENAME_FILE: SessionedAsyncControllerType = async (req, res) => {
    const { key } = req.params;
    let { filename } = req.body;
    try {

        const fileResponse = await req.jetlexaApi.get(`/cdn/files/${key}`);
        const filePath = path.resolve(fileResponse?.data?.node?.file?.filePath);
        const extension = path.extname(filePath);
        if (!filename.endsWith(extension)) {
            filename = filename + extension;
        }
        const newFilePath = path.resolve(filePath.replace(fileResponse?.data?.node?.file?.filename, filename));

        console.log("NEW_FILE_PATH::", newFilePath);

        if (!fs.existsSync(filePath)) {
            throw new ApiError(ApiErrorStore.FILE_NOT_FOUND);
        }

        fs.renameSync(filePath, newFilePath);

        const dirname: string = path.join(__dirname, '../../../../', 'files', config?.COMPANY).toString();
        const updateCDNFile = await req.jetlexaApi.put(`/cdn/files/${fileResponse?.data?.node?.file?.key}`, {
            file: {
                filePath: newFilePath,
                filename: filename
            }
        });

        res.status(ApiSuccessStore.FILE_RENAMED.status).json({
            response: ApiSuccessStore.FILE_RENAMED,
            node: {
                __dirname: dirname,
                oldFilePath: filePath,
                newFilePath: newFilePath,
                updatedFile: {
                    ...updateCDNFile.data.node?.file,
                }
            }
        })
    } catch (error) {
        throw new ApiError(ApiErrorStore.FILE_NOT_FOUND);
    }
}
export const POST_COPY_FILE: SessionedAsyncControllerType = async (req, res) => {
    const { key } = req.params;
    let { filename } = req.body;
    try {

        const fileResponse = await req.jetlexaApi.get(`/cdn/files/${key}`);
        const filePath = path.resolve(fileResponse?.data?.node?.file?.filePath);
        const extension = path.extname(filePath);
        if (!filename.endsWith(extension)) {
            filename = filename + extension;
        }
        const newFilePath = path.resolve(filePath.replace(fileResponse?.data?.node?.file?.filename, filename));

        console.log("NEW_FILE_PATH::", newFilePath);

        if (!fs.existsSync(filePath)) {
            throw new ApiError(ApiErrorStore.FILE_NOT_FOUND);
        }

        // Dosyayı yeni bir isimle kopyalama
        fs.copyFileSync(filePath, newFilePath);

        const dirname: string = path.join(__dirname, '../../../../', 'files', config?.COMPANY).toString();
        console.log('BURADA 1::')

        console.log('BURADA 2::')

        res.status(ApiSuccessStore.FILE_COPIED.status).json({
            response: ApiSuccessStore.FILE_COPIED,
            node: {
                __dirname: dirname,
                originalFilePath: filePath,
                newFilePath: newFilePath,
                filePath: newFilePath,
                filename: filename
            }
        })
    } catch (error) {
        throw new ApiError(ApiErrorStore.FILE_OPERATION_FAILED);
    }
}

export const PUT_EXT_RENAME_FILE: SessionedAsyncControllerType = async (req, res) => {
    const { key } = req.params;
    let { filename } = req.body;
    try {

        const fileResponse = await req.jetlexaApi.get(`/cdn/ext/files/${key}`);
        const filePath = path.resolve(fileResponse?.data?.node?.file?.filePath);
        const extension = path.extname(filePath);
        if (!filename.endsWith(extension)) {
            filename = filename + extension;
        }
        const newFilePath = path.resolve(filePath.replace(fileResponse?.data?.node?.file?.filename, filename));

        console.log("NEW_FILE_PATH::", newFilePath);

        if (!fs.existsSync(filePath)) {
            throw new ApiError(ApiErrorStore.FILE_NOT_FOUND);
        }

        fs.renameSync(filePath, newFilePath);

        const dirname: string = path.join(__dirname, '../../../../', 'files', config?.COMPANY).toString();
        const updateCDNFile = await req.jetlexaApi.put(`/cdn/files/${fileResponse?.data?.node?.file?.key}`, {
            file: {
                filePath: newFilePath,
                filename: filename
            }
        });

        res.status(ApiSuccessStore.FILE_RENAMED.status).json({
            response: ApiSuccessStore.FILE_RENAMED,
            node: {
                __dirname: dirname,
                oldFilePath: filePath,
                newFilePath: newFilePath,
                updatedFile: {
                    ...updateCDNFile.data.node?.file,
                }
            }
        })
    } catch (error) {
        throw new ApiError(ApiErrorStore.FILE_NOT_FOUND);
    }
}

export const DELETE_REMOVE_FILE: SessionedAsyncControllerType = async (req, res) => {
    const { key } = req.params;


    const fileResponse = await req.jetlexaApi.get(`/cdn/files/${key}`);

    const file = fileResponse?.data?.node?.file;

    const filePath = path.resolve(file?.filePath);

    if (!fs.existsSync(filePath)) {
        throw new ApiError(ApiErrorStore.FILE_NOT_FOUND);
    }


    fs.unlinkSync(filePath);
    const deletedFileResponse = await req.jetlexaApi.delete(`/cdn/files/${key}`);

    const dirname: string = path.join(__dirname, '../../../../', 'files', config?.COMPANY).toString();

    res.status(ApiSuccessStore.FILE_MOVED.status).json({
        response: ApiSuccessStore.FILE_MOVED,
        node: {
            __dirname: dirname,
            removedFile: true,
            file: {
                ...deletedFileResponse.data.node?.file,
            }
        }
    })
}

export const POST_UPLOAD_FILES_LOCAL: SessionedAsyncControllerType = async (req, res) => {
    try {
        const files: any = req.files;
        let { contract } = req.body;
        console.log("DEFAULT_CONTRACT:::", contract)

        const filesArray = (files || []).map((file: any, index: number) => {
            console.log(index, ". FILE:::", file);
            return {
                filename: file?.filename,
                folderPath: path.resolve(path.join(__dirname, '../../../../', 'files', config?.COMPANY, 'TMP')),
                foldername: 'TMP',
                filePath: path.resolve(path.join(__dirname, '../../../../', file?.path)),
                fileSize: file?.size,
                formattedFileSize: formatBytes(file?.size),
                fileType: file?.mimetype
                /* CONTINUE HERE */
            }
        });

        let response = await req.jetlexaApi.post('/cdn/files', {
            files: filesArray
        })
        console.log("RESPONSE:", response?.data)

        const filesResponse = await req.jetlexaApi.post('/cdn/custom/files', {
            files: response?.data?.node?.files.map((file: any) => {
                return {
                    ...file
                }
            })
        });

        const promises = filesArray.map((file: any, index: number) => {
            return new Promise(async (resolve, reject) => {
                const filePath = path.resolve(file?.filePath);
                const newFilePath = path.resolve(path.join(file?.folderPath, filesResponse?.data?.node?.files[index]?.filename));
                console.log("FILE_PATH_AFTER_UPLOAD:::", filePath);
                console.log("NEW_FILE_PATH_AFTER_UPLOAD:::", newFilePath);
                if (file) {
                    if (!fs.existsSync(filePath)) {
                        throw new ApiError(ApiErrorStore.FILE_NOT_FOUND);
                    }

                    fs.renameSync(filePath, newFilePath);
                    const updateCDNFile = await req.jetlexaApi.put(`/cdn/files/${filesResponse?.data?.node?.files[index]?.key}`, {
                        file: {
                            filePath: newFilePath,
                            filename: filesResponse?.data?.node?.files[index]?.filename
                        }
                    });
                    if (contract) {
                        req?.jetlexaApi?.put(`/cdn/files/contract/${filesResponse?.data?.node?.files[index]?.uid}`, {
                            contract: contract
                        }).then((res: any) => {
                            console.log("DONE_ADDING_CONTRACT:::", true);
                        }).catch((error: any) => {
                            console.log("ERROR_ADDING_CONTRACT:::", error);
                        });
                    }
                    resolve(true);

                }
            })
        });

        Promise.all(promises).then((res: any) => { }).catch((error: any) => { });

        console.log("CREATE FILES:", filesResponse?.data)
        res.status(ApiSuccessStore.FILES_CREATED.status).json({
            response: ApiSuccessStore.FILES_CREATED,
            node: {
                files: filesResponse?.data?.node?.files
            }
        })
    } catch (error) {
        throw new ApiError(ApiErrorStore.FILES_NOT_UPLOADED);
    }
}

export const POST_EXT_UPLOAD_FILES_LOCAL: SessionedAsyncControllerType = async (req, res) => {
    try {
        const files: any = req.files;
        let { contract } = req.body;
        console.log("DEFAULT_CONTRACT:::", contract)

        const filesArray = (files || []).map((file: any, index: number) => {
            console.log(index, ". FILE:::", file);
            return {
                filename: file?.filename,
                folderPath: path.resolve(path.join(__dirname, '../../../../', 'files', config?.COMPANY, 'TMP')),
                foldername: 'TMP',
                filePath: path.resolve(path.join(__dirname, '../../../../', file?.path)),
                fileSize: file?.size,
                formattedFileSize: formatBytes(file?.size),
                fileType: file?.mimetype
                /* CONTINUE HERE */
            }
        });

        let response = await req.jetlexaApi.post('/cdn/ext/files', {
            files: filesArray
        })
        console.log("RESPONSE:", response?.data)

        const filesResponse = await req.jetlexaApi.post('/cdn/ext/custom/files', {
            files: response?.data?.node?.files.map((file: any) => {
                return {
                    ...file
                }
            })
        });

        const promises = filesArray.map((file: any, index: number) => {
            return new Promise(async (resolve, reject) => {
                const filePath = path.resolve(file?.filePath);
                const newFilePath = path.resolve(path.join(file?.folderPath, filesResponse?.data?.node?.files[index]?.filename));
                console.log("FILE_PATH_AFTER_UPLOAD:::", filePath);
                console.log("NEW_FILE_PATH_AFTER_UPLOAD:::", newFilePath);
                if (file) {
                    if (!fs.existsSync(filePath)) {
                        throw new ApiError(ApiErrorStore.FILE_NOT_FOUND);
                    }

                    fs.renameSync(filePath, newFilePath);
                    const updateCDNFile = await req.jetlexaApi.put(`/cdn/ext/files/${filesResponse?.data?.node?.files[index]?.key}`, {
                        file: {
                            filePath: newFilePath,
                            filename: filesResponse?.data?.node?.files[index]?.filename
                        }
                    });
                    if (contract) {
                        req?.jetlexaApi?.put(`/cdn/ext/files/contract/${filesResponse?.data?.node?.files[index]?.uid}`, {
                            contract: contract
                        }).then((res: any) => {
                            console.log("DONE_ADDING_CONTRACT:::", true);
                        }).catch((error: any) => {
                            console.log("ERROR_ADDING_CONTRACT:::", error);
                        });
                    }
                    resolve(true);

                }
            })
        });

        Promise.all(promises).then((res: any) => { }).catch((error: any) => { });

        console.log("CREATE FILES:", filesResponse?.data)
        res.status(ApiSuccessStore.FILES_CREATED.status).json({
            response: ApiSuccessStore.FILES_CREATED,
            node: {
                files: filesResponse?.data?.node?.files
            }
        })
    } catch (error) {
        throw new ApiError(ApiErrorStore.FILES_NOT_UPLOADED);
    }
}

export const GET_TEST_AUTHORIZATION: SessionedAsyncControllerType = async (req, res) => {
    res.json(req.user);
}

export const GET_DOWNLOAD_FILE: SessionedAsyncControllerType = async (req, res) => {
    const { key } = req.params;
    try {
        const response = await req?.jetlexaApi.get(`/cdn/files/${key}`);
        const filePath = path.resolve(response?.data?.node?.file?.filePath);
        if (fs.existsSync(filePath)) {
            res.status(ApiSuccessStore.FILE_DOWNLOADED.status).download(filePath);
        } else {
            throw new ApiError(ApiErrorStore.FILE_NOT_FOUND);
        }
    } catch (error: any) {
        console.log("ERROR::", error)
        throw new ApiError(ApiErrorStore.FILE_NOT_FOUND);
    }
}
export const GET_DOWNLOAD_EXT_FILE: SessionedAsyncControllerType = async (req, res) => {
    const { key } = req.params;
    try {
        const response = await req?.jetlexaApi.get(`/cdn/ext/files/${key}`);
        const filePath = path.resolve(response?.data?.node?.file?.filePath);
        if (fs.existsSync(filePath)) {
            res.status(ApiSuccessStore.FILE_DOWNLOADED.status).download(filePath);
        } else {
            throw new ApiError(ApiErrorStore.FILE_NOT_FOUND);
        }
    } catch (error: any) {
        console.log("ERROR::", error)
        throw new ApiError(ApiErrorStore.FILE_NOT_FOUND);
    }
}

export const POST_CREATE_FOLDER: SessionedAsyncControllerType = async (req, res) => {
    const { foldername } = req.body;
    const folderPath = path.resolve(path.join(__dirname, '../../../../', 'files', config?.COMPANY, foldername));

    if (!fs.existsSync(folderPath)) {
        let response: AxiosResponse | null = null;
        try {
            fs.mkdirSync(folderPath);
            response = await req.jetlexaApi.post('/cdn/folders', {
                folder: {
                    foldername: foldername,
                    folderPath: folderPath
                }
            });
            res.status(ApiSuccessStore.FOLDER_CREATED.status).json({
                response: ApiSuccessStore.FOLDER_CREATED,
                node: {
                    ...response?.data?.node
                }
            })
        } catch (error) {
            console.log("CUSTOM_CDN_FOLDER_CREATE_ERROR_1", error);
            throw new ApiError(ApiErrorStore.CREATE_FOLDER_ERROR);
        }
    } else {
        console.log("CUSTOM_CDN_FOLDER_CREATE_ERROR_2")
        throw new ApiError(ApiErrorStore.CREATE_FOLDER_ERROR);
    }
}
export const POST_EXT_CREATE_FOLDER: SessionedAsyncControllerType = async (req, res) => {
    const { foldername } = req.body;
    const folderPath = path.resolve(path.join(__dirname, '../../../../', 'files', config?.COMPANY, foldername));

    if (!fs.existsSync(folderPath)) {
        let response: AxiosResponse | null = null;
        try {
            fs.mkdirSync(folderPath);
            response = await req.jetlexaApi.post('/cdn/ext/folders', {
                folder: {
                    foldername: foldername,
                    folderPath: folderPath
                }
            });
            res.status(ApiSuccessStore.FOLDER_CREATED.status).json({
                response: ApiSuccessStore.FOLDER_CREATED,
                node: {
                    ...response?.data?.node
                }
            })
        } catch (error) {
            console.log("CUSTOM_CDN_FOLDER_CREATE_ERROR_1", error);
            throw new ApiError(ApiErrorStore.CREATE_FOLDER_ERROR);
        }
    } else {
        console.log("CUSTOM_CDN_FOLDER_CREATE_ERROR_2")
        throw new ApiError(ApiErrorStore.CREATE_FOLDER_ERROR);
    }
}

export const DELETE_REMOVE_FOLDER: SessionedAsyncControllerType = async (req, res) => {
    const { key } = req.params;
    console.log("DELETING_LOCAL_FOLDER:::", key);
    let folderInfo;
    try {
        folderInfo = await req.jetlexaApi.get(`/cdn/folders/${key}`);
    } catch (error) {
        throw new ApiError(ApiErrorStore.FOLDER_NOT_FOUND);
    }

    console.log(folderInfo)

    const folderPath = path.resolve(folderInfo?.data?.node?.folder?.folderPath);

    let response;
    try {
        response = await req.jetlexaApi.delete(`/cdn/folders/${key}`);
    } catch (error) {
        throw new ApiError(ApiErrorStore.REMOVE_FOLDER_ERROR);
    }

    if (fs.existsSync(folderPath)) {
        fs.rmdirSync(folderPath);
    }


    res.status(ApiSuccessStore.FOLDER_DELETED.status).json({
        response: ApiSuccessStore.FOLDER_DELETED,
        node: {
            ...response?.data?.node
        }
    })
}

export const HEALTH_CHECK: SessionedAsyncControllerType = async (req, res) => {
    res.json({
        timestamp: Date.now(),
        serverUp: true
    })
}