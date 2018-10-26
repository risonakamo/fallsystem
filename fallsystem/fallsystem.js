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

        //instantiate all particles according to configs
        for (var x=0;x<particles.length;x++)
        {
            this.fallItemDisable[x]=0;
            currentParticle=particles[x];
            fallItemArray=[];

            for (var y=0;y<currentParticle.particleAmount;y++)
            {
                fallItemArray.push(new currentParticle.particle(two,this,currentParticle.particleOptions));
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
        //also during this loop, check if all particles report dead (out of Two canvas space)
        var allDead;
        for (var x=0;x<this.fallItems.length;x++)
        {
            if (this.fallItemDisable[x])
            {
                continue;
            }

            allDead=1;
            for (var y=0;y<this.fallItems[x].length;y++)
            {
                this.fallItems[x][y].updateSelf();

                if (!this.fallItems[x][y].dead)
                {
                    allDead=0;
                }
            }

            //if all particles are dead, disable the particle group
            if (allDead)
            {
                this.fallItemDisable[x]=1;
            }
        }
    }

    //flag all particles to not respawn for a certain particle system
    toggleRespawn(index)
    {
        this.fallItemDisable[index]=0;
        for (var x=0;x<this.fallItems[index].length;x++)
        {
            this.fallItems[index][x].dontRespawn=this.fallItems[index][x].dontRespawn?0:1;
        }
    }

    //pause/play all of a specified particle (but does not enable respawn)
    toggleParticle(index)
    {
        this.fallItemDisable[index]=this.fallItemDisable[index]?0:1;
    }

    //activate blow effect. particles have a reference to the fall system and
    //particles that find this property relevant will react accordingly
    toggleBlow()
    {
        this.blow=this.blow?0:1;
    }
}