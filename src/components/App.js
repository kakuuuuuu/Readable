import React, { Component } from 'react';
import { connect } from 'react-redux'
import Home from './home/Home'
import Post from './post/Post'
import Modal from 'react-modal'
import { Route } from 'react-router-dom'
import { fetchCategories, fetchPosts, createPost } from '../actions'
import {Button, Navbar, NavItem, Icon, Input} from 'react-materialize'
import uuidv4 from 'uuid/v4'

class App extends Component {

  state = {
    postModalOpen: false,
    title: '',
    body: '',
    author: '',
    category: ''
  }

  /*
    * Sets postModalOpen state bool to true
  */
  openPostModal = () => {
    this.setState(() => ({
      postModalOpen: true
    }))
  }

  /*
    * Sets postModalOpen state bool to false and resets state/form data
  */
  closePostModal = () => {
    this.setState(() => ({
      postModalOpen: false,
      title: '',
      body: '',
      author: '',
      category: ''
    }))
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
    * Handles input change for select input
  */
  handleCategoryChange = (e) => {
    e.preventDefault();
    this.setState({
      category: e.target.value
    })
  }

  /*
    * Handles submitting new post
    * id - unique id
    * timestamp - timestamp of last edit
    * title - title of post
    * body - body of post
    * author - author of post
    * category - category of post
    * Sends data to and triggers createPost action
  */
  handleSubmit = (e) => {
    e.preventDefault();
    const { postModalOpen, title, body, author, category } = this.state
    const data = {
      id: uuidv4(),
      timestamp: Date.now(),
      title,
      body,
      author,
      category
    }
    this.props.submitPost(data)
      .then(()=> {
        this.closePostModal()
      })

  }

  /*
    * Fetches Category and Post lists and saves to store
  */
  componentDidMount() {
    this.props.getAllCategories()
    this.props.getAllPosts()
  }
  /*
    * Configuration for Modal
  */
  componentWillMount() {
    Modal.setAppElement('body');
  }



  render() {
    const { postModalOpen, title, body, author, category } = this.state
    return (
      <div className="App">
        <Navbar brand='Readable' right>
          <NavItem onClick={() => this.props.history.push('/')}>Home</NavItem>
          <NavItem onClick={() => this.openPostModal()}><Icon>add</Icon></NavItem>
        </Navbar>

        <Route exact path='/' component={Home}/>
        <Route exact path='/:category' component={Home}/>
        <Route exact path='/:category/:id' component={Post}/>
        <Modal
          className='new-post-modal'
          overlayClassName='overlay'
          isOpen={postModalOpen}
          onRequestClose={this.closePostModal}
          contentLabel='Modal'
        >
          {postModalOpen && (
            <div className=''>
              <h4>Create a post</h4>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <Input
                    className='title-Input'
                    type='text'
                    placeholder='Title'
                    name='title'
                    value={title}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <Input
                    className='author-Input'
                    type='text'
                    placeholder='Author'
                    name='author'
                    value={author}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <Input type='select' label="Category" defaultValue='' onChange={this.handleCategoryChange}>
                    <option value=''></option>
                    {
                      this.props.categories.map(category => (
                        <option value={category.name} key={category.path}>{category.name}</option>
                      ))
                    }
                  </Input>
                </div>
                <div>
                  <Input
                    type='textarea'
                    className='body-Input'
                    placeholder='...'
                    name='body'
                    value={body}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <Button type='submit'>Submit</Button>
                </div>
              </form>
            </div>
          )}
        </Modal>
      </div>
    );
  }
}

function mapStateToProps ({ categories, posts }) {
  return {
    categories,
    posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getAllCategories: () => dispatch(fetchCategories()),
    getAllPosts: () => dispatch(fetchPosts()),
    submitPost: (data) => dispatch(createPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
