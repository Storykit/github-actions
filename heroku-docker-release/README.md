Heroku Docker Release
=======

Build and release docker images to heroku.

Name your docker files according to the formation they are for. For example `Dockerfile.web` formation for `web`.
See more [here](https://devcenter.heroku.com/articles/container-registry-and-runtime#pushing-multiple-images).

The environment variable `NODE_ENV` is passed as a build arg to docker.

## Action Options:

|Parameter|Description|Default Value|Required|
|:---:|---|---|:---:|
|`heroku-app-name`|The name of your heroku app name||:white_check_mark:|
|`heroku-user-email`|Heroku user email||:white_check_mark:|
|`heroku-api-key`|API key for your heroku user||:white_check_mark:|
|`heroku-app-formation`|Formation key, can for example be `web release`|`web`||
