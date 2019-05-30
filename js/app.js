class App {
    constructor(){
        console.log('start app...');

        // elements
        this.DOM = {el:document.querySelector('body')};
        this.DOM.app = this.DOM.el.querySelector('.app');
        this.DOM.image = this.DOM.el.querySelectorAll('.image');
        this.DOM.imageHolder = this.DOM.el.querySelectorAll('.image__holder');
        this.DOM.logo = this.DOM.el.querySelectorAll('.logo');
        this.DOM.controls = this.DOM.el.querySelectorAll('.controls');
        this.DOM.info = this.DOM.el.querySelector('.info');
        this.DOM.about = this.DOM.el.querySelector('.about');
        this.DOM.loader = this.DOM.el.querySelector('.loader');
        this.DOM.counterCurrent = this.DOM.el.querySelector('.photo-count__current');
        this.DOM.counterAll = this.DOM.el.querySelector('.photo-count__all');

        // settings
        this.direction = 'next';
        this.animationLock = false;
        this.config = {
            animation: {
                speed: {fast: 0.1, medium: 0.3, slow: 0.5},
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

        //loading
        this.buildLoading();
        imagesLoaded( '.loader div',{ background: true }, () => {
            this.removeLoading()
            this.startStage();
            console.log('images loaded');
        }); 

        //variables
        this.isMobile = window.innerWidth < 600;


    }

    buildLoading(){
        let count = 0;

        //create holder
        const loadElement = document.createElement('div');
        loadElement.classList.add('loader');
        this.DOM.app.appendChild(loadElement);
        const loader = this.DOM.app.querySelector('.loader');

        this.photos.forEach((photo) => {
                count ++; 

                //create element
                const newElement = document.createElement('div');
                newElement.style.backgroundImage = `url('./images/gallery/${photo}')`;
                loader.appendChild(newElement);

        });
    }

    removeLoading(){
        const loader = this.DOM.app.querySelector('.loader');
        loader.parentNode.removeChild(loader);
    }


    startStage(){
        var tlIntro = new TimelineMax({onComplete: () => this.setAnimationUnlock(), repeat:0,ease: this.config.animation.ease.power01});

        this.setImage();
        this.setCollectionCounter();

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
            this.setCollectionCounter();
            console.log(this.getCurrent());
        }
    }

    nextSlide(){
        if(this.isAnimationUnlocked()){
            this.setCurrentUp()
            this.setDirection({mode:'next'});
            this.exitSlide();
            this.setCollectionCounter();
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
        },.1)
        ;
    }

    enterSlide(){

        this.setImage();

        var tl = new TimelineMax({onComplete:() => this.setAnimationUnlock(), repeat:0,ease: this.config.animation.ease.power01});

        tl
        .set(this.DOM.image,{
            autoAlpha: 1,
        },.1)
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
            right: this.isMobile ? '-90vw' : '-50vw',
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

getCollectionTotal(){
    return this.photos.length;
}

setCollectionCounter(){
    this.DOM.counterCurrent.innerHTML = this.getCurrent() + 1;
    this.DOM.counterAll.innerHTML = this.getCollectionTotal();
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
