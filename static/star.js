﻿//---------------------------------------------------------------------------------------
function Star(visualContainer, collisionManager, positionMapper, scoreManager) {
    this.baseSpaceStar = SpaceObjects;
    this.baseSpaceStar(visualContainer, collisionManager, positionMapper, scoreManager);

    this.visualElement_.style.width = 60 + "px";
    this.visualElement_.style.height = 60 + "px";
    
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    this.visualElement_.style.backgroundImage = "url(pictures/star-" + random(1, 12) + ".gif)";

    this.pointsForSpace_ = 30;

    this.moveCount_ = 0;
}
//---------------------------------------------------------------------------------------
Star.prototype = Object.create(SpaceObjects.prototype);
//---------------------------------------------------------------------------------------
Star.prototype.constructor = Star;
//---------------------------------------------------------------------------------------
Star.prototype.doAction = function () {      // движемся по заданому вектору
    if (this.moveCount_ === 100) {
        this.moveCount_ = 0;
    }
    if (this.moveCount_ === 0) {
        this.getRandonMoveVector();
    }
    this.move();
    this.moveCount_++;
}
//---------------------------------------------------------------------------------------
function randomVector(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//---------------------------------------------------------------------------------------
Star.prototype.getRandonMoveVector = function() {
    var vector = randomVector(1, 8);
    switch (vector) {
        case 1:
            this.move = this.moveFunc.bind(this, 0, -(this.moveSpeed_));
            break;
        case 2:
            this.move = this.moveFunc.bind(this, this.moveSpeed_, -(this.moveSpeed_));
            break;
        case 3:
            this.move = this.moveFunc.bind(this, this.moveSpeed_, 0);
            break;
        case 4:
            this.move = this.moveFunc.bind(this, this.moveSpeed_, this.moveSpeed_);
            break;
        case 5:
            this.move = this.moveFunc.bind(this, this.moveSpeed_, 0);
            break;
        case 6:
            this.move = this.moveFunc.bind(this, -(this.moveSpeed_), this.moveSpeed_);
            break;
        case 7:
            this.move = this.moveFunc.bind(this, -(this.moveSpeed_), 0);
            break;
        case 8:
            this.move = this.moveFunc.bind(this, -(this.moveSpeed_), -(this.moveSpeed_));
            break;
    }
}
//---------------------------------------------------------------------------------------
Star.prototype.moveFunc = function (moveX, moveY) {
    //console.log("Asteroid.prototype.moveFunc ------------------------------");
    var point = {
        x: parseInt(this.visualElement_.style.left) + moveX,
        y: parseInt(this.visualElement_.style.top) + moveY
    }
    this.collisionManager_.moveObjectAtField(this, this.positionMapper_.getPositionByLocalFromAbsolute(point));
    this.visualElement_.style.top = point.y + "px";
    this.visualElement_.style.left = point.x + "px";
}
//---------------------------------------------------------------------------------------
Star.prototype.move = function () {}
//---------------------------------------------------------------------------------------
