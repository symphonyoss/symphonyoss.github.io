//List of filter fields
// TODO - implement multi-value filters
var filterFields = ['languages','projectState'];

var relPath = window.location.pathname;
if (relPath.endsWith("index.html") > 0) {
    relPath = relPath.substring(0, str.length - "index.html".length);
}

$.getScript( relPath + "js/gh-catalogue/projects.js", function( data, textStatus, jqxhr ) { });
$.getScript( relPath + "js/gh-catalogue/sort.js", function( data, textStatus, jqxhr ) { });
$.getScript( relPath + "js/gh-catalogue/filters.js", function( data, textStatus, jqxhr ) { });

// Invoked by index.html
function renderProjectCatalogue(createFilters) {
  var projects = []
  $().ready(function () {
    $.get("projects.json", function (ssfProjects) {
      if (createFilters) {
        // Invoke filters.js
        renderFilters(ssfProjects);
        // console.log(`renderFilters(${ssfProjects})`);
        // Invoke sort.js
        renderSorts(ssfProjects);
        // console.log(`renderSorts(${ssfProjects})`);
      }
      // Reset page
      $("#repos").empty();
      $("#recently-updated-repos").empty();
      $("#num-projects").text(ssfProjects.length);

      var filteredProjects = ssfProjects.filter(function(project) {
        // Invoke filters.js
        return filterProject(project, createFilters);
      });
      
      //TODO
      //$("#num-repos").text(projects.length);

      // TODO - Sorting, not needed right now
      // $.each(filteredReposToRender, function (i, repo) {
      //   repoCalculations(repo);
      // });

      // // Sort by highest # of watchers.
      // projects.sort(function (a, b) {
      //   if (a.hotness < b.hotness) return 1;
      //   if (b.hotness < a.hotness) return -1;
      //   return 0;
      // });

      // Sort by most-recently pushed to.
      var sort_by = "activity";
      if (isFilterSelected($('#sort-by-name > span > a'))) {
        sort_by = "name";
      }
      // if (isFilterSelected($('#sort-by-activity > span > a'))) {
      // }

      if (sort_by == "name") {
        filteredProjects.sort(function (a, b) {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          if (b.name.toLowerCase() < a.name.toLowerCase()) return 1;
          return 0;
        });
      } else {
        filteredProjects.sort(function (a, b) {
          var a_updated = a['repos'].sort(function(a1,b1) {
            return new Date(b1.updated_at).getTime() - new Date(a1.updated_at).getTime() 
          })[0].updated_at;
          var b_updated = b['repos'].sort(function(a1,b1) { 
            return new Date(b1.updated_at).getTime() - new Date(a1.updated_at).getTime() 
          })[0].updated_at;

          if (a_updated < b_updated) return 1;
          if (b_updated < a_updated) return -1;
          return 0;
        });          
      }

      $.each(filteredProjects, function (projectIdx, project) {
        // Invoke projects.js
        addProject(project);
      });
    });
  });
}