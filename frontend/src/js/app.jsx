'use strict';
import {render} from 'react-dom';
import Hamburger from './components/Hamburger.jsx';
import NewsList from './components/NewsList.jsx';
import ItemsStore from './stores/items';


class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, news: [1,2,3,4,5,6], subItems: {} };
  }

  componentDidMount() {
    this.stopListening = ItemsStore.listen(state => this.setState(state));
  }

  componentWillUnmoun() {
    this.stopListening();
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
          <NewsList open={this.state.open} news={DATA.categories} subItems={this.state.subItems}/>
        </div>
      </div>
    )
  }
}
 
// Hold to show loading animation only on production
setTimeout(() => render(<Application />, document.getElementById('app')), process.env.NODE_ENV == 'production' ? 1000 : 0);
