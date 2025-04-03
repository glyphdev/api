/**
 * @file Type Aliases - JsonArray
 * @module api/types/JsonArray
 */

import type { JsonValue } from '@glyphdev/api/types'

/**
 * An array containing [JSON values][json-data-types].
 *
 * [json-data-types]: https://restfulapi.net/json-data-types
 */
type JsonArray = JsonValue[] | readonly JsonValue[]

export type { JsonArray as default }
