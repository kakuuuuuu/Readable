import React, { Component } from 'react'
import { connect } from 'react-redux'
import { sendCommentVote, sendEditComment, sendDeleteComment } from '../../actions'
import { Row, Button, Input } from 'react-materialize'

class Comment extends Component {

  state = {
    editOpen: false,
    editBody: this.props.comment.body
  }

  /*
    * Handles voting on comment
    * id - unique id
    * option - parameter for voting up or down
    * Sends data to and triggers sendCommentVote action
  */
  handleVote = (option) => (e) => {
    e.preventDefault()
    this.props.voteComment({ id: this.props.comment.id, option })
  }

  /*
    * Handles deleting comment
    * Uses id from this.props.post
    * Sends id to and triggers sendDeleteComment action
  */
  handleDelete = (e) => {
    e.preventDefault();
    this.props.deleteComment()
  }

  /*
    * Handles editting comment
    * id - unique id
    * timestamp - date of last edit
    * body - body of post
    * Sends data to and triggers sendEditComment action
  */
  handleEdit = (e) => {
    e.preventDefault();
    const data = {
      timestamp: Date.now(),
      body: this.state.editBody
    }
    this.props.editComment(this.props.comment.id, data)
    this.setState({ editOpen: false })
  }

  /*
    * Handles change for body
    * Updates state to match input
  */
  updateBody = (editBody) => {
    this.setState({ editBody });
  };

  render() {
    const { comment } = this.props
    const { editOpen, editBody } = this.state
    return (
      <div>
      {
        (comment !== undefined && (
          <div key={comment.id}>
            {(editOpen === false && (
              <p>"{comment.body}"</p>
            )) ||
              (<form>
                <Row>
                  <Input
                    s={7}
                    type='text'
                    value={editBody}
                    name='editBody'
                    label='Body'
                    onChange={(event) => this.updateBody(event.target.value)}
                  />
                </Row>
                <div>
                  <Button floating onClick={this.handleEdit} icon='send' />
                  <Button floating onClick={() => {this.setState({editOpen: false})}} icon='cancel' />
                </div>
              </form>)
            }
            <Row>
            <p> - {comment.author}</p>
            <p>Score: {comment.voteScore}</p>
            </Row>
            {
              (editOpen === false && (
                <Row>
                  <Button onClick={this.handleVote("upVote")} icon='add' />
                  <Button onClick={this.handleVote("downVote")} icon='remove' />
                  <Button onClick={() => {this.setState({editOpen: true})}} icon='edit' />
                  <Button onClick={this.handleDelete} icon='delete' />
                </Row>
              ))
            }
          </div>
        ))
      }
      </div>
    )
  }
}

function mapStateToProps ( state, ownProps ) {
  return {
    comment: state.comments.filter(comment => comment.id === ownProps.id)[0],
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    voteComment: (data) => dispatch(sendCommentVote(data)),
    deleteComment: () => dispatch(sendDeleteComment(ownProps.id)),
    editComment: (id, data) => dispatch(sendEditComment(id, data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment)
