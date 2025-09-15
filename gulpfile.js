const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function comprimeIMG(){
    return gulp.src('./source/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'));
}

function comprimeJS(){
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'));
}

function compilaSass(){
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed' //nested, expanded, compact, compressed
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
        
}

// Tarefas públicas
function funcaoPadrao(callback){
    setTimeout(function(){
        console.log('Executando arquivo gulp');
        callback();
    }, 2000);

}

function dizOi(callback){
    console.log('Oi, Gulp!');
    dizTchau();
    callback();
}

// Tarefa privada
function dizTchau(){
    console.log('Tchau, Gulp!');
}

// 1) Pública: que pode ser acessada através do comando: npm run gulp NOME_DA_TAREFA 
// 2) Privada: que só é acessível apenas por outra tarefa no Gulp file. 
// Ao executar o comando npm run gulp iremos receber uma mensagem de erro, 
// informando que a tarefa padrão (default) não foi encontrada, isso ocorre 
// pois no arquivo gulpfile.js não existe uma função para o exports.default.


exports.default = function(){
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', {ignoreInitial: false}, gulp.series(comprimeJS));
    gulp.watch('./source/images/*', {ignoreInitial: false}, gulp.series(comprimeIMG));
}