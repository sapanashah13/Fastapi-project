export const askRag = async (question) => {
  try {
    const res = await fetch("http://localhost:8000/rag/smart-ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ question })
    });

    return await res.json();
  } catch (error) {
    return { answer: "Server error. Try again." };
  }
};