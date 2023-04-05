import logo from './logo.svg';
import './App.css';
import { Configuration, OpenAIApi } from "openai";
import Header from './Header';
import TypedReply from './TypedReply';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import { useState } from 'react';



function App() {

  const [prompt, setPrompt] = useState("");

  const [chatData, setChatData] = useState({ "history": [{ "type": "openai", "data": "Tell me the name of a celebrity, I'll say the year he/she died!" }], "response": "" });

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateResponse = async () => {
    if (prompt === "")
      return false;

    let newChatData = Object.assign({}, chatData)

    if (chatData.response !== "")
      newChatData.history.push({ "type": "openai", "data": chatData.response })
    newChatData.history.push({ "type": "user", "data": prompt })

    let openAiInput = "Tell me the year when the celebrity died.\n" + prompt + ':';
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
    newChatData.response = processedResponse.length === 0 ? "No respone" : processedResponse;
    setChatData(newChatData);
  }

  return (
    <div className="App">
      <Header></Header>
      <div className='chat-container'>
        <ChatInput sendToOpenAi={setPrompt} setPrompt={generateResponse}></ChatInput>
      </div>
    </div>
  );
}

export default App;