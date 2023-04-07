function ChatInput({ sendToOpenAI, setInput }) {
    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className="input-area">
            <form className="input-container" onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" placeholder="Type your message here" id="user-input" onChange={(e) => sendToOpenAI(e.target.value)} />
                    <button type="submit" onClick={setInput}><i className="fas fa-arrow-up" aria-hidden="true"></i></button>
            </form>
        </div>
    )
}

export default ChatInput;