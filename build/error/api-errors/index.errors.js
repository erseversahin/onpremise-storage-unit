"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
exports.default = {
    UNAUTHORIZED: {
        status: http_status_1.default.UNAUTHORIZED,
        code: 'UNAUTHORIZED',
        message: 'You are not authorized to access this resource'
    },
    UNAUTHORIZED_ROLE: {
        status: http_status_1.default.UNAUTHORIZED,
        code: 'UNAUTHORIZED_ROLE',
        message: 'You are not authorized to perform this action or see this page. Please contact your system admin.'
    },
    FILE_NOT_FOUND: {
        status: http_status_1.default.NOT_FOUND,
        code: 'FILE_NOT_FOUND',
        message: 'File not found in the system'
    },
    FILES_NOT_UPLOADED: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'FILES_NOT_UPLOADED',
        message: 'Files not uploaded'
    },
    FOLDER_NOT_FOUND: {
        status: http_status_1.default.NOT_FOUND,
        code: 'FOLDER_NOT_FOUND',
        message: 'Folder not found in the system'
    },
    CREATE_FOLDER_ERROR: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'CREATE_FOLDER_ERROR',
        message: 'Error while creating folder'
    },
    REMOVE_FOLDER_ERROR: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'REMOVE_FOLDER_ERROR',
        message: 'Error while removing folder'
    },
    //GDRIVE
    GDRIVE_UPLOAD_ERROR: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'GDRIVE_UPLOAD_ERROR',
        message: 'Error uploading file to GDrive'
    },
    GDRIVE_READ_FILE_ERROR: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'GDRIVE_READ_FILE_ERROR',
        message: 'Error reading file from GDrive'
    },
    GDRIVE_UPDATED_FILE_ERROR: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'GDRIVE_UPDATED_FILE_ERROR',
        message: 'Error updating file in GDrive'
    },
    GDRIVE_DELETED_FILE_ERROR: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'GDRIVE_DELETED_FILE_ERROR',
        message: 'Error deleting file in GDrive'
    },
    GDRIVE_INTEGRATION_NOT_FOUND: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'GDRIVE_INTEGRATION_NOT_FOUND',
        message: 'GDrive integration not found'
    },
    GDRIVE_UPLOAD_LIMIT_EXCEEDED_ERROR: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'GDRIVE_UPLOAD_LIMIT_EXCEEDED_ERROR',
        message: 'Count of files exceeded 20 file barrier'
    },
    GDRIVE_CREATE_FOLDER_ERROR: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'GDRIVE_CREATE_FOLDER_ERROR',
        message: 'Error creating folder in GDrive'
    },
    GDRIVE_DELETE_FOLDER_ERROR: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'GDRIVE_DELETE_FOLDER_ERROR',
        message: 'Error deleting folder in GDrive'
    },
    //S3
    S3_UPLOAD_ERROR: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'S3_UPLOAD_ERROR',
        message: 'Error uploading file to S3'
    },
    S3_UPLOAD_LIMIT_EXCEEDED_ERROR: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'S3_UPLOAD_LIMIT_EXCEEDED_ERROR',
        message: 'Count of files exceeded 20 file barrier'
    },
    S3_SEARCH_ERROR: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'S3_SEARCH_ERROR',
        message: 'Error searching for file in S3'
    },
    S3_RENAME_ERROR: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'S3_RENAME_ERROR',
        message: 'Error renaming file in S3'
    },
    S3_MOVE_ERROR: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'S3_MOVE_ERROR',
        message: 'Error moving file in S3'
    },
    S3_REMOVE_OBJECT_ERROR: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'S3_REMOVE_OBJECT_ERROR',
        message: 'Error removing object in S3'
    },
    S3_CREATE_FOLDER_ERROR: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'S3_CREATE_FOLDER_ERROR',
        message: 'Error creating folder in S3'
    },
    S3_DELETE_FOLDER_ERROR: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'S3_DELETE_FOLDER_ERROR',
        message: 'Error deleting folder in S3'
    },
    S3_DOWNLOAD_ERROR: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'S3_DOWNLOAD_ERROR',
        message: 'Error downloading file from S3'
    },
    S3_AUTH_ERROR: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'S3_AUTH_ERROR',
        message: 'Error authenticating with S3'
    },
    S3_COMPANY_NOT_FOUND: {
        status: http_status_1.default.NOT_FOUND,
        code: 'S3_COMPANY_NOT_FOUND',
        message: 'S3 Company not found in the system'
    },
    S3_FILE_NOT_FOUND: {
        status: http_status_1.default.NOT_FOUND,
        code: 'S3_FILE_NOT_FOUND',
        message: 'S3 File not found in the system'
    },
    FILE_OPERATION_FAILED: {
        status: http_status_1.default.BAD_REQUEST,
        code: 'FILE_OPERATION_FAILED',
        message: 'File operation failed'
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Vycm9yL2FwaS1lcnJvcnMvaW5kZXguZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQWlDO0FBQ2pDLGtCQUFlO0lBQ1gsWUFBWSxFQUFFO1FBQ1YsTUFBTSxFQUFFLHFCQUFNLENBQUMsWUFBWTtRQUMzQixJQUFJLEVBQUUsY0FBYztRQUNwQixPQUFPLEVBQUUsZ0RBQWdEO0tBQzVEO0lBQ0QsaUJBQWlCLEVBQUU7UUFDZixNQUFNLEVBQUUscUJBQU0sQ0FBQyxZQUFZO1FBQzNCLElBQUksRUFBRSxtQkFBbUI7UUFDekIsT0FBTyxFQUFFLG1HQUFtRztLQUMvRztJQUNELGNBQWMsRUFBRTtRQUNaLE1BQU0sRUFBRSxxQkFBTSxDQUFDLFNBQVM7UUFDeEIsSUFBSSxFQUFFLGdCQUFnQjtRQUN0QixPQUFPLEVBQUUsOEJBQThCO0tBQzFDO0lBQ0Qsa0JBQWtCLEVBQUU7UUFDaEIsTUFBTSxFQUFFLHFCQUFNLENBQUMsV0FBVztRQUMxQixJQUFJLEVBQUUsb0JBQW9CO1FBQzFCLE9BQU8sRUFBRSxvQkFBb0I7S0FDaEM7SUFDRCxnQkFBZ0IsRUFBRTtRQUNkLE1BQU0sRUFBRSxxQkFBTSxDQUFDLFNBQVM7UUFDeEIsSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixPQUFPLEVBQUUsZ0NBQWdDO0tBQzVDO0lBQ0QsbUJBQW1CLEVBQUU7UUFDakIsTUFBTSxFQUFFLHFCQUFNLENBQUMsV0FBVztRQUMxQixJQUFJLEVBQUUscUJBQXFCO1FBQzNCLE9BQU8sRUFBRSw2QkFBNkI7S0FDekM7SUFDRCxtQkFBbUIsRUFBRTtRQUNqQixNQUFNLEVBQUUscUJBQU0sQ0FBQyxXQUFXO1FBQzFCLElBQUksRUFBRSxxQkFBcUI7UUFDM0IsT0FBTyxFQUFFLDZCQUE2QjtLQUN6QztJQUNELFFBQVE7SUFDUixtQkFBbUIsRUFBRTtRQUNqQixNQUFN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