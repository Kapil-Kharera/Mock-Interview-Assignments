let blogs = []; // Array to store the blogs locally

// Fetch blogs from API and display them on the UI
async function fetchBlogs() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  blogs = await response.json();

  renderBlogs();
}

// Render the blogs on the UI
function renderBlogs() {
  const blogList = document.getElementById('blogList');
  blogList.innerHTML = '';

  blogs.forEach(blog => {
    const blogItem = document.createElement('li');
    blogItem.classList.add('blog-item');
    blogItem.innerHTML = `
      <h3>${blog.title}</h3>
      <p>${blog.body}</p>
      <button onclick="deleteBlog(${blog.id})">Delete</button>
    `;
    blogList.appendChild(blogItem);
  });
}

// Add a new blog
async function addBlog(event) {
  event.preventDefault();

  const titleInput = document.getElementById('titleInput');
  const contentInput = document.getElementById('contentInput');

  const blog = {
    title: titleInput.value,
    body: contentInput.value,
    userId: 1 // Replace with the appropriate user ID
  };

  // Add the new blog locally
  blogs.push(blog);

  titleInput.value = '';
  contentInput.value = '';

  renderBlogs();
}

// Delete a blog
async function deleteBlog(id) {
  // Remove the blog from the local array
  blogs = blogs.filter(blog => blog.id !== id);

  renderBlogs();
}

// Fetch blogs on page load
document.addEventListener('DOMContentLoaded', fetchBlogs);

// Add event listener to the form
const blogForm = document.getElementById('blogForm');
blogForm.addEventListener('submit', addBlog);
