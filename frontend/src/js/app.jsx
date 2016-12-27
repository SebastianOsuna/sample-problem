'use strict';
import {render} from 'react-dom';
import Hamburger from './components/Hamburger.jsx';
import NewsList from './components/NewsList.jsx';


class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, news: [1,2,3,4,5,6] };
  }

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <div className='mainPanel'>
        <div className='header'>
          <Hamburger onClick={() => this.toggleOpen()} />
        </div>
        <div className='body'>
          <NewsList open={this.state.open} news={this.state.news}/>
        </div>
      </div>
    )
  }
}
 
// Hold to show loading animation only on production
setTimeout(() => render(<Application />, document.getElementById('app')), process.env.ENV == 'production' ? 1000 : 0);
