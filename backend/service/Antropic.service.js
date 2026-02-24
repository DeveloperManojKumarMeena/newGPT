const Groq = require("groq-sdk") ;
const { tavily } =require("@tavily/core") ;


const groq = new Groq({ apiKey: process.env.GROK_API_KEY });
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY});

async function Aifunction(userPrompt) {
  const messages = [
    {
      role: "system",
      content: `You are a smart personal assistant named PavilionAI.
You have access to a tool:
1. webSearch({query:string}) - Search latest real-time information from internet.`
    },
    {
      role: "user",
      content:userPrompt
    }
  ];

  // -------- First Completion (Model decides tool call) --------
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    messages,
    tools: [
      {
        type: "function",
        function: {
          name: "webSearch",
          description:
            "Search the latest information and realtime data on the internet",
          parameters: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Search query"
              }
            },
            required: ["query"]
          }
        }
      }
    ],
    tool_choice: "auto"
  });

  const responseMessage = completion.choices[0].message;
  messages.push(responseMessage);

  // अगर tool call नहीं आया
  if (!responseMessage.tool_calls) {
    console.log("AI:", responseMessage.content);
    return responseMessage.content;
  }

  // -------- Execute Tool --------
  for (const toolCall of responseMessage.tool_calls) {
    const functionName = toolCall.function.name;
    const functionArgs = JSON.parse(toolCall.function.arguments);

    if (functionName === "webSearch") {
      const toolResult = await webSearch(functionArgs);

      // IMPORTANT: content must be STRING
      messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content: toolResult
      });
    }
  }

  // -------- Second Completion (Final Answer Generation) --------
  const finalCompletion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    messages
  });

  console.log("\nFinal Answer:\n");
  console.log(finalCompletion.choices[0].message.content);
  return finalCompletion.choices[0].message.content
}



// ---------------- TOOL FUNCTION ----------------

async function webSearch({ query }) {
  const response = await tvly.search(query);

  if (!response.results || response.results.length === 0) {
    return "No results found.";
  }

  // Convert to STRING (Very Important)
  const formatted = response.results
    .map(
      (result, index) =>
        `Result ${index + 1}:\nTitle: ${result.title}\nContent: ${result.content}`
    )
    .join("\n\n");

  return formatted;
}

module.exports = Aifunction;