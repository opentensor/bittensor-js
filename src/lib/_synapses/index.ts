// interface Synapse {
//     name: string;
//     foward_request_tensor: (foward_request_tensor: Tensor) => Tensor;
//     forward_response_tensor: (foward_request_tensor: Tensor, forward_response_tensor: Tensor) => Tensor;
//     backward_request_gradient: (foward_request_tensor: Tensor, backward_request_gradient: Tensor) => Tensor;
// }

// class Synapse {
//     constructor(name) {
//         this.name = name;
//     }

//     check_forward_request_tensor(foward_request_tensor) {
//         return true;
//     }

//     check_forward_response_tensor(foward_request_tensor, forward_response_tensor) {
//         return true;
//     }

//     check_backward_request_gradient(foward_request_tensor, backward_request_gradient) {
//         return true;
//     }

//     encode_forward_request_tensor(foward_request_tensor) {
//         return foward_request_tensor;
//     }

//     decode_forward_request_tensor(foward_request_tensor) {
//         return foward_request_tensor;
//     }

//     encode_forward_response_tensor(forward_response_tensor) {
//         return forward_response_tensor;
//     }

//     decode_forward_response_tensor(forward_response_tensor) {
//         return forward_response_tensor;
//     }

//     encode_backward_request_gradient(backward_request_gradient) {
//         return backward_request_gradient;
//     }

//     decode_backward_request_gradient(backward_request_gradient) {
//         return backward_request_gradient;
//     }
// }
