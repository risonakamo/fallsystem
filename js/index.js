window.onload=main;

var _stormsystem;

function main()
{
    var two=new Two({fullscreen:true,type:Two.Types.canvas}).appendTo(document.querySelector(".game"));

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

    _stormsystem.toggleRespawn(2);

    two.bind("update",()=>{
        _stormsystem.update();
    });

    two.play();

    ReactDOM.render(React.createElement(Menu),document.querySelector(".menu"));
}