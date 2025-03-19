import { Point } from './point';
import { Vector } from './vector';

export function calculateArc(angle: number, pt1: Point, pt2: Point): string {
    // rotate point 1 about point 2 to determine x/y offset
    let rotatedPt1 = pt1.rotate(-angle, pt2);
    let pt3_unrotated = new Point(pt2.x - (rotatedPt1.x - pt2.x), rotatedPt1.y);
    let pt3 = pt3_unrotated.rotate(angle, pt2);

    if (Math.abs(pt2.x - rotatedPt1.x) < 0.1) {
        // we are at +/- 90 degrees.  alternate triangulation.
        let r = Math.abs(rotatedPt1.y - pt2.y) / 2;
        let largeFlag = 0;
        let sweepFlag = rotatedPt1.y < pt2.y ? 1 : 0;
        return `M ${pt1.x} ${pt1.y} A ${r} ${r} 0 ${largeFlag} ${sweepFlag} ${pt2.x} ${pt2.y}`;
    }

    // rearrange points into clockwise order
    let start = pt2;
    let largeFlag = 0;
    let sweepFlag = 0;
    if (rotatedPt1.x < pt2.x) {
        let swap = pt2;
        pt2 = pt1;
        pt1 = swap;
        largeFlag = 1;
        sweepFlag = 1;
    }
    if (rotatedPt1.y < start.y) {
        sweepFlag = 1 - sweepFlag;
    }

    // http://www.ambrsoft.com/trigocalc/circle3d.htm#:~:text=Example%202%20%2D%20Circle%20Defined%20by%203%20Points&text=Find%20the%20equation%20of%20a%20circle%20and%20its%20center%20and,%2B%20Cy%20%2B%20D%20%3D%200%20.
    let a = pt1.x * (pt2.y - pt3.y)
        - pt1.y * (pt2.x - pt3.x)
        + pt2.x * pt3.y - pt3.x * pt2.y;
    let b = (pt1.x * pt1.x + pt1.y * pt1.y) * (pt3.y - pt2.y)
        + (pt2.x * pt2.x + pt2.y * pt2.y) * (pt1.y - pt3.y)
        + (pt3.x * pt3.x + pt3.y * pt3.y) * (pt2.y - pt1.y);
    let c = (pt1.x * pt1.x + pt1.y * pt1.y) * (pt2.x - pt3.x)
        + (pt2.x * pt2.x + pt2.y * pt2.y) * (pt3.x - pt1.x)
        + (pt3.x * pt3.x + pt3.y * pt3.y) * (pt1.x - pt2.x);
    let d = (pt1.x * pt1.x + pt1.y * pt1.y) * (pt3.x * pt2.y - pt2.x * pt3.y)
        + (pt2.x * pt2.x + pt2.y * pt2.y) * (pt1.x * pt3.y - pt3.x * pt1.y)
        + (pt3.x * pt3.x + pt3.y * pt3.y) * (pt2.x * pt1.y - pt1.x * pt2.y);
    if (a == 0) {
        a = Math.pow(10, -10);
    }
    let r = Math.sqrt((b * b + c * c - 4 * a * d) / (4 * a * a));
    return `M ${pt1.x} ${pt1.y} A ${r} ${r} 0 ${largeFlag} ${sweepFlag} ${pt2.x} ${pt2.y}`;
}

export function calculateArcMove(start: Point, startAngle: number, requestedEnd: Point):
[Point, number] {
    // convert to polar coordinates about previous x/y position
    let relTarget = requestedEnd.subtract(start);
    let targetPolarVector = Vector.polarFromCart(relTarget);

    // limit angle 
    let relativeAngle = targetPolarVector.angle - startAngle;
    if (relativeAngle <= -180) relativeAngle += 360;

    if (relativeAngle < -135) relativeAngle = -135;
    if (relativeAngle > 135) relativeAngle = 135;

    relativeAngle = Math.round(relativeAngle / 22.5) * 22.5;

    targetPolarVector.angle = startAngle + relativeAngle;
    let targetAngle = startAngle + relativeAngle * 2;
    let limitedTargetOffset = targetPolarVector.polarToCart();
    let endPoint = start.add(limitedTargetOffset)
    return [endPoint, targetAngle];
}