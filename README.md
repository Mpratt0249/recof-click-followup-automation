# RECOF Click-Follow-Up Automation

Google Apps Script that sends a five-email, 7-day follow-up sequence to contacts who clicked a link in a prior campaign email.

---

## ✨ Key Features

| Feature               | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| ⏳ **Delayed sending** | Waits 2 days after click before sending, then 7-day intervals               |
| 🔄 **Template rotation** | Cycles through 5 branded templates + matching headers + subject lines     |
| 🕒 **Time window**     | Sends only between 9 AM – 6 PM (local time)                                 |
| 📊 **Smart tracking**  | Logs last sent date, template index, open & click tracking, and subject     |
| ✅ **Validation rules**| Skips test/demo emails and already registered users                         |

---

## 💻 Stack

- **Google Apps Script (.gs)**
- **Google Sheets** ("clickedfollowupauto" tab)
- **GmailApp** for email delivery
- **Google Docs** for HTML email templates
- **Imgur** for hosted header and footer images
- **Web App** (for open & click tracking)

---

## 📂 File Included

- `sendRecofClickFollowUps.gs`  
  The complete follow-up automation script

---

## 🚀 How to Use

1. Copy the `.gs` file into your Google Apps Script project
2. Ensure your spreadsheet tab is named `clickedfollowupauto`
3. Set a time-based trigger to run every 30 minutes
4. Replace tracking URL, template IDs, and image URLs as needed

---

> Built for Real Estate Campus of Florida to follow up with student leads who engage but haven’t registered yet.
