import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const API_KEY = 'Insert your own API Key';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [image, setImage] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setGeneratedImage(null); // Reset generated image when new image is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImageWithGPT4 = async (imageData) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4-vision-preview",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: "What objects related to recycling do you see in this image? Please provide a concise list." },
                { type: "image_url", image_url: { url: imageData } }
              ]
            }
          ],
          max_tokens: 300
        }),
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error analyzing image:', error);
      return "Error analyzing image";
    }
  };

  const generateRecyclingIdea = async () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    try {
      const imageAnalysis = await analyzeImageWithGPT4(image);
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: `Based on these recyclable items: ${imageAnalysis}, generate an image showcasing 3-4 specific, creative upcycling craft ideas. Each idea should be:
          
          1. Clearly visible and distinguishable
          2. Practical or decorative, suitable for home or classroom use
          3. Achievable with basic crafting skills
          4. Labeled with a short, descriptive title
        
          Ideas could include, but are not limited to:
          - Tin can planters or organizers
          - Bottle cap art or jewelry
          - Cardboard tube sculptures or toys
          - Plastic bottle bird feeders or lamps
          - Paper roll animals or decorations
          - Egg carton flowers or organizers
        
          The image should have a DIY, handmade aesthetic, as if photographed in a well-lit crafting space. Include some crafting tools and materials in the background to suggest the process. The overall feel should be colorful, inviting, and inspire viewers to try these projects themselves.`,
          n: 1,
          size: "1024x1024"
        }),
      });

      const data = await response.json();
      setGeneratedImage(data.data[0].url);
      
      // Add the generated image to the chat
      const botMessage = { 
        id: Date.now(), 
        text: "Here's a creative recycling idea based on your image:", 
        user: false,
        image: data.data[0].url
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error generating recycling idea:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (inputText.trim() === '' && !image) return;

    let userMessage = { id: Date.now(), text: inputText, user: true };
    if (image) {
      userMessage.image = image;
    }
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');

    try {
      let prompt = inputText;
      if (image) {
        const imageAnalysis = await analyzeImageWithGPT4(image);
        prompt = `Image analysis: ${imageAnalysis}\n\nUser question: ${inputText}`;
        setImage(null);
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo-1106",
          messages: [{ role: "user", content: prompt }],
          temperature: 1,
          max_tokens: 256,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          response_format: { "type": "text" }
        }),
      });

      const data = await response.json();
      const botMessage = { id: Date.now() + 1, text: data.choices[0].message.content, user: false };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="iphone-frame">
      <div className="mobile-app">
        <div className="app-header">
          <h1>Recycling Assistant</h1>
        </div>
        <div className="chat-container">
          {messages.map(message => (
            <div key={message.id} className={`message ${message.user ? 'user-message' : 'bot-message'}`}>
              {message.image && <img src={message.image} alt="Uploaded or Generated" className="uploaded-image" />}
              {message.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={sendMessage} className="input-form">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about recycling..."
            className="message-input"
          />
          <button type="button" onClick={() => fileInputRef.current.click()} className="upload-button">📷</button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button type="button" onClick={generateRecyclingIdea} className="idea-button">💡</button>
          <button type="submit" className="send-button">Send</button>
        </form>
        {image && (
          <div className="image-preview">
            <img src={image} alt="Preview" />
            <button onClick={() => setImage(null)}>❌</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
