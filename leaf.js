class Leaf extends Snow
{
    constructor(two,options)
    {
        super(two,options);

        this.yForces=[-.005,.01];
        this.yAccels=[-.02,.09]; //negative acceleration, positive acceleration
        this.speedCutoff=[-1,1.9]; //[negative speed before flipping, positive speed before flipping]

        this.fallSpeed=0;
        this.yAccel=0;
        this.yForce=this.yForces[1];

        this.multiplier=2;
    }

    updateSelf()
    {
        this.theShape.translation.y+=this.fallSpeed;
        this.fallSpeed+=this.yAccel;
        this.yAccel+=this.yForce;

        if (this.yAccel>this.yAccels[1])
        {
            this.yAccel=this.yAccel[1];
        }

        else if (this.yAccel<this.yAccels[0])
        {
            this.yAccel=this.yAccels[0];
        }

        if (this.fallSpeed<this.speedCutoff[0]*this.multiplier)
        {
            this.yForce=this.yForces[1];
        }

        else if (this.fallSpeed>this.speedCutoff[1]*this.multiplier)
        {
            this.yForce=this.yForces[0];
        }
    }
}