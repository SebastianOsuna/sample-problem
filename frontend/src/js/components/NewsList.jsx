
import NewsItem from './NewsItem.jsx';

const NewsList = class NewsList extends React.Component {
  render() {
    if (!this.props.open) return null;
    return ( 
      <ul className='newsList visible'>
        {
          this.props.news.map((news, i) => <NewsItem key={i} index={i} item={news}/>)
        }
      </ul>
    )
  }
}

NewsList.defaultProps = {
  news: [],
  open: false
};

export default NewsList;