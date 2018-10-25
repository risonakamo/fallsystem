/*fallSystem(Two two,array-objects particles)
  two: the two context
  particles: an array of particle configuration objects,
    each of which must contain the following values:
    {
        particle: a particle class
        particleOptions: particle options for the particle class
        particleAmount: the amount of this particle that should be spawned
    }*/
class fallSystem
{
    constructor(two,particles)
    {
        this.two=two;

        this.fallItems=[];

        var currentParticle;
        for (var x=0;x<particles.length;x++)
        {
            currentParticle=particles[x];
            for (var y=0;y<currentParticle.particleAmount;y++)
            {
                this.fallItems.push(new currentParticle.particle(two,currentParticle.particleOptions));
            }
        }

        this.fallItemsLength=this.fallItems.length;
    }

    //toggle play state of given two system
    playPause()
    {
        if (!this.two.playing)
        {
            this.two.play();
        }

        else
        {
            this.two.pause();
        }
    }

    update()
    {
        for (var x=0,l=this.fallItemsLength;x<l;x++)
        {
            this.fallItems[x].updateSelf();
        }
    }

    //flag all particles to not respawn
    toggleRespawn()
    {
        for (var x=0;x<this.fallItemsLength;x++)
        {
            this.fallItems[x].dontRespawn=this.fallItems[x].dontRespawn?0:1;
        }
    }
}