import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin, Home } from 'lucide-react';
import './App.css';


const API_URL = 'http://localhost:5000/api/posts';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [commentName, setCommentName] = useState('');
  const [commentMessage, setCommentMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from API
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(API_URL);
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Make sure the backend server is running on port 5000.');
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = ['All', ...new Set(posts.map(post => post.category))];

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (!commentName.trim() || !commentMessage.trim()) {
      alert('Please fill in both name and message fields');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/posts/${selectedPost._id}/comments`, {
        name: commentName,
        message: commentMessage
      });
      
      setSelectedPost(response.data);
      setPosts(posts.map(post => 
        post._id === response.data._id ? response.data : post
      ));
      
      setCommentName('');
      setCommentMessage('');
      alert('Comment posted successfully!');
    } catch (error) {
      console.error('Error posting comment:', error);
      alert('Failed to post comment');
    }
  };

  // Share functions
  const shareOnSocial = (platform, post) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
    };
    
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-box">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
          <button onClick={fetchPosts} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-top">
            <h1 className="site-title">Modern Blog</h1>
            {selectedPost && (
              <button
                onClick={() => setSelectedPost(null)}
                className="home-button"
              >
                <Home size={20} />
                Home
              </button>
            )}
          </div>

          {!selectedPost && (
            <>
              {/* Search Bar */}
              <div className="search-container">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              {/* Category Filter */}
              <div className="category-filter">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </header>

      <main className="main-content">
        {selectedPost ? (
          /* Single Post View */
          <article className="post-detail">
            <img 
              src={selectedPost.image} 
              alt={selectedPost.title}
              className="post-detail-image"
            />
            <div className="post-detail-content">
              <div className="post-meta">
                <span className="meta-item">
                  <Calendar size={16} />
                  {new Date(selectedPost.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
                <span className="meta-item">
                  <User size={16} />
                  {selectedPost.author}
                </span>
                <span className="meta-item">
                  <Tag size={16} />
                  {selectedPost.category}
                </span>
              </div>

              <h1 className="post-title">{selectedPost.title}</h1>

              <div className="post-content">
                {selectedPost.content}
              </div>

              {/* Social Share Buttons */}
              <div className="share-section">
                <span className="share-label">
                  <Share2 size={20} />
                  Share:
                </span>
                <button
                  onClick={() => shareOnSocial('facebook', selectedPost)}
                  className="share-button facebook"
                >
                  <Facebook size={20} />
                </button>
                <button
                  onClick={() => shareOnSocial('twitter', selectedPost)}
                  className="share-button twitter"
                >
                  <Twitter size={20} />
                </button>
                <button
                  onClick={() => shareOnSocial('linkedin', selectedPost)}
                  className="share-button linkedin"
                >
                  <Linkedin size={20} />
                </button>
              </div>

              {/* Comments Section */}
              <div className="comments-section">
                <h2 className="comments-title">
                  Comments ({selectedPost.comments.length})
                </h2>

                {/* Comment Form */}
                <div className="comment-form">
                  <h3 className="comment-form-title">Leave a Comment</h3>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="comment-input"
                  />
                  <textarea
                    placeholder="Your comment"
                    value={commentMessage}
                    onChange={(e) => setCommentMessage(e.target.value)}
                    rows="4"
                    className="comment-textarea"
                  />
                  <button
                    onClick={handleCommentSubmit}
                    className="comment-submit-button"
                  >
                    Post Comment
                  </button>
                </div>

                {/* Comments List */}
                <div className="comments-list">
                  {selectedPost.comments.length === 0 ? (
                    <p className="no-comments">No comments yet. Be the first to comment!</p>
                  ) : (
                    selectedPost.comments.map((comment, index) => (
                      <div key={comment._id || index} className="comment-item">
                        <div className="comment-header">
                          <User size={18} />
                          <span className="comment-author">{comment.name}</span>
                          <span className="comment-date">
                            • {new Date(comment.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="comment-message">{comment.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </article>
        ) : (
          /* Blog Posts Grid */
          <>
            {filteredPosts.length === 0 ? (
              <div className="no-posts">
                <p>No posts found matching your search.</p>
              </div>
            ) : (
              <div className="posts-grid">
                {filteredPosts.map(post => (
                  <article
                    key={post._id}
                    className="post-card"
                    onClick={() => setSelectedPost(post)}
                  >
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="post-card-image"
                    />
                    <div className="post-card-content">
                      <div className="post-card-date">
                        <Calendar size={16} />
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <h2 className="post-card-title">{post.title}</h2>
                      <p className="post-card-excerpt">
                        {post.content.substring(0, 150)}...
                      </p>
                      <div className="post-card-footer">
                        <span className="post-card-category">
                          <Tag size={14} />
                          {post.category}
                        </span>
                        <span className="post-card-author">{post.author}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 Modern Blog. Built with React & MongoDB.</p>
        </div>
      </footer>
    </div>
  );
}
