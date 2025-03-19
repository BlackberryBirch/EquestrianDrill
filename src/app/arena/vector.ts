import { Point } from "./point";

export class Vector {
    angle: number;
    distance: number;

    constructor(angle: number, distance: number) {
        this.angle = angle;
        this.distance = distance;
    }

    static polarFromCart(cart: Point): Vector {
        return new Vector(
            Math.atan2(cart.y, cart.x) * (180 / Math.PI),
            Math.sqrt(cart.x * cart.x + cart.y * cart.y)
        );
    }
    polarToCart(): Point {
        let angleRads = this.angle * (Math.PI / 180);
        return new Point(
            this.distance * Math.cos(angleRads),
            this.distance * Math.sin(angleRads)
        );
    }
};