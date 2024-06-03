'use server';

import { AzureKeyCredential, ChatRequestMessage, ChatRequestSystemMessage, OpenAIClient } from "@azure/openai";

const env = process.env;

async function transcript(prevState: any, formData: FormData) {
  console.log("PREVIOUS STATE: ", prevState);

  const id = Math.random().toString(36);

  if (
    !env.AZURE_API_KEY ||
    !env.AZURE_ENDPOINT ||
    !env.AZURE_DEPLOYMENT_NAME ||
    !env.AUZRE_DEPLOYMENT_COMPLETIONS_NAME
  ) {
    console.error("Azure credentials not found");
    return {
      sender: "",
      response: "Azure credentials not found"
    }
  }

  const file = formData.get("audio") as File;

  if (file.size === 0) {
    return {
      sender: "",
      response: "No audio file found",
    }
  }

  console.log(">>", file);

  const arrayBuffer = await file.arrayBuffer();
  const audio = new Uint8Array(arrayBuffer);

  console.log("== Transcribe Audio Sample ==")

  const client = new OpenAIClient(
    env.AZURE_ENDPOINT,
    new AzureKeyCredential(env.AZURE_API_KEY)
  );

  const result = await client.getAudioTranscription(
    env.AZURE_DEPLOYMENT_NAME,
    audio
  )
  console.log(`Transcription: ${result.text}`)

  const messages = [
    {
      role: "system",
      content: "You are a helpful assistant. You will answer questions and reply I can't answer that if you don't know the answer",
    },
    {
      role: "user",
      content: result.text
    }
  ];

  const completions = await client.getChatCompletions(
    env.AUZRE_DEPLOYMENT_COMPLETIONS_NAME,
    messages,
    {
      maxTokens: 128,
    }
  );

  const response = completions.choices[0].message?.content;

  console.log(prevState.sender, "+++", result.text);

  return {
    sender: result.text,
    response: response,
    id,
  }


}

export default transcript;
