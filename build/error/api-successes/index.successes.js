"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
exports.default = {
    FILE_MOVED: {
        status: http_status_1.default.OK,
        code: 'FILE_MOVED',
        message: "File is moved successfully on the system"
    },
    FILES_CREATED: {
        status: http_status_1.default.OK,
        code: 'FILES_CREATED',
        message: 'Files are created successfully on the system'
    },
    FILE_UPDATED: {
        status: http_status_1.default.OK,
        code: 'FILE_UPDATED',
        message: 'File is updated successfully on the system'
    },
    FILE_DELETED: {
        status: http_status_1.default.OK,
        code: 'FILE_DELETED',
        message: 'File is deleted successfully on the system'
    },
    FILE_RENAMED: {
        status: http_status_1.default.OK,
        code: 'FILE_RENAMED',
        message: 'File is renamed successfully on the system'
    },
    READ_FILES_UNDER_FOLDER: {
        status: http_status_1.default.OK,
        code: 'READ_FILES_UNDER_FOLDER',
        message: 'Files are read successfully on the system'
    },
    FILE_DOWNLOADED: {
        status: http_status_1.default.OK,
        code: 'FILE_DOWNLOADED',
        message: 'File is downloaded successfully on the system'
    },
    FOLDER_CREATED: {
        status: http_status_1.default.OK,
        code: 'FOLDER_CREATED',
        message: 'Folder is created successfully on the system'
    },
    FOLDER_DELETED: {
        status: http_status_1.default.OK,
        code: 'FOLDER_DELETED',
        message: 'Folder is removed successfully on the system'
    },
    //S3
    S3_UPLOAD_SUCCESSFUL: {
        status: http_status_1.default.OK,
        code: 'S3_UPLOAD_SUCCESSFUL',
        message: "File is uploaded successfully on S3"
    },
    S3_SEARCH_SUCCESSFUL: {
        status: http_status_1.default.OK,
        code: 'S3_SEARCH_SUCCESSFUL',
        message: "File is searched successfully on S3"
    },
    S3_RENAME_SUCCESSFUL: {
        status: http_status_1.default.OK,
        code: 'S3_RENAME_SUCCESSFUL',
        message: "Object is renamed successfully on S3"
    },
    S3_MOVE_SUCCESSFUL: {
        status: http_status_1.default.OK,
        code: 'S3_MOVE_SUCCESSFUL',
        message: "Object is moved successfully on S3"
    },
    S3_REMOVE_OBJECT_SUCCESSFUL: {
        status: http_status_1.default.OK,
        code: 'S3_REMOVE_OBJECT_SUCCESSFUL',
        message: "Object is removed successfully on S3"
    },
    S3_CREATE_FOLDER_SUCCESSFUL: {
        status: http_status_1.default.OK,
        code: 'S3_CREATE_FOLDER_SUCCESSFUL',
        message: "Folder is created successfully on S3"
    },
    S3_DELETE_FOLDER_SUCCESSFUL: {
        status: http_status_1.default.OK,
        code: 'S3_DELETE_FOLDER_SUCCESSFUL',
        message: "Folder is removed successfully on S3"
    },
    S3_DOWNLOAD_SUCCESSFUL: {
        status: http_status_1.default.OK,
        code: 'S3_DOWNLOAD_FILE',
        message: "File is downloaded successfully on S3"
    },
    //DRIVE
    GDRIVE_UPLOAD_SUCCESSFUL: {
        status: http_status_1.default.OK,
        code: 'GDRIVE_UPLOAD_SUCCESSFUL',
        message: "File is uploaded successfully on GDrive"
    },
    GDRIVE_CREATE_FILE_FROM_FILE: {
        status: http_status_1.default.OK,
        code: 'GDRIVE_CREATE_FILE_FROM_FILE',
        message: "File is created successfully on GDrive"
    },
    GDRIVE_READ_FILE: {
        status: http_status_1.default.OK,
        code: 'GDRIVE_READ_FILE',
        message: "File is read successfully on GDrive"
    },
    GDRIVE_UPDATED_FILE: {
        status: http_status_1.default.OK,
        code: 'GDRIVE_UPDATED_FILE',
        message: "File is updated successfully on GDrive"
    },
    GDRIVE_DELETED_FILE: {
        status: http_status_1.default.OK,
        code: 'GDRIVE_DELETED_FILE',
        message: "File is deleted successfully on GDrive"
    },
    GDRIVE_CREATED_FOLDER: {
        status: http_status_1.default.OK,
        code: 'GDRIVE_CREATED_FOLDER',
        message: "Folder is created successfully on GDrive"
    },
    GDRIVE_DELETED_FOLDER: {
        status: http_status_1.default.OK,
        code: 'GDRIVE_DELETED_FOLDER',
        message: "Folder is deleted successfully on GDrive"
    },
    GDRIVE_DOWNLOAD_FILE: {
        status: http_status_1.default.OK,
        code: 'GDRIVE_DOWNLOAD_FILE',
        message: "File is downloaded successfully on GDrive"
    },
    FILE_COPIED: {
        status: http_status_1.default.OK,
        code: 'FILE_COPIED',
        message: "File is copied successfully on the system"
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguc3VjY2Vzc2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Vycm9yL2FwaS1zdWNjZXNzZXMvaW5kZXguc3VjY2Vzc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQWlDO0FBQ2pDLGtCQUFlO0lBQ1gsVUFBVSxFQUFFO1FBQ1IsTUFBTSxFQUFFLHFCQUFNLENBQUMsRUFBRTtRQUNqQixJQUFJLEVBQUUsWUFBWTtRQUNsQixPQUFPLEVBQUUsMENBQTBDO0tBQ3REO0lBQ0QsYUFBYSxFQUFFO1FBQ1gsTUFBTSxFQUFFLHFCQUFNLENBQUMsRUFBRTtRQUNqQixJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsOENBQThDO0tBQzFEO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsTUFBTSxFQUFFLHFCQUFNLENBQUMsRUFBRTtRQUNqQixJQUFJLEVBQUUsY0FBYztRQUNwQixPQUFPLEVBQUUsNENBQTRDO0tBQ3hEO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsTUFBTSxFQUFFLHFCQUFNLENBQUMsRUFBRTtRQUNqQixJQUFJLEVBQUUsY0FBYztRQUNwQixPQUFPLEVBQUUsNENBQTRDO0tBQ3hEO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsTUFBTSxFQUFFLHFCQUFNLENBQUMsRUFBRTtRQUNqQixJQUFJLEVBQUUsY0FBYztRQUNwQixPQUFPLEVBQUUsNENBQTRDO0tBQ3hEO0lBQ0QsdUJBQXVCLEVBQUU7UUFDckIsTUFBTSxFQUFFLHFCQUFNLENBQUMsRUFBRTtRQUNqQixJQUFJLEVBQUUseUJBQXlCO1FBQy9CLE9BQU8sRUFBRSwyQ0FBMkM7S0FDdkQ7SUFDRCxlQUFlLEVBQUU7UUFDYixNQUFNLEVBQUUscUJBQU0sQ0FBQyxFQUFFO1FBQ2pCLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsT0FBTyxFQUFFLCtDQUErQztLQUMzRDtJQUNELGNBQWMsRUFBRTtRQUNaLE1BQU0sRUFBRSxxQkFBTSxDQUFDLEVBQUU7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