function renderSorts(projects) {
  if (!$( "#sort").length) {
    var $div = $("<div>").attr("id","sort").addClass("grid-3 omega header");
    var $h1 = $("<h1>").text("Sort By");
    $div.append($h1);
    $div.appendTo("#filter-container");
  }

  if (!$("#sort-by-name").length) {
    var $p = $("<p>").attr("id","sort-by-name").attr("style","display:inline");
    var $name = $("<a>").attr("href", "#").text("Name").addClass("name").click(function(){
      toggleSort(this,$("#sort-by-activity > span > a"));
    });
    $p.append($("<span>").append($name));
    $p.appendTo("#sort");
  }

  if (!$("#sort-by-activity").length) {
    var $p = $("<p>").attr("id","sort-by-activity").attr("style","display:inline");
    var $name = $("<a>").attr("href", "#").text("Last activity").addClass("name").click(function(){
      toggleSort(this,$("#sort-by-name > span > a"));
    });
    $p.append($("<span>").append($name));
    $p.appendTo("#sort");
  }

  if (!isFilterSelected($('#sort-by-name > span > a')) && !isFilterSelected($('#sort-by-activity > span > a'))) {
    $('#sort-by-activity > span > a').addClass("name selected");
  }
}

function toggleSort(toEnable,toDisable) {
  $(toDisable).removeClass("selected");
  $(toEnable).addClass("selected");
  // Invoke main.js
  renderProjectCatalogue(false);
}

function repoCalculations(repo) {
  // Convert pushed_at to Date.
  repo.pushed_at = new Date(repo.pushed_at);

  var weekHalfLife  = 1.146 * Math.pow(10, -9);

  var pushDelta    = (new Date) - Date.parse(repo.pushed_at);
  var createdDelta = (new Date) - Date.parse(repo.created_at);

  var weightForPush = 1;
  var weightForWatchers = 1.314 * Math.pow(10, 7);

  repo.hotness = weightForPush * Math.pow(Math.E, -1 * weekHalfLife * pushDelta);
  repo.hotness += weightForWatchers * repo.watchers / createdDelta;
}
