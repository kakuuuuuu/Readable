# Readable Project

* install all project dependencies with `npm install`
* start the development server with `npm start` or `yarn start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    └── actions
        └── index.js
    └── components
        └── comment
            └── Comment.js # Comment component to display comment: body, author and score
        └── home
            ├── Home.js # Home page component to display all posts or posts matching category
            └── PostSummary.js # Short post component to display author, comment#, score and vote/edit/delete buttons
        └── post
            └── Post.js # Full post component to display all post data/buttons, corresponding comments and new comment form
    └── reducers
        └── index.js
    └── utils
        └── API.js
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains navbar and modal for creating a new post
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```
## Components

Created a separate subdirectory to organize which files were components.  Descriptions of each individual component are as follows:

### App.js

Base component that contains the routing for the following components.  Contains the navbar as well as the modal for creating a new post.  The modal is accessible on any route and contains a form for previously mentioned creation of a new post.  This component upon loading dispatches actions to fetch/store/access the corresponding data from the API server:
- categories: Array containing all category objects
- posts: Array containing all post objects
- getAllPosts: Fetches all posts from store
- getAllCategories: Fetches all categories from store
- submitPost: Dispatch action to create new post

### Home.js

Homepage component used to display all posts or all posts matching to the active category.  The first of two select inputs filters the posts displayed by vote score or date posted.  The second select input changes the route and filters by category.  This component accesses the following data from the store:
- categories: Array containing all category objects
- posts: Array containing all post objects
- getAllPosts: Fetches all posts from store
- getAllCategories: Fetches all categories from store

### PostSummary.js

Short post component used to preview a post on the homepage.  Preview shows the post title, author, comment number, score as well as vote/edit/delete buttons. Editing post will hide buttons to prevent changes in data from interfering with functionality until submitted or cancelled.  This component takes in the following parameters:
- post: post object provided by parent Home.js
- votePost: Dispatch action to vote up/down on post
- editPost: Dispatch action to edit post
- deletePost: Dispatch action to delete post

### Post.js

Full post component used to display all post data [title, body, author, comment #, score, vote/edit/delete buttons] and corresponding comments.  Editing post will hide buttons to prevent changes in data from interfering with functionality until submitted or cancelled.  Also features a field for creating a new comment with a textarea for the body and a text input for the author, that will appear when there is content in the body.  This component takes in the following parameters:
- post: post object matching the id in the route params
- comments: comments array matching the parentId in the route params
- getComments: Dispatches action to fetch comments matching active post id
- submitComment: Dispatches action to create new comment
- votePost: Dispatches action to vote up/down on post
- editPost: Dispatches action to edit post
- deletePost: Dispatches action to delete post


### Comment.js

Comment component used to display all comment data [body, author, score, vote/edit/delete buttons].  Editing comment will hide buttons to prevent changes in data from interfering with functionality until submitted or cancelled.  This component takes in the following parameters:
- comment: comment object provided by the parent Post.js
- voteComment: Dispatches action to vote up/down on comment
- deleteComment: Dispatches action to delete comment
- editComment: Dispatches action to edit comment

## Backend Server

The provided file [`API.js`](src/utils/API.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAllCategories`](#getallcategories)
* [`getAllPosts`](#getallposts)
* [`submitPost`](#submitpost)
* [`votePost`](#votepost)
* [`editPost`](#editpost)
* [`deletePost`](#deletePost)
* [`getComments`](#getcomments)
* [`submitComment`](#submitcomment)
* [`voteComment`](#votecomment)
* [`editComment`](#editcomment)
* [`deleteComment`](#deletecomment)

### `getAllCategories`

Method Signature:

```js
getAllCategories()
```

* Returns a Promise which resolves to a JSON object containing a collection of category objects.
* This collection represents the categories in your app.

### `getAllPosts`

Method Signature:

```js
getAllPosts()
```

* Returns a Promise which resolves to a JSON object containing a collection of post objects.
* This collection represents the posts in your app.

### `submitPost`

Method Signature:

```js
submitPost(post)
```

* post: `<Object>`
* Returns a Promise which resolves to a JSON object containing a post object to be added to store.

### `votePost`

Method Signature:

```js
votePost(id, vote)
```

* id: `<String>`
* vote: `<Object>`
* Returns a Promise which resolves to a JSON object containing a post object to be updated in store.

### `editPost`

Method Signature:

```js
editPost(id, data)
```

* id: `<String>`
* data: `<Object>`
* Returns a Promise which resolves to a JSON object containing a post object to be updated in store.

### `deletePost`

Method Signature:

```js
deletePost(id)
```

* id: `<String>`
* Returns a Promise which resolves to a JSON object containing a post object to be removed from store.

### `getComments`

Method Signature:

```js
getComments()
```

* Returns a Promise which resolves to a JSON object containing a collection of comment objects.
* This collection represents the posts in your app.

### `submitComment`

Method Signature:

```js
submitComment(comment)
```

* comment: `<Object>`
* Returns a Promise which resolves to a JSON object containing a comment object to be added to store.

### `voteComment`

Method Signature:

```js
voteComment(id, vote)
```

* id: `<String>`
* vote: `<Object>`
* Returns a Promise which resolves to a JSON object containing a comment object to be updated in store.

### `editComment`

Method Signature:

```js
editComment(id, data)
```

* id: `<String>`
* data: `<Object>`
* Returns a Promise which resolves to a JSON object containing a comment object to be updated in store.

### `deletePost`

Method Signature:

```js
deleteComment(id)
```

* id: `<String>`
* Returns a Promise which resolves to a JSON object containing a comment object to be removed from store.


## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Contributing

This repository is the starter code for _all_ Udacity students. Therefore, we most likely will not accept pull requests.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
