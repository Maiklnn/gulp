const gulp = require('gulp')
const browsersync = require('browser-sync').create()

// Пути исходных файлов src и пути к результирующим файлам dest
const paths = {
	root: {
		project: '',
		proxy: 'https://wp-flowers/',
		server: '',
	},
	html: {
		// src: ['src/**/*.html', 'src/**/*.pug'],
		watch: ['src/**/*.pug'],
		src: ['src/pug/*.pug'],
		dest: 'dist/'
	},
	styles: {
		src: 'src/styles',
		dest: 'dist/assets/css'
	},
	scripts: {
		src: 'src/scripts',
		dest: 'dist/assets/js'
	},
	fonts: {
		src: 'src/assets/fonts/*',
		dest: 'dist/assets/fonts/'
	},
	images: {
		src: 'src/assets/img/**/*',
		dest: 'dist/assets/img/'
	}
}


// Задача слежки за файломи
function watch() {
	// browsersync
	browsersync.init({
		// html
		// server: { baseDir: "./dist" },

		// local server
		proxy: paths.root.proxy,

		// файлы за которыми следит
		files: [
			// только перезагружать после изменения
			// `../wp-content/themes/web-nn/**/*`,

			// перезагружать после изменения или добавление новых файлов
			paths.html.dest,
			{
				// match: `../**/*`,
				match: `../wp-content/themes/web-nn/**/*`,
				fn() {
					this.reload()
				},
			},
		],
	});

}

// Таск, который выполняется по команде gulp
const build = gulp.series(watch)


// Таски для ручного запуска с помощью gulp clean, gulp html и т.д.

exports.watch = watch
exports.build = build
exports.default = build
