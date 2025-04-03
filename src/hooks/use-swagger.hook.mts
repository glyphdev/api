/**
 * @file Hooks - useSwagger
 * @module api/hooks/useSwagger
 */

import routes from '#enums/routes'
import { alphabetize, ksort, shake } from '@flex-development/tutils'
import pkg from '@glyphdev/api/package.json' with { type: 'json' }
import type { INestApplication } from '@nestjs/common'
import {
  DocumentBuilder,
  SwaggerModule,
  type OpenAPIObject
} from '@nestjs/swagger'

export default useSwagger

/**
 * Configure OpenAPI documentation endpoints.
 *
 * @see https://docs.nestjs.com/openapi/introduction
 *
 * @todo document contact info
 * @todo document terms of service
 * @todo document license
 *
 * @this {void}
 *
 * @param {INestApplication} app
 *  The NestJS application
 * @return {undefined}
 */
function useSwagger(this: void, app: INestApplication): undefined {
  /**
   * Documentation builder.
   *
   * @const {DocumentBuilder} documentation
   */
  const docs: DocumentBuilder = new DocumentBuilder()

  docs.setVersion(pkg.version)
  docs.setTitle(pkg.openapi.title)
  docs.setDescription(pkg.openapi.description)

  return void SwaggerModule.setup(
    routes.OPENAPI,
    app,
    SwaggerModule.createDocument(app, docs.build(), {
      deepScanRoutes: true,
      extraModels: [],
      ignoreGlobalPrefix: true,
      operationIdFactory
    }),
    {
      customSiteTitle: pkg.openapi.title,
      explorer: true,
      jsonDocumentUrl: routes.APP,
      patchDocumentOnRequest,
      raw: ['json'],
      useGlobalPrefix: false
    }
  )
}

/* v8 ignore start */

/**
 * Generate an `operationId` based on controller and method name.
 *
 * @see https://swagger.io/docs/specification/paths-and-operations
 *
 * @this {void}
 *
 * @param {string} controller
 *  Name of controller
 * @param {string} method
 *  Name of controller class method
 * @return {string}
 *  Operation id
 */
function operationIdFactory(
  this: void,
  controller: string,
  method: string
): string {
  return controller + '#' + method
}

/* v8 ignore stop */

/**
 * Modify the generated API `documentation` on request.
 *
 * @todo support versioning
 *
 * @this {void}
 *
 * @param {unknown} request
 *  The incoming request object
 * @param {unknown} response
 *  The server response object
 * @param {OpenAPIObject} documentation
 *  The generated API documentation
 * @return {OpenAPIObject}
 *  OpenAPI specification object
 */
function patchDocumentOnRequest(
  this: void,
  request: unknown,
  response: unknown,
  documentation: OpenAPIObject
): OpenAPIObject {
  const {
    components = {},
    externalDocs,
    info,
    openapi,
    paths,
    security,
    servers,
    tags
  } = documentation

  ksort(paths)

  if (components.schemas) ksort(components.schemas)
  if (tags) alphabetize(tags, tag => tag.name)

  return shake({
    openapi, // eslint-disable-next-line sort-keys
    info,
    servers, // eslint-disable-next-line sort-keys
    security,
    tags, // eslint-disable-next-line sort-keys
    externalDocs,
    paths, // eslint-disable-next-line sort-keys
    components
  })
}
