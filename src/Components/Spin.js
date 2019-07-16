import React from 'react';

const sections = ["PhoViet", "Vinh", "My Tau", "XinChao", "Thai",
                "Lot10", "One More", "HoMinSan", "Thit Nuong", "Wangsamaju",
                "PavilionFoodCourt", "Tùng Chọn"];

const colors = ["#F84", "#8F4", "#48F", "#F8F"];

const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;
var tempAngle = 0;

export default class Spin extends React.Component {
    state = {angle : 0};
    setContext = this.setContext.bind(this);

    setContext(r) {        
        this.ctx = r.getContext("2d");
      }    

    onSpin = (speed, duration) => {        
        var start = new Date().getTime();       
        var that = this;
        function frame() {
            var now = new Date().getTime();
            var t = (now - start) / duration;
            if (t > 1) t = 1;                        
            tempAngle += speed * (1 - t);
            that.repaint(tempAngle);
            if (t < 1) setTimeout(frame, 10);
        }
        
        setTimeout(frame, 10);
    };  

    repaint = (angle) => {
        var canvas = document.querySelector('#canvas');

        canvas.width = innerWidth;
        canvas.height = innerHeight;
        var r = Math.min(innerWidth, innerHeight) / 2.25;
        var cx = innerWidth/2, cy = innerHeight/2;
        var ctx = canvas.getContext("2d");
        var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, "rgba(0,0,0,0)");
        g.addColorStop(1, "rgba(0,0,0,0.5)");
        var selected = (Math.floor((- 0.2 - angle) * sections.length / (2*Math.PI))
                        % sections.length);
        if (selected < 0) selected += sections.length;
        for (var i=0; i<sections.length; i++) {
            var a0 = angle + 2*Math.PI*i/sections.length;
            var a1 = a0 + 2*Math.PI/(i === 0 ? 1 : sections.length);
            var a = angle + 2*Math.PI*(i+0.5)/sections.length;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, r, a0, a1, false);
            ctx.fillStyle = colors[i % 4];
            ctx.fill();
            ctx.fillStyle = g;
            ctx.fill();
            ctx.save();
            if (i === selected) {
                ctx.fillStyle = "#FFF";
                ctx.shadowColor = "#FFF";
                ctx.shadowBlur = r/20;
            } else {
                ctx.fillStyle = "#AAA";
                ctx.shadowColor = "#000";
                ctx.shadowBlur = r/100;
            }
            ctx.font = "bold " + r/sections.length + "px serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.translate(cx, cy);
            ctx.rotate(a);
            ctx.fillText(sections[i], r*0.62, 0);
            ctx.restore();
        }
        ctx.shadowOffsetX = r/80;
        ctx.shadowOffsetY = r/80;
        ctx.shadowBlur = r/40;
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.beginPath();
        ctx.arc(cx, cy, r*1.025, 0, 2*Math.PI, true);
        ctx.arc(cx, cy, r*0.975, 0, 2*Math.PI, false);
        ctx.fillStyle = "#444";
        ctx.fill();
        ctx.shadowOffsetX = r/40;
        ctx.shadowOffsetY = r/40;
        g = ctx.createRadialGradient(cx-r/7, cy-r/7, 0, cx, cy, r/3);
        g.addColorStop(0, "#FFF");
        g.addColorStop(0.2, "#F44");
        g.addColorStop(1, "#811");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r/3.5, 0, 2*Math.PI, false);
        ctx.fill();
        ctx.translate(cx, cy);
        ctx.rotate(Math.PI - 0.2);
        ctx.beginPath();
        ctx.moveTo(- r*1.1, - r*0.05);
        ctx.lineTo(- r*0.9, 0);
        ctx.lineTo(- r*1.1, r*0.05);
        ctx.fillStyle = "#F44";
        ctx.fill();        
    };    

    componentDidMount() {
        this.repaint(this.state.angle);

        setInterval(function() {
            var canvas = document.querySelector('#canvas');
            if (canvas.width !== innerWidth || canvas.height !== innerHeight) {
                this.repaint(this.state.angle);
            }
        }, 10);
    }   

    render(){
        return(
            <div>
                <canvas id="canvas" width="100%" height="100%" 
                    ref={this.setContext}
                    onClick = {() => this.onSpin(0.3,5000)} />
                
            </div>
        );
    }
}