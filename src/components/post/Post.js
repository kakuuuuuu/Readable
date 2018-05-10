import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchComments, createComment, sendPostVote, sendEditPost, sendDeletePost } from '../../actions'
import Comment from '../comment/Comment'
import { Row, Col, Button, Input } from 'react-materialize'

import uuidv4 from 'uuid/v4'

class Post extends Component {

  state = {
    editOpen: false,
    editTitle: '',
    editBody: '',
    commentBody: '',
    commentAuthor: '',
  }

  /*
    * Handles input change for corresponding key in state
  */
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  /*
    * Handles submitting new comment
    * id - unique id
    * timestamp - timestamp of last edit
    * body - body of post
    * author - author of post
    * parentId - id of active post
    * Sends data to and triggers createComment action
  */
  handleSubmit = (e) => {
    e.preventDefault();
    const { commentBody, commentAuthor } = this.state
    const data = {
      id: uuidv4(),
      timestamp: Date.now(),
      body: commentBody,
      author: commentAuthor,
      parentId: this.props.match.params.id
    }
    this.props.submitComment(data)
      .then(this.clearState())
  }

  /*
    * Handles voting on post
    * id - unique id
    * option - parameter for voting up or down
    * Sends data to and triggers sendPostVote action
  */
  handleVote = (option) => (e) => {
    e.preventDefault()
    this.props.votePost({ id: this.props.post.id, option })
  }

  /*
    * Handles editting post
    * id - unique id
    * title - title of post
    * body - body of post
    * Sends data to and triggers sendEditPost action
  */
  handleEdit = (e) => {
    e.preventDefault()
    const data = {
      title: this.state.editTitle,
      body: this.state.editBody
    }
    this.props.editPost(this.props.post.id, data)
    this.setState({
      editOpen: false
    })
  }

  /*
    * Handles deleting post
    * Uses id from this.props.post
    * Sends id to and triggers sendDeletePost action
    * Changes route back to root after deleting
  */
  handleDelete = (e) => {
    e.preventDefault()
    this.props.deletePost()
    this.props.history.push('/')
  }

  /*
    * Resets state
    * commentBody - body of comment
    * commentAuthor - author of comment
    * Sets state back to empty strings upon submitting new comment
  */
  clearState = () => {
    this.setState({
      commentBody: '',
      commentAuthor: ''
    })
  }

  /*
    * Triggers edit
    * editOpen - Changed to true
    * editTitle - input string set to post's title
    * editBody - body string set to post's body
    * editOpen state changed to true to reveal edit form and hide other buttons
  */
  triggerEdit = () => {
    this.setState({
      editOpen: true,
      editTitle: this.props.post.title,
      editBody: this.props.post.body
    })
  }

  /*
    * Resets edit boolean
    * editOpen - Set to false
    * editOpen state changed to false to hide edit form and restore other buttons
  */
  cancelEdit = () => {
    this.setState({
      editOpen: false
    })
  }

  /*
    * Fetches Comments lists matching active post id and saves to store
  */
  componentDidMount() {
    this.props.getComments()
  }

  render() {
    const { post, comments } = this.props
    const { commentBody, commentAuthor, editOpen, editTitle, editBody } = this.state
    return (
      <div>
      {
        (post !== undefined && (
          post.deleted === false && (
            (
              <Row>
                <Col s={9} key={post.id}>
                  {(
                    editOpen === false && (
                      <div>
                        <h4>{post.title}</h4>
                        <p>{post.body}</p>
                      </div>
                    )) ||
                    (
                      <form onSubmit={this.handleEdit}>
                        <Row>
                          <h5>Edit</h5>
                        </Row>
                        <Row>
                          <Input
                            s={6}
                            className='edit-title-Input'
                            type='text'
                            value={editTitle}
                            name='editTitle'
                            onChange={this.handleChange}
                          />
                        </Row>
                        <Row>
                          <Input
                            s={8}
                            type='textarea'
                            className='body-Input'
                            value={editBody}
                            name='editBody'
                            onChange={this.handleChange}
                          />
                        </Row>
                        <Row>
                          <Button type='submit' icon='send' />
                          <Button onClick={this.cancelEdit} icon='cancel' />
                        </Row>
                      </form>
                    )
                  }
                  <p>- {post.author}</p>
                  <p>Comments: {post.commentCount}</p>
                  <p>Score: {post.voteScore}</p>
                  {
                    (editOpen === false && (
                      <Row>
                        <Button floating onClick={this.handleVote("upVote")} icon='add'/>
                        <Button floating onClick={this.handleVote("downVote")} icon='remove' />
                        <Button floating onClick={this.triggerEdit} icon='edit' />
                        <Button floating onClick={this.handleDelete} icon='delete' />
                      </Row>
                    ))
                  }

                </Col>
                <Col s={9}>
                  <h5>Comments</h5>
                  <Row>
                    <form s={12} onSubmit={this.handleSubmit}>
                      <Row>
                        <Input
                          type='textarea'
                          s={9}
                          className='body-Input'
                          placeholder='Leave a Comment...'
                          name='commentBody'
                          value={commentBody}
                          onChange={this.handleChange}
                        />
                      </Row>
                      {(commentBody.length > 0 && (
                        <Row>
                          <Input
                            className='author-Input'
                            type='text'
                            placeholder='Author'
                            name='commentAuthor'
                            value={commentAuthor}
                            onChange={this.handleChange}
                          />
                        </Row>
                      ))}
                      <Row>
                        <Button icon='send' />
                      </Row>

                    </form>
                    <Col>
                  {
                    (comments.length > 0 && (
                      comments.map(comment => (
                        <Comment id={comment.id}  />
                      ))
                    ))
                  }
                    </Col>
                  </Row>
                </Col>
              </Row>
            )
          )
        ) || (
          <Row>
            <Col>
              <h3>404 Not Found</h3>
            </Col>
          </Row>
        ))
      }
      </div>
    )
  }
}


function mapStateToProps ( state, ownProps ) {
  return {
    post: state.posts.filter(post => post.id === ownProps.match.params.id)[0],
    comments: state.comments
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    getComments: () => dispatch(fetchComments(ownProps.match.params.id)),
    submitComment: (data) => dispatch(createComment(data)),
    votePost: (data) => dispatch(sendPostVote(data)),
    editPost: (id, data) => dispatch(sendEditPost(id, data)),
    deletePost: () => dispatch(sendDeletePost(ownProps.match.params.id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)
