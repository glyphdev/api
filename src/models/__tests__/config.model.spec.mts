/**
 * @file Unit Tests - Config
 * @module api/models/tests/unit/Config
 */

import TestSubject from '#models/config.model'

describe('unit:models/Config', () => {
  describe('constructor', () => {
    let env: { [K in keyof TestSubject]: string | undefined }
    let subject: TestSubject

    beforeAll(() => {
      env = {
        HOST: undefined,
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env['PORT']
      }

      subject = new TestSubject(env)
    })

    it('should set `HOST`', () => {
      expect(subject).to.have.property('HOST', 'localhost')
    })

    it('should set `NODE_ENV`', () => {
      expect(subject).to.have.property('NODE_ENV', env.NODE_ENV)
    })

    it('should set `PORT`', () => {
      expect(subject).to.have.property('PORT', env.PORT)
    })

    it('should throw if config is invalid', () => {
      // Arrange
      let error!: AggregateError

      // Act
      try {
        new TestSubject({})
      } catch (e: unknown) {
        error = e as typeof error
      }

      // Expect
      expect(error).to.be.instanceof(AggregateError)
      expect(error).to.have.property('message', 'Invalid config')
      expect(error.errors).to.be.an('array').and.not.empty
      expect(error.errors).toMatchSnapshot()
    })
  })
})
