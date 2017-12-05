// ==================
// Projects functions
// ==================

function projectHTML(project) {
  // Render lifecycle badge
  // console.log(`Rendering ${project['name']}`);
  var $article = $("<article>").attr("class","white-panel").append($("<center>").append(
    $("<img style='width:100px'>").attr("src",`https://cdn.rawgit.com/symphonyoss/contrib-toolbox/master/images/ssf-badge-${project['projectState'].toLowerCase()}.svg`)).append(
    $("<h4>").append(project['name'])));

  var $row = $("<div class='row badges-row'>");
  badgeHTML("forks",project['forks']).appendTo($row);
  badgeHTML("watchers",project['watchers']).appendTo($row);
  $row.appendTo($article);
  $row = $("<div class='row badges-row'>");
  badgeHTML("stars",project['stars']).appendTo($row);
  badgeHTML("collaborators",project['collaborators']).appendTo($row);
  $row.appendTo($article);

  // Render languages
  var $langs = $("<center>");
  var count = 1;
  for (lang in project['languages']) {
    count++;
    langHTML(toLabel(lang,'languages')).appendTo($langs);
    if (count == 6) break;
  };
  $langs.appendTo($article);

  // TODO - show a project description, when available in projects.json
  // $("<p>").text(repoDescription(project['description'])).appendTo($article);
  $.each(project['repos'], function (i, repo) {
    $("<p>").append(
      $("<a>").attr("href", repoUrl(repo)).text(
        repo['repositoryName']).attr("class","reponame-position")).appendTo($article).attr("class","line-separation");
  });
  return $article;
}

function badgeHTML(type,value) {
  var url = `assets/gh-icons/${type.toLowerCase()}.png`;
  var $span = $("<span>").text(value).attr("style","text-align: center");
  $span.append($("<img id='badges'>").attr("title",type).attr("src",url));
  return $span;
}

function langHTML(value) {
  var url = `assets/langs/${value.toLowerCase()}.png`;
  return $("<img id='badges' class='lang-position'>").attr("src",url).attr("title", value);
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
    });
    $(`select#${filterName}`).multiselect('select', getParamHash()[filterName]);
  }

  $("li").each(function() {
    var idField = this.attributes['id'];
    if (idField) {
      var id = idField.value;
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
      keys.push(toLabel(lang));
    }
  } else {
    keys.push(filterValue);
  }

  var $select = $("select#"+filterName);
  if (!$select.length) {
    $select = filterHTML(filterName);
    $select.appendTo("ul.navbar-nav").after('<br />');
  }
  
  keys.forEach (function (key) {
    var $option = $("option#"+key);
    if (!$option.length) {
      var label = toLabel(key, filterName);
      filterItemHTML(key,label).appendTo("select#"+filterName);
    }
  });
}

function filterItemHTML(id,value) {
  // console.log(`adding filter ${id} with value ${value}`)
  return $("<option>").attr("name",id).attr("id",id).attr("value",id).text(value);
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
        return `Sorting by ${toLabel($(options).val(),'sort')} `;
      }
    }
  }).appendTo("ul.navbar-nav");
  $(`select#sort`).multiselect('deselect','hotness-up');
  $(`select#sort`).multiselect('select', getParamHash()['sort']);
}