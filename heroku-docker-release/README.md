Heroku Docker Release
=======

Build and release docker images to heroku.

## Action Options:

|Parameter|Description|Default Value|Required|
|:---:|---|---|:---:|
|`heroku-app-name`|The name of your heroku app name||:white_check_mark:|
|`heroku-user-email`|Heroku user email||:white_check_mark:|
|`heroku-api-key`|API key for your heroku user||:white_check_mark:|
|`heroku-app-formation`|Formation key, can for example be `web release`|`web`||
|`heroku-release-phase-dockerfile`|Dockerfile with an image that should run as a release phase|||
