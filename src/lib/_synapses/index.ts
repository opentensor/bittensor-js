
// ALICE>
// check the synapses branch
// bittensor/_syanspe/ init .py
// def check_forward_request_tensor     ( self, foward_request_tensor ): pass
//     def check_forward_response_tensor    ( self, foward_request_tensor, forward_response_tensor ): pass
//     def check_backward_request_gradient  ( self, foward_request_tensor, backward_request_gradient ): pass
//     def encode_forward_request_tensor    ( self, foward_request_tensor: torch.Tensor ) -> torch.Tensor: return foward_request_tensor
//     def decode_forward_request_tensor    ( self, foward_request_tensor: torch.Tensor ) -> torch.Tensor: return foward_request_tensor
//     def encode_forward_response_tensor   ( self, forward_response_tensor: torch.Tensor ) -> torch.Tensor: return forward_response_tensor
//     def decode_forward_response_tensor   ( self, forward_response_tensor: torch.Tensor ) -> torch.Tensor: return forward_response_tensor
//     def encode_backward_request_gradient ( self, backward_request_gradient: torch.Tensor ) -> torch.Tensor: return backward_request_gradient
//     def decode_backward_request_gradient ( self, backward_request_gradient: torch.Tensor ) -> torch.Tensor: return backward_request_gradient
// Are the functions that encode and decode the wire transport
// So javascript would need to implement equivalent


// BOB>
// so these functions would communicate with python over grpc?

// ALICE>
// its like this
// Bittensor Python calls the dendrite which calls the synapse encode function (also in python), we encode the tensor using torch (fancy topk shit) and then serialize it, this produces a proto object which is universal (code inspecific) this is sent over the wire, the python code on the miner side deserializes the torch tensor and runs the decode op

// BOB>
// the python code on the miner side deserializes the torch tensor and runs the decode op

// this is what we need in js to work in the web?
// we take the proto
// and deserialize it and display in browser.

// The question is how to do this without pytorch in js?
// I will find answer

// ALICE>
// Yes exactly, we need to reverse engineer the deserialization/serialization and the decode/encode steps.
// This is the torch tensor serialization code
// torch_numpy = torch_tensor.cpu().detach().half().numpy().copy()
//         data_buffer = msgpack.packb(torch_numpy, default=msgpack_numpy.encode)
//         torch_proto = bittensor.proto.Tensor (
//                                     version = bittensor.version_as_int,
//                                     buffer = data_buffer,
//                                     shape = shape,
//                                     dtype = dtype,
//                                     serializer = bittensor.proto.Serializer.CMPPACK,
//                                     tensor_type = bittensor.proto.TensorType.TORCH,
//                                     modality = modality,
//                                     requires_grad = torch_tensor.requires_grad
//                                 )
// So we take the raw numpy data and use msgpack
// This is the deserialization
// shape = tuple(torch_proto.shape)
//         numpy_object = msgpack.unpackb(torch_proto.buffer, object_hook=msgpack_numpy.decode).copy()
//         torch_object = torch.as_tensor(numpy_object).view(shape).requiresgrad(torch_proto.requires_grad)
//         return torch_object.type(dtype)
// torch_proto.buffer  = msgpack.packb(torch_numpy, default=msgpack_numpy.encode)
// So you can see that we pack the numpy object directly
// I think that this is not a huge deal
// For instance

// t_torch = tensor([ 0.4398, -1.1870, -0.7630,  0.7331,  1.5313])
// t_numpy = t_torch.cpu().detach().half().numpy().copy()
// t_buffer = msgpack.packb(t_numpy, default=msgpack_numpy.encode)

// b'\x85\xc4\x02nd\xc3\xc4\x04type\xa3<f2\xc4\x04kind\xc4\x00\xc4\x05shape\x91\x05\xc4\x04data\xc4\n\xe97\xc58\xa5<Z\xb9\x11\xb7'

// BOB> 
// the t_torch variable is the only one I am unsure of in js, everything else will compat I think

// ALICE>
// Well you dont need the torch var
// you jsut want to be able to get a multi dimensional array that you can use in torch



// Please come up with a solution in javascript: 

interface Synapse {
    name: string;
    foward_request_tensor: (foward_request_tensor: Tensor) => Tensor;
    forward_response_tensor: (foward_request_tensor: Tensor, forward_response_tensor: Tensor) => Tensor;
    backward_request_gradient: (foward_request_tensor: Tensor, backward_request_gradient: Tensor) => Tensor;
}

class Synapse {
    constructor(name) {
        this.name = name;
    }

    check_forward_request_tensor(foward_request_tensor) {
        return true;
    }

    check_forward_response_tensor(foward_request_tensor, forward_response_tensor) {
        return true;
    }

    check_backward_request_gradient(foward_request_tensor, backward_request_gradient) {
        return true;
    }

    encode_forward_request_tensor(foward_request_tensor) {
        return foward_request_tensor;
    }

    decode_forward_request_tensor(foward_request_tensor) {
        return foward_request_tensor;
    }

    encode_forward_response_tensor(forward_response_tensor) {
        return forward_response_tensor;
    }

    decode_forward_response_tensor(forward_response_tensor) {
        return forward_response_tensor;
    }

    encode_backward_request_gradient(backward_request_gradient) {
        return backward_request_gradient;
    }

    decode_backward_request_gradient(backward_request_gradient) {
        return backward_request_gradient;
    }
}
