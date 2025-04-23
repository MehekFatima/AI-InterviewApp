# AI Mock Interview App

An AI-powered mock interview web application that generates personalized interview questions based on job title, description, and experience. It uses **DeepSeek** (via **Ollama**) to generate questions and feedback, offering a full end-to-end mock interview experience.

## Tech Stack

- **Frontend**: [Angular](https://angular.io/)
- **Backend**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **AI Integration**: [DeepSeek](https://github.com/deepseek-ai) via [Ollama](https://ollama.com/)
- **Speech-to-Text**: [Annyang.js](https://www.talater.com/annyang/)


## Features

- User authentication (JWT-based)
- Dashboard to manage interviews
- Create mock interviews based on job details
- Real-time audio recording and speech-to-text
- AI-generated questions and personalized feedback using **DeepSeek**
- Interview history and performance tracking

---

## Powered by DeepSeek (via Ollama)

We've used **DeepSeek**, a powerful open-source large language model. Integration is done **locally using Ollama**, ensuring full control and data privacy.

### How to Integrate DeepSeek Locally

1. **Install Ollama**  
   Follow the official [Ollama installation guide](https://ollama.com/download) for your OS.

2. **Pull the DeepSeek model**
   ```bash
   ollama pull deepseek-r1:1.5b
   ```
3. **Run the model locally using command prompt**
    ```bash
   ollama run deepseek-r1:1.5b
    ```
4. **Set up your backend Your API should interact with Ollama at:**
     ```
    http://127.0.0.1:11434
    ```
### Demo
![Login](demo\login.png)
![signup](demo\signup.png)
![home](demo\home.png)
![Create interview](demo\createInterview.png)
![loading](demo\interviewLoading.png)

## Contributors

- [@yasir4560](https://github.com/yasir4560)
- [@MehekFatima](https://github.com/MehekFatima)
