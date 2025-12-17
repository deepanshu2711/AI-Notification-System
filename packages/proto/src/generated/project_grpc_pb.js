// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var project_pb = require('./project_pb.js');

function serialize_project_CheckProjectExistsRequest(arg) {
  if (!(arg instanceof project_pb.CheckProjectExistsRequest)) {
    throw new Error('Expected argument of type project.CheckProjectExistsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_project_CheckProjectExistsRequest(buffer_arg) {
  return project_pb.CheckProjectExistsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_project_CheckProjectExistsResponse(arg) {
  if (!(arg instanceof project_pb.CheckProjectExistsResponse)) {
    throw new Error('Expected argument of type project.CheckProjectExistsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_project_CheckProjectExistsResponse(buffer_arg) {
  return project_pb.CheckProjectExistsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ProjectProtoServiceService = exports.ProjectProtoServiceService = {
  checkProjectExists: {
    path: '/project.ProjectProtoService/CheckProjectExists',
    requestStream: false,
    responseStream: false,
    requestType: project_pb.CheckProjectExistsRequest,
    responseType: project_pb.CheckProjectExistsResponse,
    requestSerialize: serialize_project_CheckProjectExistsRequest,
    requestDeserialize: deserialize_project_CheckProjectExistsRequest,
    responseSerialize: serialize_project_CheckProjectExistsResponse,
    responseDeserialize: deserialize_project_CheckProjectExistsResponse,
  },
};

exports.ProjectProtoServiceClient = grpc.makeGenericClientConstructor(ProjectProtoServiceService, 'ProjectProtoService');
