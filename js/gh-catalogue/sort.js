function sortProjects(projects) {

  // var sort_by = "activity";
  var sort_by = "hotness";
  $(`li#sort > span > div > ul > li.active`).each(function(i) {
    sort_by = decode($(this).text(),'sort');
    console.log(`sort value ${$(this).text()}, label ${sort_by}`);
  });
  console.log(`Sorting by ${sort_by}`);

  if (sort_by == "hotness") {
    projects.sort(function (a, b) {
      if (a.hotness > b.hotness) return -1;
      if (b.hotness > a.hotness) return 1;
      return 0;
    });
  } else if (sort_by == "name") {
    projects.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (b.name.toLowerCase() < a.name.toLowerCase()) return 1;
      return 0;
    });
  // } else {
  //   projects.sort(function (a, b) {
  //     var a_updated = a['repos'].sort(function(a1,b1) {
  //       return new Date(b1.updated_at).getTime() - new Date(a1.updated_at).getTime() 
  //     })[0].updated_at;
  //     var b_updated = b['repos'].sort(function(a1,b1) { 
  //       return new Date(b1.updated_at).getTime() - new Date(a1.updated_at).getTime() 
  //     })[0].updated_at;

  //     if (a_updated < b_updated) return 1;
  //     if (b_updated < a_updated) return -1;
  //     return 0;
  //   });          
  }
}
