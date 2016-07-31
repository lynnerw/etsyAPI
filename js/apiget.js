  // APP NAME: Seasoned and Sassy KEYSTRING: zzpidsxxocmwbq8elilcx1il SHARED SECRET: hibvle41o4

  var showInfo = function(item) {
    	// clone our result template code
    	var result = $('.templates .info').clone();
    	// display user's display name with link
    	var fashionFind = result.find('.display-name');

    	return result;
  };  // end showInfo

  // parse the results object returned and determine number of results to be appended to DOM
  var showSearchResults = function(query, resultNum) {
      var results = resultNum + ' results for <strong>' + query ' </strong> :';
      return results;
  };

  // captures error string and turns it into displayable DOM element
  var showError = function(error){
      var errorElem = $('.templates .error-msg').clone();
      var errorText = '<p>' + error + '</p>';
      errorElem.append(errorText);
  };

  // sends a string of tag(s) (semi-colon separated) in "get unanswered questions" call to stackexchange
  var getInfo = function() {  // tags is a string containing one or more user submitted tags

  	// the data: parameters passed in ajax request
  	/*var request = {
  		tag: 'Animals',   //ind questions tagged with a string array of tag(s) submitted by user and passed into this function
    };*/

    // deferred object var created
    $.ajax({
      	url: "https://openapi.etsy.com/v2/users/etsystore?api_key=zzpidsxxocmwbq8elilcx1il", //specifies the domain and end point method
        type: "GET",
    })

	  .done(function(result){  // wait for successful return of objects
        console.log(result);

        var searchResults = showSearchResults(result.count);
        $('.search-results').html(searchResults);

        $.each(result.ct, function(i, item) { //$.each executes the function passed in once for each item in array passed in
      	    var itemInfo = showInfo(item);
      	    $('.results').append(itemInfo);
        });

	  })  // end done

	  .fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
        var errorElem = showError(error);
        $('.search-results').append(errorElem);
	  });  // end fail

}; // end getInfo

$(document).ready( function() {
    $('.topic-finder').submit( function(e){
    		e.preventDefault();
    		// zero out results container, including # of results, if previous search has run
        $('.results').html('');
    		// get the value of the tags the user submitted and pass as parameter in ajax call
    		var tag = $(this).find("input[name='topic']").val();

    		getInfo();
	  });
});
