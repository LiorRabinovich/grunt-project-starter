class Main {
    constructor() {
        this.ready(() => {
            this.buttonSound = new Audio("assets/sounds/button.mp3");
            this.$listItems = document.getElementsByTagName('li');

            this.addEventsListener();

            let bla = 'Alert test';
            alert(bla);
        });
    }

    ready(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    addEventsListener() {
        let self = this;
        Array.from(this.$listItems).forEach(function ($element) {
            $element.addEventListener('click', function () {
                self.buttonSound.pause();
                self.buttonSound.currentTime = 0;
                self.buttonSound.play();
            });
        });
    }

}

new Main();