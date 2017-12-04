function filterProjects(projects) {
  // Filter only if there are some filter values defined
  var filteredProjects = projects;
  if (Object.keys(getParamHash()).length > 0) {
    filteredProjects = projects.filter(function(project) {
      // Invoke filters.js - filter projects based on filter values
      return filterProject(project);
    });
  }

  // console.log("Param Hash:");
  // console.log(paramHash);
  
  // Reset page
  $("#projects").empty();
  $("#deeplink").attr("href",`/${getParamQuery().slice(0, -1)}`);
  if (projects.length == filteredProjects.length) {
    $(".navbar-brand").text(`${projects.length} (all) projects shown`);
  } else {
    $(".navbar-brand").text(`${filteredProjects.length}/${projects.length} projects shown`);
  }
  // $("#recently-updated-repos").empty();
  // $("#num-projects").text(projects.length);

  return filteredProjects;
}

// Return true if at least one of the repos matches
function filterProject(project) {
    var ret = false;
    filterFields.forEach(function(filterName){
      var repoValue = project[filterName];
      $(`li#${filterName} > span > div > ul > li.active`).each(function(i) {
        var filterValue = resolveValueLabel(filterName,$(this).text()).trim();
        if (jQuery.type(repoValue) === "string" && repoValue == filterValue) {
          ret = true;
        } else {
            // This is a multi-value filter, like the languages field
            for (key in repoValue) {
              if (key == filterValue) {
                  ret = true;
              }
            }
        }
      });
    });
    return ret;
}