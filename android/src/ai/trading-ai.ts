export async function generateAISignal(price:number) {
  if(price > 0){
    return {
      signal:"BUY",
      confidence:"HIGH",
      message:"AI detected bullish momentum"
    }
  }

  return {
    signal:"WAIT",
    confidence:"LOW",
    message:"Market unstable"
  }
}
