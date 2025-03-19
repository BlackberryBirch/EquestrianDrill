export class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x=x;
        this.y=y;
    }

    rotate(angle: number, center: Point): Point {
        // https://www.gamefromscratch.com/post/2012/11/24/GameDev-math-recipes-Rotating-one-point-around-another-point.aspx#:~:text=As%20to%20the%20math%2C%20the,then%20finally%20add%20the%20x
        let angleRad = angle * (Math.PI / 180);
        let x = Math.cos(angleRad) * (this.x - center.x)
            - Math.sin(angleRad) * (this.y - center.y)
            + center.x;
        let y = Math.sin(angleRad) * (this.x - center.x)
            + Math.cos(angleRad) * (this.y - center.y)
            + center.y;
        return new Point( x, y );
    }
}
