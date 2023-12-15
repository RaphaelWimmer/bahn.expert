/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StopPlaceController } from './controller/StopPlace/v1.js';
import type { Middleware } from 'koa';
import type * as KoaRouter from '@koa/router';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "LageplanResponse": {
        "dataType": "refObject",
        "properties": {
            "lageplan": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EvaNumber": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TransportType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["HIGH_SPEED_TRAIN"]},{"dataType":"enum","enums":["INTERCITY_TRAIN"]},{"dataType":"enum","enums":["INTER_REGIONAL_TRAIN"]},{"dataType":"enum","enums":["REGIONAL_TRAIN"]},{"dataType":"enum","enums":["CITY_TRAIN"]},{"dataType":"enum","enums":["SUBWAY"]},{"dataType":"enum","enums":["TRAM"]},{"dataType":"enum","enums":["BUS"]},{"dataType":"enum","enums":["FERRY"]},{"dataType":"enum","enums":["FLIGHT"]},{"dataType":"enum","enums":["CAR"]},{"dataType":"enum","enums":["TAXI"]},{"dataType":"enum","enums":["SHUTTLE"]},{"dataType":"enum","enums":["BIKE"]},{"dataType":"enum","enums":["SCOOTER"]},{"dataType":"enum","enums":["WALK"]},{"dataType":"enum","enums":["UNKNOWN"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Coordinate2D": {
        "dataType": "refObject",
        "properties": {
            "latitude": {"dataType":"double","required":true},
            "longitude": {"dataType":"double","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GroupedStopPlace": {
        "dataType": "refObject",
        "properties": {
            "evaNumber": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "availableTransports": {"dataType":"array","array":{"dataType":"refAlias","ref":"TransportType"},"required":true},
            "position": {"ref":"Coordinate2D"},
            "ifopt": {"dataType":"string"},
            "ril100": {"dataType":"string"},
            "alternativeRil100": {"dataType":"array","array":{"dataType":"string"}},
            "stationId": {"dataType":"string"},
            "uic": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.RouteAuslastung-or-null_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TrainOccupancyList": {
        "dataType": "refAlias",
        "type": {"ref":"Record_string.RouteAuslastung-or-null_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(router: KoaRouter) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        router.get('/api/stopPlace/v1/lageplan/:stopPlaceName/:evaNumber',
            ...(fetchMiddlewares<Middleware>(StopPlaceController)),
            ...(fetchMiddlewares<Middleware>(StopPlaceController.prototype.lageplan)),

            async function StopPlaceController_lageplan(context: any, next: any) {
            const args = {
                    stopPlaceName: {"in":"path","name":"stopPlaceName","required":true,"dataType":"string"},
                    evaNumber: {"in":"path","name":"evaNumber","required":true,"ref":"EvaNumber"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new StopPlaceController();

            const promise = controller.lageplan.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/stopPlace/v1/search/:searchTerm',
            ...(fetchMiddlewares<Middleware>(StopPlaceController)),
            ...(fetchMiddlewares<Middleware>(StopPlaceController.prototype.stopPlaceSearch)),

            async function StopPlaceController_stopPlaceSearch(context: any, next: any) {
            const args = {
                    searchTerm: {"in":"path","name":"searchTerm","required":true,"dataType":"string"},
                    max: {"in":"query","name":"max","dataType":"integer","validators":{"isInt":{"errorMsg":"max"}}},
                    filterForIris: {"default":false,"in":"query","name":"filterForIris","dataType":"boolean"},
                    groupedBySales: {"default":false,"in":"query","name":"groupedBySales","dataType":"boolean"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new StopPlaceController();

            const promise = controller.stopPlaceSearch.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/stopPlace/v1/:evaNumberOrRl100',
            ...(fetchMiddlewares<Middleware>(StopPlaceController)),
            ...(fetchMiddlewares<Middleware>(StopPlaceController.prototype.stopPlaceByEvaOrRl100)),

            async function StopPlaceController_stopPlaceByEvaOrRl100(context: any, next: any) {
            const args = {
                    evaNumberOrRl100: {"in":"path","name":"evaNumberOrRl100","required":true,"dataType":"string"},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"void"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new StopPlaceController();

            const promise = controller.stopPlaceByEvaOrRl100.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/stopPlace/v1/:evaNumber/live',
            ...(fetchMiddlewares<Middleware>(StopPlaceController)),
            ...(fetchMiddlewares<Middleware>(StopPlaceController.prototype.stopPlaceByEvaLive)),

            async function StopPlaceController_stopPlaceByEvaLive(context: any, next: any) {
            const args = {
                    evaNumber: {"in":"path","name":"evaNumber","required":true,"ref":"EvaNumber"},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"void"},
                    notAuthorized: {"in":"res","name":"401","required":true,"dataType":"void"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new StopPlaceController();

            const promise = controller.stopPlaceByEvaLive.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        router.get('/api/stopPlace/v1/:evaNumber/trainOccupancy',
            ...(fetchMiddlewares<Middleware>(StopPlaceController)),
            ...(fetchMiddlewares<Middleware>(StopPlaceController.prototype.trainOccupancy)),

            async function StopPlaceController_trainOccupancy(context: any, next: any) {
            const args = {
                    evaNumber: {"in":"path","name":"evaNumber","required":true,"ref":"EvaNumber"},
                    notFoundResponse: {"in":"res","name":"404","required":true,"dataType":"void"},
            };

            let validatedArgs: any[] = [];
            try {
              validatedArgs = getValidatedArgs(args, context, next);
            } catch (err) {
              const error = err as any;
              context.status = error.status;
              context.throw(error.status, JSON.stringify({ fields: error.fields }));
            }

            const controller = new StopPlaceController();

            const promise = controller.trainOccupancy.apply(controller, validatedArgs as any);
            return promiseHandler(controller, promise, context, undefined, undefined);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function isController(object: any): object is Controller {
      return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function promiseHandler(controllerObj: any, promise: Promise<any>, context: any, successStatus: any, next?: () => Promise<any>) {
      return Promise.resolve(promise)
        .then((data: any) => {
            let statusCode = successStatus;
            let headers;

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            if (isController(controllerObj)) {
                headers = controllerObj.getHeaders();
                statusCode = controllerObj.getStatus() || statusCode;
            }
            return returnHandler(context, next, statusCode, data, headers);
        })
        .catch((error: any) => {
            context.status = error.status || 500;
            context.throw(context.status, error.message, error);
        });
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(context: any, next?: () => any, statusCode?: number, data?: any, headers: any={}) {
        if (!context.headerSent && !context.response.__tsoaResponded) {
            if (data !== null && data !== undefined) {
                context.body = data;
                context.status = 200;
            } else {
                context.status = 204;
            }

            if (statusCode) {
                context.status = statusCode;
            }

            context.set(headers);
            context.response.__tsoaResponded = true;
            return next ? next() : context;
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, context: any, next: () => any): any[] {
        const errorFields: FieldErrors = {};
        const values = Object.keys(args).map(key => {
            const name = args[key].name;
            switch (args[key].in) {
            case 'request':
                return context.request;
            case 'query':
                return validationService.ValidateParam(args[key], context.request.query[name], name, errorFields, undefined, {"noImplicitAdditionalProperties":"ignore"});
            case 'queries':
                return validationService.ValidateParam(args[key], context.request.query, name, errorFields, undefined, {"noImplicitAdditionalProperties":"ignore"});
            case 'path':
                return validationService.ValidateParam(args[key], context.params[name], name, errorFields, undefined, {"noImplicitAdditionalProperties":"ignore"});
            case 'header':
                return validationService.ValidateParam(args[key], context.request.headers[name], name, errorFields, undefined, {"noImplicitAdditionalProperties":"ignore"});
            case 'body':
                return validationService.ValidateParam(args[key], context.request.body, name, errorFields, undefined, {"noImplicitAdditionalProperties":"ignore"});
            case 'body-prop':
                return validationService.ValidateParam(args[key], context.request.body[name], name, errorFields, 'body.', {"noImplicitAdditionalProperties":"ignore"});
            case 'formData':
                if (args[key].dataType === 'file') {
                  return validationService.ValidateParam(args[key], context.request.file, name, errorFields, undefined, {"noImplicitAdditionalProperties":"ignore"});
                } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                  return validationService.ValidateParam(args[key], context.request.files, name, errorFields, undefined, {"noImplicitAdditionalProperties":"ignore"});
                } else {
                  return validationService.ValidateParam(args[key], context.request.body[name], name, errorFields, undefined, {"noImplicitAdditionalProperties":"ignore"});
                }
            case 'res':
                return responder(context, next);
            }
        });
        if (Object.keys(errorFields).length > 0) {
            throw new ValidateError(errorFields, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(context: any, next: () => any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
           returnHandler(context, next, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
