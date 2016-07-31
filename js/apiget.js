  // APP NAME: Seasoned and Sassy KEYSTRING: zzpidsxxocmwbq8elilcx1il SHARED SECRET: hibvle41o4

  var showInfo = function(item) {
    	// clone our result template code
    	var listingResult = $('.templates .itemInfo').clone();

    	// display user's display name with link
    	var fashionFind = listingResult.find('.display-info');
      fashionFind.text(item.title);
      fashionFind.html('<p>Listing description is ' + item.title + '</p>');

    	return listingResult;
  };  // end showInfo

  // parse the results object returned and determine number of results to be appended to DOM
  var showSearchResults = function(query, resultNum) {
      var results = ('<p>' + resultNum + ' results for <strong>' + query + ' </strong></p>');
      return results;
  };

  // captures error string and turns it into displayable DOM element
  var showError = function(error){
      var errorElem = $('.templates .error-msg').clone();
      var errorText = '<p>' + error + '</p>';
      errorElem.append(errorText);
  };

  var getListings = function(tags) {  // string containing one or more user submitted tags

    // deferred object var created
    $.ajax({
      	url: "https://openapi.etsy.com/v2/listings/active.js?keywords=" + tags + "&limit=10&api_key=zzpidsxxocmwbq8elilcx1il", //specifies the domain and end point method
        dataType: "jsonp",
        data: "GET",
    })

	  .done(function(results){  // wait for successful return of objects
        console.log(results.results);

        var searchResults = showSearchResults(tags, results.count);
        $('.search-results').html(searchResults);

        $.each(results.results, function(i, listing) { //$.each executes the function passed in once for each item in array passed in
      	  //  console.log(results.results.description);
            var itemInfo = showInfo(listing);
      	    $('.results').append(itemInfo);
        });

	  })  // end done

	  .fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
        var errorElem = showError(error);
        $('.search-results').append(errorElem);
	  });  // end fail

}; // end getInfo

$(document).ready( function() {
    $('.etsy-search').submit( function(e){
    		e.preventDefault();
    		// zero out results container, including # of results, if previous search has run
        $('.results').html('');
    		// get the value of the tags the user submitted and pass as parameter in ajax call
    		var searchTerms = $(this).find("input[name='terms']").val();

    		getListings(searchTerms);
	  });
});
