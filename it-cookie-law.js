(function () {
  'use strict';

  var options = {
    cookieDuration: 60*60*365, // one year
    styles: {}
  };

  var banner;

  if (doNotProfileIsNotPresent()) {
    getOptions();
    
    banner = new CookieBanner(options);
    banner.append();

    console.log(banner)
  }

  window.addEventListener('scroll', function () {
    console.log('scroll!');
    setProfileCookie();
    if (banner) {
      banner.remove();
    }
  });


  function getOptions () {
    var script = document.getElementById('cookie-law-script');

    if (script.getAttribute('data-cookie-duration')) {
      options.cookieDuration = script.getAttribute('data-cookie-duration');
    }
  }

  function doNotProfileIsNotPresent () {
    // return docCookies.hasItem('doNotProfile');
    return (docCookies.getItem('doNotProfile') !== 0);
    return true;
  }

  function setProfileCookie () {
    var expirationDate = new Date().setYear(new Date().getFullYear() + 1);
    docCookies.setItem('doNotProfile', 0, new Date(expirationDate));
  }

})(); 