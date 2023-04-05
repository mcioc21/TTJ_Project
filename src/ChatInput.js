
function ChatInput({sendToOpenAi, setPrompt}){
    function submit(e){
        e.preventDefault();
    }
    return(
        <div className="chat-input">
            <form className="chat-container" onSubmit={(e) => submit(e)}>
                <input type="text" placeholder="Please enter your message here" id="user-input" onChange={(e) => sendToOpenAi(e.target.value)} />
                <button type="submit" onClick={setPrompt}>Send</button>
            </form>
        </div>
    )
}
export default ChatInput;