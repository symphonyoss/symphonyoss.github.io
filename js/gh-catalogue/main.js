$.getScript( "/js/gh-catalogue/parser.js", function( data, textStatus, jqxhr ) { });
$.getScript( "/js/gh-catalogue/projects.js", function( data, textStatus, jqxhr ) { });
$.getScript( "/js/gh-catalogue/sort.js", function( data, textStatus, jqxhr ) { });
$.getScript( "/js/gh-catalogue/filters.js", function( data, textStatus, jqxhr ) { });

function fetchAllRepos(page) {
  page = page || 1;

  //Mocked URI
  //var uri = "gh-repos-mock"+page+".json";
  var uri = "https://api.github.com/orgs/symphonyoss/repos?"
          + "per_page=100"
          + "&page="+page;

  $().ready(function () {
    $.get(uri, function (result) {
      //Mocked URI
      if (result && result.length > 0) {
      //To use the mocked URI, uncomment the following 2 lines and comment the 3rd
      // if (result.data && result.data.length > 0) {
        // repos = repos.concat(result.data);
        repos = repos.concat(result);
        // Recoursive call to the same function, to manage GitHub API paging
        fetchAllRepos(page + 1);
      }
      else {
        $(function () {
          // Invoke parser.js
          enrichRepos(repos,true);
        });
      }
    });
  });
}