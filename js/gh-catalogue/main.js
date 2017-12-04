$.getScript( url('path') + "js/gh-catalogue/config.js", function( data, textStatus, jqxhr ) { });
$.getScript( url('path') + "js/gh-catalogue/utils.js", function( data, textStatus, jqxhr ) { });
$.getScript( url('path') + "js/gh-catalogue/html-render.js", function( data, textStatus, jqxhr ) { });
$.getScript( url('path') + "js/gh-catalogue/sort.js", function( data, textStatus, jqxhr ) { });
$.getScript( url('path') + "js/gh-catalogue/filters.js", function( data, textStatus, jqxhr ) { });

(function ($, undefined) {
  console.log("Printing urls");
  console.log(url('#'));
  console.log(url('#projectState'));
  console.log(url('#language'));

  renderProjectCatalogue(true);

  $('#projects').pinterest_grid({
    no_columns: 4,
    padding_x: 20,
    padding_y: 20,
    margin_bottom: 50,
    single_column_breakpoint: 700
  });
})(jQuery);

function renderProjectCatalogue(firstRun) {
  var projects = []
  $.get("projects.json", function (projects) {
    if (firstRun) {
      // Invoke filters.js
      filtersHTML(projects);
      // Invoke sort.js
      sortsHTML(projects);
    }

    // Filtering
    projects = filterProjects(projects, firstRun);

    // Sorting
    // TODO - reimplement
    // Invoke sort.js
    // sortProjects(filteredProjects);

    $.each(projects, function (projectIdx, project) {
      // Invoke projects.js - render out projects
      projectHTML(project).appendTo("#projects");
    });
  });
}