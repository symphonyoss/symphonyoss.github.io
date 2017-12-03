// var repos = [];

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

function badgeHTML(type,value) {
  var url = "";
  return $("<img>").attr("src",url);
}

function projectHTML(project) {
  var $article = $("<article>").attr("class","white-panel").append(
    $("<img>").attr("src","https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png")).append(
      $("<h4>").append(project['name']));

  badgeHTML("lifecycle",project['projectState']).appendTo($article);
  badgeHTML("forks",project['forks']).appendTo($article);
  badgeHTML("watchers",project['watchers']).appendTo($article);
  badgeHTML("stars",project['stars']).appendTo($article);
  badgeHTML("collaborators",project['collaborators']).appendTo($article);
  $("<p>").text(repoDescription(project['repos'][0])).appendTo($article);
  // TODO - show project languages
  // $link.append($("<h3>").text(project['languages']));

  $.each(project['repos'], function (i, repo) {
    $("<p>").append(
      $("<a>").attr("href", repoUrl(repo)).text(
        repo['repositoryName'])).appendTo($article);
  });
  return $article;
}

// ==================
// Util functions
// ==================

function repoUrl(repo) {
  return repoUrls[repo.repositoryName] || repo.html_url || '#';
}

function repoDescription(repo) {
  return repoDescriptions[repo.name] || repo.description || repo.name;
}
