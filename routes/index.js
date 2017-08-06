var express = require('express');
var router = express.Router();

var tf = require('../libs/textfill/TextFill');

var links = [];
for (var i = 0; i < 20; i++ )
  links[i] = tf.title(randInt(2, 3));

var headers = [];
for (var j = 0; j < 4; j++)
  headers[j] = tf.title(3);

var content = {};
for (var k = 0; k < 8; k++) {
    var prop = 'p' + k;
    content[prop] = tf.fill(60);
}

var anchorLinks = [];

for (var l = 0; l < headers.length; l++) {
  anchorLinks[l] = headers[l];
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: "Using views with Express and Pug",
      introText: tf.fill(60),
      content: content,
      subtitle: tf.title(5),
      sidebarLinks: links,
      anchorLinks: anchorLinks,
      sectionHeaders: headers
  });
});

router.post('/', function(req, res) {

  const regexes = {
    "keyword": /(function|for|while|if|return|break|continue|var|let|const|;)/g,
    "string": /['"](\w*\d*\s*[;,./|[\]\-+]*)*['"]/g,
    "number": /\d+\.*\d*/g,
    "property": /\.\w+\d*/g,
    "comment": /\/{2,}\s*(\w*\d*\s*)*/g
  };

  var markup = { };    // linenumber: "text with added markup"
  var regexTypes = Object.keys(regexes);

  var lineNumber = req.body.lineNumber;
  var lineText = req.body.lineText;

  if (lineText === undefined)
    lineText = '';

  for (var i in regexTypes) {
    var regex = regexTypes[i];
      if (lineChunks === undefined)
        var lineChunks = lineText.split(' ');      // splitting on spaces doesn't allow for multiword strings

      lineChunks = lineChunks.map(function (chunk) {
        if (!/span/.test(chunk)) {
          var highlighted = chunk.replace(regexes[regex], "<span class=\'" + regex + "\'>$&</span>");
          return highlighted;
        }
        return chunk;
      });

      markup[lineNumber] = lineChunks.join(' ');
  }

  // add placeholder to keep empty line-text divs inline
  markup[lineNumber] = ' ' + markup[lineNumber];
  res.send(markup);
});

function randInt(start, end) {
    return Math.floor(Math.random() * end) + start;
}

module.exports = router;
