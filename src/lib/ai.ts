export async function askAI(message: string) {
  try {
    const response = await fetch("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    return await response.json();
  } catch (error) {
    return {
      reply: "Something went wrong",
    };
  }
}
