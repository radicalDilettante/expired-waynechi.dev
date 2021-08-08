import { Wave } from "./wave";

export class Main {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.getElementById("box").appendChild(this.canvas);

    this.wave = new Wave();

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();
    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.getElementById("box").clientWidth;
    this.stageHeight = (this.stageWidth * 2) / 3;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.wave.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.wave.draw(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }
}
