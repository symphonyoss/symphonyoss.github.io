function enrichRepos(repos, createFilters) {
  var projects = []
  $().ready(function () {
    $.get("projects.json", function (ssfProjects) {
      $.each( ssfProjects, function( projectName, projectInfo ) {
        var project = {}
        project['name'] = projectName;
        project['repos'] = []
        $.each( projectInfo, function( repoIdx, ssfRepo ) {
          var newRepo = repos.filter(function(ghRepo) {
            return ghRepo['name'] == ssfRepo['repositoryName']
          })[0];
          project['repos'].push($.extend(newRepo, ssfRepo));
        });
        projects.push(project);
      });
      if (createFilters) {
        // Invoke filters.js
        renderFilters(projects);
        // Invoke sort.js
        renderSorts(projects);
      }
      // Invoke projects.js
      renderProjects(projects);
    })
  });
}

function renderProjects(projects) {
  // Reset page
  $("#repos").empty();
  $("#recently-updated-repos").empty();
  $("#num-projects").text(projects.length);

  var filteredProjects = projects.filter(function(project) {
    // Invoke filters.js
    return filterProject(project);
  });
  
  //TODO
  //$("#num-repos").text(projects.length);

  // TODO - Sorting, not needed right now
  // $.each(filteredReposToRender, function (i, repo) {
  //   repoCalculations(repo);
  // });

  sortResults(filteredProjects);
}


function sortResults(projects) {
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
    projects.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (b.name.toLowerCase() < a.name.toLowerCase()) return 1;
      return 0;
    });
  } else {
    projects.sort(function (a, b) {
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

  $.each(projects, function (projectIdx, project) {
    // Invoke projects.js
    addProject(project);
  });
}