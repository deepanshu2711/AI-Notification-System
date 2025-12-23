// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var ai_pb = require('./ai_pb.js');

function serialize_ai_GenerateContentRequest(arg) {
  if (!(arg instanceof ai_pb.GenerateContentRequest)) {
    throw new Error('Expected argument of type ai.GenerateContentRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ai_GenerateContentRequest(buffer_arg) {
  return ai_pb.GenerateContentRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ai_GenerateContentResponse(arg) {
  if (!(arg instanceof ai_pb.GenerateContentResponse)) {
    throw new Error('Expected argument of type ai.GenerateContentResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ai_GenerateContentResponse(buffer_arg) {
  return ai_pb.GenerateContentResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var AiProtoServiceService = exports.AiProtoServiceService = {
  generateContent: {
    path: '/ai.AiProtoService/GenerateContent',
    requestStream: false,
    responseStream: false,
    requestType: ai_pb.GenerateContentRequest,
    responseType: ai_pb.GenerateContentResponse,
    requestSerialize: serialize_ai_GenerateContentRequest,
    requestDeserialize: deserialize_ai_GenerateContentRequest,
    responseSerialize: serialize_ai_GenerateContentResponse,
    responseDeserialize: deserialize_ai_GenerateContentResponse,
  },
};

exports.AiProtoServiceClient = grpc.makeGenericClientConstructor(AiProtoServiceService, 'AiProtoService');
