/**
 * @file Unit Tests - Config
 * @module api/models/tests/unit/Config
 */

import TestSubject from '#models/config.model'

describe('unit:models/Config', () => {
  describe('constructor', () => {
    let env: { [K in keyof TestSubject]: string | null | undefined }
    let subject: TestSubject

    beforeAll(() => {
      env = {
        HOST: undefined,
        HOSTNAME: '',
        NODE_ENV: null,
        PORT: undefined
      }

      subject = new TestSubject(env)
    })

    it('should set `HOST`', () => {
      expect(subject).to.have.property('HOST', '127.0.0.1')
    })

    it('should set `HOSTNAME`', () => {
      expect(subject).to.have.property('HOSTNAME', 'localhost')
    })

    it('should set `NODE_ENV`', () => {
      expect(subject).to.have.property('NODE_ENV', 'development')
    })

    it('should set `PORT`', () => {
      expect(subject).to.have.property('PORT', 8080)
    })

    it.each<[key: keyof TestSubject, value: string | null | undefined]>([
      ['HOST', ' '],
      ['HOSTNAME', ' '],
      ['NODE_ENV', 'null'],
      ['PORT', 'undefined']
    ])('should throw if config is invalid ({ %s: %j })', (key, value) => {
      // Arrange
      let error!: AggregateError

      // Act
      try {
        new TestSubject(Object.assign({}, { [key]: value }))
      } catch (e: unknown) {
        error = e as typeof error
      }

      // Expect
      expect(error).to.be.instanceof(AggregateError)
      expect(error).to.have.property('message', 'Invalid config')
      expect(error.errors).to.be.an('array').of.length(1)
      expect(error.errors).toMatchSnapshot()
    })
  })
})
