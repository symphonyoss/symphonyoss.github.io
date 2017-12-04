function filterProjects(projects, showAll) {
  // TODO - Reset page
  $("#repos").empty();
  $("#recently-updated-repos").empty();
  $("#num-projects").text(projects.length);

  if (!showAll) {
    return projects.filter(function(project) {
      // Invoke filters.js - filter projects based on filter values
      return filterProject(project);
    });
  } else return projects;
}

// Return true if at least one of the repos matches
function filterProject(project) {
    var ret = false;
    filterFields.forEach(function(filterName){
        var repoValue = project[filterName];
        $('#filtercontainer-'+filterName+' > p > span > a').each(function(i) {
            var filterValue = resolveValueLabel(filterName,$(this).text());
            var isSelected = isFilterSelected($(this));

            if (jQuery.type(repoValue) === "string" && isSelected && repoValue == filterValue) {
                ret = true;
            } else {
                // This is a multi-value filter, like the languages field
                for (key in repoValue) {
                    if (isSelected && key == filterValue) {
                        ret = true;
                    }
                }
            }
        });
    });
    return ret;
}