import Strings from '../../config/Strings'
import Codes from '../../config/Codes'

class TMBaseException extends Error {
  buildResponse () {
    return {
      message: Strings[this.constructor.name] || 'Internal server error'
    }
  }
  getCode() {
    return Codes[this.constructor.name] || 500
  }
}

export class UserNotFoundException extends TMBaseException {}

export class DriverNotFoundException extends TMBaseException {}

export class NotificationNotFoundException extends TMBaseException {}

export class UserInvalidCredentialsException extends TMBaseException {}

export class InvalidPasswordException extends TMBaseException {}

export class InvalidCodeException extends TMBaseException {}

export class StateNotFoundException extends TMBaseException {}

export class StateInUseException extends TMBaseException {}
