// interface Axon {
//     wallet: Wallet;
//     ip: string;
//     port: number;
//     server: grpc.Server;
//     forwards: Array<(request: bittensor.proto.TensorMessage, context: grpc.ServicerContext) => Promise<[Tensor, number, number, string]>>;
//     backwards: Array<(request: bittensor.proto.TensorMessage, context: grpc.ServicerContext) => Promise<[Tensor, number, number, string]>>;
//     priority: number;
//     priority_threadpool: ThreadPool;
//     forward_timeout: number;
//     backward_timeout: number;
//     modality: string;
//     started: boolean;
//     forward_callback: (request: bittensor.proto.TensorMessage, context: grpc.ServicerContext) => Promise<[Tensor, number, number, string]>;
//     backward_callback: (request: bittensor.proto.TensorMessage, context: grpc.ServicerContext) => Promise<[Tensor, number, number, string]>;
// }

// class Axon {
//     constructor(
//         wallet,
//         ip,
//         port,
//         server,
//         forwards = [],
//         backwards = [],
//         forward_callback = forwards,
//         backward_callback = backwards,
//         priority = null,
//         priority_threadpool = null,
//         forward_timeout = null,
//         backward_timeout = null,
//     ) {
//         this.ip = ip;
//         this.port = port;
//         this.wallet = wallet;
//         this.server = server;
//         this.forward_callback = forward_callback;
//         this.backward_callback = backward_callback;
//         this.forward_timeout = forward_timeout;
//         this.backward_timeout = backward_timeout;
//         this.modality = this.find_modality();
//         this.stats = this._init_stats();
//         this.started = null;

//         // -- Priority
//         this.priority = priority;
//         this.priority_threadpool = priority_threadpool;
//     }

//     __str__() {
//         return `Axon(${this.ip}, ${this.port}, ${this.wallet.hotkey.ss58_address}, ${this.started ? 'started' : 'stopped'})`;
//     }

//     __repr__() {
//         return this.__str__();
//     }

//     async Forward(request, context) {
//         const [tensor, code, time, message] = await this._forward(request);
//         const response = new bittensor.proto.TensorMessage({
//             version: bittensor.__version_as_int__,
//             hotkey: this.wallet.hotkey.ss58_address,
//             return_code: code,
//             message: message,
//             tensors: tensor ? [tensor] : [],
//             requires_grad: true,
//         });
//         // ---- Update stats for this request.
//         this.update_stats_for_request(request, response, time, code);
//         return response;
//     }

//     async Backward(request, context) {
//         const [tensor, code, time, message] = await this._backward(request);
//         const response = new bittensor.proto.TensorMessage({
//             version: bittensor.__version_as_int__,
//             hotkey: this.wallet.hotkey.ss58_address,
//             return_code: code,
//             message: message,
//             tensors: tensor ? [tensor] : [],
//             requires_grad: true,
//         });
//         // ---- Update stats for this request.
//         this.update_stats_for_request(request, response, time, code);
//         return response;
//     }

//     async _call_forward(public_key, inputs_x, modality) {
//         // Check forward has been subscribed.
//         if (this.forward_callback[modality] == null) {
//             const message = 'Forward callback is not yet subscribed on this axon.';
//             return [null, bittensor.proto.ReturnCode.NotImplemented, message];
//         }

//         // Make forward call.
//         try {
//             let response_tensor;
//             if (this.priority != null) {
//                 const priority = this.priority(public_key, inputs_x, bittensor.proto.RequestType.FORWARD);
//                 const future = this.priority_threadpool.submit(this.forward_callback[modality], inputs_x, priority);

//                 try {
//                     response_tensor = await future.result(timeout= this.forward_timeout);
//                 } catch (e) {
//                     if (e instanceof concurrent.futures.TimeoutError) {
//                         throw new TimeoutError('TimeOutError');
//                     } else {
//                         logger.error(`Error found: ${repr(e)}, with message ${e}`);
//                     }
//                 }
//             } else {
//                 response_tensor = this.forward_callback[modality](inputs_x);
//             }

//             const message = 'Success';
//             const code = bittensor.proto.ReturnCode.Success;
//             return [response_tensor, code, message];
//         } catch (e) {
//             const response_tensor = null;
//             const message = `Error calling forward callback: ${e}`;
//             if (e instanceof TimeoutError) {
//                 const code = bittensor.proto.ReturnCode.Timeout;
//             } else {
//                 const code = bittensor.proto.ReturnCode.UnknownException;
//             }
//             return [response_tensor, code, message];
//         }
//     }


// }

