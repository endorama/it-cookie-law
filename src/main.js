(function (window, document) {
  
  window.currentCookieBanner;

  if (doNotProfileIsNotPresent()) {
    window.currentCookieBanner = new CookieBanner(window.cookieLawOptions);
    window.currentCookieBanner.append();
    // console.log(window.currentCookieBanner);
  }

  /**
   * Act when user scrolls the page
   * @return {[type]} [description]
   */
  var actOnScroll = function () {
    // console.log('scroll!');
    // if banner is defined
    if (window.currentCookieBanner) {
      // remove it
      window.currentCookieBanner.remove(); // banner will trigger removeDoNotProfileBanner event
      // remove every reference to it
      window.currentCookieBanner = null;
    }
    // if banner is not present
    else {
      // remove this event handler
      window.removeEventListener('scroll', actOnScroll);    
    }
  };
  // attach actOnScroll to window scroll
  window.addEventListener('scroll', actOnScroll);

  // listen for removeDoNotProfileBanner and remove cookie
  document.addEventListener('removeDoNotProfileBanner', function (e) {
    // console.log('removeDoNotProfileBanner on', e.target);
    setProfileCookie();
  }, false);

  function doNotProfileIsNotPresent () {
    return !(!!window.docCookies.getItem('doNotProfile'));
  }

  function setProfileCookie () {
    // 1 year is the maximum duration for cookies for EU law
    var expirationDate;
    if (window.cookieLawOptions.cookieDuration) {
      expirationDate = window.cookieLawOptions.cookieDuration;
    }
    else {
      expirationDate = new Date(new Date().setYear(new Date().getFullYear() + 1));
    }
    // save cookie
    window.docCookies.setItem('doNotProfile', 0, new Date(expirationDate));
  }
  
})(window, document); 

