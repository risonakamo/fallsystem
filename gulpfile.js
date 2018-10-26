const gulp=require("gulp");

//delete below lines if not being used
const plumber=require("gulp-plumber");

const less=require("gulp-less");

const babel=require("gulp-babel");

console.log("gulp is watching");

//remove any configs not being used
var defaultPlumber=(err)=>{
    console.log(err);
};

var lessConfig={
    targets:["**/*.less","*.less"],
    base:"."
};

var reactConfig={
    targets:["**/*.jsx","*.jsx"],
    base:"."
};

//remove any watchers not being used:

//for less
gulp.watch(lessConfig.targets,()=>{
    gulp.src(lessConfig.targets,{base:lessConfig.base}).pipe(less()).pipe(gulp.dest(lessConfig.base));
});

// for react
gulp.watch(reactConfig.targets,()=>{
    gulp.src(reactConfig.targets,{base:reactConfig.base})
        .pipe(plumber(defaultPlumber))
        .pipe(babel({presets:["@babel/preset-react"]}))
        .pipe(gulp.dest(reactConfig.base));
});