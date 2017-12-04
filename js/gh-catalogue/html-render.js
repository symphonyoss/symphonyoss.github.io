// ==================
// Projects functions
// ==================

function projectHTML(project) {
  var $article = $("<article>").attr("class","white-panel").append(
    $("<img>").attr("src","https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png")).append(
      $("<h4>").append(project['name']));

  badgeHTML("lifecycle",project['projectState']).appendTo($article);
  badgeHTML("forks",project['forks']).appendTo($article);
  badgeHTML("watchers",project['watchers']).appendTo($article);
  badgeHTML("stars",project['stars']).appendTo($article);
  badgeHTML("collaborators",project['collaborators']).appendTo($article);
  $("<p>").text(repoDescription(project['repos'][0])).appendTo($article);
  // TODO - show project languages
  // $link.append($("<h3>").text(project['languages']));

  $.each(project['repos'], function (i, repo) {
    $("<p>").append(
      $("<a>").attr("href", repoUrl(repo)).text(
        repo['repositoryName'])).appendTo($article);
  });
  return $article;
}

function badgeHTML(type,value) {
  var url = "";
  return $("<img>").attr("src",url);
}

// ==================
// Filters functions
// ==================

function filtersHTML(projects) {  
  // TODO - extract ancors from req. url:
  // Split by #, iterate on each entry
  // Split by -, 0 is filtername, 1 is filtervalue
  // Create map: filtername -> [filtervalue1, filtervalue2 ,...]
  filterFields.forEach (function (filterName) {
    $.each(projects, function (i, project) {
      var repoValue = project[filterName];
      if (repoValue) {
        filterItemsHTML(filterName,repoValue);
      }
    });
    // TODO - add onload to check input name:
    // Split by -, 0 is filtername, 1 is filtervalue
    // if value in map[filtername], then select it

    // https://github.com/davidstutz/bootstrap-multiselect
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
        console.log(select);
        console.log(container);
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

function filterItemsHTML(filterName, filterValue) {
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

function filterItemHTML(id,value) {
  return $("<option>").attr("name",id).attr("id",id).attr("value",value).text(value);
}

// ==================
// Sort functions
// ==================

function sortsHTML(projects) {
  if (!$( "#sort").length) {
    var $div = $("<div>").attr("id","sort").addClass("grid-3 omega header");
    var $h4 = $("<h4>").text("Sort By");
    $div.append($h4);
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