import { Component, Input, OnInit } from '@angular/core';

type Point = {
  x: number;
  y: number;
}
type Vector = {
  angle: number;
  distance: number;
}
@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss']
})
export class ArenaComponent implements OnInit {
  @Input() selected=false;
  x = 10;
  y = 90;
  angle = 225;
  tx = 10;
  ty = 60;
  tAngle = 315;
  arc = "M 10 90 L 10 60";
  dragging = false;
  dragX = NaN;
  dragY = NaN;
  dragTarget:any = null;

  constructor() { }

  ngOnInit(): void {
  }

  rotatePoint(angle: number, point: Point, center: Point): Point {
        // https://www.gamefromscratch.com/post/2012/11/24/GameDev-math-recipes-Rotating-one-point-around-another-point.aspx#:~:text=As%20to%20the%20math%2C%20the,then%20finally%20add%20the%20x
        let angleRad = angle * (Math.PI/180);
        let x = Math.cos(angleRad) * (point.x - center.x)
          - Math.sin(angleRad) * (point.y - center.y) 
          + center.x;
        let y = Math.sin(angleRad) * (point.x - center.x)
          + Math.cos(angleRad) * (point.y - center.y)
          + center.y;
        return {x: x, y: y};
    }
    cartToPolar(cart: Point): Vector {
        return {
            distance: Math.sqrt(cart.x * cart.x + cart.y * cart.y),
            angle: Math.atan2(cart.y,cart.x) * (180/Math.PI)
        };
    }
    polarToCart(polar: Vector): Point {
        let angleRads = polar.angle * (Math.PI/180);
        return {
            x: polar.distance * Math.cos(angleRads),
            y: polar.distance * Math.sin(angleRads)
        };
    }
    updateTarget(mouseX: number, mouseY: number) {
        // convert to polar coordinates about previous x/y position
        let relTarget = { x: mouseX - this.x,
                          y: mouseY - this.y };
        let targetPolar = this.cartToPolar(relTarget);

        // limit angle 
        let relativeAngle = targetPolar.angle - this.angle;
        if (relativeAngle <= -180) relativeAngle += 360;

        if (relativeAngle < -135) relativeAngle = -135;
        if (relativeAngle > 135) relativeAngle = 135;

        relativeAngle = Math.round(relativeAngle / 22.5) * 22.5;
        console.info(`d: ${targetPolar.distance} angle: ${relativeAngle}`);
        targetPolar.angle = this.angle + relativeAngle;
        this.tAngle = this.angle + relativeAngle*2;
        let limitedTarget = this.polarToCart(targetPolar);
        this.tx = this.x + limitedTarget.x;
        this.ty = this.y + limitedTarget.y;

        // if angle < 90, center = (sin(rangle)*d/sin(180-2*rangle), theta)
        // if angle == 90, center = (d/2,theta)
        // if angle > 90, center = l/1=rangle-90

    }
    calculateArc() {
        let pt1 = { x: this.tx, y: this.ty };
        let pt2 = { x: this.x, y: this.y };
        // rotate point 1 about point 2 to determine x/y offset
        let rotatedPt1 = this.rotatePoint(-this.angle, pt1, pt2);
        console.info("unrotated 1: " + JSON.stringify(rotatedPt1));
        let pt3_unrotated = { x: pt2.x-(rotatedPt1.x-pt2.x), y: rotatedPt1.y };
        console.info("unrotated 3: " + JSON.stringify(pt3_unrotated));
        let pt3 = this.rotatePoint(this.angle, pt3_unrotated, pt2);
        console.info(pt1, pt2, rotatedPt1, pt3_unrotated, pt3);
        if (Math.abs(pt2.x - rotatedPt1.x) < 0.1) {
          // we are at +/- 90 degrees.  alternate triangulation.
          let r = Math.abs(rotatedPt1.y - pt2.y) / 2;
          let largeFlag = 0;
          let sweepFlag = rotatedPt1.y < pt2.y ? 1 : 0;
          this.arc = `M ${pt1.x} ${pt1.y} A ${r} ${r} 0 ${largeFlag} ${sweepFlag} ${pt2.x} ${pt2.y}`;
          return
        }

        // rearrange points into clockwise order
        let start = pt2;
        let end = pt1;
        let largeFlag = 0;
        let sweepFlag = 0;
        if (rotatedPt1.x<pt2.x) { 
            let swap = pt2;
            pt2 = pt1;
            pt1 = swap;
            largeFlag = 1;
            sweepFlag = 1;
        }
        if (rotatedPt1.y<start.y) {
            sweepFlag = 1-sweepFlag;
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
        let cx = -b / (2 * a);
        let cy = -c / (2 * a);
        let r = Math.sqrt((b * b + c * c - 4 * a * d) / (4 * a * a));
        this.arc = `M ${pt1.x} ${pt1.y} A ${r} ${r} 0 ${largeFlag} ${sweepFlag} ${pt2.x} ${pt2.y}`;
        //arc.value = `M ${pt1.x} ${pt1.y} L ${pt2.x} ${pt2.y} L ${pt3.x} ${pt3.y}` 
        //arc.value += ` M ${cx} ${cy} L ${pt1.x} ${pt1.y} L ${pt2.x} ${pt2.y}  L ${pt3.x} ${pt3.y} `
        console.info(this.arc);
    }

    mouseDown(e: MouseEvent) {
        this.dragging = true;
        this.dragX = this.x;
        this.dragY = this.y;
        this.dragTarget = e.target;
    };
    mouseMove(e: MouseEvent) {
        if (this.dragging) {
            let svg = this.dragTarget.ownerSVGElement;
            let ctm = svg.getScreenCTM();
            let mouseX = (e.clientX - ctm.e) / ctm.a;
            let mouseY = (e.clientY - ctm.f) / ctm.d;

            this.updateTarget(mouseX, mouseY);
            this.calculateArc();
        }
    }
    mouseUp() {
        this.dragging = false;
        this.dragX = NaN;
        this.dragY = NaN;
    }
}
/*
walk = 4mph
jog = 8-12 mph
canter = 12-15mph
gallop=25-30mph
  /*groups={
      all=[1,2,3,4,5,6,7,8],
      odd=[1,3,5,7],
      even=[2,4,6,8],
      one=[1,2,3,4],
      two=[5,6,7,8]
  };
  maneuvers={
      enter={leaderPath: "towardsCenter"},
      railClockwise={leaderPath: "railClockwise"},
      meetInCenter={leaderPath: "towardsVerticalCenter", followers: "copyLeader"},
      leftRail={leaderPath: "towardsLeftRail"},
      exit={leaderPath: "thruExit"}
  };
  routine=[
      [{ maneuver="enter", groups="odd,even", stopAt="50" }],
      [{ maneuver="towardsLeftRail", groups="odd"}, {maneuver="towardsRightRail", groups="even"}],
      [{ maneuver="exit", group="all"}]
  ];
*/
