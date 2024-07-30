import OpenAI from "openai";
import "dotenv/config";
import * as fs from "fs";
import { BirdCard } from "./birdCard";
import { Assistant } from "openai/resources/beta/assistants";
import { FileCitationAnnotation } from "openai/resources/beta/threads/messages";

const openai = new OpenAI();

const dataDir = `${__dirname}/../data`;

const getRandomStartingHand = (birds: BirdCard[] = []): BirdCard[] => {
  if (birds.length === 0) {
    birds = JSON.parse(fs.readFileSync(`${dataDir}/birds.json`, "utf-8")).map(
      (birdData: object) => new BirdCard(birdData)
    );
  }

  const startingHand: BirdCard[] = [];
  while (startingHand.length < 5) {
    const randomIndex = Math.floor(Math.random() * birds.length);
    const randomBird = birds[randomIndex];
    if (!startingHand.includes(randomBird)) {
      startingHand.push(randomBird);
    }
  }
  return startingHand;
};

const createNewAssistant = async (): Promise<Assistant> => {
  const assistant = await openai.beta.assistants.create({
    name: "Wingspan Assistant",
    instructions:
      "You are a Wingspan assistant. Your job is to give recommendations on moves to take in a game of wingspan.",
    model: "gpt-4o",
    tools: [{ type: "file_search" }],
  });

  const fileStreams = [
    `${dataDir}/wingspan-rules.pdf`,
    `${dataDir}/birds.json`,
  ].map((path) => fs.createReadStream(path));

  let vectorStore = await openai.beta.vectorStores.create({
    name: "Wingspan Vector Store",
  });

  await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, {
    files: fileStreams,
  });

  await openai.beta.assistants.update(assistant.id, {
    tool_resources: { file_search: { vector_store_ids: [vectorStore.id] } },
  });

  return assistant;
};

const getAssistant = async (assistantId: string): Promise<Assistant> => {
  const assistant = await openai.beta.assistants.retrieve(assistantId);
  return assistant;
};

const main = async (): Promise<void> => {
  const assistant = await getAssistant("asst_pLdQtQ2ckLVoIszzEeXOHItS");

  const startingHand = getRandomStartingHand();

  const prompt = `I have the following bird cards in my opening hand: ${startingHand
    .map((birdCard) => birdCard.commonName)
    .join(", ")}. Which bird cards and food should I keep?
Please refer to the vector search tool for the Wingspan rules and bird data.`;
  console.log(prompt);

  const thread = await openai.beta.threads.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  console.log("Creating run...");
  const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
    assistant_id: assistant.id,
  });

  const messages = await openai.beta.threads.messages.list(thread.id, {
    run_id: run.id,
  });
  console.log("Got messages:\n\n");

  const message = messages.data.pop()!;
  if (message.content[0].type === "text") {
    const { text } = message.content[0];
    const { annotations } = text;
    const citations: string[] = [];

    let index = 0;
    for (let annotation of annotations) {
      console.log(annotation);
      text.value = text.value.replace(annotation.text, "[" + index + "]");
      const { file_citation } = annotation as FileCitationAnnotation;
      if (file_citation) {
        const citedFile = await openai.files.retrieve(file_citation.file_id);
        citations.push("[" + index + "]" + citedFile.filename);
      }
      index++;
    }

    console.log(text.value);
    console.log(`Citations:\n\n${citations.join("\n")}`);
  }
};

main();
