

# Ion Bot

![logo512 copy 2](https://user-images.githubusercontent.com/31907722/125200919-98b07f00-e28a-11eb-8f49-cc3514cd34e0.png)
 

Ion is an open source Telegram user bot with built-in web based admin dashboard which gives you ability to manage your user bot, install plugins, add custom commands and more.
  


## Requirements

* Node.js and NPM
* yarn
* macOS, Windows, Linux or Android

## Installation

There are two ways you can install Ion on your PC/Android. To install and host on Android, follow <a href="https://xen.codes/install-ion-on-android" target="_blank">this post</a>.

### Method 1 (recommended)

This is the easiest way to install Ion, run the following commands:
 ```shell
 npm i -g @ionapp/cli
 ion --init
 cd ion-main
 node index.js
 ```

### Method 2

For this method you will need to manually download  the latest release from GitHub page, then extract the zip file, and using the following command to setup.

```bash
git clone https://github.com/ionbot/ion-app
cd ion-app
npx lerna bootstrap
yarn
# create .env file in packages/bot folder and add MONGO=[mongo_url]
yarn dev
```

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/ionbot/ion)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https://github.com/ionbot/ion)
  
## Known Issues

  

### For more information

  

*  [Join Telegram Group](https://t.me/ionuserbotchat)
  

**Enjoy! Feedbacks are really appreciated ❤️**
