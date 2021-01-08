# Stackoverflow clone

![Stackoverflow clone demo](https://drive.google.com/uc?export=view&id=1-nRLJpDZQj9upHAan36cS8AACzsss0rh)

#### Warning: although this project has some basics security such as hashed user password so on, this project is NOT secure enough in production. (Contribute to this project by making a pull request will be appreciated). In addition, this stackoverflow clone is not completely cloned the original stackoverflow.

Quicky setup:
- Clone this repository or fork it. 
    - To clone this repository, type `git clone https://github.com/kimlimjustin/stackoverflow-clone.git` on your command line
    - To fork this repository, click fork button of this repository then type `git clone https://github.com/<your username>/whatsapp-clone.git`
- Inside `server` folder, create a new file named `.env` which stores informations about the server side, such as `ATLAS_URI` and `SECURITY_KEY`. For example of this file, you can view `server/.env.example` file
- Inside `client` folder, create a new file called `.env` which stores informations about client side such as `REACT_APP_SECRET_KEY` and `REACT_APP_SERVER_URL` informations. For example of this file, you can view `client/.env.example`. For example of this file, you can view `website/.env.example` file
- Install all depedencies
    - Client side: on the `client` directory, type `npm install`
    - Server side: on the `server` directory, type `npm install`
- Run it on node.js:
    - Client side: on the `client` directory, type `npm start`
    - Server side: on the `server` directory, type `npm start`
