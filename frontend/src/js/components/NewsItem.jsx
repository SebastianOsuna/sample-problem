import Actions from '../actions';
import ItemsStore from '../stores/items';

export default class NewsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: true, animate: false };
  }

  componentDidMount() {
    setTimeout(() => {this.setState({ animate: true })}, 50 * this.props.index);

  }

  toggleCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
    if (this.state.collapsed && !this.props.subItems) {
      this.loadSubItems();
    }
  }

  loadSubItems() {
    Actions.getSubItems(this.props.item.categori_id);
  }

  render() {
    return (
      <li className={`newsItem ${this.state.animate ? 'anim' : ''}`}>
        <div onClick={() => this.toggleCollapse()} className='preview'> 
          <img className="categoryIcon" />
          <span className="categoryName" >{this.props.item.name}</span>
        </div>
        <div className={`extra ${this.state.collapsed ? 'collapsed' : 'notcollapsed'} ${this.props.loading || (!this.props.subItems || this.props.subItems.lenght === 0) ? 'small' : ''}`}>
          {
            this.props.loading ?
            <p className="loading">Loading</p>
            : null
          }
          {
            (this.props.subItems || []).map(
              (subitem, i) => {
                return (
                  <div className={`content ${subitem.best_seller ? 'best_seller' : ''}`} key={i}>
                    <img src={subitem.img} className="itemImage" />
                    <div className="details">
                      <h4 className={`title ${subitem.available ? '' : 'unavailable'}`}>
                        {subitem.name} - <span>$ {subitem.price}</span>
                      </h4>
                      <p className="description">{subitem.description}</p>
                    </div>
                  </div>
                )
              }
            )
          }
          {
            !this.props.loading && (!this.props.subItems || this.props.subItems.lenght === 0) ?
            <p className="empty">Nothing to see here</p>
            : null
          }
        </div>
      </li>
    )
  }
}