import {LitElement, ReactiveController} from "lit";

export class Store<STATE,ACTION> implements ReactiveController {
   private state:STATE

   /**
    * @param host
    * @param initialStateProvider should return a new instance of STATE on every call
    * @param reducer
    */
   constructor(
      private host:LitElement,
      private initialStateProvider:() => STATE,
      private reducer:(state:STATE, action:ACTION) => STATE

   ) {
      this.state = initialStateProvider()
      this.host.addController(this)
   }

   public getState() {
      return this.state
   }

   resetState() {
      this.state = this.initialStateProvider()
      this.host.requestUpdate()
   }

   dispatchAction(action:ACTION) {
      try {
         this.state = this.reducer(this.state, action)
      } finally {
         this.host.requestUpdate()
      }
   }

   hostConnected() {}
}
