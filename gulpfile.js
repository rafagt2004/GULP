const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');

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


exports.default = gulp.series(funcaoPadrao, dizOi); //As tarefas executadas de forma serial fazem com que o Gulp aguarde uma tarefa terminar para executar a próxima, o que é útil quando temos um processo que depende de outro.  Por exemplo, depois de comprimir imagens, se precisarmos redimensioná-las, seria necessário aguardar a compressão dos arquivos, afinal não teríamos muito ganho em redimensionar as imagens antes de comprimi-las.
exports.parallel = gulp.parallel(funcaoPadrao, dizOi); //As tarefas executadas de forma paralela serão iniciadas no mesmo instante, porém todo o fluxo de execução irá aguardar o término de todas as tarefas para concluir. Esse tipo de execução é interessante quando temos tarefas pesadas e independentes, por exemplo, a compressão de imagens e compilação do SASS. Comprimir imagens é mais demorada que compilar o SASS, logo essas duas tarefas que não estão relacionadas podem ser executadas de forma paralela.

exports.sass = compilaSass;
exports.dizOi = dizOi;

exports.watch = function(){
    gulp.watch('./source/styles/*.scss', {ignoreInitial: false}, gulp.series(compilaSass));
}