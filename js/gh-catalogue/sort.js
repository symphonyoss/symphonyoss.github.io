function sortProjects(projects) {
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
}

// ==================
// Util functions
// ==================

function toggleSort(toEnable,toDisable) {
  $(toDisable).removeClass("selected");
  $(toEnable).addClass("selected");
  // Invoke main.js
  // renderProjectCatalogue(false);
}