export class Point {
  constructor(index, max, x, y) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.05;
    this.cur = index;
    this.max = Math.random() * max;
  }

  update() {
    this.cur += this.speed;
    this.y = this.fixedY + Math.sin(this.cur) * this.max;
  }
}
