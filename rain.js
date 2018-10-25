class Rain extends Snow
{
    constructor(two,options={})
    {
        super(two,{...rainDefaults,...options});
    }
}

var rainDefaults={
    xSpawnOffset:[-300,0],
    fallSpeedRange:[12,15],
    driftVariation:[4,5],
    maxDrift:5,
    driftPerFrames:[0,0],
    shape:()=>{
        return rainSprite(2,randint(10,15),randint(6,15));
    }
}

/*Shape rainSprite(int swidth,int sheight,int segments)
  generate a pixelated rain sprite. specify:
  swidth: segment width
  sheight: segment height
  segments: number of segments*/
function rainSprite(swidth=2,sheight=15,segments=10)
{
    var g=new Two.Group();
    var segs=[new Two.Rectangle(-10,-10,swidth,sheight)];
    var newRec;
    var opacityAdjust
    for (var x=1;x<=segments;x++)
    {
        newRec=new Two.Rectangle(-10-(swidth*x),-10-(sheight*x),swidth,sheight);

        opacityAdjust=x-0;

        if (opacityAdjust<=0)
        {
            opacityAdjust=1;
        }

        newRec.opacity=1/opacityAdjust;

        segs.push(newRec);
    }

    g.add(...segs);
    g.fill="white";
    g.stroke="transparent";

    return g;
}