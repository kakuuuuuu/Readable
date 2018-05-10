import * as API from '../utils/API'

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
export const GET_ALL_POSTS = 'GET_ALL_POSTS'
export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const GET_COMMENTS = 'GET_COMMENTS'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'


/*
  * Fetches list of categories from API
  * Categories array returned from API is sent to recieveCategories action
*/
export const fetchCategories = () => dispatch => (
  API.getAllCategories()
    .then(categories => dispatch(receiveCategories(categories)))
)

/*
  * Sends action to add all categories to store
  * categories - Array of categories retrieved from API
*/
export const receiveCategories = categories => ({
  type: GET_ALL_CATEGORIES,
  categories
})

/*
POSTS
*/

/*
  * Fetches list of posts from API
  * Posts array returned from API is sent to recievePosts action
*/
export const fetchPosts = () => dispatch => (
  API.getAllPosts()
    .then(posts => dispatch(receivePosts(posts)))
)

/*
  * Sends action to add all posts to store
  * posts - Array of posts retrieved from API
*/
export const receivePosts = posts => ({
  type: GET_ALL_POSTS,
  posts
})

/*
  * Sends data for new post to API
  * Post data returned from API is sent to addPost action
*/
export const createPost = (post) => dispatch => (
  API.submitPost(post)
    .then(data => dispatch(addPost(data)))
)

/*
  * Sends action to add new post to store
  * post - Post object returned from API
*/
export const addPost = post => ({
    type: ADD_POST,
    post
})

/*
  * Sends vote object to API
  * Post data returned from API is sent to recievePostVote action
*/
export const sendPostVote = (data) => dispatch => (
  API.votePost(data.id, { option: data.option })
    .then(post => dispatch(recievePostVote(post)))
)

/*
  * Sends action to update post in store
  * post - Post object returned from API
*/
export const recievePostVote = post => ({
  type: VOTE_POST,
  post
})

/*
  * Sends edit object to API
  * Post data returned from API is sent to recieveEditVote action
*/
export const sendEditPost = (id, data) => dispatch => (
  API.editPost(id, data)
    .then(post => dispatch(recieveEditPost(post)))
)

/*
  * Sends action to update post in store
  * post - Post object returned from API
*/
export const recieveEditPost = post => ({
  type: EDIT_POST,
  post
})

/*
  * Sends id to API call
  * Post data returned from API is sent to recieveDeletePost action
*/
export const sendDeletePost = (id) => dispatch => (
  API.deletePost(id)
    .then(post => dispatch(recieveDeletePost(post)))
)

/*
  * Sends action to remove post from store
  * post - Post object returned from API
*/
export const recieveDeletePost = post => ({
  type: DELETE_POST,
  post
})

/*
COMMENTS
*/

/*
  * Sends post id to API
  * Comment array returned from API is sent to recieveComments action
*/
export const fetchComments = (id) => dispatch => (
  API.getComments(id)
    .then(comments => dispatch(recieveComments(comments)))
)

/*
  * Sends action to add comments to store
  * comments - Comments array returned from API
*/
export const recieveComments = comments => ({
  type: GET_COMMENTS,
  comments
})

/*
  * Send data for new comment to API
  * Comment object is sent to addComment action
*/
export const createComment = (comment) => dispatch => (
  API.submitComment(comment)
    .then(data => dispatch(addComment(data)))
)

/*
  * Sends action to add new comment to store
  * comment - Comment object returned from API
*/
export const addComment = comment => ({
  type: ADD_COMMENT,
  comment
})

/*
  * Send vote object to API
  * Comment object is sent to recieveCommentVote action
*/
export const sendCommentVote = (data) => dispatch => (
  API.voteComment(data.id, { option: data.option })
    .then(comment => dispatch(recieveCommentVote(comment)))
)

/*
  * Sends action to update comment in store
  * comment - Comment object returned from API
*/
export const recieveCommentVote = comment => ({
  type: VOTE_COMMENT,
  comment
})

/*
  * Send edit object to API
  * Comment object is sent to recieveEditComment action
*/
export const sendEditComment = (id, data) => dispatch => (
  API.editComment(id, data)
    .then(comment => dispatch(recieveEditComment(comment)))
)

/*
  * Sends action to update comment in store
  * comment - Comment object returned from API
*/
export const recieveEditComment = comment => ({
  type: EDIT_COMMENT,
  comment
})

/*
  * Send comment id to API
  * Comment object is sent to recieveDeleteComment action
*/
export const sendDeleteComment = (id) => dispatch => (
  API.deleteComment(id)
    .then(comment => dispatch(recieveDeleteComment(comment)))
)

/*
  * Sends action to remove comment from store
  * comment - Comment object returned from API
*/
export const recieveDeleteComment = comment => ({
  type: DELETE_COMMENT,
  comment
})
