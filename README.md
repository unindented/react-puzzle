# React Puzzle [![Version](https://img.shields.io/npm/v/react-puzzle.svg)](https://www.npmjs.com/package/react-puzzle) [![Build Status](https://img.shields.io/travis/unindented/react-puzzle.svg)](http://travis-ci.org/unindented/react-puzzle) [![Dependency Status](https://img.shields.io/gemnasium/unindented/react-puzzle.svg)](https://gemnasium.com/unindented/react-puzzle) [![Coverage Status](https://img.shields.io/coveralls/unindented/react-puzzle.svg)](https://coveralls.io/r/unindented/react-puzzle)

Sliding puzzle component for React.


## Installation

To install the stable version along with React, run the following:

```
$ npm install --save react-puzzle react
```

This assumes that you're using the [npm](http://npmjs.com/) package manager with a module bundler like [Webpack](http://webpack.github.io/) or [Browserify](http://browserify.org/).

If you don't yet use [npm](http://npmjs.com/) or a modern module bundler, and would rather prefer a single-file [UMD](https://github.com/umdjs/umd) build that makes `ReactPuzzle` available as a global object, you can build it yourself by running the following:

```
$ npm run build
```

You'll find the development (`react-puzzle.js`) and production (`react-puzzle.min.js`) versions of the library in the `dist` folder. I *don't* recommend this approach for any serious application.


## Usage

```js
import {SlidingPuzzle} from 'react-puzzle'
import {render} from 'react-dom'

render(
  <Puzzle src='http://localhost/image.png' rows={3} cols={3} />,
  document.getElementById('container')
)
```


## Meta

* Code: `git clone git://github.com/unindented/react-puzzle.git`
* Home: <https://github.com/unindented/react-puzzle/>


## Contributors

* Daniel Perez Alvarez ([unindented@gmail.com](mailto:unindented@gmail.com))


## License

Copyright (c) 2016 Daniel Perez Alvarez ([unindented.org](https://unindented.org/)). This is free software, and may be redistributed under the terms specified in the LICENSE file.
