import axios from "axios";

const API = "https://api.coingecko.com/api/v3";

export async function getMarkets() {
  const res = await axios.get(
    \`\${API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1\`
  );

  return res.data;
}
