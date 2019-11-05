# Slack Desk
A request ticket system designed around Slack communication tools

## Description
This project explores the capability of building a request management platform that uses a well developed communication platform for it's main interface. This approach is more than creating a request manager and then connecting to Slack, it's very premise to build outwared from the communication platform. This approach should result in more user friendly platform management while reducing costs and challenges using complicated forms for making requests. Its aim is at the IT Service Management (ITSM) market but has inherent pontential in many areas, including sales management, customer service, education, healthcare etc.

## Requirements
* MySql or MariaDB server
* Slack User Account and Workspace. 
* Slack Application with a Bot and Event Listener. 
* Slack Event API for NodeJS
* Slack Web API for NodeJD
* NodeJS with Express, MySQL, Slack API and other packages (see package.json dependencies for details).
* Access to Express Web Server from the internet so that slack can communicate with it. We used tunneling from ngrok.io to achieve this.

## Installation
_Instructions will assume a knowledge of database setup, NodeJS/Express Setup, and git repository cloning. They will not be included herein. The bulk of instructions surround setting up the Slack API to use with this code._

Create a .env file at the root of your repo folder. Add four lines:

SLACK_SIGNING_SECRET = ""

SLACK_OAUTH_TOKEN = ""

SLACK_OAUTHBOT_TOKEN = ""

AWS_DB = ""

![slackEnv](https://github.com/krissmith2910/Project-2/blob/master/readmeimages/slackEnv.png)

The fourth line is used if your Database is using a privately created and managed database server or an AWS server. If using Heroku with a database server add-on, the process will be different.  PDF file indicating a Heroku setup wit MySql Server is included at the root of this folder. The remaining lines are used for Slack. Again, if you use heroku you will use it's own configuration of environment variables.

Establish a public web presence of your Express web server. Slack will need to verify connection to this to continue. 

Create a Slack account and workspace. You will need greater control over this workspace than is often given to enterprise accounts in order to setup the Slack APIs. You may consider creating your own personal account if you don't have one already.

Once your account is created, login to your account from your browser and go to https://api.slack.com/start/overview. It will be worth your time to read the various articles and references to understand how Slack APIs work. *Do not assume our exlcusion of them here is a reflection on their value*. Brevity dictates much of what we do and do not include herein. The documentation provided by Slack is excellent and worth repeated reads.

To create you app, go to: https://api.slack.com/apps while logged into Slack from your browser. Click on the green _Create New App_ button. Give the app a name. Use a simple but descriptive name with no spaces. Slack apps are not uniquely named so you want to give it a name that identifies it well without making it too complicated for users. Specify the workspace where it will exist. 

![slackAppCreate](https://github.com/krissmith2910/Project-2/blob/master/readmeimages/slackAppCreate.png)

After it is created, go to the section titled _Add features and functionality_ and select _Event Subscriptions_. A corresponding web page appears. Click on the toggle button to _Enable Events_ to turn it on. Additional detail will appears after doing so. Under _Request URL_ enter the URL for your slack listener. In this code, it will be the _server URL/slack/events_. The path can be seen in server.js file at line 15 and is part of the Express middleware. Add the URL/path to the field for the Request URL. It will then check to see if it can access this URL and receive a response. The page will return indicate it is verified when done.

![slackEventSubscr](https://github.com/krissmith2910/Project-2/blob/master/readmeimages/slackEventSubsc.png)


![slackReqUrl](https://github.com/krissmith2910/Project-2/blob/master/readmeimages/slackReqUrl.png)

After connection to the Request URL has been verified, select the option _Subsscribe to bot events_. A corresponding web page appears and includes a link to create a bot. Follow this link and create a bot. Give the bot a display name and a user name. Names will be added by default based on the name of your application. The display name should be changed to be more user friendly, the user name can remain as it is if you are satisfied with it. This will appear as a user account like any other on Slack. Click on _Bot User Event_ and searc for and add _message.im_. This will enable your bot to react to messaged sent to it. Save changes to your bot and to your app's event subscription. 

![slackReqUrl](https://github.com/krissmith2910/Project-2/blob/master/readmeimages/slackBotSubscr.png)

![slackBotEvnt](https://github.com/krissmith2910/Project-2/blob/master/readmeimages/slackBotEvent.png)

There are events for workspace apps and to "unfurl" a URL. These are not covered in this repo at the moment and can be ignored.

After creation, click on the app to examine its properties. The left side of the resulting page has navigation selections. Confirm you are on _Basic Settings_. When confirmed, scroll down and find the section titled _App Credentials_ and the field titled _Signing Secret_. Click on the button to show this field. Copy the contents and click on _Basic Settings_ again to hide the field. Paste the content into your .env file and for the entry SLACK_SIGNING_SECRET. Make sure the copied value is within the quotes. 

![slackBasic](https://github.com/krissmith2910/Project-2/blob/master/readmeimages/slackBasic.png)

Within the App settings, navigate to the _oAuth & Permissions_. Click on the button _Install App to Workspace_.  A resulting web page explaining the implications of installing this appears and you are asked to allow these changes. Click _Allow_. This will result in the oAuthTokens for users and bots. You will add these to the .env file. You will find the oAuth Access Token and the Bot Access Token. Copy each of these and paste them accordingly into their corresponsing .env entries. At present, only the SLACK_OAUTHBOT_TOKEN is used, but it is good to have the other for expanding fucntionality in the future. 

![slackoAuth](https://github.com/krissmith2910/Project-2/blob/master/readmeimages/slackoAuth.png)

Return to your Slack App and to _oAuth & Permissions_. Scroll down and locate the section titled _Scopes_ and add the following scopes:
* bot
* commands
* incoming-webhook
* channels:history
* im:history
* chat:write:bot

![slackoScope](https://github.com/krissmith2910/Project-2/blob/master/readmeimages/slackScope.png)
(Consult Slack API documentation for the purpose of each of these).

There will be a yellow bar near the top of the web page informing you that you need to reinstall the app after these changes. It includes a link in the phrase, "_reinstall your app_".  Click on this link and follow the prompts to reinstall your app. If you want to be safe during experimentation. Choose your user account as the channel. Click _Allow_.

![slackReinstall](https://github.com/krissmith2910/Project-2/blob/master/readmeimages/slackReinstall.png)

 At this point go to your Slack user interface and access your workspace. The left navigation pane has a section titled _Apps_ with a small + button next to it. Click on this button and select your newly created App. This will install the app to your user account. You can then send messages to the account and they will be converted into requests via your NodeJS server. The entries will be stored in your database. If you go to your Express server web URL it will redirect you to /desk/requests where your entry can be seen and managed.

![slackSelectApps](https://github.com/krissmith2910/Project-2/blob/master/readmeimages/slackSelectApps.png)

![slackSelectApps](https://github.com/krissmith2910/Project-2/blob/master/readmeimages/slackaddApp.png)


## Contributors
* [Kris Smith](https://github.com/krissmith2910)
* [Luci McGuire](https://github.com/K1n9Z3r0)
* [Irv Irra](https://github.com/irvgottithedon)
* [Robert Baird](https://github.com/rbaird2001)

## Acknowledgements
* Matt Banz
* Richard Baird