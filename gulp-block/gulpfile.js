const gulp = require('gulp')
const fs = require('fs') // плагин node который работает с файловой системой


const browsersync = require('browser-sync').create()
const rename = require('gulp-rename')
const del = require('del')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const size = require('gulp-size')
const newer = require('gulp-newer')
const fileinclude = require('gulp-file-include')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const replace = require('gulp-replace');

// html
const gulppug = require('gulp-pug')
// css
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const gcmq = require('gulp-group-css-media-queries')
const sassGlob = require('gulp-sass-glob') // для подключения шаблонов из папок pages/**/**

// js
const babel = require('gulp-babel')
// img
const imagemin = require('gulp-imagemin')



// Пути исходных файлов src и пути к результирующим файлам dest
const paths = {
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

// Очистить каталог dist, удалить все кроме изображений
function clean() {
	return del(['dist/*'])
}

// Обработка html и pug
function pug() {
	return gulp.src(paths.html.src)
	.pipe(plumber(
		notify.onError({
			title: "PUG",
			message: "Error: <%= error.message %>"
		}))
	)
	.pipe(sassGlob())
	.pipe(gulppug({pretty: true}))
	.pipe(replace(/&lt;/g, '<'))
	.pipe(replace(/&gt;/g, '>'))
	.pipe(size({
		showFiles:true
	}))
	.pipe(gulp.dest(paths.html.dest))
	.pipe(browsersync.stream())
}


// Обработка html
function html() {
	return gulp.src(paths.html.src)
	.pipe(size({
		showFiles:true
	}))
	.pipe(gulp.dest(paths.html.dest))
	.pipe(browsersync.stream())
}

// Обработка стилей
function styles() {
	// return gulp.src(paths.styles.src)
	return gulp.src(`${paths.styles.src}/style.scss`)

		.pipe(plumber(
		 notify.onError({
			title: "SCSS",
			message: "Error: <%= error.message %>"
		 })))
		.pipe(sassGlob())
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(gcmq())
		.pipe(replace(/\/gulp\/src\/assets\/img\//g, '/img/'))
		.pipe(rename({
			basename: 'main'
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(size({
			showFiles:true
		}))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(browsersync.stream())

}


// Обработка Java Script, Type Script и Coffee Script
function scripts() {
	return gulp.src(`${paths.scripts.src}/main.js`)
	.pipe(plumber(
		notify.onError({
			title: "JS",
			message: "Error: <%= error.message %>"
		}))
	)
	.pipe(sourcemaps.init())
	.pipe(fileinclude())
	.pipe(babel({
		presets: ['@babel/env']
	}))

	.pipe(sourcemaps.write('.'))
	.pipe(size({
		showFiles:true
	}))
	.pipe(gulp.dest(paths.scripts.dest))
	.pipe(browsersync.stream())
}

function fontsStyle() {
	return gulp.src(paths.fonts.src)

	.pipe(gulp.dest(paths.fonts.dest))
}


// Сжатие изображений
function img() {
	return gulp.src(paths.images.src)
	.pipe(newer(paths.images.dest))
	.pipe(imagemin({
		progressive: true
	}))
	.pipe(size({
	  showFiles:false
	}))
	.pipe(gulp.dest(paths.images.dest))
}

// Задача слежки за файломи
function watch() {

	// browsersync
	browsersync.init({
		server: {
			baseDir: "./dist"
		},
		files: [
			paths.html.dest,
			{
				match: `${paths.html.dest}/**/*`,
				fn() {
					this.reload()
				},
			},
		],
	});

	gulp.watch(paths.html.watch, pug)
	gulp.watch(paths.styles.src, styles)
	gulp.watch(paths.scripts.src, scripts)
	gulp.watch(paths.images.src, img)
}

// Таск, который выполняется по команде gulp
const build = gulp.series(clean, pug, gulp.parallel(styles, scripts,fontsStyle,img), watch)


// Таски для ручного запуска с помощью gulp clean, gulp html и т.д.
exports.clean = clean
exports.html = html
exports.pug = pug
exports.styles = styles
exports.scripts = scripts
exports.fontsStyle = fontsStyle
exports.img = img
exports.watch = watch
exports.build = build
exports.default = build
