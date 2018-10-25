class Leaf extends Snow
{
    constructor(two,options)
    {
        super(two,options);

        this.fallSpeed=0;
        this.yAccel=-.05;
        this.yForce=-.008;

        this.yForces=[-.008,.01];
        this.yAccels=[-.02,.09]; //negative acceleration, positive acceleration
        this.speedCutoff=[-1,1.9]; //[negative speed before flipping, positive speed before flipping]

        this.multiplier=2;
    }

    updateSelf()
    {
        this.theShape.translation.y+=this.fallSpeed;
        this.fallSpeed+=this.yAccel;

        if (this.fallSpeed<this.speedCutoff[0]*this.multiplier)
        {
            this.yAccel=this.yAccels[1]*this.multiplier;
        }

        if (this.fallSpeed>this.speedCutoff[1]*this.multiplier)
        {
            this.yAccel=this.yAccels[0]*this.multiplier;
        }
    }
}