export class LateCheckInValidationError extends Error {
    constructor() {
        super('Check in after 20 minutes')
    }
}