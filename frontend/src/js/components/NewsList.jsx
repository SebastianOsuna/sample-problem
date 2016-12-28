import NewsItem from './NewsItem.jsx';
import ItemsStore from '../stores/items';

const NewsList = class NewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fetching: {} };
  }

  componentDidMount() {
    this.stopListening = ItemsStore.listen(state => this.setState(state));
  }

  componentWillUnmount() {
    this.stopListening();
  }
  
  render() {
    if (!this.props.open) return null;
    return ( 
      <ul className='newsList visible'>
        {
          this.props.news.map((news, i) => {
            return (
              <NewsItem 
                key={i} 
                index={i} 
                item={news} 
                subItems={this.props.subItems[news.categori_id]}
                loading={!!this.state.fetching[news.categori_id]}/>
            )
          })
        }
      </ul>
    )
  }
}

NewsList.defaultProps = {
  news: [],
  subItems: {},
  open: false
};

export default NewsList;