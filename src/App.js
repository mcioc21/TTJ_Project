import './App.css';
import { Configuration, OpenAIApi } from "openai";
import Header from './Header';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import { useState } from 'react';



function App() {

  const [prompt, setPrompt] = useState("");

  const [chatData, setChatData] = useState({ "history": [{ "type": "openai", "data": "I will give you a few options separated by the word 'or'. I want you to pick one randomly." }], "response": "" });

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateResponse = async () => {
    if (prompt === "")
      return false;

    let newChatData = Object.assign({}, chatData);

    if (chatData.response !== "")
      newChatData.history.push({ "type": "openai", "data": chatData.response });
    newChatData.history.push({ "type": "user", "data": prompt });

    let openAiInput = "I will give you a letter you give me an animal that starts with that letter\n" + prompt + ':';
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: openAiInput,
      temperature: 0.8,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["\n"],
    });
    console.log('response', response);

    let processedResponse = response.data.choices[0].text;
    newChatData.response = processedResponse.length === 0 ? "No response" : processedResponse;
    setChatData(newChatData);
  }

  return (
    <div className="App">
      <Header></Header>
      <div className='chat-container'>
        <ChatHistory chatHistory={chatData.history} response={chatData.response} />
        <ChatInput handleChange={setPrompt} handleClick={generateResponse}></ChatInput>
      </div>
    </div>
  );
}


export default App;