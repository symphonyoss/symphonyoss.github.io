
var relPath = window.location.pathname;
if (relPath.endsWith("index.html")) {
    relPath = relPath.substring(0, relPath.length - "index.html".length);
}

$.getScript( relPath + "js/gh-catalogue/projects.js", function( data, textStatus, jqxhr ) { });
$.getScript( relPath + "js/gh-catalogue/sort.js", function( data, textStatus, jqxhr ) { });
$.getScript( relPath + "js/gh-catalogue/filters.js", function( data, textStatus, jqxhr ) { });

// Invoked by index.html
function renderProjectCatalogue(firstRun) {
  var projects = []
  $().ready(function () {
    $.get("projects.json", function (projects) {
      if (firstRun) {
        // Invoke filters.js
        filtersHTML(projects);
        // Invoke sort.js
        sortsHTML(projects);
      }
      // Reset page
      $("#repos").empty();
      $("#recently-updated-repos").empty();
      $("#num-projects").text(projects.length);

      var filteredProjects = projects.filter(function(project) {
        // Invoke filters.js - filter projects based on filter values
        return filterProject(project, firstRun);
      });

      // TODO - reimplement
      // Invoke sort.js
      // sortProjects(filteredProjects);

      $.each(filteredProjects, function (projectIdx, project) {
        // Invoke projects.js - render out projects
        projectHTML(project).appendTo("#projects");
      });
    });
  });
}