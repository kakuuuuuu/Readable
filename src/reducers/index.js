import { combineReducers } from 'redux'
import {
  GET_ALL_CATEGORIES,
  GET_ALL_POSTS,
  ADD_POST,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST,
  GET_COMMENTS,
  ADD_COMMENT,
  VOTE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from '../actions'


/*
  * POST REDUCER
  * GET_ALL_POSTS -
    * Add all posts to store
  * ADD_POST -
    * Add new post to store
  * VOTE_POST -
    * Updates post score with matching post id
  * EDIT_POST -
    * Updates post content with matching post id
  * DELETE_POST -
    * Removes post from store
*/
function posts (state = [], action) {
  const { posts, post } = action
  switch (action.type) {
    case GET_ALL_POSTS:
      return posts
    case ADD_POST:
      return [
        ...state, post
      ]
    case VOTE_POST:
      return state.map((obj) => {
        if (obj.id === post.id){
          return post
        }
        return obj
      })
    case EDIT_POST:
      return state.map((obj) => {
        if (obj.id === post.id){
          return post
        }
        return obj
      })
    case DELETE_POST:
      return state.filter((obj) => obj.id !== post.id)
    default:
      return state
  }
}

/*
  * COMMENT REDUCER
  * GET_COMMENTS -
    * Add all comments [corresponding to active post] to store
  * ADD_COMMENT -
    * Add new comment to store
  * VOTE_COMMENT -
    * Updates comment score with matching comment id
  * EDIT_COMMENT -
    * Updates comment content with matching comment id
  * DELETE_COMMENT -
    * Removes comment from store
*/
function comments (state = [], action) {
  const { comments, comment } = action
  switch (action.type) {
    case GET_COMMENTS:
      return comments
    case ADD_COMMENT:
      return [
        ...state, comment
      ]
    case VOTE_COMMENT:
      return state.map((obj) => {
        if (obj.id === comment.id){
          return comment
        }
        return obj
      })
    case EDIT_COMMENT:
      return state.map((obj) => {
        if (obj.id === comment.id){
          return comment
        }
        return obj
      })
    case DELETE_COMMENT:
      return state.filter((obj) => obj.id !== comment.id)
    default:
      return state
  }
}

/*
  * CATEGORIES REDUCER
  * GET_ALL_CATEGORIES -
    * Add all categories to store
*/
function categories (state = [], action) {
  const { categories } = action
  switch (action.type) {
    case GET_ALL_CATEGORIES:
      return categories
    default:
      return state
  }
}

export default combineReducers({
  categories,
  posts,
  comments
})
