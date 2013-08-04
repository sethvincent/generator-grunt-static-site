# Generator-grunt-static-site
[![Build Status](https://secure.travis-ci.org/sethvincent/generator-grunt-static-site.png?branch=master)](https://travis-ci.org/sethvincent/generator-grunt-static-site)

A generator for Yeoman.

## Getting started
- Make sure you have [yo](https://github.com/yeoman/yo) installed:
    `npm install -g yo`
- Install the generator: `npm install -g generator-grunt-static-site`
- Run: `yo grunt-static-site`

## Usage:

Initialize the git repository for the project:
```
git init
```

Add and commit the files:
```
git add .
git commit -m 'initial commit'
```

[Create a new repository on github](http://github.com/new)

Make sure it has the same name you entered when you generated this project: <%= projectName %>

Edit the project files to add your content.

Deploy to GitHub Pages:
```
grunt deploy
```

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)
