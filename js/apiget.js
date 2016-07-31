  // api request
  var getListings = function(tags) {  // string containing one or more user submitted tags

    $.ajax({
        url: "https://openapi.etsy.com/v2/listings/active.js?keywords=" + tags + "&limit=10&api_key=zzpidsxxocmwbq8elilcx1il", //specifies the domain and end point method
        dataType: "jsonp",
        data: "GET",
    })
    .done(function(results){  // wait for successful return of objects
        console.log(results.results);
        var searchResultsQty = NumSearchResults(tags, results.count);
        $('.search-results-qty').html(searchResultsQty);

        $.each(results.results, function(i, listing) {
            var itemInfo = showInfo(listing);
            $('.results').append(itemInfo);
        });

    })  // end done

    .fail(function(jqXHR, error)  { //this waits for the ajax to return with an error promise object
        var errorElem = showError(error);
        $('.search-results-qty').append(errorElem);
    });  // end fail

  }; // end getListings

  var showInfo = function(item) {
    	// clone result in hidden template and put into DOM
    	var result = $('.templates .itemInfo').clone();

    	var listingTitle = result.find('.listing-title');
      listingTitle.text(item.title);
      listingTitle.html('<p>Listing title is ' + item.title + '</p>');

    	return result;
  };  // end showInfo

  // determine number of results to be appended to DOM element
  var NumSearchResults = function(query, resultNum) {
      var resultsQty = ('<p>' + resultNum + ' results for <strong>' + query + ' </strong></p>');
      return resultsQty;
  };

  // captures error string and put it into DOM element
  var showError = function(error){
      var errorElem = $('.templates .error-msg').clone();
      var errorText = '<p>' + error + '</p>';
      errorElem.append(errorText);
  };

$(document).ready( function() {
    $('.etsy-search').submit( function(e){
    		e.preventDefault();
    		// clear results container, including # of results, if previous search has run
        $('.results').html('');
    		// get user search terms for ajax call
    		var searchTerms = $(this).find("input[name='terms']").val();

    		getListings(searchTerms);
	  });
});
