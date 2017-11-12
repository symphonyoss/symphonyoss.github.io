function renderFilters(projects) {
  $.each(projects, function (i, project) {
    // Build the filter mask
    filterFields.forEach (function (filterName) {
      var repoValue = project[filterName];
      if (repoValue) {
        addRepoFilters(filterName,repoValue);
      }
    });
  });
}

function addRepoFilters(filterName, filterValue) {
  var keys = [];
  if (filterName === "languages") {
    for (var lang in filterValue) {
      keys.push(lang.replace('#','-sharp').replace('+','-plus').replace('+','-plus'));
    }
  } else {
    keys.push(filterValue);
  }

  containerKey = "filtercontainer-"+filterName;
  if (!$( "#"+containerKey ).length) {
    var $div = $("<div>").attr("id",containerKey).addClass("grid-3 omega header");
    var $h1 = $("<h1>").text(filterNameLabel(filterName));
    $div.append($h1);
    $div.appendTo("#filter-container");
  }

  // console.log(`append-way-before(${keys})`);
  keys.forEach (function (key) {
    filterKey = "filter-"+key;
    if (!$("#"+filterKey).length) {
      var $p = $("<p>").attr("id",filterKey).attr("style","display:inline");
      var $name = $("<a>").attr("href", "#").text(filterValueLabel(filterName,key)).addClass("name").click(function(){
        toggleFilter(this);
      });
      $p.append($("<span>").append($name));
      $p.appendTo("#"+containerKey);
    }
  });
}

// Return true if at least one of the repos matches
function filterProject(project, firstStart) {
    var ret = firstStart;
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

function isFilterSelected(item) {
  return ($(item).attr("class") && $(item).attr("class").split(' ').indexOf('selected') > -1);
}

function toggleFilter(filterLink) {
  console.log("toggling filter "+filterLink + " - "+isFilterSelected(filterLink));
  if (isFilterSelected(filterLink)) {
    $(filterLink).removeClass("selected");
  } else {
    $(filterLink).addClass("selected");
  }
  // Invoke main.js
  renderProjectCatalogue(false);
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
