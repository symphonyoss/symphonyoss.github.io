function filterProjects(projects) {
  // Filter only if there are some filter values defined
  var filteredProjects = projects;
  if (getParamQuery() != '#') {
    filteredProjects = projects.filter(function(project) {
      // Invoke filters.js - filter projects based on filter values
      return filterProject(project);
    });
  }

  // Reset page
  $("#projects").empty();
  $("#deeplink").attr("href",`/${getParamQuery()}`);
  if (projects.length == filteredProjects.length) {
    $("#project-recap").text(`${projects.length} (all) projects shown`);
  } else {
    $("#project-recap").text(`${filteredProjects.length}/${projects.length} projects shown`);
  }
  return filteredProjects;
}

// Return true if at least one of the repos matches
function filterProject(project) {
  var ret = true;
  for (filterName in config['filters']) {
    var repoValue = project[filterName];
    var itemRet = false;
    var filterRet = $(`li#${filterName} > span > div > ul > li.active`).length == 0;
    $(`li#${filterName} > span > div > ul > li.active`).each(function(i) {
      var filterValue = toValue($(this).text(),filterName);
      if (jQuery.type(repoValue) === "string" && toValue(repoValue,filterName) == filterValue) {
        itemRet = true;
        // console.log(`1. It's a match for ${filterName}=${filterValue}`);
      } else {
          // This is a multi-value filter, like the languages field
          for (key in repoValue) {
            if (key == toValue(filterValue)) {
                itemRet = true;
                // console.log(`2. It's a match for ${filterName}=${filterValue}`);
            }
          }
      }
    });
    if (!itemRet && !filterRet) ret = false;
  }
  // console.log(`3. return ${ret} for ${project['name']}`);
  return ret;
}