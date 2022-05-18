import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
/*
<script>
import {ref} from 'vue';
export default {
    setup() {
        let dragging = false;
        let x = ref(10);
        let y = ref(90);
        let tx = ref(10);
        let ty = ref(60);
        let angle = ref(270);
        let tAngle = ref(315);
        let arc= ref("M 10 90 L 10 60");
        let dragX = NaN;
        let dragY = NaN;
        let dragTarget = NaN;
        function RotatePoint(angle, point, center) {
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
        function cartToPolar(cart) {
            return {
                distance: Math.sqrt(cart.x * cart.x + cart.y * cart.y),
                angle: Math.atan2(cart.y,cart.x) * (180/Math.PI)
            };
        }
        function polarToCart(polar) {
            let angleRads = polar.angle * (Math.PI/180);
            return {
                x: polar.distance * Math.cos(angleRads),
                y: polar.distance * Math.sin(angleRads)
            };
        }
        const UpdateTarget = (mouseX, mouseY) => {
            // convert to polar coordinates about previous x/y position
            let relTarget = { x: mouseX - x.value,
                              y: mouseY - y.value };
            let targetPolar = cartToPolar(relTarget);

            // limit angle 
            let relativeAngle = targetPolar.angle - angle.value;
            if (relativeAngle <= -180) relativeAngle += 360;

            if (relativeAngle < -135) relativeAngle = -135;
            if (relativeAngle > 135) relativeAngle = 135;

            relativeAngle = Math.round(relativeAngle / 22.5) * 22.5;
            console.info(`d: ${targetPolar.distance} angle: ${relativeAngle}`);
            targetPolar.angle = angle.value + relativeAngle;
            tAngle.value = angle.value + relativeAngle*2;
            let limitedTarget = polarToCart(targetPolar);
            tx.value = x.value + limitedTarget.x;
            ty.value = y.value + limitedTarget.y;

            // if angle < 90, center = (sin(rangle)*d/sin(180-2*rangle), theta)
            // if angle == 90, center = (d/2,theta)
            // if angle > 90, center = l/1=rangle-90

        }
        const CalculateArc = () => {
            let pt1 = { x: tx.value, y: ty.value };
            let pt2 = { x: x.value, y: y.value };
            // rotate point 1 about point 2 to determine x/y offset
            let rotatedPt1 = RotatePoint(-angle.value, pt1, pt2);
            console.info("unrotated 1: " + JSON.stringify(rotatedPt1));
            let pt3_unrotated = { x: pt2.x-(rotatedPt1.x-pt2.x), y: rotatedPt1.y };
            console.info("unrotated 3: " + JSON.stringify(pt3_unrotated));
            let pt3 = RotatePoint(angle.value, pt3_unrotated, pt2);
            
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
            arc.value = `M ${pt1.x} ${pt1.y} A ${r} ${r} 0 ${largeFlag} ${sweepFlag} ${pt2.x} ${pt2.y}`;
            //arc.value = `M ${pt1.x} ${pt1.y} L ${pt2.x} ${pt2.y} L ${pt3.x} ${pt3.y}` 
            //arc.value += ` M ${cx} ${cy} L ${pt1.x} ${pt1.y} L ${pt2.x} ${pt2.y}  L ${pt3.x} ${pt3.y} `
            console.info(arc.value);
        }

        const MouseDown = (e) => {
            dragging = true;
            dragX = x.value;
            dragY = y.value;
            dragTarget = e.target;
        };
        const MouseMove = (e) => {
            if (dragging) {
                let svg = dragTarget.ownerSVGElement;
                let ctm = svg.getScreenCTM();
                let mouseX = (e.clientX - ctm.e) / ctm.a;
                let mouseY = (e.clientY - ctm.f) / ctm.d;

                UpdateTarget(mouseX, mouseY);
                //CalculateArc();
            }
        };
        const MouseUp = () => {
            dragging = false;
            dragX = NaN;
            dragY = NaN;
        };
        return {MouseDown, MouseMove, MouseUp, x, y, tx, ty, tAngle, angle, arc};
    }
}
</script>
<!--
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
