import { Boat } from "./boat";
import { WaveGroup } from "./wave_group";

export class Main {
  constructor(canvas) {
    this.canvas = canvas.current;
    this.ctx = this.canvas.getContext("2d");

    this.waveGroup = new WaveGroup();
    this.boat = new Boat();

    this.resize();
    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = this.canvas.offsetWidth * 2;
    this.stageHeight = (this.stageWidth * 9) / 16;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.waveGroup.resize(this.stageWidth, this.stageHeight);
    this.boat.resize(this.stageWidth, this.stageHeight);
  }

  animate(t) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.boat.draw(this.ctx);
    this.waveGroup.draw(this.ctx);

    requestAnimationFrame(this.animate.bind(this));
  }
}
