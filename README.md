# symphonyoss.github.io

This web page showcases the Symphony Software Foundation project, reporing useful links at the top and a multi-value filter at the top of the page.

## How does it work
The index.html page uses JQuery to:
- Fetch the metadata of all projects hosted on https://github.com/symphonyoss using [Gitbub organisations API](https://developer.github.com/v3/orgs/) (currently loading data from [gh-projects-mock1.json](gh-projects-mock1.json)) local file
- Fetch Foundation-specific project metadata from [projects.json](projects.json) local file; this content will be automatically updated by external bots managed by the Foundation
- Merge Github and Foundation metadata into one single list of projects (stored in a global var called `repos`) that is rendered in the page content
- Provide a list of fields on the top of the page that filters in/out projects rendered in the page

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
npm install http-server -g
git@github.com:symphonyoss/symphonyoss.github.io.git
cd symphonyoss.github.io
git checkout filtering
http-server
```
Now you can open your browser on [http://127.0.0.1:8080](http://127.0.0.1:8080)

## Roadmap
- Complete work on filtering mechanism (work in progress)
- Each filter value should be a visual toggle (enabled/disabled)
- Improve UI of project list
- Add more values to projects.json and more filters to the page

## Credits

This project was copied from http://twitter.github.io and heavily changed to adapt it to the Foundation needs.
