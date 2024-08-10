# RevoCycle

RevoCycle is an GenAI-powered recycling assistant app designed to revolutionize recycling practices in New Zealand by making them more accessible, engaging, and rewarding for users. By leveraging cutting-edge AI technologies and partnerships with private sector companies, we aim to significantly increase recycling rates and reduce waste.

![alt text](https://raw.githubusercontent.com/lilwindax/revocycle/main/Screenshot%202024-08-10%20130025.png)

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- **Multi-Modal AI Interaction**
  - Text-to-Text: Ask questions about recycling and receive accurate, localized answers.
  - Image-to-Text: Upload images of items and get recycling instructions.
  - Image-to-Image: Generate creative upcycling ideas based on uploaded images.

- **Fine-Tuned AI Models**
  - Custom GPT model trained on recycling standardization data.

- **User-Friendly Interface**
  - Intuitive chat-like interface for easy interaction.
  - Simple image upload and idea generation features.

- **Reward System**
  - Partnership with private sector companies to offer rewards for regular app usage.
  - Earn discounts on eco-friendly products and services.

- **Support for Product Stewardship**
  - Aligns with New Zealand's product stewardship initiatives.
  - Provides data and insights to support circular economy goals.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0 or higher)
- npm (v6.0 or higher)
- An OpenAI API key (See [OpenAI](https://openai.com/api/) for details on obtaining a key)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/lilwindax/revocycle.git
   ```

2. Navigate to the project directory:
   ```
   cd revocycle
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

   **IMPORTANT:** Never commit your `.env` file or share your API key publicly.

## Usage

1. Start the development server:
   ```
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

3. Use the chat interface to ask recycling questions or upload images of items you want to recycle.

4. Follow the app's suggestions for proper recycling and explore upcycling ideas.

## Contributing

We welcome contributions to the RevoCycle project. If you have suggestions for improvements or encounter any issues, please feel free to open an issue or submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

---

RevoCycle is proud to support New Zealand's transition to a circular economy and product stewardship initiatives. Together, we can make a significant impact on reducing waste and promoting sustainable practices.
