import { useState } from 'react'
import LoadingSpinner from '../assets/loading-spinner.gif'
import './ChatInput.css'

async function getAIResponse(message) {

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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"
        },
        body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [

            {
              role: "system",
              content: "You are a friendly AI assistant on Jonathan Jose Thomas's portfolio website. Keep answers short (2-3 sentences). If someone asks about Jonathan, talk about his skills, projects, and experience as a Computer Science engineer."
            },
            { role: "user", content: message }
            ]
        })
});

        const data = await response.json();

        console.log("Groq API response:", data);

        if (!response.ok) {
        return "Error: " + data.error.message;
        }

        return data.choices[0].message.content;

    } catch (error) {
        console.error(error);
        return "Failed to contact AI service.";
    }
    }
export function ChatInput({ chatMessages, setChatMessages }) {
        const [inputText, setInputText] = useState('');

        function saveInputText(event) {
          setInputText(event.target.value);
        }


        async function sendMessage() {
          if (!inputText.trim()) return;

          const newChatMessages = [
            ...chatMessages,
            {
              message: inputText,
              sender: 'user',
              id: crypto.randomUUID()
            },
            {
              message: <img src={LoadingSpinner} className='loading-spinner'/>,
              sender: 'robot',
              id: crypto.randomUUID()
            }
          ];

          setChatMessages(newChatMessages);

          const response = await getAIResponse(inputText);

          setTimeout(() => {
          setChatMessages([
            ...newChatMessages.slice(0,-1),
            {
              message: response,
              sender: 'robot',
              id: crypto.randomUUID()
            }
          ]);
          },1000);
          setInputText('');
        }

        function handleKeyDown(event) {
          if (event.key === "Enter"){
            sendMessage();
          }
        }

        return (
          <div className="chat-input-container">
            <input
              placeholder="Send a message to Chatbot"
              size="30"
              onChange={saveInputText}
              onKeyDown={handleKeyDown}
              value={inputText}
              className="chat-input"
            />
            <button
              onClick={sendMessage}
              className ="send-button"
            >
            Send
            </button>
          </div>
        );
      }