Discord BOT
===========

This project is a Discord bot developed as part of the Computer Engineering (CPE) program at CMU University. The bot is designed to perform various tasks and enhance the functionality of Discord servers.

## How to add more commands or features

- Create a new file in the `commands` folder
- Follow the template that is provided in the `commands` folder

## How to run the bot

- Create a `.env` file in the root directory and add information as shown in the `.env.example` file
- Run `npm install` to install all the dependencies
- Run 
  - `npm run start`: to start the bot without compiling the code to javascript
  - `npm run dev`: to start the bot like start with `nodemon` to automatically restart the bot when changes are made to the code
  - `npm run build`: to compile the code to javascript
  - `npm run deploy`: to deploy new slash commands to the server