/**
 * @file main
 * @module api/main
 */

import createApp from '#app'
import logger from '@flex-development/log'
import type { Config } from '@glyphdev/api/types'
import { ConfigService } from '@nestjs/config'
import type { NestFastifyApplication } from '@nestjs/platform-fastify'

/**
 * The NestJS application.
 *
 * @const {NestFastifyApplication} app
 */
const app: NestFastifyApplication = await createApp()

/**
 * App configuration service.
 *
 * @const {ConfigService<Config, true>} config
 */
const config: ConfigService<Config, true> = app.get(ConfigService)

/**
 * The hostname or IP address where the application will listen for incoming
 * connections.
 *
 * @const {string} host
 */
const host: string = config.get('HOST')

// start application.
await app.listen({ host, port: +config.get<string>('PORT') }, callback)

/**
 * @this {void}
 *
 * @param {Error | null} err
 *  The error to handle
 * @param {string} address
 *  The address the application is listening for incoming connections on
 * @return {undefined}
 */
function callback(this: void, err: Error | null, address: string): undefined {
  return void logger.start({
    args: [host, address],
    message: 'Listening at http://%s (%s)'
  })
}
