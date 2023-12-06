export const CartReducer = (state, action) => {
  let index = -1;

  if (action.payload)
       index = state.cartItems.findIndex( x => x.id === action.payload.id);

  switch (action.type){
       case "ADD":
       case "INCQTY":

          //console.log('El index aqui es:' + index)
           if (index === -1){
               state.cartItems.push({...action.payload, quantity: 1});
               //console.log("Estoy en el if que agrega cantidad y demas elementos de payload");
           } else {
               state.cartItems[index].quantity++;
               //console.log('Estoy en el else que agrega cantidad ++|')
           }
             break;
           

       case "REMOVE":
           if (index > -1) {
               state.cartItems.splice(index, 1);
           }
           break;


       case "DECQTY": 
           if (index > -1) {
               state.cartItems[index].quantity--;
           }
           break;

       case "CLEAR":
           state.cartItems = [];
           break;

       default:
           

   }
   
   return state;
}