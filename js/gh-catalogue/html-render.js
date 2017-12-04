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
  for (filterName in config['filters']) {
    $.each(projects, function (i, project) {
      var repoValue = project[filterName];
      if (repoValue) {
        filterItemsHTML(filterName,repoValue);
      }
    });
    // Using Bootstrap multi-select, see index.html for import
    $(`select#${filterName}`).multiselect({
      maxHeight: 200,
      onChange: function(option, checked, select) {
        var paramHash = getParamHash();
        renderProjectCatalogue(false,paramHash);
      }
      // TODO - not working properly, since filterName is not properly defined
      // buttonText: function(options, select) {
      //   if (options.length === 0) {
      //     return `Select ${filterName}`;
      //   } else {
      //     console.log(options);
      //     console.log(typeof select);
      //     console.log(select.id);
      //     return options.length+' '+filterName+' selected';
      //   }
      // }
    });
    $(`select#${filterName}`).multiselect('select', getParamHash()[filterName]);
  }

  $("li").each(function() {
    var idField = this.attributes['id'];
    if (idField) {
      var id = idField.value;
      // console.log("li id: "+id);
      $("li#"+id+" input").each(function() {
        var value = this.attributes['value'].value;
        this.setAttribute('name',id);
        this.setAttribute('id',id);
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
      keys.push(encode(lang));
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
      var label = encode(key, filterName);
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
  // Using Bootstrap multi-select, see index.html for import
  $("select#sort").multiselect({
    onChange: function(option, checked, select) {
      renderProjectCatalogue(false);
    },
    buttonText: function(options, select) {
      if (options.length === 0) {
        return 'Sort by:';
      } else {
        return `Sorting by ${$(options).val()} `;
      }
    }
  }).appendTo("ul.navbar-nav");
}