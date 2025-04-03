/**
 * @file Type Tests - JsonObject
 * @module api/interfaces/tests/unit-d/JsonObject
 */

import type TestSubject from '#interfaces/json-object'
import type { JsonValue } from '@glyphdev/api/types'

describe('unit-d:interfaces/JsonObject', () => {
  it('should match Record<string, JsonValue>', () => {
    expectTypeOf<TestSubject>().toExtend<Record<string, JsonValue>>()
  })

  describe('JsonObject[number]', () => {
    it('should not allow undefined', () => {
      expectTypeOf<TestSubject[number]>().extract<undefined>().toBeNever()
    })
  })

  describe('JsonObject[string]', () => {
    it('should not allow undefined', () => {
      expectTypeOf<TestSubject[string]>().extract<undefined>().toBeNever()
    })
  })
})
