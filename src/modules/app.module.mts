/**
 * @file Modules - AppModule
 * @module api/modules/AppModule
 */

import ConfigModule from '#modules/config.module'
import { Module } from '@nestjs/common'

/**
 * Main application module.
 *
 * @class
 */
@Module({ imports: [ConfigModule] })
class AppModule {}

export default AppModule
