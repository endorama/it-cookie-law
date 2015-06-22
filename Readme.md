
# IT Cookie Law Banner

Banner for appliance to the European Cookie Law ( in particular for Italy )

Demo: Have a look at `example.html` for a usage example.

## How to use it

Include the main js file in the HTML page:

```html
<script type="text/javascript" src="dist/it-cookies-law.js"></script>
```

The script will automatically add a div with id `cookie-law` to the page if 
the preference cookie is not found.

To link to the extensive information about the cookie policy, you should change
the default `moreLink` options. See next chapter.

## Configuration

To update default configuration define a global object called `cookieLawOptions`:

```html
<script type="text/javascript">
  var cookieLawOptions = {
    cookieDuration: 60*60*24*365, // one year
    banner: {
      content: 'Test',
      moreLink: 'https://en.wikipedia.org/wiki/HTTP_cookie'
    }
  };
</script>
```

These are the default options:

```javascript
defaults = {
  cookieDuration: 31536000, // one year
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
      margin: '1.5em'
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
```