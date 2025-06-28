export enum AUTH_ERROR_MESSAGES {
    USER_NOT_CREATED = 'The new user was not created',
    WRONG_CREDENTIALS = 'The credentials was not accepted',
    USER_NOT_AUTHENTICATED = 'The user is not authenticated to execute operation',
    USER_WRONG_DATA = 'The user requires field "email" to create a login',
    USER_NOT_VALIDATED = 'The user could not be validated',
    USER_NOT_FOUND = 'The user could not be found',
    SERVICE_ERROR = 'Something wrong occurred with service call',
    LOGIN_ALREADY_EXISTS = 'This user already exists',
    LOGIN_NOT_CREATED = 'This login could not be created',
    SERVICE_NOT_RESPONDED = 'This service is not responding.',
}

export enum URL_ERROR_MESSAGES {
    URL_NOT_FOUND = 'This short URL could not be found',
    URL_NOT_CREATED = 'This URL could not be created',
    CLICK_NOT_COUNTED = 'This link could not register the click to save into user',
    SERVICE_NOT_RESPONDED = 'This service is not responding.',
}

export enum USERS_ERROR_MESSAGES {
    USER_NOT_FOUND = 'The user could not be found',
    INTERNAL_SERVER_ERROR = 'Occurred some error in the service',
    USER_ALREADY_EXISTS = 'This user already exists',
}
