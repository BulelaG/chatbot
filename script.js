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

const generateResponse = () => {
    const API_URL = "https://api.openai.com/v1/chat/completions";

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
    console.log(data);
}).catch((error) =>  {
    console.log(error);
})
}
const handleChat = () => {
    userMessage  = chatInput.value.trim();
    if (!userMessage) return;
      
    //Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));	

    setTimeout(() => {

        //displays the "thinking" massage while waiting for response message
        chatbox.appendChild(createChatLi("Thinking...", "incoming"));	
        generateResponse();
    }, 600);
}


sendChatBtn.addEventListener("click", handleChat);