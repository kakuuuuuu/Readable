import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchPosts, fetchCategories } from '../../actions'
import PostSummary from './PostSummary'
import { Button, Row, Input } from 'react-materialize'
class Home extends Component {

  state = {
    sortQuery: '',
    reverseDirection: false
  }

  /*
    * Handles input change for sorting list of posts
    * sortQuery - Sorting parameter [timestamp/score]
    * reverseDirection - Direction for sort [Ascending/Descending]
    * Updates state according to parameter chosen
  */
  handleSort = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.target.value)
    this.setState({
      sortQuery: data.option,
      reverseDirection: data.direction
    })
  }

  /*
    * Handles input change for selecting category
    * Changes the browser route according to the category chosen
  */
  handleCategoryChange = (e) => {
    e.preventDefault();
    this.props.history.push(`/${e.target.value}`)
  }

  render () {
    const { posts, categories } = this.props
    const { sortQuery, reverseDirection } = this.state
    return (
      <div>
        <Row>
          {
            (this.props.match.params.category  && (
              <h4>Category - {this.props.match.params.category}</h4>
            )) || (
              <h4>All Posts</h4>
            )
          }
          <Row>
            <Input s={3} type='select' label="Sort By" defaultValue='' onChange={this.handleSort}>
              <option value='{"option": null, "direction": false}'>None</option>
              <option value='{"option": "timestamp", "direction": true}'>Oldest</option>
              <option value='{"option": "timestamp", "direction": false}'>Newest</option>
              <option value='{"option": "voteScore", "direction": false}'>Score [Descending]</option>
              <option value='{"option": "voteScore", "direction": true}'>Score [Ascending]</option>
            </Input>
            <Input s={3} type='select' label="Category" defaultValue={this.props.match.params.category} onChange={this.handleCategoryChange}>
              <option value=''>None</option>
              {
                categories.map(category => (
                  <option value={category.name} key={category.path}>{category.name}</option>
                ))
              }
            </Input>
          </Row>
          <Row>
          {
            (posts !== undefined &&
              (sortQuery && (reverseDirection === false && (
                  posts.sort((a, b) => {return a[sortQuery] - b[sortQuery]}).reverse().map(post => <PostSummary post={post} key={post.id}/>)
                ) || (
                  posts.sort((a, b) => {return a[sortQuery] - b[sortQuery]}).map(post => <PostSummary post={post} key={post.id}/>)
                )
              )) || (
                posts.map(post => <PostSummary post={post} key={post.id} />)
              )
            )
          }
          </Row>
        </Row>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    posts: (ownProps.match.params.category && (
      state.posts.filter(post => post.category === ownProps.match.params.category)
    )) || (state.posts),
    categories: state.categories
  }
}
function mapDispatchToProps (dispatch) {
  return {
    getAllCategories: () => dispatch(fetchCategories()),
    getAllPosts: () => dispatch(fetchPosts())
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps
)(Home)
