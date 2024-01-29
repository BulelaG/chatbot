const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");


let userMessage;
const API_KEY = "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";

const  createChatLi = (message, className) => {
    //create a chat <li> element with a passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ?`<p>${message}.</p>` :`<span class="material-symbols-outlined">smart_toy</span><p>${message}.</p>`;
    chatLi.innerHTML = chatContent;
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
         messageElement.textContent = "Oops something went wrong. Please try again";
       }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));

}

const handleChat = () => {
    userMessage  = chatInput.value.trim();
    if (!userMessage) return;
      
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


sendChatBtn.addEventListener("click", handleChat);