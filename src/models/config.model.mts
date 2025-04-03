/**
 * @file Models - Config
 * @module api/config/models/Config
 */

import {
  IsIn,
  IsNotEmpty,
  IsOptional,
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
  @IsOptional()
  public HOST: string

  /**
   * The type of environment the Node.js process is running in.
   *
   * @public
   * @instance
   * @member {string} NODE_ENV
   */
  @IsIn(['development', 'test', 'production'])
  @IsNotEmpty()
  public NODE_ENV!: string

  /**
   * The port number the application will listen for incoming connections on.
   *
   * @public
   * @instance
   * @member {string} PORT
   */
  @IsString()
  @IsNotEmpty()
  public PORT!: string

  /**
   * Create a new configuration environment.
   *
   * @param {NodeJS.Dict<string>} env
   *  Environment variables object
   */
  constructor(env: NodeJS.Dict<string>) {
    Object.assign(this, env)

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

    this.HOST ||= 'localhost'
  }
}

export default Config
