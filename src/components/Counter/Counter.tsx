import React from "react";
interface ICounterProps {
  counter: number;
}

class Counter extends React.Component<any, ICounterProps> {
  constructor(props: any) {
    super(props);
    this.state = {
      counter: 0,
    };
  }
  componentDidMount() {
    setInterval(() => {
      this.setState((prev) => ({ counter: prev.counter + 1 }));
      console.log(this.state.counter);
    }, 1000);
  }
  componentWillUnmount(): void {
    clearInterval(this.state.counter);
  }
  render(): React.ReactNode {
    return (
      <div>
        <h1>{this.state.counter}</h1>
      </div>
    );
  }
}
export { Counter };
