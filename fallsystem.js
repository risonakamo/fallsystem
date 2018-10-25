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
        this.fallItemDisable={};

        var currentParticle;
        var fallItemArray;
        for (var x=0;x<particles.length;x++)
        {
            this.fallItemDisable[x]=0;
            currentParticle=particles[x];
            fallItemArray=[];

            for (var y=0;y<currentParticle.particleAmount;y++)
            {
                fallItemArray.push(new currentParticle.particle(two,currentParticle.particleOptions));
            }

            this.fallItems.push(fallItemArray);
        }
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

    //frame update
    update()
    {
        for (var x=0;x<this.fallItems.length;x++)
        {
            if (this.fallItemDisable[x])
            {
                continue;
            }

            for (var y=0;y<this.fallItems[x].length;y++)
            {
                this.fallItems[x][y].updateSelf();
            }
        }
    }

    //flag all particles to not respawn for a certain particle system
    toggleRespawn(index)
    {
        for (var x=0;x<this.fallItems[index].length;x++)
        {
            this.fallItems[index][x].dontRespawn=this.fallItems[index][x].dontRespawn?0:1;
        }
    }

    //pause all of a specified particle
    toggleParticle(index)
    {
        this.fallItemDisable[index]=this.fallItemDisable[index]?0:1;
    }
}