import { pipes } from '../../../utils';
export class YooDateComponent {
    pauseTimer() {
        if (this.timerMode) {
            clearInterval(this.timer);
            this.pausedTime = Date.now();
        }
    }
    resumeTimer() {
        if (this.timerMode) {
            this.onStartTimer();
        }
    }
    async getPausedTime() {
        return this.pausedTime;
    }
    componentDidLoad() {
        if (this.timerMode) {
            this.onStartTimer();
        }
    }
    componentDidUnload() {
        if (this.timerMode) {
            clearInterval(this.timer);
        }
    }
    onStartTimer() {
        if (window && window.setInterval) {
            this.timer = window.setInterval(() => {
                let elapsedTime = Date.now() - this.startTime;
                this.time = (elapsedTime / 1000);
            }, 200);
        }
    }
    renderTimer() {
        return this.time ? pipes.timer.transform(Math.round(this.time), 'seconds') : "00:00:00";
    }
    render() {
        if (this.timerMode) {
            return this.renderTimer();
        }
        return this.date ? pipes.dateFormat.transform(this.date, this.format || 'L LT') : null;
    }
    static get is() { return "yoo-date"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "date": {
            "type": "Any",
            "attr": "date"
        },
        "format": {
            "type": String,
            "attr": "format"
        },
        "getPausedTime": {
            "method": true
        },
        "host": {
            "elementRef": true
        },
        "pauseTimer": {
            "method": true
        },
        "resumeTimer": {
            "method": true
        },
        "startTime": {
            "type": Number,
            "attr": "start-time"
        },
        "time": {
            "state": true
        },
        "timerMode": {
            "type": Boolean,
            "attr": "timer-mode"
        }
    }; }
    static get style() { return "/**style-placeholder:yoo-date:**/"; }
}
