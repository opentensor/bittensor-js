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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXhvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvX2F4b24vYXhvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxtQkFBbUI7QUFDbkIsc0JBQXNCO0FBQ3RCLGtCQUFrQjtBQUNsQixvQkFBb0I7QUFDcEIsMkJBQTJCO0FBQzNCLDZJQUE2STtBQUM3SSw4SUFBOEk7QUFDOUksd0JBQXdCO0FBQ3hCLHVDQUF1QztBQUN2QywrQkFBK0I7QUFDL0IsZ0NBQWdDO0FBQ2hDLHdCQUF3QjtBQUN4Qix3QkFBd0I7QUFDeEIsOElBQThJO0FBQzlJLCtJQUErSTtBQUMvSSxJQUFJO0FBRUosZUFBZTtBQUNmLG1CQUFtQjtBQUNuQixrQkFBa0I7QUFDbEIsY0FBYztBQUNkLGdCQUFnQjtBQUNoQixrQkFBa0I7QUFDbEIseUJBQXlCO0FBQ3pCLDBCQUEwQjtBQUMxQix1Q0FBdUM7QUFDdkMseUNBQXlDO0FBQ3pDLDJCQUEyQjtBQUMzQixzQ0FBc0M7QUFDdEMsa0NBQWtDO0FBQ2xDLG1DQUFtQztBQUNuQyxVQUFVO0FBQ1Ysd0JBQXdCO0FBQ3hCLDRCQUE0QjtBQUM1QixnQ0FBZ0M7QUFDaEMsZ0NBQWdDO0FBQ2hDLG9EQUFvRDtBQUNwRCxzREFBc0Q7QUFDdEQsa0RBQWtEO0FBQ2xELG9EQUFvRDtBQUNwRCxnREFBZ0Q7QUFDaEQsMkNBQTJDO0FBQzNDLCtCQUErQjtBQUUvQix5QkFBeUI7QUFDekIsb0NBQW9DO0FBQ3BDLDBEQUEwRDtBQUMxRCxRQUFRO0FBRVIsa0JBQWtCO0FBQ2xCLGdJQUFnSTtBQUNoSSxRQUFRO0FBRVIsbUJBQW1CO0FBQ25CLGlDQUFpQztBQUNqQyxRQUFRO0FBRVIsd0NBQXdDO0FBQ3hDLDhFQUE4RTtBQUM5RSwrREFBK0Q7QUFDL0QscURBQXFEO0FBQ3JELHVEQUF1RDtBQUN2RCxpQ0FBaUM7QUFDakMsZ0NBQWdDO0FBQ2hDLCtDQUErQztBQUMvQyxtQ0FBbUM7QUFDbkMsY0FBYztBQUNkLGlEQUFpRDtBQUNqRCx3RUFBd0U7QUFDeEUsMkJBQTJCO0FBQzNCLFFBQVE7QUFFUix5Q0FBeUM7QUFDekMsK0VBQStFO0FBQy9FLCtEQUErRDtBQUMvRCxxREFBcUQ7QUFDckQsdURBQXVEO0FBQ3ZELGlDQUFpQztBQUNqQyxnQ0FBZ0M7QUFDaEMsK0NBQStDO0FBQy9DLG1DQUFtQztBQUNuQyxjQUFjO0FBQ2QsaURBQWlEO0FBQ2pELHdFQUF3RTtBQUN4RSwyQkFBMkI7QUFDM0IsUUFBUTtBQUVSLDREQUE0RDtBQUM1RCxnREFBZ0Q7QUFDaEQseURBQXlEO0FBQ3pELHNGQUFzRjtBQUN0RixpRkFBaUY7QUFDakYsWUFBWTtBQUVaLGdDQUFnQztBQUNoQyxnQkFBZ0I7QUFDaEIsbUNBQW1DO0FBQ25DLDJDQUEyQztBQUMzQyw2R0FBNkc7QUFDN0csdUhBQXVIO0FBRXZILHdCQUF3QjtBQUN4Qiw0RkFBNEY7QUFDNUYsZ0NBQWdDO0FBQ2hDLDBFQUEwRTtBQUMxRSxrRUFBa0U7QUFDbEUsK0JBQStCO0FBQy9CLHNGQUFzRjtBQUN0Rix3QkFBd0I7QUFDeEIsb0JBQW9CO0FBQ3BCLHVCQUF1QjtBQUN2QiwrRUFBK0U7QUFDL0UsZ0JBQWdCO0FBRWhCLHlDQUF5QztBQUN6QywrREFBK0Q7QUFDL0QsdURBQXVEO0FBQ3ZELHdCQUF3QjtBQUN4Qiw0Q0FBNEM7QUFDNUMsc0VBQXNFO0FBQ3RFLCtDQUErQztBQUMvQyxtRUFBbUU7QUFDbkUsdUJBQXVCO0FBQ3ZCLDRFQUE0RTtBQUM1RSxnQkFBZ0I7QUFDaEIsdURBQXVEO0FBQ3ZELFlBQVk7QUFDWixRQUFRO0FBR1IsSUFBSSJ9