Made using React, Reflux and SASS.

1. Install devependencies: `npm install`
2. Start local web server and webpack: `npm run serve`
3. Navigate to `http://localhost:8080/`

## Grunt Tasks

**grunt webpack:build-dev** 

Builds the project once on dev mode. Source is not optimized and `news_mock.json` file is used as data source.

**grunt webpack:build**

Builds the project once on production mode. Source is optimized, minified and an API is used as data source.

**grunt dev**

Starts a local http server at port `8080` and starts webpack in watcher mode using dev mode.