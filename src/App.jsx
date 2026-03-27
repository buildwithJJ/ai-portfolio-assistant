import { useState ,useEffect } from 'react'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages';
import './App.css'
 

function App() {
        const [chatMessages, setChatMessages] = useState(() => {
          const savedMessages = localStorage.getItem('chatMessages');
          return savedMessages ? JSON.parse(savedMessages) : [];
        });        
        
        useEffect(() => {
          localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
        }, [chatMessages]);

        const [darkMode, setDarkMode] = useState(false);

        function toggleDarkMode(){
          const newMode = !darkMode;
          setDarkMode(newMode);

          if(newMode){
            document.body.classList.add("dark-mode");
          } else {
            document.body.classList.remove("dark-mode");
          }
        }

        function clearChat(){
          const confirmDelete = window.confirm("Are you sure you want to delete all chat messages?");

          if (confirmDelete) {
            setChatMessages([]);
            localStorage.removeItem('chatMessages');
          }
        }
        return (
          <div className={`app-container ${darkMode ? "dark-mode" : ""}`}>
            <div className="chat-header">
              <h3>Chatbot</h3>
              <div>
                <button onClick={toggleDarkMode} className="theme-button">
                  {darkMode ? "☀️" : "🌙"}
                </button>
                <button onClick={clearChat} className="clear-button">
                  Clear Chat
                </button>
              </div>
              
            </div>
            <ChatMessages
              chatMessages={chatMessages}
            />
            <ChatInput
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
            />
          </div>
        );
      }

export default App
