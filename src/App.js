import './App.css';
import { Configuration, OpenAIApi } from "openai";
import Header from './Header';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import { useState } from 'react';
import RadioButton from './RadioButton';
// import ImageResponse from './ImageResponse';

function App() {

  const [prompt, setPrompt] = useState("");

  const [chatData, setChatData] = useState({ "history": [{ "type": "openai", "data": "Choose a letter for text input or an animal for image generation:" }], "response": "" });

  const [choice, setChoice] = useState("Text")

  const [image, setImage] = useState("");

  // let imageVerify = "";

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

    if(choice === "Text"){
      let openAiInput = "\n" + prompt + ':';
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
    let processedResponse = response.data.choices[0].text;
    newChatData.response = processedResponse.length === 0 ? "No response" : processedResponse;
    setChatData(newChatData);
  }
  else if
    (choice === "Image"){
      const res = await openai.createImage({
        prompt: prompt,
        n: 1,
        size: "256x256",
      });
      //imageVerify = image;
      console.log('response', res);
      let processedImageResponse = res.data.data[0].url;
      //processedImageResponse = processedImageResponse.length === 0 ? "No response" : processedImageResponse;
      setImage(processedImageResponse);
    }
  
  }
  

  return (
    <div className="App">
      <Header></Header>
      <div className='radio-button'> <RadioButton choice ={choice} setChoice = {setChoice}></RadioButton>  </div>
      
      <div className='chat-container'>
        <ChatHistory chatHistory={chatData.history} response={chatData.response}>  </ChatHistory>
        <img className="result-image" src={image} alt="generated img"/>
        <ChatInput sendToOpenAI={setPrompt} setInput={generateResponse}></ChatInput>
        
      </div>
    </div>
  );
}


export default App;