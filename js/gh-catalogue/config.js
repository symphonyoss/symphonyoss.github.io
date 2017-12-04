// TODO - read this data from a config.json

var repoUrls = {
  "symphony-java-client": "http://symphonyoss.github.io/symphony-java-client/",
  "symphony-java-sample-bots": "http://symphonyoss.github.io/symphony-java-sample-bots/",
  "ssf-parent-pom": "http://symphonyoss.github.io/ssf-parent-pom/",
  "clj-symphony": "https://symphonyoss.github.io/clj-symphony/"
};

var filterFields = ['projectState','languages'];

var filterNameLabels = {
  "projectState": "Project State",
  "language": "Language"
};

var filterValueLabels = {
  "projectState" : {
    "INCUBATING": "Incubating",
    "RELEASED": "Released",
    "ARCHIVED": "Archived"
  }
};

var repoDescriptions = {
  "naggati2": "A protocol builder for Netty using Scala 2.8"
};