  // make api request and put returned object into hidden template
  var getListings = function(tags) {  // string containing one or more user submitted tags

    $.ajax({
        url: "https://openapi.etsy.com/v2/listings/active.js?keywords=unusual " + tags + "&limit=10&includes=MainImage&api_key=zzpidsxxocmwbq8elilcx1il",
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

        truncateAll();
    })

    .fail(function(jqXHR, error)  { //if request returns an error, append to DOM element
        var errorElem = showError(error);
        // $('.search-results-qty').append(errorElem);
    });

  }; // end getListings

  // clone result in hidden template and put into DOM element
  var showInfo = function(item) {
    	var result = $('.templates .itemInfo').clone();

      var listingImg = result.find('.listing-img');
      listingImg.html('<img src="' + item.MainImage.url_75x75 + '">');

    	var listingTitle = result.find('.listing-title');
      listingTitle.text(item.title).html('<a target=_"blank" href=' + item.url + '>' + item.title + '</a>');

      var listingDesc = result.find('.listing-desc');
      listingDesc.text(item.description).html(item.description);

    	return result;

  };  // end showInfo

  function truncateAll() {
    // Display max of 300 chars and provide more/less option
    var showChar = 300;
    var ellipsestext = "...";
    var moretext = "More";
    var lesstext = "Less";

     $('.more').each(function() {
         var content = $(this).html();

         if(content.length > showChar) {

             var truncStr = content.substr(0, showChar);
             var remainderStr = content.substr(showChar, content.length - showChar);

             var html = truncStr + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + remainderStr + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

             $(this).html(html);
         }
     });

     $(".morelink").click(function(){
         if($(this).hasClass("less")) {
             $(this).removeClass("less");
             $(this).html(moretext);
         } else {
             $(this).addClass("less");
             $(this).html(lesstext);
         }
         $(this).parent().prev().toggle();
         $(this).prev().toggle();
         return false;
     });
  }


  // determine number of results to be appended to DOM element
  var NumSearchResults = function(query, resultNum) {
      var resultsQty = ('<p>Showing ' + resultNum + ' of ' + resultNum + ' results for \"' + '<span class=\"search-results-query\">' + query + '</span>\"</p>');
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
        //some code
	  });
});
