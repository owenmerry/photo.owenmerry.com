class App {
    constructor(){
        console.log('start app...');

        // elements
        this.DOM = {el:document.querySelector('body')};
        this.DOM.app = this.DOM.el.querySelectorAll('.app');
        this.DOM.image = this.DOM.el.querySelectorAll('.image');
        this.DOM.imageHolder = this.DOM.el.querySelectorAll('.image__holder');
        this.DOM.logo = this.DOM.el.querySelectorAll('.logo');
        this.DOM.controls = this.DOM.el.querySelectorAll('.controls');
        this.DOM.info = this.DOM.el.querySelector('.info');
        this.DOM.about = this.DOM.el.querySelector('.about');

        // settings
        this.direction = 'next';
        this.animationLock = false;
        this.config = {
            animation: {
                speed: {fast: 0.3, medium: 0.5, slow: 0.7},
                ease: {power01: 'Power2.easeInOut', quint01: 'Quint.easeOut'}
            }
        };
        this.current = 0;

        //photos db
        this.photos = [
            'rob-bates-701730-unsplash.jpg',
            'diego-jimenez-258123-unsplash.jpg',
            'everaldo-coelho-486014-unsplash.jpg',
            'luca-micheli-551329-unsplash.jpg',
            'nacho-rochon-423005-unsplash.jpg',
            'robert-lukeman-150146-unsplash.jpg',
        ];

        //start animations
        this.startStage();
    }


    startStage(){
        var tlIntro = new TimelineMax({onComplete: () => this.setAnimationUnlock(), repeat:0,ease: this.config.animation.ease.power01});

        this.setImage();

            tlIntro
            .from(this.DOM.image,this.config.animation.speed.slow,{
                autoAlpha: 0,
            },0)
            .from(this.DOM.logo,this.config.animation.speed.fast,{
                top: '-10em',
            },.6)
            .from(this.DOM.controls,this.config.animation.speed.fast,{
                bottom: '-10em',
            },.7)
            .from(this.DOM.info,this.config.animation.speed.fast,{
                top: '-10em',
            },1)
            ;
        
    }

    prevSlide(){
        if(this.isAnimationUnlocked()){
            this.setCurrentDown()
            this.setDirection({mode:'prev'});
            this.exitSlide();
            console.log(this.getCurrent());
        }
    }

    nextSlide(){
        if(this.isAnimationUnlocked()){
            this.setCurrentUp()
            this.setDirection({mode:'next'});
            this.exitSlide();
            console.log(this.getCurrent());
        }
    }

    exitSlide(){
        this.setAnimationLock();
        var tl = new TimelineMax({onComplete:() => this.enterSlide(),repeat:0,ease: this.config.animation.ease.power01});

        this.setImageHolder();

        tl
        .to(this.DOM.image,this.config.animation.speed.slow,{
            autoAlpha: 0,
        })
        ;
    }

    enterSlide(){

        this.setImage();

        var tl = new TimelineMax({onComplete:() => this.setAnimationUnlock(), repeat:0,ease: this.config.animation.ease.power01});

        tl
        .set(this.DOM.image,{
            autoAlpha: 1,
        })
        ;
    }

    openAbout(){

        var tl = new TimelineMax({repeat:0,ease: this.config.animation.ease.power01});

        tl
        .to(this.DOM.image,this.config.animation.speed.fast,{
            right: '10em',
        },0)
        .to(this.DOM.about,this.config.animation.speed.fast,{
            right: '0',
        },0)
        ;

    }

    closeAbout(){

        var tl = new TimelineMax({repeat:0,ease: this.config.animation.ease.power01});

        tl
        .to(this.DOM.image,this.config.animation.speed.fast,{
            right: '0em',
        },0)
        .to(this.DOM.about,this.config.animation.speed.fast,{
            right: '-50vw',
        },0)
        ;
    }



/****
 * helpers
 */

getDirection(){
    return this.direction;
}

setDirection({mode = 'next'}){
    this.direction = mode;
}

isDirectionNext(){
    return this.direction === 'next';
}

setAnimationLock(){
    return this.animationLock = true;
}

setAnimationUnlock(){
    console.log('unlock...');

    return this.animationLock = false;
}

isAnimationLocked(){
    return this.animationLock === true;
}

isAnimationUnlocked(){
    return this.animationLock === false;
}

getCurrent(){
    return this.current;
}

setCurrentUp(){
    return this.getCurrent() === this.photos.length - 1 ? this.current = 0 : this.current++;
}

setCurrentDown(){
    return this.getCurrent() === 0 ? this.current = this.photos.length - 1 : this.current--;
}

setImage(){
    this.DOM.image[0].style.backgroundImage = `url('./images/gallery/${this.photos[this.getCurrent()]}')`;
}

setImageHolder(){
    this.DOM.imageHolder[0].style.backgroundImage = `url('./images/gallery/${this.photos[this.getCurrent()]}')`;
}

    

}

const app = new App();

const nextSlide = function(){
    app.nextSlide();
}

const prevSlide = function(){
    app.prevSlide();
}

const openAbout = function(){
    app.openAbout();
}

const closeAbout = function(){
    app.closeAbout();
}

document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '37') {
        app.prevSlide();
    }
    if (e.keyCode == '39') {
        app.nextSlide();
    }
}
