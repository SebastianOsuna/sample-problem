export default class NewsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: true, animate: false };
  }

  componentDidMount() {
    setTimeout(() => {this.setState({ animate: true })}, 70 * this.props.index);
  }

  toggleCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    return (
      <li className={`newsItem ${this.state.animate ? 'anim' : ''}`}>
        <div onClick={() => this.toggleCollapse()} className='preview'> 
          <span>Hola</span>
        </div>
        <div className={`extra ${this.state.collapsed ? 'collapsed' : 'notcollapsed'}`}>
          <div className='content'>
            <span>extra</span>
          </div>
        </div>
      </li>
    )
  }
}