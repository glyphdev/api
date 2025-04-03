/**
 * @file Modules - ConfigModule
 * @module api/modules/ConfigModule
 */

import Config from '#models/config.model'
import { ifelse, sift, template } from '@flex-development/tutils'
import type { DynamicModule } from '@nestjs/common'
import { ConfigModule as ConfigurationModule } from '@nestjs/config'
import { ok } from 'devlop'

const { GITHUB_ENV, NODE_ENV } = process.env
ok(NODE_ENV, 'expected `process.env.NODE_ENV`')

/**
 * Application configuration module.
 *
 * @async
 *
 * @const {Promise<DynamicModule>} ConfigModule
 */
const ConfigModule: Promise<DynamicModule> = ConfigurationModule.forRoot({
  cache: NODE_ENV === 'production',
  envFilePath: sift([
    template('.env.{0}', { 0: NODE_ENV }),
    template('.env.{0}.local', { 0: NODE_ENV }),
    ifelse(GITHUB_ENV, GITHUB_ENV, null)
  ]),
  expandVariables: true,
  isGlobal: true,
  validate: env => new Config(env),
  validatePredefined: true
})

export default ConfigModule
