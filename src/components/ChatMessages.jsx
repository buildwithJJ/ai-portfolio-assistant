import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css'

function ChatMessages({ chatMessages }) {

        const chatMessageRef = useRef(null);

        useEffect(()=>{
          const containerElem = chatMessageRef.current;
          if (containerElem){
            containerElem.scrollTop = containerElem.scrollHeight;
          }
        },[chatMessages]);
        return (
          <div className="chat-messages-container" ref={chatMessageRef}>
          {chatMessages.length === 0 && (
            <p style={{textAlign: "center", marginTop: "40px"}}>
               Welcome to the chatbot project! Send a message using the textbox below.
            </p>
          )}
            {chatMessages.map((chatMessage) => {
              return (
                <ChatMessage
                  message={chatMessage.message}
                  sender={chatMessage.sender}
                  key={chatMessage.id}
                />
              );
            })}
          </div>
        );
      }

      export default ChatMessages;