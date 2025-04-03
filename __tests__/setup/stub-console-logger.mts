/**
 * @file Test Setup - stubConsoleLogger
 * @module tests/setup/stubConsoleLogger
 */

import { ConsoleLogger } from '@nestjs/common'

vi.spyOn(ConsoleLogger.prototype, 'error').mockImplementation(vi.fn())
vi.spyOn(ConsoleLogger.prototype, 'log').mockImplementation(vi.fn())
