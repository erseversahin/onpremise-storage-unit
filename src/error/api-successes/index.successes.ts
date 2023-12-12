import status from 'http-status';
export default {
    FILE_MOVED: {
        status: status.OK,
        code: 'FILE_MOVED',
        message: "File is moved successfully on the system"
    },
    FILES_CREATED: {
        status: status.OK,
        code: 'FILES_CREATED',
        message: 'Files are created successfully on the system'
    },
    FILE_UPDATED: {
        status: status.OK,
        code: 'FILE_UPDATED',
        message: 'File is updated successfully on the system'
    },
    FILE_DELETED: {
        status: status.OK,
        code: 'FILE_DELETED',
        message: 'File is deleted successfully on the system'
    },
    FILE_RENAMED: {
        status: status.OK,
        code: 'FILE_RENAMED',
        message: 'File is renamed successfully on the system'
    },
    READ_FILES_UNDER_FOLDER: {
        status: status.OK,
        code: 'READ_FILES_UNDER_FOLDER',
        message: 'Files are read successfully on the system'
    },
    FILE_DOWNLOADED: {
        status: status.OK,
        code: 'FILE_DOWNLOADED',
        message: 'File is downloaded successfully on the system'
    },
    FOLDER_CREATED: {
        status: status.OK,
        code: 'FOLDER_CREATED',
        message: 'Folder is created successfully on the system'
    },
    FOLDER_DELETED: {
        status: status.OK,
        code: 'FOLDER_DELETED',
        message: 'Folder is removed successfully on the system'
    },

    //S3
    S3_UPLOAD_SUCCESSFUL: {
        status: status.OK,
        code: 'S3_UPLOAD_SUCCESSFUL',
        message: "File is uploaded successfully on S3"
    },
    S3_SEARCH_SUCCESSFUL: {
        status: status.OK,
        code: 'S3_SEARCH_SUCCESSFUL',
        message: "File is searched successfully on S3"
    },
    S3_RENAME_SUCCESSFUL: {
        status: status.OK,
        code: 'S3_RENAME_SUCCESSFUL',
        message: "Object is renamed successfully on S3"
    },
    S3_MOVE_SUCCESSFUL: {
        status: status.OK,
        code: 'S3_MOVE_SUCCESSFUL',
        message: "Object is moved successfully on S3"
    },
    S3_REMOVE_OBJECT_SUCCESSFUL: {
        status: status.OK,
        code: 'S3_REMOVE_OBJECT_SUCCESSFUL',
        message: "Object is removed successfully on S3"
    },
    S3_CREATE_FOLDER_SUCCESSFUL: {
        status: status.OK,
        code: 'S3_CREATE_FOLDER_SUCCESSFUL',
        message: "Folder is created successfully on S3"
    },
    S3_DELETE_FOLDER_SUCCESSFUL: {
        status: status.OK,
        code: 'S3_DELETE_FOLDER_SUCCESSFUL',
        message: "Folder is removed successfully on S3"
    },
    S3_DOWNLOAD_SUCCESSFUL: {
        status: status.OK,
        code: 'S3_DOWNLOAD_FILE',
        message: "File is downloaded successfully on S3"
    },

    //DRIVE

    GDRIVE_UPLOAD_SUCCESSFUL: {
        status: status.OK,
        code: 'GDRIVE_UPLOAD_SUCCESSFUL',
        message: "File is uploaded successfully on GDrive"
    },
    GDRIVE_CREATE_FILE_FROM_FILE: {
        status: status.OK,
        code: 'GDRIVE_CREATE_FILE_FROM_FILE',
        message: "File is created successfully on GDrive"
    },
    GDRIVE_READ_FILE: {
        status: status.OK,
        code: 'GDRIVE_READ_FILE',
        message: "File is read successfully on GDrive"
    },
    GDRIVE_UPDATED_FILE: {
        status: status.OK,
        code: 'GDRIVE_UPDATED_FILE',
        message: "File is updated successfully on GDrive"
    },
    GDRIVE_DELETED_FILE: {
        status: status.OK,
        code: 'GDRIVE_DELETED_FILE',
        message: "File is deleted successfully on GDrive"
    },
    GDRIVE_CREATED_FOLDER: {
        status: status.OK,
        code: 'GDRIVE_CREATED_FOLDER',
        message: "Folder is created successfully on GDrive"
    },
    GDRIVE_DELETED_FOLDER: {
        status: status.OK,
        code: 'GDRIVE_DELETED_FOLDER',
        message: "Folder is deleted successfully on GDrive"
    },
    GDRIVE_DOWNLOAD_FILE: {
        status: status.OK,
        code: 'GDRIVE_DOWNLOAD_FILE',
        message: "File is downloaded successfully on GDrive"
    },
    FILE_COPIED: {
        status: status.OK,
        code: 'FILE_COPIED',
        message: "File is copied successfully on the system"
    },
}