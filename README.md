<h1 align="center"> ai-face-detect </h1>

<p align="center">
<img src="https://github.com/nady4/ai-face-detect/raw/main/public/assets/brain.png"></img>
</p>

<p align="center">
🧠 AI Face recognition and image description web app built in React.js
</p>

<div align="center">
  <img src="https://github.com/nady4/ai-face-detect/raw/main/public/assets/1.png" height="350px">
  <img src="https://github.com/nady4/ai-face-detect/raw/main/public/assets/2.png" height="350px">
  <img src="https://github.com/nady4/ai-face-detect/raw/main/public/assets/3.png" height="350px">
  <img src="https://github.com/nady4/ai-face-detect/raw/main/public/assets/4.png" height="350px">
</div>

<br></br>

## 💾 Installation & Setup

```sh
# 📥 Clone the repository
git clone https://github.com/nady4/ai-face-detect-api.git

# 📂 Move to the project folder
cd ai-face-detect-api

# 📦 Install dependencies
npm install

# 🛠️ Create .env file
cat <<EOF > .env
DB_URL=postgres://postgres:1369@localhost:5432/ai-face-detect
PORT=3000
JWT_SECRET=yoursecret
EOF

# 🔧 Ensure your database server is running
npm run prisma:migrate

# 🚀 Run the development server
npm run dev
```

<br></br>

## 🚀 Tech Stack

| Technology         | Version |
| ------------------ | ------- |
| TypeScript         | ^5      |
| ts-node-dev        | ^2.0.0  |
| Express            | ^4.21.1 |
| Prisma ORM         | ^6.6.0  |
| face-api.js        | ^0.20.0 |
| TensorFlow.js-Node | ^4.22.0 |
| Canvas (Node.js)   | ^3.1.0  |

<br></br>

## Endpoints 🛠️

- `GET /` : a protected route that requires a valid JSON web token to access.

- `POST /login` : a route that logs in a user. Accepts a `username` and `password` in the request body, and returns a JSON web token if the login is successful.

- `POST /register` : a route that registers a new user. Accepts a `username` and `password` in the request body, and returns a JSON web token if the registration is successful.

- `POST /image` : a protected route that requires a valid JSON web token to access. Accepts an image URL in the request body, and returns the image data processed by the face-api.js API

<br></br>

## Environment Variables 🔐️

The following environment variables are used in this code:

- `DB_URL` : the URL of the psql database
- `JWT_KEY` : the secret key to sign JSON web tokens with
- `PORT` : the port number to run the web server on

<br></br>

## 📬 Contact

- 💌 Email: **nadyajerochim@gmail.com**
- 💼 LinkedIn: [/nady4](https://www.linkedin.com/in/nady4)
- 👩🏻‍💻 GitHub: [@nady4](https://github.com/nady4)
