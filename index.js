window.onload=main;

function main()
{
    var iwidth=400;
    var iheight=400;
    var two=new Two({width:iwidth,height:iheight,type:Two.Types.canvas}).appendTo(document.querySelector(".game"));

    var background=two.makeRectangle(iwidth/2,iheight/2,iwidth+50,iheight+50);
    background.fill="#3d3a46";

    for (var x=0;x<100;x++)
    {
        fallItems.push(new Snow(two,squareSnow(),[0,iwidth],[-iheight*2,0],iheight+10));
    }

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