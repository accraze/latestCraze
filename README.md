#The Latest Craze <a href="https://travis-ci.org/accraze/latestCraze" target="__blank"><img src="https://travis-ci.org/accraze/latestCraze.svg?branch=master"></a>
Simple end-to-end e-commerce solution written in NodeJS with Stripe payment gate and email order confirmations.

To test payment gateway use card number '4242424242424242' with any CCV and expiration. 


##Running locally
###Getting Started
Make sure you have a mongo instance running.
Open a new terminal and type `mongod`.

Then in another terminal window, navigate to the project's root directory.

###Install dependencies
type `npm install`

###Seed database
type `mongo localhost:27017/latestCraze seed.js` in the root directory

###Start the app
type `npm start`

###Run the test suite:
type `npm test`

