// ==================
// Projects functions
// ==================

function projectHTML(project) {
  // Render lifecycle badge
  // console.log(`rendering ${project['name']}`);
  var $article = $("<article>").attr("class","white-panel").append($("<center>").append(
    $("<img style='width:100px'>").attr("src",`https://cdn.rawgit.com/symphonyoss/contrib-toolbox/master/images/ssf-badge-${project['projectState'].toLowerCase()}.svg`)).append(
    $("<h4>").append(project['name'])));

  var $row = $("<div class='row'>");
  badgeHTML("forks",project['forks']).appendTo($row);
  badgeHTML("watchers",project['watchers']).appendTo($row);
  $row.appendTo($article);
  $row = $("<div class='row'>");
  badgeHTML("stars",project['stars']).appendTo($row);
  badgeHTML("collaborators",project['collaborators']).appendTo($row);
  $row.appendTo($article);

  // Render languages
  var $langs = $("<center>");
  var count = 1;
  for (lang in project['languages']) {
    count++;
    langHTML(encode(lang,'languages')).appendTo($langs);
    if (count == 5) break;
  };
  $langs.appendTo($article);

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
  var url = `assets/gh-icons/${type}.png`;
  var $span = $("<span>").text(value);
  $span.append($("<img id='badges'>").attr("src",url));
  return $span;
}

function langHTML(value) {
  var url = `assets/langs/${value}.png`;
  return $("<img id='badges'>").attr("src",url);
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