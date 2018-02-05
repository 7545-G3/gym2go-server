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

class UserNotFoundException extends TMBaseException {}

class DriverNotFoundException extends TMBaseException {}

class NotificationNotFoundException extends TMBaseException {}

class UserInvalidCredentialsException extends TMBaseException {}

class InvalidPasswordException extends TMBaseException {}

class InvalidCodeException extends TMBaseException {}

class StateNotFoundException extends TMBaseException {}

class StateInUseException extends TMBaseException {}

 export default {
  UserNotFoundException: UserNotFoundException,
  UserInvalidCredentialsException: UserInvalidCredentialsException,
  InvalidPasswordException: InvalidPasswordException,
  DriverNotFoundException: DriverNotFoundException,
  NotificationNotFoundException: NotificationNotFoundException,
  InvalidCodeException: InvalidCodeException,
  StateNotFoundException: StateNotFoundException,
  StateInUseException: StateInUseException
}
