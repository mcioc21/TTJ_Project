import { useState, useEffect } from "react";

const TypedReply = ({ content = "", speed = 1200 }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        console.log('useEffect animKey', content, speed);
        setIndex(0);
        const animKey = setInterval(() => {
            setIndex((index) => {
                console.log('index', index);
                if (index >= content.length - 1) {
                    clearInterval(animKey);
                    return index;
                }
                return index + 1;
            });
        }, speed);
    }, [content, speed]);

    let displayedContent = (content, index) => {
        if (index >= content.length - 1) {
            return content;
        }
        return content.slice(0, index) + "█";
    }
    return <pre className="type-writer">{displayedContent(content, index)}</pre>
}

export default TypedReply;