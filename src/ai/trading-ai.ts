export async function generateSignal(price:number) {

  if(price > 0){
    return {
      signal:"BUY",
      confidence:"HIGH",
      message:"Bullish market momentum"
    }
  }

  return {
    signal:"WAIT",
    confidence:"LOW",
    message:"Market unstable"
  }
}
