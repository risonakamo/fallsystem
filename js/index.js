window.onload=main;

var _stormsystem;

function main()
{
    //making a two context
    var two=new Two({fullscreen:true,type:Two.Types.canvas}).appendTo(document.querySelector(".game"));

    //making a fall system.
    _stormsystem=new fallSystem(two,[
        {
            particle:Snow,
            particleOptions:{},
            particleAmount:100
        },
        {
            particle:Snow,
            particleOptions:{shape:crossSnow},
            particleAmount:50
        },
        {
            particle:Rain,
            particleOptions:{
                xSpawnOffset:[-300,0]
            },
            particleAmount:100
        }
    ]);

    //disabling particleConfig 2, which would be Rain
    _stormsystem.toggleRespawn(2);

    //Two animation loop
    two.bind("update",()=>{
        _stormsystem.update();
    });

    two.play();

    //deploying UI menu
    ReactDOM.render(React.createElement(Menu),document.querySelector(".menu"));
}