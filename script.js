// Sample blog post data
let posts = [
    { id: 1, title: "First Blog Post", content: "This is the content of the first blog post.", category: "Technology", tags: ["JavaScript", "Web Development"], author: "Onkar", createdAt: new Date() },
    { id: 2, title: "Second Blog Post", content: "This is the content of the second blog post.", category: "Travel", tags: ["Meghalaya", "India"], author: "Tejas", createdAt: new Date() },
    // Add more posts here
  ];
  
  // Sample user data
  let users = [
    { id: 1, username: "Onkar", password: "password", role: "admin" },
    // Add more users here
  ];
  
  // Function to render blog post list
  function renderPostList() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <h2 class="text-2xl font-semibold mb-4">Blog Posts</h2>
      <ul class="space-y-4">
        ${posts.map(post => `
          <li class="bg-gray-200 p-4 rounded-md">
            <h3 class="text-xl font-semibold">${post.title}</h3>
            <p>${post.content}</p>
            <div class="flex justify-between mt-2">
              <div>
                <span class="text-gray-600">Category: ${post.category}</span>
                <span class="ml-2 text-gray-600">Tags: ${post.tags.join(', ')}</span>
              </div>
              <div>
                <span class="text-gray-600">Author: ${post.author}</span>
                <span class="ml-2 text-gray-600">Posted: ${post.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
            <div class="mt-4">
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onclick="editPost(${post.id})">Edit</button>
              <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick="deletePost(${post.id})">Delete</button>
            </div>
          </li>
        `).join('')}
      </ul>
      <div class="mt-8">
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onclick="createPost()">Create New Post</button>
      </div>
    `;
  }
  
  // Function to render post editor
  function renderPostEditor(post = null) {
    const app = document.getElementById('app');
    const title = post ? post.title : '';
    const content = post ? post.content : '';
  
    app.innerHTML = `
      <h2 class="text-2xl font-semibold mb-4">${post ? 'Edit' : 'Create'} Post</h2>
      <div class="mb-4">
        <input id="post-title" type="text" class="w-full px-3 py-2 border rounded-md" placeholder="Title" value="${title}">
      </div>
      <div class="mb-4">
        <textarea id="post-content" class="w-full px-3 py-2 border rounded-md" rows="8" placeholder="Content">${content}</textarea>
      </div>
      <div class="mb-4">
        <input id="post-category" type="text" class="w-full px-3 py-2 border rounded-md" placeholder="Category" value="${post ? post.category : ''}">
      </div>
      <div class="mb-4">
        <input id="post-tags" type="text" class="w-full px-3 py-2 border rounded-md" placeholder="Tags (comma-separated)" value="${post ? post.tags.join(', ') : ''}">
      </div>
      <div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onclick="savePost(${post ? post.id : ''})">${post ? 'Save' : 'Publish'}</button>
        <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onclick="renderPostList()">Cancel</button>
      </div>
    `;
  }
  
  // Function to create a new post
  function createPost() {
    renderPostEditor();
  }
  
  // Function to edit an existing post
  function editPost(id) {
    const post = posts.find(post => post.id === id);
    if (post) {
      renderPostEditor(post);
    }
  }
  
  // Function to save or publish a post
  function savePost(id) {
    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const category = document.getElementById('post-category').value;
    const tags = document.getElementById('post-tags').value.split(',').map(tag => tag.trim());
  
    if (!title || !content || !category) {
      alert('Please enter title, content, and category.');
      return;
    }
  
    if (id) {
      // Edit existing post
      const index = posts.findIndex(post => post.id === id);
      if (index !== -1) {
        posts[index] = { ...posts[index], title, content, category, tags };
      }
    } else {
      // Create new post
      const newPost = { id: posts.length + 1, title, content, category, tags, author: 'Current User', createdAt: new Date() };
      posts.push(newPost);
    }
  
    renderPostList();
  }
  
  // Function to delete a post
  function deletePost(id) {
    if (confirm('Are you sure you want to delete this post?')) {
      posts = posts.filter(post => post.id !== id);
      renderPostList();
    }
  }
  
  // Initial render of post list
  renderPostList();
  