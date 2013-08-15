'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var GitHubApi = require('github');
var github = new GitHubApi({
  version: '3.0.0'
});

var githubUserInfo = function (name, cb) {
  github.user.getFrom({
    user: name
  }, function (err, res) {
    if (err) {
      throw err;
    }
    cb(JSON.parse(JSON.stringify(res)));
  });
};

var GruntStaticSiteGenerator = module.exports = function GruntStaticSiteGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(GruntStaticSiteGenerator, yeoman.generators.Base);

GruntStaticSiteGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'projectName',
    message: 'What is the name of your project?'
  },

  {
    name: 'projectDescription',
    message: 'Describe your project:',
    default: 'My awesome site.'
  },

  {
    name: 'githubUser',
    message: 'Would you mind telling me your username on Github?',
    default: 'someuser'
  },

  {
    type: 'confirm',
    name: 'ghpages',
    message: 'Use grunt-gh-pages to automate pushing your site to GitHub Pages?'
  }
  ];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.projectDescription = props.projectDescription;
    this.githubUser = props.githubUser;
    this.ghpages = props.ghpages;

    cb();
  }.bind(this));
};

GruntStaticSiteGenerator.prototype.userInfo = function userInfo() {
  var done = this.async();

  githubUserInfo(this.githubUser, function (res) {
    /*jshint camelcase:false */
    this.realname = res.name;
    this.email = res.email;
    this.githubUrl = res.html_url;
    done();
  }.bind(this));
};

GruntStaticSiteGenerator.prototype.app = function app() {
  this.mkdir('templates');

  this.copy('_bower.json', 'bower.json');
  
  this.copy('_app.js', 'app.js');
  this.copy('_style.css', 'style.css');
  this.copy('_index.ejs', 'index.ejs');
  this.copy('_readme.md', 'readme.md');

  if (this.ghpages === true){
    this.copy('_packageGH.json', 'package.json');
    this.copy('_GruntfileGH.js', 'Gruntfile.js');
  } else {
    this.copy('_package.json', 'package.json');
    this.copy('_Gruntfile.js', 'Gruntfile.js');
  }
};

GruntStaticSiteGenerator.prototype.projectfiles = function projectfiles() {
  //this.copy('jshintrc', '.jshintrc');
};
