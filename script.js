const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");


let userMessage;
const API_KEY = "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";
const inputInitHeight = chatInput.scrollHeight

const  createChatLi = (message, className) => {
    //create a chat <li> element with a passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ?`<p></p>` :`<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;

}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    messageElement = incomingChatLi.querySelector("p");

   //Define the properties and message for the API request
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content:userMessage}]
      })
    }

       //Send the request to the API, GET RESPONSE
       fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
       messageElement.textContent = data.choices[0].message.content;
       }).catch((error) =>  {
         messageElement.classList.add("error");
         messageElement.textContent = "Oops something went wrong. Please try again";
       }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));

}

const handleChat = () => {
    userMessage  = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = ""; 
    chatInput.style.height = `${inputInitHeight}px`;
    
      
    //Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));	
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        //displays the "thinking" massage while waiting for response message
        
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);	
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    // Adjusting the height of the input textarea based on its content 
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;

})

chatInput.addEventListener("keydown", (e) => {
    //If enter key is pressed without  Shift key and the window 
    // width is greater than 800px, handle the chat
   if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault()
      handleChat();
   }

})



sendChatBtn.addEventListener("click", handleChat);