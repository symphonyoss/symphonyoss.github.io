var repos = []

// Put custom repo URL's in this object, keyed by repo name.
var repoUrls = {
  "symphony-java-client": "http://symphonyoss.github.io/symphony-java-client/",
  "symphony-java-sample-bots": "http://symphonyoss.github.io/symphony-java-sample-bots/",
  "ssf-parent-pom": "http://symphonyoss.github.io/ssf-parent-pom/",
  "clj-symphony": "https://symphonyoss.github.io/clj-symphony/"
};

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

// Put custom repo descriptions in this object, keyed by repo name.
var repoDescriptions = {
  "naggati2": "A protocol builder for Netty using Scala 2.8"
};

function addRecentlyUpdatedRepo(repo) {
  var $item = $("<li>");

  var $name = $("<a>").attr("href", repo.html_url).text(repo.name);
  $item.append($("<span>").addClass("name").append($name));

  var $time = $("<a>").attr("href", repo.html_url + "/commits").text(strftime("%h %e, %Y", repo.pushed_at));
  $item.append($("<span>").addClass("time").append($time));

  $item.append('<span class="bullet">&sdot;</span>');

  var $watchers = $("<a>").attr("href", repo.html_url + "/stargazers").text(repo.stargazers_count + " stargazers");
  $item.append($("<span>").addClass("watchers").append($watchers));

  $item.append('<span class="bullet">&sdot;</span>');

  var $forks = $("<a>").attr("href", repo.html_url + "/network").text(repo.forks_count + " forks");
  $item.append($("<span>").addClass("forks").append($forks));

  $item.appendTo("#recently-updated-repos");
}

function addRepo(repo) {
  var $item = $("<li>").addClass("repo1 grid-1" + (repo.language || '').toLowerCase());
  var $link = $("<a>").attr("href", repoUrl(repo)).appendTo($item);
  $link.append($("<h2>").text(repo.name));
  $link.append($("<h3>").text(repo.language));
  $link.append($("<p>").text(repoDescription(repo)));
  $item.appendTo("#repos");
}

function addProject(project) {
  var $item = $("<li>").addClass("repo grid-1");
  $("<h2>").text(project['name']).appendTo($item);
  var $ul = $("<ul>");
  $.each(project['repos'], function (i, repo) {
    var $li = $("<li>");
    var $a = $("<a>").attr("href", repoUrl(repo));
    $a.text(repo['repositoryName']);
    $a.appendTo($li);
    $li.appendTo($ul);
  });
  //$("<p>").text(repoDescription(project['repos'][0])).appendTo($item);
  $ul.appendTo($item);
  $item.appendTo("#repos");
}

// Util functions

function repoUrl(repo) {
  return repoUrls[repo.repositoryName] || repo.html_url || '#';
}

function repoDescription(repo) {
  return repoDescriptions[repo.name] || repo.description || repo.name;
}
