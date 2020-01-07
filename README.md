# middleware-in-the-middle

Node middleware for enforcing mutual TLS.

Currently, two instances of this are sitting between OIDC clients to enforce mutual authentication (in the application layer) over the token and registration endpoints.
One Broker will act as the OIDC client, the other Broker will act as the OP.

## Configuration

### Environment Variables

The following environment variables are _required_:

- `MODE`: whether this server is running as middleware for a Broker or an IDP

The app also expects the following environment variables to be set:

- `PORT`: the port to start this server on; defaults to 3000
- `IDP_PORT`: [IDP only] the port the "real" IDP server is listening on
- `BROKER_URL`: [Broker only] the URL to forward token requests to; request will be mutually authenticated
- `IDP_URL`: [IDP only] the URL to forward token requests to
- `LOCAL`: [IDP only] if non-empty, uses HTTP instead of HTTPS when forwarding the token request

### TLS

TLS requires 3 files in the root of the project:

- `{MODE}.key`: private key for the server
- `{MODE}.crt`: certificate for the server; should contain any intermediaries / the rest of the chain
- `ca.crt`: root certificate for the CA issuing the mTLS certificates

`MODE` currently takes one of the values of `idp` or `broker` depending on the `MODE` environment variable.
This is configured in [state.js](/logic/state.js).

## Run As A Service

### Prerequisites
* Node

### Starting the app
The Middleware can be started independently by running the `startup-local-initiator.sh` and `startup-local-receiver.sh`. Alternatively they can be started together with the rest of the Trust Framework Prototype applications using the [start-all-services.sh](https://github.com/alphagov/stub-oidc-broker/blob/master/start-all-services.sh) in the Stub OIDC Broker repository.


There is a helper script to automate some of the configuration required to run this server as a systemd service.
Run:

```
./make-service.sh ${MODE}
```

Or input the mode directly.
This generates a service definition with some sensible presets based on the user executing the script.
You may need to edit the file to add any additional environment variables.
(Note that the script internally uses `sudo`, so this process will need root privileges.)

The resulting service, definition file and log file names will depend on the argument passed to the script.
For example, if I ran

```
./make-service gingerbread
```

then I could start the service by running

```
sudo systemctl start stub-gingerbread
```

and I can view the logs by running

```
less /var/log/gingerbread.log
```

The usual systemctl commands all apply:

```
sudo systemctl daemon-reload # reload after making any changes to the configuration file
sudo systemctl start stub-${MODE} # start the service
sudo systemctl status stub-${MODE} # print some basic status information about the service
sudo systemctl stop stub-${MODE} # stop the service
sudo systemctl restart stub-${MODE} # restart the service (equivalent to running stop then start)
```

## Generation of the express app

Express app generated from:

```
npx express-generator -v ejs -c sass -e --git
```

In particular, this uses:

- EJS as a view engine
- SASS for stylesheets

### Middleware runs on AWS Lightsail 
* To deploy the Middleware to Lightsail, log into AWS console and switch to the Dev account. 
* Go to Lightsail and you'll see the idp-middleware and broker-middleware. 
* SSH into which one is required and pull the latest changes from git. Then follow the commands above to restart the service. 

## License

[MIT](https://github.com/alphagov/middleware-in-the-middle/blob/master/LICENCE)