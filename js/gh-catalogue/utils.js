// ==================
// Filtering functions
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

// ==================
// Projects functions
// ==================

function repoUrl(repo) {
  return repoUrls[repo.repositoryName] || repo.html_url || '#';
}

function repoDescription(repo) {
  return repoDescriptions[repo.name] || repo.description || repo.name;
}
