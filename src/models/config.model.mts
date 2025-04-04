/**
 * @file Models - Config
 * @module api/config/models/Config
 */

import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  validateSync as validate,
  type ValidationError
} from 'class-validator'

/**
 * Configuration environment.
 *
 * @class
 */
class Config {
  /**
   * The hostname or IP address where the application will listen for incoming
   * connections.
   *
   * @public
   * @instance
   * @member {string} HOST
   */
  @IsString()
  @IsNotEmpty()
  public HOST!: string

  /**
   * Name for {@linkcode HOST}.
   *
   * @public
   * @instance
   * @member {string} HOSTNAME
   */
  @IsString()
  @IsNotEmpty()
  public HOSTNAME!: string

  /**
   * The type of environment the Node.js process is running in.
   *
   * @public
   * @instance
   * @member {string} NODE_ENV
   */
  @IsIn(['development', 'test', 'production'])
  public NODE_ENV!: string

  /**
   * The port number the application will listen for incoming connections on.
   *
   * @public
   * @instance
   * @member {number} PORT
   */
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 })
  public PORT!: number

  /**
   * Create a new configuration environment.
   *
   * @param {NodeJS.Dict<string | null | undefined>} env
   *  Environment variables object
   * @throws {AggregateError}
   */
  constructor(env: NodeJS.Dict<string | null | undefined>) {
    Object.assign(this, env)

    this.HOST = (this.HOST || '127.0.0.1').trim()
    this.HOSTNAME = (this.HOSTNAME || 'localhost').trim()
    this.NODE_ENV = (this.NODE_ENV || 'development').trim()
    this.PORT = +(env['PORT'] || '8080').trim()

    /**
     * Validation errors.
     *
     * @const {ValidationError[]} errors
     */
    const errors: ValidationError[] = validate(this, {
      enableDebugMessages: true,
      forbidUnknownValues: true,
      skipNullProperties: false,
      skipUndefinedProperties: false,
      stopAtFirstError: false,
      validationError: { target: false },
      whitelist: true
    })

    if (errors.length) {
      throw new AggregateError(errors, 'Invalid config')
    }
  }
}

export default Config
