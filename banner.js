(function (window) {
  'use strict';

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

  var styles = {
    background: 'black',
    color: 'white',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '50px',
  };

  function CookieBanner (options) {
    this.id = 'cookie-law';
    this.content = options.content ? options.content : "Questo sito utilizza cookie per inviarti pubblicità e servizi in linea con le tue preferenze. Se vuoi saperne di più o negare il consenso a tutti o ad alcuni cookie clicca qui. Chiudendo questo banner, scorrendo questa pagina o cliccando qualunque suo elemento acconsenti all'uso dei cookie.";
    this.styles = merge(styles, options.styles);
  }
  window.CookieBanner = CookieBanner;

  CookieBanner.prototype.append = function append () {
    var div = document.createElement('div');
    div.setAttribute('id', this.id);

    div.style.background = this.styles.background;
    div.style.color      = this.styles.color;
    div.style.position   = this.styles.position;
    div.style.top        = this.styles.top;
    div.style.left       = this.styles.left;
    div.style.width      = this.styles.width;
    // div.style.height     = this.styles.height;

    var p = document.createElement('p');

    p.style.width = '50%';
    p.style.margin = '10px auto';

    p.innerHTML = this.content;
    div.appendChild(p);

    document.body.style['margin-top'] = this.styles.height;

    document.body.appendChild(div);
  };

  CookieBanner.prototype.hide = function hide () {};

  CookieBanner.prototype.remove = function remove () {};

  CookieBanner.prototype.show = function show () {};

})(window); 