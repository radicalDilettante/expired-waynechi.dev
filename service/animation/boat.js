import { Point } from "./point";

export class Boat {
  constructor() {}

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.boatHeight = stageHeight * 0.9;
    this.boatWidth = this.boatHeight * 0.7;

    this.centerX = stageWidth / 2;
    this.centerY = stageHeight - 30 - this.boatHeight;
    this.init();
  }

  init() {
    this.point = new Point(0, 5, this.stageWidth / 7, this.centerY);
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
      this.boatWidth,
      this.boatHeight
    );
    ctx.fill();
    ctx.closePath();
  }
}
