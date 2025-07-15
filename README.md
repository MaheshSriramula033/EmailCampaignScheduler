# 📧 Email Campaign Scheduler

A full-stack web application that allows users to create and schedule email campaigns which are automatically sent to multiple recipients at a specified time. Built with Node.js, Express.js, MongoDB, Nodemailer, and Handlebars. Responsive and deployed on Render with MongoDB Atlas.

---

## 🚀 Features

- 🕒 Schedule email campaigns with a future date and time
- ✉️ Automated email delivery using **Nodemailer + Gmail SMTP**
- 🔁 Background scheduler runs using **node-cron**
- 📊 Tracks campaign status (pending, sent, failed)
- 🗂 Logs per-recipient delivery status in MongoDB
- 🧾 Simple UI built with **Express-Handlebars** and **Bootstrap**
- 📱 Fully responsive (mobile-friendly with media queries)
- ☁️ Deployed on **Render**, database hosted on **MongoDB Atlas**

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas + Mongoose
- **Email:** Nodemailer (Gmail App Password)
- **Frontend:** Express-Handlebars, Bootstrap
- **Scheduler:** node-cron
- **Deployment:** Render

---

## 🧑‍💻 Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/email-campaign-scheduler.git
cd email-campaign-scheduler
Live Demo:https://emailcampaignscheduler.onrender.com
