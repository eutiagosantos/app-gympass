
export class UserAlreadyExistsError extends Error {
    super(message: String) {
        message = "User already exists"
    }
}