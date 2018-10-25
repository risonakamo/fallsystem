class Rain extends Snow
{

}

function rainSprite(swidth=2,sheight=15,segments=10)
{
    var g=new Two.Group();
    var segs=[new Two.Rectangle(-10,-10,swidth,sheight)];
    var newRec;
    for (var x=1;x<=segments;x++)
    {
        newRec=new Two.Rectangle(-10-(swidth*x),-10-(sheight*x),swidth,sheight);
        newRec.opacity=1/x;
        segs.push(newRec);
    }

    g.add(...segs);
    g.fill="white";
    g.stroke="transparent";

    return g;
}