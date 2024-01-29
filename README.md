# Readme for custom eLabNext Add-on
This document provides instructions for building and serving an Add-on in JavaScript and handling content translation.

### Build the Add-on
To build the Add-on, follow these steps:

1. Run the following command to build the Add-on for production:

```npm run build```

2. If you want to build the Add-on for development purposes, run:

```npm run build:dev```


### Serve the Add-on JS file

```npm run start```


Access the Add-on script at the following URL:

```https://127.0.0.1:8080/dist/add-on.js```




### Updating the Add-on Script URL in Member Settings

To set the Add-on script URL in the Member Settings Developer tab, please replace the existing URL with the new one:


```https://127.0.0.1:8080/dist/add-on.js```
