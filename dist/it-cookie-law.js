/**
 * it-cookie-law
 * 
 * v0.1.3 - 2015-06-22
 * Author : Edoardo Tenani
 * License: MIT
 * 
 * docCookies is released under GPL 3.0
 * https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
 * http://www.gnu.org/licenses/gpl-3.0-standalone.html
 */
(function (window) {
  
  /*\
  |*|
  |*|  :: cookies.js ::
  |*|
  |*|  A complete cookies reader/writer framework with full unicode support.
  |*|
  |*|  Revision #1 - September 4, 2014
  |*|
  |*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
  |*|  https://developer.mozilla.org/User:fusionchess
  |*|
  |*|  This framework is released under the GNU Public License, version 3 or later.
  |*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
  |*|
  |*|  Syntaxes:
  |*|
  |*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
  |*|  * docCookies.getItem(name)
  |*|  * docCookies.removeItem(name[, path[, domain]])
  |*|  * docCookies.hasItem(name)
  |*|  * docCookies.keys()
  |*|
  \*/

  var docCookies = {
    getItem: function (sKey) {
      if (!sKey) { return null; }
      return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
      var sExpires = "";
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number:
            sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
            break;
          case String:
            sExpires = "; expires=" + vEnd;
            break;
          case Date:
            sExpires = "; expires=" + vEnd.toUTCString();
            break;
        }
      }
      document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
      return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
      if (!this.hasItem(sKey)) { return false; }
      document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
      return true;
    },
    hasItem: function (sKey) {
      if (!sKey) { return false; }
      return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: function () {
      var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
      for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
      return aKeys;
    }
  };
  window.docCookies = docCookies;
  
})(window); 


(function (window, document) {
  /* Merges two (or more) objects, giving the last one precedence
   *
   * @param target [Object] target object to populate
   * @param source [Object] property source object
   * @param source... [Object] other property source object
   */
  function merge(target, source) {
    if ( typeof target !== 'object' ) { target = {}; }
    for (var property in source) {
      if (source.hasOwnProperty(property)) {
        var sourceProperty = source[property];
        if (typeof sourceProperty === 'object') {
          target[property] = merge(target[property], sourceProperty );
          continue;
        }
        target[property] = sourceProperty;
      }
    }
    for (var a = 2, l = arguments.length; a < l; a++) { merge(target, arguments[a]); }
    return target;
  }

  ////////////////////////////////////////////////////////////////////////////

  var defaults = {
    banner: {
      content: 'Questo sito utilizza cookie per inviarti pubblicità e servizi in linea con le tue preferenze. Se vuoi saperne di più o negare il consenso a tutti o ad alcuni cookie {{clicca qui}}. Chiudendo questo banner, scorrendo questa pagina o cliccando qualunque suo elemento acconsenti all\'uso dei cookie.',
      moreLink: '',
      styles: {
        background: 'black',
        color: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '50px',
        margin: '1.5em',
        zIndex: 99999
      }
    },
    button: {
      content: 'Chiudi',
      styles: {
        position: 'absolute',
        bottom: '0',
        right: '0',
        margin: '1.5em'
      }
    }
  };

  function CookieBanner (options) {
    options = merge({}, defaults, options);

    this.id = 'cookie-law';
    this.options = options;
    this.element = null;

    this.events = {};
    this.events.removeBanner = document.createEvent('Event');
    this.events.removeBanner.initEvent('removeDoNotProfileBanner', true, true);
  }
  window.CookieBanner = CookieBanner;

  CookieBanner.prototype.append = function append () {
    var self = this;

    var div = document.createElement('div');
    div.setAttribute('id', this.id);
    div.style.background = this.options.banner.styles.background;
    div.style.color      = this.options.banner.styles.color;
    div.style.position   = this.options.banner.styles.position;
    div.style.top        = this.options.banner.styles.top;
    div.style.left       = this.options.banner.styles.left;
    div.style.width      = this.options.banner.styles.width;
    div.style.zIndex     = this.options.banner.styles.zIndex;

    var p = document.createElement('p');
    p.style.width  = '50%';
    p.style.margin = this.options.banner.styles.margin + ' auto';
    p.innerHTML    = generateContent(this.options.banner.content, this.options.banner.moreLink);

    div.appendChild(p);

    var a = document.createElement('a');
    a.setAttribute('id', this.id + '-close');
    a.setAttribute('href', '#');
    a.style.position = this.options.button.styles.position;
    a.style.bottom   = this.options.button.styles.bottom;
    a.style.right    = this.options.button.styles.right;
    a.style.margin   = this.options.button.styles.margin;
    a.innerHTML      = this.options.button.content;
    a.onclick        = function () { self.remove(); };

    div.appendChild(a);

    document.body.style['margin-top'] = this.options.banner.styles.height;

    document.body.appendChild(div);
    this.element = div;
  };

  CookieBanner.prototype.hide = function hide () {};

  CookieBanner.prototype.remove = function remove () {
    if (this.element) {
      document.body.removeChild(this.element);
      document.body.style['margin-top'] = 0;
      document.dispatchEvent(this.events.removeBanner);
    }
  };

  CookieBanner.prototype.show = function show () {};

  ////////////////////////////////////////////////////////////////////////////

  function generateContent(content, moreLink) {
    var c;
    if (content.indexOf('{{') > -1) {
      var bannerContent = content.split(/\{\{.*\}\}/);
      var linkContent = content.match(/\{\{.*\}\}/)[0].replace(/\{/gi, '').replace(/\}/gi, '');    
      c = bannerContent[0];
      c += '<a href="'+moreLink+'" target="_blank">'+linkContent+'</a>';
      c += bannerContent[1];      
    }
    else {
      c = content;
    }
    return c;
  }

})(window, document); 


(function (window, document) {
  
  var banner;

  if (doNotProfileIsNotPresent()) {
    banner = new CookieBanner(window.cookieLawOptions);
    banner.append();
    // console.log(banner);
  }

  /**
   * Act when user scrolls the page
   * @return {[type]} [description]
   */
  var actOnScroll = function () {
    // console.log('scroll!');
    // if banner is defined
    if (banner) {
      // remove it
      banner.remove(); // banner will trigger removeDoNotProfileBanner event
      // remove every reference to it
      banner = null;
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
      expirationDate = new Date().setYear(new Date().getFullYear() + 1);
    }
    // save cookie
    window.docCookies.setItem('doNotProfile', 0, new Date(expirationDate));
  }
  
})(window, document); 


//# sourceMappingURL=it-cookie-law.js.map