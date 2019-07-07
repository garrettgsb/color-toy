import * as React from 'react';

class App extends React.Component <any, any> {
  refs: { [key: string]: any };
  red: React.Ref<HTMLElement>;
  green: React.Ref<HTMLElement>;
  blue: React.Ref<HTMLElement>;

  constructor(props: any) {

    super(props);
    this.red = React.createRef();
    this.green = React.createRef();
    this.blue = React.createRef();

    const range = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
    this.state = {
      red: range[Math.floor(Math.random() * range.length)],
      green: range[Math.floor(Math.random() * range.length)],
      blue: range[Math.floor(Math.random() * range.length)],
      range,
    };

    this.changeChannel = this.changeChannel.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.randomize = this.randomize.bind(this);
  }

  public randomize(): void {
    const { range } = this.state
    this.setState({
      red: range[Math.floor(Math.random() * range.length)],
      green: range[Math.floor(Math.random() * range.length)],
      blue: range[Math.floor(Math.random() * range.length)],
    })
  }

  public changeChannel(channel: string /* TODO: Enum */, value: number): void {
    this.setState({ [channel]: value });
  }

  public handleSliderChange(event: any, channel: string) {
    const value = this.state.range[(event.target as any).value];
    this.changeChannel(channel, value);
  }

  private handleEdit(event: any, channel: string): void {
    const channelMap = {
      red: { next: 'green', prev: 'blue'},
      green: { next: 'blue', prev: 'red'},
      blue: { next: 'red', prev: 'green'},
    };

    event.preventDefault();

    /*
      If the input value is valid (i.e. it exists in `this.state.range`), then
      change the value to that and go to the next input field. Otherwise, handle
      arrow keys and tabs to navigate as expected, and blur if any meta key
      is pressed (so as not to block hotkeys). Escape already blurs as expected.
    */
    if (this.state.range.map((char: string) => char.toLowerCase()).includes(event.key)) {
      this.setState({ [channel]: event.key.toUpperCase() });
      this[channelMap[channel].next].current.focus();
    } else if (event.key === 'ArrowLeft') {
      this[channelMap[channel].prev].current.focus();
    } else if (['ArrowRight', 'Tab'].includes(event.key)) {
      this[channelMap[channel].next].current.focus();
    } else if (['Meta', 'Alt', 'Control', '^'].includes(event.key)) {
      event.target.blur();
    }
  }

  render() {
    const { red, green, blue } = this.state;
    const fullColor = `#${red}${green}${blue}`;
    const redColor = `#${red}00`;
    const greenColor = `#0${green}0`;
    const blueColor = `#00${blue}`;
    return (
      <main className='background' style={{ backgroundColor: fullColor }}>
        <main className='content'>
          <h1>
          <span style={{ color: fullColor }}>#</span>
          <span ref={this.red} contentEditable onKeyDown={event => { this.handleEdit(event, 'red') }} style={{ color: redColor }}>{red}</span>
          <span ref={this.green} contentEditable onKeyDown={event => { this.handleEdit(event, 'green') }} style={{ color: greenColor }}>{green}</span>
          <span ref={this.blue} contentEditable onKeyDown={event => { this.handleEdit(event, 'blue') }} style={{ color: blueColor }}>{blue}</span>
          </h1>
          <div className="color-controls">
            <figure>
              <label>Red</label>
              <input style={{ background: `linear-gradient(to left, #F00, #000)` }} onChange={event => this.handleSliderChange(event, 'red')} type="range" value={this.state.range.indexOf(red)} min="0" max={this.state.range.length - 1}/>
            </figure>
            <figure>
              <label>Green</label>
              <input style={{ background: `linear-gradient(to left, #0F0, #000)` }} onChange={event => this.handleSliderChange(event, 'green')} type="range" value={this.state.range.indexOf(green)} min="0" max={this.state.range.length - 1}/>
            </figure>
            <figure>
              <label>Blue</label>
              <input style={{ background: `linear-gradient(to left, #00F, #000)` }} onChange={event => this.handleSliderChange(event, 'blue')} type="range" value={this.state.range.indexOf(blue)} min="0" max={this.state.range.length - 1}/>
            </figure>
          </div>
          <button onClick={this.randomize}>Randomize</button>
        </main>
      </main>
    )
  }
}

export default App;
