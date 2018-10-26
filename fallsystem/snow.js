/*Snow fall particle for use with mainFall.
  Snow(Two two,fallSystem fsystem,Object options)
  two: the two canvas
  fsystem: the parent fall system
  options: view docs or the snowDefaults for possible options*/
class Snow
{
    constructor(two,fsystem,options={})
    {
        this.options={...snowDefaults,...options};
        this.two=two;
        this.fsystem=fsystem;
        this.snow=1; //enable special snow only functionality

        //create the Two shape and add it to the context
        this.theShape=this.options.shape();
        two.add(this.theShape);

        //the interval of frames at which X is adjusted. randomly reset each adjustment, but
        //is initialised here
        this.xAdjust=randint(this.options.driftPerFrames[0],this.options.driftPerFrames[1]);
        this.xSpeed=0;

        this.halfDrift=this.options.maxDrift/2;

        this.respawn();
    }

    //required update function
    updateSelf()
    {
        //if out of sight and not supposed to respawn
        if (this.dontRespawn && this.theShape.translation.y<0)
        {
            this.dead=1;
            return;
        }

        this.dead=0;
        this.theShape.translation.y+=this.fallSpeed;
        this.theShape.translation.x+=this.xSpeed;

        //if a snow and blow is active
        if (this.fsystem.blow && this.theShape.translation.y>0 && this.snow)
        {
            this.fallSpeed+=.03;
            this.xSpeed+=(this.theShape.translation.x-(this.two.width/2))*(this.theShape.translation.y/this.two.height)*.05;
        }

        //every so frames, adjust the X speed slightly
        this.xAdjust--;
        if (this.xAdjust<=0)
        {
            this.xAdjust=randint(this.options.driftPerFrames[0],this.options.driftPerFrames[1]);
            this.xSpeed+=randfloat(this.options.driftVariation[0],this.options.driftVariation[1]);

            //halve the X speed if it exceeds a certain number
            if (this.xSpeed>this.options.maxDrift)
            {
                this.xSpeed=this.halfDrift;
            }

            else if (this.xSpeed<-this.options.maxDrift)
            {
                this.xSpeed=-this.halfDrift;
            }
        }

        //respawn when below certain y point. snow is optimised to despawn when out of X range as well
        if (this.theShape.translation.y>=this.two.height+this.options.respawnOffset ||
            (this.snow && (this.theShape.translation.x>this.two.width+this.options.respawnOffset ||
            this.theShape.translation.x<-this.two.width-this.options.respawnOffset)))
        {
            this.respawn();
        }
    }

    //spawn with randomised properties
    respawn()
    {
        this.theShape.translation.set(
            randint(this.options.xSpawnOffset[0],this.two.width+this.options.xSpawnOffset[1]),
            randint(-this.two.height*1.5,-1)
        );
        this.fallSpeed=randfloat(this.options.fallSpeedRange[0],this.options.fallSpeedRange[1]);
        this.theShape.scale=randfloat(this.options.scaleRange[0],this.options.scaleRange[1]);
        this.theShape.opacity=randfloat(this.options.opacityRange[0],this.options.opacityRange[0]);
    }
}

var snowDefaults={
    shape:squareSnow, //function that produces a shape to use
    xSpawnOffset:[0,0], //offsets to X spawn
    fallSpeedRange:[.5,1.2], //range of fall speeds
    scaleRange:[.5,1], //range item will be scaled to
    opacityRange:[.5,1], //range item might be opacity-fied
    respawnOffset:10, //height beyond the bottom of the canvas where particle should despawn
    maxDrift:.6, //maximum X drift speed before getting cut
    driftVariation:[-.1,.1], //possible acceleration range of drift
    driftPerFrames:[1,3] //perform drift every this range of frames, randomised
};

//returns rectangular snow two shape
function squareSnow(size=5)
{
    var r=new Two.Rectangle(-10,-10,size,size);
    r.fill="#ebebeb";
    r.stroke="transparent";
    return r;
}

//returns cross shaped snow two shape
function crossSnow(width=4,height=8)
{
    var g=new Two.Group();
    g.add(new Two.Rectangle(-10,-10,height,width),new Two.Rectangle(-10,-10,width,height));
    g.fill="#ebebeb";
    g.stroke="transparent";
    return g;
}