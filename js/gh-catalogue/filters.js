// var url = $.url(window.location.href);

// $.urlParam = function(name){
//   var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
//   return results[1] || 0;
// }

function filtersHTML(projects) {  
  // TODO - extract ancors from req. url:
  // Split by #, iterate on each entry
  // Split by -, 0 is filtername, 1 is filtervalue
  // Create map: filtername -> [filtervalue1, filtervalue2 ,...]
  filterFields.forEach (function (filterName) {
    $.each(projects, function (i, project) {
      var repoValue = project[filterName];
      if (repoValue) {
        addRepoFilters(filterName,repoValue);
      }
    });
    // TODO - add onload to check input name:
    // Split by -, 0 is filtername, 1 is filtervalue
    // if value in map[filtername], then select it

    $("select#"+filterName).multiselect({
      maxHeight: 200,
      onChange: function(option, checked, select) {
        // renderProjectCatalogue(false);
        $( "#filter-submit" ).trigger( "click" );
        // $("form.filter").submit();
      },
      onInitialized: function(select, container) {
        // TODO - Select option, if req. params are there
        // alert('Initialized.');
      },
      buttonText: function(options, select) {
        if (options.length === 0) {
            return 'Select '+filterName;
        } else {
            return options.length+' '+filterName+' selected';
        }
      }
    });
  });

  $("li").each(function() {
    var idField = this.attributes['id'];
    if (idField) {
      var id = idField.value;
      // console.log("li id: "+id);
      $("li#"+id+" input").each(function() {
        var value = this.attributes['value'].value;
        this.setAttribute('name',id);
        this.setAttribute('id',id);
        // TODO - work here to load req. param. values
        // this.checked = url.param(id) === value;
      });
    }
  });
}

function filterHTML(id) {
  var $li = $("<li>").attr("class","drowdown").attr("id",id);
  var $select = $("<select>")
  .attr("style","visibility:hidden")
  .attr("id",id)
  .attr("multiple","multiple")
  .attr("role","button");
  $select.appendTo($li);
  return $li;
}

function filterItemHTML(id,value) {
  return $("<option>").attr("name",id).attr("id",id).attr("value",value).text(value);
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

  var $select = $("select#"+filterName);
  if (!$select.length) {
    $select = filterHTML(filterName);
    $select.appendTo("ul.navbar-nav");
  }
  
  keys.forEach (function (key) {
    var $option = $("option#"+key);
    if (!$option.length) {
      var label = filterValueLabel(filterName,key);
      filterItemHTML(key,label).appendTo("select#"+filterName);
    }
  });
}

// Return true if at least one of the repos matches
function filterProject(project, showAll) {
    var ret = showAll;
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

// ==================
// Util functions
// ==================

function isFilterSelected(item) {
  return ($(item).attr("class") && $(item).attr("class").split(' ').indexOf('selected') > -1);
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
