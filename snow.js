//Snow(Two two,Shape shape,int[] xSpawn,int[] ySpawn,int respawnY)
class Snow
{
    constructor(two,shape,xSpawn,ySpawn,respawnY)
    {
        this.respawnY=respawnY;
        this.xSpawn=xSpawn;
        this.ySpawn=ySpawn;

        this.theShape=shape;
        two.add(this.theShape);

        this.xAdjust=randint(1,3);
        this.xSpeed=0;

        this.respawn();
    }

    updateSelf()
    {
        this.theShape.translation.y+=this.fallSpeed;
        this.theShape.translation.x+=this.xSpeed;

        this.xAdjust--;
        if (this.xAdjust<=0)
        {
            this.xAdjust=randint(1,3);
            this.xSpeed+=randfloat(-.1,.1);

            if (this.xSpeed>.6)
            {
                this.xSpeed=.3;
            }

            else if (this.xSpeed<-.6)
            {
                this.xSpeed=-.3;
            }
        }

        if (this.theShape.translation.y>=this.respawnY)
        {
            this.respawn();
        }
    }

    respawn()
    {
        this.theShape.translation.set(randint(this.xSpawn[0],this.xSpawn[1]),randint(this.ySpawn[0],this.ySpawn[1]));
        this.fallSpeed=randfloat(.5,1.2);
        this.theShape.scale=randfloat(.5,1);
        this.theShape.opacity=randfloat(.5,1);
    }
}

//returns rectangular snow two shape
function squareSnow()
{
    var r=new Two.Rectangle(-10,-10,5,5);
    r.fill="white";
    r.stroke="transparent";
    return r;
}