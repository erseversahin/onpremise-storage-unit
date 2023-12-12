import status from 'http-status';
export default {
    UNAUTHORIZED: {
        status: status.UNAUTHORIZED,
        code: 'UNAUTHORIZED',
        message: 'You are not authorized to access this resource'
    },
    UNAUTHORIZED_ROLE: {
        status: status.UNAUTHORIZED,
        code: 'UNAUTHORIZED_ROLE',
        message: 'You are not authorized to perform this action or see this page. Please contact your system admin.'
    },
    FILE_NOT_FOUND: {
        status: status.NOT_FOUND,
        code: 'FILE_NOT_FOUND',
        message: 'File not found in the system'
    },
    FILES_NOT_UPLOADED: {
        status: status.BAD_REQUEST,
        code: 'FILES_NOT_UPLOADED',
        message: 'Files not uploaded'
    },
    FOLDER_NOT_FOUND: {
        status: status.NOT_FOUND,
        code: 'FOLDER_NOT_FOUND',
        message: 'Folder not found in the system'
    },
    CREATE_FOLDER_ERROR: {
        status: status.BAD_REQUEST,
        code: 'CREATE_FOLDER_ERROR',
        message: 'Error while creating folder'
    },
    REMOVE_FOLDER_ERROR: {
        status: status.BAD_REQUEST,
        code: 'REMOVE_FOLDER_ERROR',
        message: 'Error while removing folder'
    },
    //GDRIVE
    GDRIVE_UPLOAD_ERROR: {
        status: status.BAD_REQUEST,
        code: 'GDRIVE_UPLOAD_ERROR',
        message: 'Error uploading file to GDrive'
    },
    GDRIVE_READ_FILE_ERROR: {
        status: status.BAD_REQUEST,
        code: 'GDRIVE_READ_FILE_ERROR',
        message: 'Error reading file from GDrive'
    },
    GDRIVE_UPDATED_FILE_ERROR: {
        status: status.BAD_REQUEST,
        code: 'GDRIVE_UPDATED_FILE_ERROR',
        message: 'Error updating file in GDrive'
    },
    GDRIVE_DELETED_FILE_ERROR: {
        status: status.BAD_REQUEST,
        code: 'GDRIVE_DELETED_FILE_ERROR',
        message: 'Error deleting file in GDrive'
    },
    GDRIVE_INTEGRATION_NOT_FOUND: {
        status: status.BAD_REQUEST,
        code: 'GDRIVE_INTEGRATION_NOT_FOUND',
        message: 'GDrive integration not found'
    },
    GDRIVE_UPLOAD_LIMIT_EXCEEDED_ERROR: {
        status: status.BAD_REQUEST,
        code: 'GDRIVE_UPLOAD_LIMIT_EXCEEDED_ERROR',
        message: 'Count of files exceeded 20 file barrier'
    },
    GDRIVE_CREATE_FOLDER_ERROR: {
        status: status.BAD_REQUEST,
        code: 'GDRIVE_CREATE_FOLDER_ERROR',
        message: 'Error creating folder in GDrive'
    },
    GDRIVE_DELETE_FOLDER_ERROR: {
        status: status.BAD_REQUEST,
        code: 'GDRIVE_DELETE_FOLDER_ERROR',
        message: 'Error deleting folder in GDrive'
    },
    //S3
    S3_UPLOAD_ERROR: {
        status: status.BAD_REQUEST,
        code: 'S3_UPLOAD_ERROR',
        message: 'Error uploading file to S3'
    },
    S3_UPLOAD_LIMIT_EXCEEDED_ERROR: {
        status: status.BAD_REQUEST,
        code: 'S3_UPLOAD_LIMIT_EXCEEDED_ERROR',
        message: 'Count of files exceeded 20 file barrier'
    },
    S3_SEARCH_ERROR: {
        status: status.BAD_REQUEST,
        code: 'S3_SEARCH_ERROR',
        message: 'Error searching for file in S3'
    },
    S3_RENAME_ERROR: {
        status: status.BAD_REQUEST,
        code: 'S3_RENAME_ERROR',
        message: 'Error renaming file in S3'
    },
    S3_MOVE_ERROR: {
        status: status.BAD_REQUEST,
        code: 'S3_MOVE_ERROR',
        message: 'Error moving file in S3'
    },
    S3_REMOVE_OBJECT_ERROR: {
        status: status.BAD_REQUEST,
        code: 'S3_REMOVE_OBJECT_ERROR',
        message: 'Error removing object in S3'
    },
    S3_CREATE_FOLDER_ERROR: {
        status: status.BAD_REQUEST,
        code: 'S3_CREATE_FOLDER_ERROR',
        message: 'Error creating folder in S3'
    },
    S3_DELETE_FOLDER_ERROR: {
        status: status.BAD_REQUEST,
        code: 'S3_DELETE_FOLDER_ERROR',
        message: 'Error deleting folder in S3'
    },
    S3_DOWNLOAD_ERROR: {
        status: status.BAD_REQUEST,
        code: 'S3_DOWNLOAD_ERROR',
        message: 'Error downloading file from S3'
    },
    S3_AUTH_ERROR: {
        status: status.BAD_REQUEST,
        code: 'S3_AUTH_ERROR',
        message: 'Error authenticating with S3'
    },
    S3_COMPANY_NOT_FOUND: {
        status: status.NOT_FOUND,
        code: 'S3_COMPANY_NOT_FOUND',
        message: 'S3 Company not found in the system'
    },
    S3_FILE_NOT_FOUND: {
        status: status.NOT_FOUND,
        code: 'S3_FILE_NOT_FOUND',
        message: 'S3 File not found in the system'
    },

    FILE_OPERATION_FAILED: {
        status: status.BAD_REQUEST,
        code: 'FILE_OPERATION_FAILED',
        message: 'File operation failed'
    },
}
