# rucaptcha-node
Simple client for RuCaptcha.com using node.js

[![NPM](https://nodei.co/npm/rucaptcha.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/rucaptcha/)

### API

```js
  var RuCaptcha   = require('rucaptcha');
  var solver      = new RuCaptcha({
        apiKey:     'YOUR_CAPTCHA_API_KEY', //required
        tmpDir:     './tmp',                //optional, default is './tmp'
        checkDelay: 1000                    //optional, default is 1000 - interval between captcha checks
      });

  //You can pass and URL with image
  //for example from https://en.wikipedia.org/wiki/CAPTCHA
  //we take captcha image https://upload.wikimedia.org/wikipedia/commons/6/69/Captcha.jpg
  solver.solve('https://upload.wikimedia.org/wikipedia/commons/6/69/Captcha.jpg', function(err, answer){
    if (err)
      console.log(err);
    else
      console.log(answer); //captcha answer
  });

  //if you have captcha file locally, you can pass path to file
  solver.solve('/Users/captcher/images/1.png', function(err, answer){
    if (err)
      console.log(err);
    else
      console.log(answer); //captcha answer
  });
```

### Todo's

 - Add error handling
 - Add promises
 - Write tests
 - Add more functions

License
----

MIT
