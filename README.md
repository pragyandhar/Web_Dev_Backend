# Multer File Upload - Learning Project

A simple Node.js/Express application demonstrating file upload functionality using the Multer middleware library.

## What I Learned

### 1. **Multer Middleware**
- How to install and configure Multer for handling `multipart/form-data` (file uploads)
- Understanding Multer's storage engine configuration
- Using `multer.diskStorage()` to customize file storage location and naming

### 2. **File Storage Configuration**
```javascript
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, './uploads')  // Directory where files are saved
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)  // Custom filename with timestamp
  }
})
```

### 3. **Handling Single File Uploads**
- Using `upload.single('fieldName')` middleware to handle single file uploads
- Accessing uploaded file information via `req.file`
- Accessing form data via `req.body`

### 4. **Form Encoding Type**
- Learned the importance of `enctype="multipart/form-data"` in HTML forms for file uploads
- Understanding that regular URL encoding cannot handle file data

### 5. **EJS Templating**
- Setting up EJS as the view engine
- Rendering dynamic HTML pages
- Creating forms with proper file input elements

### 6. **Frontend Development**
- The user interface was done by Copilot. The backend was completely written by me. Just the designing of the frontend was done by AI. 
- I was to lazy to do the frontend.

### 7. **Express Server Setup**
- Configuring Express middleware (`express.urlencoded()`)
- Setting up POST routes to handle file uploads
- Implementing redirect after successful upload

## Project Structure
```
├── index.js           # Main server file with Multer configuration
├── package.json       # Project dependencies
├── uploads/           # Directory for uploaded files
└── views/
    └── homepage.ejs   # Frontend file upload interface
```

## Key Technologies
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Multer** - File upload middleware
- **EJS** - Templating engine

## How to Run
```bash
npm install
npm start
```
Visit `http://localhost:8000` to test the file upload functionality.

## Key Takeaways
- File uploads require special handling due to binary data
- Multer simplifies the complex process of parsing multipart form data
- Proper configuration of storage ensures organized file management
- Client-side validation improves user experience
- Server-side handling of `req.file` provides access to uploaded file metadata

