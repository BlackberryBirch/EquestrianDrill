import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Point } from './point';
import { calculateArc, calculateArcMove } from './arc';

@Component({
    selector: 'app-arena',
    templateUrl: './arena.component.html',
    styleUrls: ['./arena.component.scss'],
    standalone: false
})
export class ArenaComponent implements OnInit {
    @Output() select = new EventEmitter<ArenaComponent>();
    @Input() selected = false;
    @Input() readonly = false;
    @Input() pathTrails = false;

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
    dragTarget: any = null;

    constructor() { }

    ngOnInit(): void {
    }

    mouseDown(e: MouseEvent) {
        if (!this.readonly) {
            this.dragging = true;
            this.dragX = this.x;
            this.dragY = this.y;
            this.dragTarget = e.target;
        }
    };
    mouseMove(e: MouseEvent) {
        if (this.dragging) {
            let svg = this.dragTarget.ownerSVGElement;
            let ctm = svg.getScreenCTM();
            this.tx = (e.clientX - ctm.e) / ctm.a;
            this.ty = (e.clientY - ctm.f) / ctm.d;
        }
    }
    mouseUp() {
        this.dragging = false;
        this.dragX = NaN;
        this.dragY = NaN;
    }
    keyDown(e: KeyboardEvent) {
        let offset = e.ctrlKey ? 7.5 : 22.5
        if (e.key == '[') {
            this.tAngle = (Math.round(this.tAngle / offset) - 1) * offset;
        }
        if (e.key == ']') {
            this.tAngle = (Math.round(this.tAngle / offset) + 1) * offset;
        }
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
