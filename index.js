window.onload=main;

var _snowsystem;
var _rainsystem;

function main()
{
    var iwidth=800;
    var iheight=600;
    var two=new Two({width:iwidth,height:iheight,type:Two.Types.canvas}).appendTo(document.querySelector(".game"));

    var background=two.makeRectangle(iwidth/2,iheight/2,iwidth+50,iheight+50);
    background.fill="#3d3a46";

    var sampleOptions={
        xSpawnRange:[0,iwidth],
        ySpawnRange:[-iheight*2,-10],
        respawnHeight:iheight+10
    }

    _snowsystem=new fallSystem(two,[
        {
            particle:Snow,
            particleOptions:sampleOptions,
            particleAmount:100
        },
        {
            particle:Snow,
            particleOptions:{...sampleOptions,shape:crossSnow},
            particleAmount:50
        }
    ]);

    _rainsystem=new fallSystem(two,[{
        particle:Rain,
        particleOptions:{
            xSpawnRange:[-300,iwidth],
            ySpawnRange:[-iheight*2,-10],
            respawnHeight:iheight+10
        },
        particleAmount:100
    }]);
}

//random, inclusive
function randint(min,max)
{
    return Math.floor(Math.random()*(max-min+1))+min;
}

function randfloat(min,max)
{
    return Math.random()*(max-min)+min;
}