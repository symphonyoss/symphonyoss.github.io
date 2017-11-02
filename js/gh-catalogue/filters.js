function renderFilters(projects) {
  $.each(projects, function (i, project) {
    $.each(project['repos'], function (i, repo) {
      // Build the filter mask
      filterFields.forEach (function (filterName) {
        var repoValue = repo[filterName];
        if (repoValue) {
          addRepoFilters(filterName,repoValue);
        }
      });
    });
  });
}

function addRepoFilters(filterName, filterValue) {
  if (jQuery.type( filterValue ) === "string") {
    key = filterName+"-"+filterValue.replace('#','-sharp');
  } else {
    key = filterName+"-"+filterValue;
  }
  filterKey = "filter-"+key;
  containerKey = "filtercontainer-"+filterName;

  if (!$( "#"+containerKey ).length) {
    var $div = $("<div>").attr("id",containerKey).addClass("grid-3 omega header");
    var $h1 = $("<h1>").text(filterNameLabel(filterName));
    $div.append($h1);
    $div.appendTo("#filter-container");
  }

  if (!$("#"+filterKey).length) {
    var $p = $("<p>").attr("id",filterKey).attr("style","display:inline");
    var $name = $("<a>").attr("href", "#").text(filterValueLabel(filterName,filterValue)).addClass("name").click(function(){
      toggleFilter(this);
    });
    $p.append($("<span>").append($name));
    $p.appendTo("#"+containerKey);
  }
}

// Return true if at least one of the repos matches
function filterProject(project) {
  var ret = false;
  $.each(project['repos'], function (i, repo) {
    var repo_ret = true;
    filterFields.forEach(function(filterName){
      var repoValue = repo[filterName];
      $('#filtercontainer-'+filterName+' > p > span > a').each(function(i) {
        var filterValue = resolveValueLabel(filterName,$(this).text());
        var isSelected = isFilterSelected($(this));
        if (isSelected && repoValue != filterValue) {
          repo_ret = false;
        }
      });
    });
    if (repo_ret) ret=true;
  });
  // console.log('showing repo '+repo['name']+'? '+ret);
  return ret;
}

function isFilterSelected(item) {
  return ($(item).attr("class") && $(item).attr("class").split(' ').indexOf('selected') > -1);
}

function toggleFilter(filterLink) {
  // console.log("toggling filter - "+filterName + ":"+filterValue);
  if (isFilterSelected(filterLink)) {
    $(filterLink).removeClass("selected");
  } else {
    $(filterLink).addClass("selected");
  }
  // Invoke parser.js
  enrichRepos(repos,false);
}

function filterNameLabel(filterName) {
  return filterNameLabels[filterName] ? filterNameLabels[filterName] : "Filter by "+filterName;
}

function filterValueLabel(filterName,filterValue) {
  return (filterValueLabels[filterName] && filterValueLabels[filterName][filterValue]) ? filterValueLabels[filterName][filterValue] : filterValue;
}

function resolveValueLabel(filterName,label) {
  var ret = label;
  if (filterValueLabels[filterName]) {
    $.each(filterValueLabels[filterName],function(filterValue,filterLabel) {
      if (filterLabel === label) {
        ret = filterValue;
      }
    });
  }
  return ret;
}
