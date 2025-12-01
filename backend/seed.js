const mongoose = require('mongoose');
const Post = require('./models/Post');
require('dotenv').config();

const samplePosts = [
  {
    title: 'Getting Started with React and MongoDB',
    content: 'React and MongoDB make a powerful combination for building modern web applications. React provides a dynamic and responsive user interface, while MongoDB offers flexible data storage. In this post, we\'ll explore how to integrate these technologies to create a full-stack blog application. We\'ll cover setting up your development environment, creating reusable components, and connecting to a MongoDB database through a REST API.',
    date: new Date('2024-11-20'),
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    category: 'Web Development',
    author: 'Sarah Johnson',
    comments: [
      {
        name: 'John Doe',
        message: 'Great article! Very helpful for beginners.',
        date: new Date('2024-11-21'),
      }
    ],
  },
  {
    title: 'Modern CSS Techniques for 2024',
    content: 'CSS has evolved significantly over the years. Today, we have powerful features like Grid, Flexbox, Custom Properties, and Container Queries that make styling websites easier and more maintainable. In this comprehensive guide, we\'ll dive deep into modern CSS techniques that will elevate your web development skills. Learn how to create responsive layouts, implement smooth animations, and utilize CSS variables for better theme management.',
    date: new Date('2024-11-22'),
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop',
    category: 'CSS',
    author: 'Mike Chen',
    comments: [],
  },
  {
    title: 'JavaScript Best Practices in 2024',
    content: 'Writing clean, maintainable JavaScript code is essential for any modern web developer. In this article, we\'ll explore the latest best practices including ES6+ features, async/await patterns, error handling strategies, and code organization techniques. We\'ll also discuss common pitfalls to avoid and how to write more efficient, readable code that your team will appreciate. Whether you\'re a beginner or experienced developer, these practices will help improve your JavaScript skills.',
    date: new Date('2024-11-25'),
    image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop',
    category: 'JavaScript',
    author: 'Emily Rodriguez',
    comments: [
      {
        name: 'Alex Smith',
        message: 'These tips are gold! Thanks for sharing.',
        date: new Date('2024-11-26'),
      },
      {
        name: 'Maria Garcia',
        message: 'I\'ve been looking for a resource like this!',
        date: new Date('2024-11-27'),
      }
    ],
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Clear existing posts
    await Post.deleteMany({});
    console.log('🗑️  Cleared existing posts');
    
    // Insert sample posts
    await Post.insertMany(samplePosts);
    console.log('✅ Sample posts added successfully!');
    
    mongoose.connection.close();
    console.log('👋 Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();