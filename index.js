window.onload=main;

function main()
{
    var iwidth=800;
    var iheight=600;
    var two=new Two({width:iwidth,height:iheight,type:Two.Types.canvas}).appendTo(document.querySelector(".game"));

    var background=two.makeRectangle(iwidth/2,iheight/2,iwidth+50,iheight+50);
    background.fill="#3d3a46";

    var fallItems=[];

    for (var x=0;x<100;x++)
    {
        fallItems.push(new Snow(two,{
            xSpawnRange:[0,iwidth],
            ySpawnRange:[-iheight*2,-10],
            respawnHeight:iheight+10
        }));
    }

    for (var x=0;x<50;x++)
    {
        fallItems.push(new Snow(two,{
            xSpawnRange:[0,iwidth],
            ySpawnRange:[-iheight*2,-10],
            respawnHeight:iheight+10,
            shape:crossSnow
        }));
    }

    two.bind("update",()=>{
        for (var x=0,l=fallItems.length;x<l;x++)
        {
            fallItems[x].updateSelf();
        }
    });

    two.update();
    two.play();
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