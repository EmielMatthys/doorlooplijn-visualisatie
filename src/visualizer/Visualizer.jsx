import React from "react";
import PureCanvas from "./PureCanvas";

export const POINT_WIDTH = 10;

class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.setContext = this.setContext.bind(this);
  }

  setContext(ctx) {
    this.ctx = ctx;
    this.width = ctx.canvas.width;
    this.height = ctx.canvas.height;
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const {points, current} = this.props;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, this.width, this.height);
    // this.ctx.translate(this.width / 2, this.height / 2);
    // this.ctx.rotate((angle * Math.PI) / 180);
    this.ctx.fillStyle = '#4397AC';
    
    points.map( (point) => {
      this.ctx.fillText(String(point.y), point.x + POINT_WIDTH + 2, point.y + POINT_WIDTH)
      this.ctx.fillRect(
        point.x,
        point.y,
        POINT_WIDTH,
        POINT_WIDTH
      );
    })

    if (current >= 0 && current < points.length) {
      const currentPoint = points[current];
      this.ctx.beginPath();
      this.ctx.moveTo(currentPoint.x + POINT_WIDTH / 2, 0);
      this.ctx.lineTo(currentPoint.x + POINT_WIDTH / 2, this.height);
      this.ctx.stroke();
    }

    // Draw closest pair
    const {first, second, distance} = this.props.closestPair;
    if (first !== null) {
      console.log("Drawing closest pair")
      this.ctx.beginPath();
      this.ctx.moveTo(first.x + POINT_WIDTH / 2, first.y + POINT_WIDTH / 2);
      this.ctx.lineTo(second.x + POINT_WIDTH / 2, second.y + POINT_WIDTH / 2);
      this.ctx.setLineDash([10, 5]);
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = "#FF0000";
      this.ctx.stroke();

      this.ctx.fillStyle = '#FF0000';
      this.ctx.fillText("Closest pair", second.x + POINT_WIDTH / 2, second.y - POINT_WIDTH)
    }

    this.ctx.restore();
  }

  render() {
    return (
      <PureCanvas height="500" width="500" onClick={this.props.onClick} contextRef={this.setContext}/>
    );
  }
}

export default Visualizer;