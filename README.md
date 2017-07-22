# README #

This is a node.js code for bakery order processing application.

# How to Install libraries #
Run the following command to install all libraries required to run the application:
npm install

# How to run the application after installing all libraries #
Run the following command to run the application:
npm start

System will then ask to enter oder one by one. Enter the order and hit enter. Press CTRL + C when you want to finish
An example would be

10 VS5 (Enter)
14 MB11 (Enter)
13 CF (Enter)
CTRL+C

# How to run unit tests #
Run the following command to run the unit tests for the application:
npm test

# Add or modify product details #
Please update the following config file to add/modify the available bakery products and pack details
config/product-config.js

# Environment Variables #
Follwoing environment variable can ben set to achieve different logging behavior:
LOGLEVEL - set this variable for logging else it will use default value (debug) as set in config/logger-config. Options available - info, debug, warn, error, trace, fatal
