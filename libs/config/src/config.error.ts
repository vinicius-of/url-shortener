class CustomConfigError extends Error {
    constructor(name: string, message: string) {
        super();
        this.name = name;
        this.message = message;
    }
}

export class EnvValueNotFound extends CustomConfigError {
    constructor(envname: string) {
        super('Environment value not found', `The env variable ${envname} was not found`);
    }
}
