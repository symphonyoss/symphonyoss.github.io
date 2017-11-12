# symphonyoss.github.io

This web page showcases the Symphony Software Foundation project, reporing useful links at the top and a multi-value filter at the top of the page.

## How does it work
The index.html page uses JQuery to:
- Fetch Foundation-specific project metadata from [projects.json](projects.json) local file; this content will be automatically updated by external bots managed by the Foundation
- Render controls on the top of the page that filters in/out projects rendered in the page
- Render foundation projects in a table grid

## Filtering criteria

Items can be filtered using the following criteria (work in progress):
- Programming language used in the project
- Project state, see [Foundation project lifecycle](https://symphonyoss.atlassian.net/wiki/display/FM/Project+Lifecycle)
- Projects VS Github repositories
- ...

## Run locally
In order to avoid frequent calls against the Github API, index.html currently loads local JSON files; when the `filtering` branch is completed, the implementation will be rolled back to use Github API.

To run the website locally you need to have [NodeJS installed](https://nodejs.org/en/).

```
npm install yarn -g
git clone git@github.com:symphonyoss/symphonyoss.github.io.git
cd symphonyoss.github.io
yarn webpack
```
... TODO

## Share URL

You can also use http://rawgit.com/symphonyoss/symphonyoss.github.io/filtering/index.html to preview the page and share improvements.

## Roadmap
See https://github.com/symphonyoss/symphonyoss.github.io/issues

## Credits

This project was copied from http://twitter.github.io and heavily changed to adapt it to the Foundation needs.
