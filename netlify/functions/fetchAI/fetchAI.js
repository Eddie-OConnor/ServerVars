import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


const handler = async (event) => {
  try {
  const { input } = JSON.parse(event.body) /* new code */
  const response = await openai.createCompletion({
        // model: 'davinci:ft-scrimba-2023-03-30-23-10-03', old
        model: 'davinci-002',
        // prompt: event.body, old
        prompt: input,
        presence_penalty: 0,
        frequency_penalty: 0.3,
        max_tokens: 100,
        temperature: 0,
        stop: ['\n', '->']
    }); 

    return {
      statusCode: 200,
      // body: JSON.stringify(
      //   { 
      //     reply: response.data 
      //   } 
      // ), old
      body: JSON.stringify({ response }),
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
