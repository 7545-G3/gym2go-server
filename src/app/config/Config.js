import fs from 'fs'
import path from 'path'


class Config {
  constructor() {
    const envFile = process.env.ENV_FILE || './local.env'
    if (fs.existsSync(envFile)) {
      require('dotenv').config({path: envFile})
    } else {
      console.warn('Env file not found')
    }
    return this._initialize()
  }

  _initialize() {
    return {
      PORT: process.env.PORT || 8000,
      LOG_DIR: process.env.TM_LOG_DIR || path.join(__dirname, '../logs'),
      LOG_LEVEL: process.env.TM_LOG_LEVEL || 'info',
      FILE_LOG_LEVEL: process.env.TM_FILE_LOG_LEVEL || process.env.TM_LOG_LEVEL || 'info',
    }
  }
}

export default new Config()
