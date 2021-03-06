grunt = require('grunt');

grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	uglify:{
		build:{
			src:'dist/app.js',
			dest: 'dist/app.js'
		}
	},
	ngAnnotate: {
		options: {

		},
		app:{
			files:{
				'dist/app.js':['js/app.js', 'js/filters.js', 'js/controllers.js', 'js/directives.js', 'js/services.js']
			}
		}
	}
});

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-ng-annotate');

grunt.registerTask('default', ['ngAnnotate', 'uglify']);