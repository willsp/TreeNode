/*global module*/

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    'build/<%= pkg.name %>.min.js': ['src/TreeNode.js'],
                    'build/<%= pkg.name %>.ImportTool.min.js': [
                        'src/ImportTool/TreeNode.ImportFromSelfRef.js',
                        'src/ImportTool/TreeNode.ExportInserts.js'
                    ],
                    'build/<%= pkg.name %>.Decorator.min.js': [
                        'src/Decorator/TreeNode.Decorate.js',
                        'src/Decorator/TreeNode.LftRgt.js'
                    ]
                }
            }
        },
        jshint: {
            options: {
                smarttabs: true
            },
            files: ['script.js', 'Gruntfile.js', 'src/**/*.js']
        },
        jasmine: {
            src: [ // Load order is important...
                'src/TreeNode.js',
                'src/Decorator/TreeNode.Decorate.js',
                'src/Decorator/TreeNode.LftRgt.js',
                'src/ImportTool/TreeNode.ImportFromSelfRef.js',
                'src/ImportTool/TreeNode.ExportInserts.js'
            ],
            options: {
                specs: 'src/**/tests/*.spec.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['jshint', 'jasmine', 'uglify']);

};
