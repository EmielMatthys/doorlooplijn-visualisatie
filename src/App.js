import React from 'react';
import useDoorloop from './algoritmes/Doorlooplijn';
import './App.css';
import Visualizer, { POINT_WIDTH } from './visualizer/Visualizer.jsx';
import TreeVisualizer from './visualizer/TreeVisualizer';


function withHook(Component) {
  return function WrappedComponent(props) {
    const [status, closestPair, step, currentIndex, setPoints, reset, points] = useDoorloop();
    return <Component {...props} status={status} closestPair={closestPair} step={step} 
                      currentIndex={currentIndex} setPoints={setPoints} reset={reset} points={points}/>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      treeChanged: false,
      showVertStroke: false,
      showHorStroke: false,
    }
  }

  canvasClick = (e, canvas) => {
    if (this.state.started) return;

    const rect = canvas.getBoundingClientRect();
    const xpos = e.clientX - Math.round(rect.left) - POINT_WIDTH;
    const ypos = e.clientY - rect.top - POINT_WIDTH;
    //TODO: Check if not colludign with existing points
    this.props.setPoints([...this.props.points, {x: xpos, y: ypos}]
      .sort((a, b) => a.x - b.x))
        
  }

  nexButtonClick = (e) => {
    this.props.step();
    this.setState( (prevState) => ({
      treeChanged: !prevState.treeChanged,
      started: true
    }))
  }

  resetButtonClick = (e) => {
    this.props.reset();
    this.setState( (prevState) => ({
      started: false,
      treeChanged: !prevState.treeChanged
    }))
  }

  render () {
    
    return (
      <div className="App">
        <Visualizer onClick={this.canvasClick} points={this.props.points} 
                    current={this.props.currentIndex} closestPair={this.props.closestPair} 
                    showHorStroke={this.state.showHorStroke}
                    showVertStroke={this.state.showVertStroke}                    
        ></Visualizer>
        <div className="VisualizerControls">
          <button onClick={this.nexButtonClick} disabled={this.props.currentIndex === this.props.points.length - 1}>Next</button>
          <button onClick={this.resetButtonClick}>RESET</button>
          <label>
            <input type="checkbox" value="Show hor stroke" onChange={() => {this.setState( (prev) => ({
              showHorStroke: !prev.showHorStroke
            }) )}}/>
            Show hor stroke
          </label>
          <label>
            <input type="checkbox" value="Show ver stroke" onChange={() => {this.setState( (prev) => ({
              showVertStroke: !prev.showVertStroke
            }) )}}/>
            Show ver stroke
          </label>
        </div>
        <TreeVisualizer tree={this.props.status}/>
    </div>
    );
  }
}

export default withHook(App);
