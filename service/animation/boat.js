import { Point } from "./point";

export class Boat {
  constructor() {}

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.centerX = stageWidth / 2;
    this.centerY = stageHeight * 0.11;
    this.init();
  }

  init() {
    this.point = new Point(0, 2, this.stageWidth / 6, this.centerY);
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "#000FFF";
    this.point.update();
    const boat = new Image();
    boat.src = "images/boat.svg";
    ctx.drawImage(
      boat,
      this.point.x,
      this.point.y,
      this.stageHeight / 2,
      this.stageHeight / 1.5
    );
    ctx.fill();
    ctx.closePath();
  }
}
