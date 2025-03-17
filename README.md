# DeepSeek Chat

DeepSeek Chat is a web-based chat application that enables real-time communication between users. This project is built using Flask for the backend and React for the frontend.

## Project Structure
```
/deepseek-chat
│── /backend (Flask)
│   ├── app.py
│   ├── env 
│── /frontend (React)
│   ├── src
│   │   ├── App.js
│   │   ├─ component->chat.jsx  
│   │   ├── styles.css
│── README.md
```

## Technologies Used
### Backend:
- Python
- Flask


### Frontend:
- React.js+vite

## Setup and Installation

### How to Clone the Repository:
1. Open a terminal or command prompt.
2. Navigate to the directory where you want to clone the project.
3. Run the following command:
   ```sh
   git clone https://github.com/your-repository/deepseek-chat.git
   ```
4. Navigate into the project folder:
   ```sh
   cd deepseek-chat
   ```

### Prerequisites:
- Python (for Flask backend)
- Node.js and npm (for React frontend)

### Backend Setup:
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```sh
   python -m venv env
   source env/bin/activate   # For macOS/Linux
   env\Scripts\activate      # For Windows
   ```
3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```

4. Run the Flask server:
   ```sh
   python app.py
   ```

### Frontend Setup:
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React development server:
   ```sh
   npm run dev
   ```

## Usage
- Ensure both frontend and backend servers are running.
- Access the application at localhost
- Start chatting in real time!

## Contributing
If you wish to contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See `LICENSE` for details.

## Contact
For questions or suggestions, please reach out via [your email/contact info].

