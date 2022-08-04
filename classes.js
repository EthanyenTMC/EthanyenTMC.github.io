export class Component{
    constructor(xLoc,yLoc, wide,heit){
        this.x = xLoc;
        this.y = yLoc;
        this.width = wide;
        this.height = heit;
        this.shape = false;
        this.color = "#FF0000";
    }
    setColor(col){
        this.color = col;
    }
    draw(context){
        context.fillStyle = this.color;
        context.fillRect(this.x,this.y, this.width,this.height);
    }
    touches(pos){
        if(pos.x > this.x && pos.x < this.x + this.width){
            if(pos.y > this.y && pos.y < this.y+this.height){
                return true;
            }
        }
        return false;
    }
}

export class TextComponent{
    constructor(string, xLoc,yLoc, px, font){
        this.text = string;
        this.x = xLoc;
        this.y = yLoc;
        this.size = px;
        this.font = font;
        this.color = "#FF0000";
    }
    setColor(col){
        this.color = col;
    }
    draw(context){
        context.fillStyle = this.color;
        context.font = this.size + "px " + this.font;
        context.fillText(this.text, this.x, this.y);
    }

}