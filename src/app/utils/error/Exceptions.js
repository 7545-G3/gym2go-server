import Strings from '../../config/Strings'
import Codes from '../../config/Codes'

class BaseException extends Error {
  buildResponse () {
    return {
      message: Strings[this.constructor.name] || 'Internal server error'
    }
  }
  getCode() {
    return Codes[this.constructor.name] || 500
  }
}

export class GymNotFoundException extends BaseException {}

export class UserNotFoundException extends BaseException {}
