# Simple Lit Store

## Usage

```typescript
class AppComponent extends LitElement {
   private store = new Store(this, () => ({ text: "" }), (state, action:any) => {
      switch (action.type) {
         case "set-text":
            return {...state, text: action.text}

         default: throw new Error("unknown type of action: " + action.type)
      }
   })

   protected render(): unknown {
       return html`
           <div>text: ${this.store.getState().text}</div>
           <button @click="${this.store.dispatchAction({ type:"set-text", text:"new value" })}">change text</button>
       `  
   }
}
```
