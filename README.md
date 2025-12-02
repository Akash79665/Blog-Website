# 📝 Modern Blog Platform

A full-stack blog application built with **React**, **Node.js**, **Express**, and **MongoDB**. This platform features a modern UI, real-time commenting system, category filtering, and social media sharing capabilities.

![Blog Platform](https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=400&fit=crop)

## ✨ Features

- 🎨 **Modern & Responsive UI** - Beautiful gradient design with smooth animations
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- 🔍 **Advanced Search** - Real-time search across posts by title and content
- 🏷️ **Category Filtering** - Filter posts by technology categories
- 💬 **Comment System** - Interactive commenting on blog posts
- 📤 **Social Sharing** - Share posts on Facebook, Twitter, and LinkedIn
- ⚡ **Fast Performance** - Optimized loading and rendering
- 🎯 **Clean Code** - Well-structured and maintainable codebase

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - UI library
- **Axios** - HTTP client for API requests
- **Lucide React** - Modern icon library
- **CSS3** - Custom styling with gradients and animations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (v4.4 or higher)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Akash79665/Blog-Website.git
cd blog-platform
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
echo "PORT=5000" > .env
echo "MONGODB_URI=mongodb://localhost:27017/blog-db" >> .env

# Seed the database with sample data
npm run seed

# Start the backend server
npm start
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend application will open automatically at `http://localhost:3000`

## 📁 Project Structure

```
blog-platform/
│
├── backend/
│   ├── models/
│   │   └── Post.js              # MongoDB schema for posts and comments
│   ├── routes/
│   │   └── posts.js             # API routes for CRUD operations
│   ├── .env                     # Environment variables
│   ├── server.js                # Express server configuration
│   ├── seed.js                  # Database seeding script
│   └── package.json             # Backend dependencies
│
├── frontend/
│   ├── public/
│   │   ├── index.html           # HTML template
│   │   └── ...                  # Static assets
│   ├── src/
│   │   ├── App.js               # Main React component
│   │   ├── App.css              # Application styles
│   │   ├── index.js             # React entry point
│   │   └── index.css            # Global styles
│   └── package.json             # Frontend dependencies
│
└── README.md                    # This file
```

## 🔌 API Endpoints

### Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get single post by ID |
| POST | `/api/posts` | Create new post |
| PUT | `/api/posts/:id` | Update post |
| DELETE | `/api/posts/:id` | Delete post |
| GET | `/api/posts/search/:query` | Search posts |
| GET | `/api/posts/category/:category` | Get posts by category |

### Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/posts/:id/comments` | Add comment to post |
| DELETE | `/api/posts/:postId/comments/:commentId` | Delete comment |

## 💾 Database Schema

### Post Model
```javascript
{
  title: String (required),
  content: String (required),
  date: Date (default: now),
  image: String (required),
  category: String (required),
  author: String (required),
  comments: [Comment]
}
```

### Comment Model
```javascript
{
  name: String (required),
  message: String (required),
  date: Date (default: now)
}
```

## 🎯 Usage

1. **Browse Posts**: View all blog posts on the home page
2. **Search**: Use the search bar to find specific posts
3. **Filter by Category**: Click category buttons to filter posts
4. **Read Post**: Click on any post card to view full content
5. **Add Comment**: Fill in the comment form and submit
6. **Share**: Use social media buttons to share posts

## 🧪 Available Scripts

### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run seed       # Seed database with sample data
```

### Frontend
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
```

## 🌐 Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog-db
```

## 📸 Screenshots

### Home Page
![Home Page](screenshots/HomeScreen.png)

### Post Detail
![Post Detail](https://via.placeholder.com/800x400?text=Post+Detail)

### Comments Section
![Comments](https://via.placeholder.com/800x400?text=Comments+Section)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

- Name: Akash Turkhade
- GitHub: https://github.com/Akash79665/Blog-Website.git
- Email: apturkhade@gmail.com

## 🙏 Acknowledgments

- Unsplash for placeholder images
- Lucide React for beautiful icons
- MongoDB for the robust database
- React community for excellent documentation

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**⭐ Star this repository if you found it helpful!**