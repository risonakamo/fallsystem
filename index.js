window.onload=main;

function main()
{
    var iwidth=400;
    var iheight=400;
    var two=new Two({width:iwidth,height:iheight,type:Two.Types.canvas}).appendTo(document.querySelector(".game"));

    var background=two.makeRectangle(iwidth/2,iheight/2,iwidth+50,iheight+50);
    background.fill="#3d3a46";


    two.update();
    // two.play();
}