# Ragwing

_Not stricly rag!_

Idea is to use on-top-of-LLM techniques to create an agent that can play wingspan.

Everything is just ideas for now.

## Capabilities

Many options:

- play the actual full game
  - come up with next move based on state
- just do hand selection
- just play against automa
- describe the strategy that someone is taking
- come up with a strategy given a starting hand

## Metrics for success

- for hand selection: have a subjective measurement of how good an initial hand is, and grade the LLM agent on its selections in a blind way
- how often can my augmented LLM beat the automa?

## Notes

- Maybe OpenAI assistants API is what I am looking for?
  - could I use this with code interpreter that is running my game simulation?
  - maybe that is unnecessarily complex?
- Names:
  - Tui
  - MagpAI
  - Mockingbird
  - Galah
  - mAIna (myna)
  - polly
