export default class Hamburger extends React.Component {
  render() {
    return (
      <button className='hamburger' onClick={this.props.onClick}>
        <span className='strip'></span>
        <span className='strip'></span>
      </button>
    )
  }
}