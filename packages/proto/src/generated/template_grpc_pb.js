// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var template_pb = require('./template_pb.js');

function serialize_template_GetTemplateDetailsRequest(arg) {
  if (!(arg instanceof template_pb.GetTemplateDetailsRequest)) {
    throw new Error('Expected argument of type template.GetTemplateDetailsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_template_GetTemplateDetailsRequest(buffer_arg) {
  return template_pb.GetTemplateDetailsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_template_GetTemplateDetailsResponse(arg) {
  if (!(arg instanceof template_pb.GetTemplateDetailsResponse)) {
    throw new Error('Expected argument of type template.GetTemplateDetailsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_template_GetTemplateDetailsResponse(buffer_arg) {
  return template_pb.GetTemplateDetailsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var TemplateProtoServiceService = exports.TemplateProtoServiceService = {
  getTemplateDetails: {
    path: '/template.TemplateProtoService/GetTemplateDetails',
    requestStream: false,
    responseStream: false,
    requestType: template_pb.GetTemplateDetailsRequest,
    responseType: template_pb.GetTemplateDetailsResponse,
    requestSerialize: serialize_template_GetTemplateDetailsRequest,
    requestDeserialize: deserialize_template_GetTemplateDetailsRequest,
    responseSerialize: serialize_template_GetTemplateDetailsResponse,
    responseDeserialize: deserialize_template_GetTemplateDetailsResponse,
  },
};

exports.TemplateProtoServiceClient = grpc.makeGenericClientConstructor(TemplateProtoServiceService, 'TemplateProtoService');
