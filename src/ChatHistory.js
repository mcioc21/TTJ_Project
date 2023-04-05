function ChatHistory({ chatHistory, response }) {
    return (
        <div className="chat">
            <div className="conversation">
                {chatHistory.map((item, index) => {
                    if (item.type === "user") {
                        return (
                            <div className="user-message" key={index}>
                                <div className="user-avatar">
                                    <img src="/user-avatar.png" alt="user" height="100%" />
                                </div>
                                <div className="user-bubble">
                                    {item.data}
                                </div>
                            </div>
                        )
                    } else if (item.type === "openai") {
                        return (
                            <div className="openai-message" key={index}>
                                <div className="openai-avatar">
                                    <img src="/openai-avatar.png" alt="openai" height="100%" />
                                </div>
                                <div className="openai-bubble">
                                    {item.data}
                                </div>
                            </div>
                        )
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className="input">
                <input type="text" placeholder="Type your message here" />
                <button>Send</button>
            </div>
        </div>
    )
}

export default ChatHistory;  