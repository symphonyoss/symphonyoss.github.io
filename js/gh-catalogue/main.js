var relPath = url('path').replace('index.html','');

// Loads initial URL state from lib, then returns the saved state
function getParamHash() {
  var paramHash = {}
  for (var key in url("#")) {
    var keySplit = key.split('|');
    var key = keySplit[0];
    var val = keySplit[1];

    var values = paramHash[key];
    if (!values) {
      values = [val];
    } else if (!values.includes(val)) {
      values.push(val);
    }
    paramHash[key] = values;
  }
  return paramHash;
}

function renderProjectCatalogue(firstRun) {
  $.get("projects.json", function (projects) {
    if (firstRun) {
      // Invoke html-render.js
      filtersHTML(projects);
      sortsHTML(projects);
    }

    // Invoke filters.js
    var filteredProjects = filterProjects(projects);

    // Invoke sort.js
    sortProjects(filteredProjects);

    // Invoke html-render.js - render out projects
    $.each(filteredProjects, function (projectIdx, project) {
      projectHTML(project).appendTo("#projects");
    });
  });
}