export async function createRazorpayOrder(amount:number,currency:string="INR"){
  return {
    success:true,
    order:{
      id:"demo_order_id",
      amount,
      currency
    }
  }
}
