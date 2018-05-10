import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { sendPostVote, sendDeletePost, sendEditPost } from '../../actions'
import { Button, Icon, Row, Col, Input } from 'react-materialize'


class PostSummary extends Component {

  state = {
    editOpen: false,
    editTitle: '',
    editBody: '',
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
    * Handles submitting new post
    * Uses id from this.props.post
    * Sends id to and triggers sendDeletePost action
  */
  handleDelete = (e) => {
    e.preventDefault()
    this.props.deletePost()
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

  render(){
    const { post } = this.props
    const { editOpen, editTitle, editBody } = this.state
    return (
      <Col s={3}>
        {
          (editOpen === false && (
            <h5><Link to={`/${post.category}/${post.id}`}>{post.title}</Link></h5>
          )) || (
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
                  label='Title'
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
                  label='Body'
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
        <p>Author: {post.author}</p>
        <p>Comments: {post.commentCount}</p>
        <p>Score: {post.voteScore}</p>
        {
          (editOpen === false && (
            <Row>
              <Button onClick={this.handleVote("upVote")} icon='add'/>
              <Button onClick={this.handleVote("downVote")} icon='remove'/>
              <Button onClick={this.triggerEdit} icon='edit'/>
              <Button onClick={this.handleDelete} icon='delete'/>
            </Row>
          ))
        }
      </Col>
    )
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    votePost: (data) => dispatch(sendPostVote(data)),
    editPost: (id, data) => dispatch(sendEditPost(id, data)),
    deletePost: () => dispatch(sendDeletePost(ownProps.post.id))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(PostSummary)
