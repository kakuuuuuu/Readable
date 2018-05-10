const api = "http://localhost:3001"

const headers = {
  'Authorization': 'blah',
}

export const getAllCategories = () =>
  fetch(`${api}/categories`, { method:'GET', headers })
    .then(res => res.json())
    .then(data => data.categories)

/*
POSTS
*/

export const getAllPosts = () =>
  fetch(`${api}/posts`, { method:'GET', headers })
    .then(res => res.json())

export const submitPost = (post) =>
  fetch(`${api}/posts`, { method:'POST', headers: { ...headers, 'content-type': 'application/json' }, body: JSON.stringify(post) })
    .then(res => res.json())

export const votePost = (id, vote) =>
  fetch(`${api}/posts/${id}`, { method:'POST', headers: { ...headers, 'content-type': 'application/json' }, body: JSON.stringify(vote) })
    .then(res => res.json())

export const editPost = (id, data) =>
  fetch(`${api}/posts/${id}`, { method:'PUT', headers: { ...headers, 'content-type': 'application/json' }, body: JSON.stringify(data) })
    .then(res => res.json())

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, { method:'DELETE', headers })
    .then(res => res.json())

/*
COMMENTS
*/

export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { method:'GET', headers })
    .then(res => res.json())

export const submitComment = (comment) =>
  fetch(`${api}/comments`, { method:'POST', headers: { ...headers, 'content-type': 'application/json' }, body: JSON.stringify(comment) })
    .then(res => res.json())

export const voteComment = (id, vote) =>
  fetch(`${api}/comments/${id}`, { method:'POST', headers: { ...headers, 'content-type': 'application/json' }, body: JSON.stringify(vote) })
    .then(res => res.json())

export const editComment = (id, data) =>
  fetch(`${api}/comments/${id}`, { method:'PUT', headers: { ...headers, 'content-type': 'application/json'}, body: JSON.stringify(data) })
    .then(res => res.json())

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, { method:'DELETE', headers })
    .then(res => res.json())
