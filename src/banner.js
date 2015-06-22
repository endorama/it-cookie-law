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
        color: 'white',
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
    a.style.color    = this.options.button.styles.color;
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

