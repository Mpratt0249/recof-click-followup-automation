//FOLLOW UP SCRIPT 

// 🌟 === ✅ SCRIPT: **sendRecofClickFollowUps()** === 🌟

function sendRecofClickFollowUps() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("clickedfollowupauto");
  const data = sheet.getDataRange().getValues();
  const timezone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
  const today = new Date();

  const templateDocs = [
    "13BpsCSFBP5RNecHsg0oS4TwXMUu8enM_jc1YIUFN3qs",
    "1yN8vwdQLqIG_25YTQ8QzAWMher8TRU8FmtH-hu7Dpng",
    "1zKj_opzoTzAzV71B71JqBqwsJM5U_tBBSDANtUpGM5g",
    "1Il1faJ6ZQxwNGjrwv4r_7xLwdrsWqoOd2sNP-1LQVJ0",
    "1aZTi_MclkOzdz8TngEH2fKHLw7tovEiRw7istSuJD2s"
  ];

  const subjects = [
    "You’re One Step Away from Starting Your Real Estate Career",
    "Imagine This Time Next Month: You Could Be Licensed",
    "Your Seat Is Still Open — Start Today with No Delays",
    "Real Estate in Florida Is Booming — Get Licensed & Take Advantage",
    "This Could Be the Best Decision You Make All Year"
  ];

  const headers = [
    "https://i.imgur.com/tXyRxV8.png",
    "https://i.imgur.com/WoIG3Qo.png",
    "https://i.imgur.com/rSraUcD.png",
    "https://i.imgur.com/TyzMbtj.png",
    "https://i.imgur.com/nQVTrjg.png"
  ];

  const footerUrl = "https://i.imgur.com/ztrqm9a.png";
  const trackingBase = "https://script.google.com/macros/s/AKfycbwMbhPtEpApl9XewlmvmBOjrketc5q5Dki5_DKKvoodaV1wG0ePVqzCloJeYIpJSn_t/exec";
  const props = PropertiesService.getScriptProperties();

  let startRow = parseInt(props.getProperty("clickFollowUpStartRow") || "1", 10);
  const sendLimit = 15;
  let sentSoFar = 0;

  const currentHour = today.getHours();
  if (currentHour < 9 || currentHour > 18) {
    Logger.log("⏰ Outside of sending hours");
    return;
  }

  // 🌐 Preload Templates
  const templateBodies = [];
  for (let i = 0; i < templateDocs.length; i++) {
    try {
      const html = UrlFetchApp.fetch(`https://docs.google.com/document/d/${templateDocs[i]}/export?format=html`).getContentText();
      const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      templateBodies.push(match ? match[1] : "");
    } catch (err) {
      Logger.log(`❌ Error fetching template ${i + 1}: ${err.message}`);
      templateBodies.push("");
    }
  }

  for (let i = startRow; i < data.length; i++) {
    if (sentSoFar >= sendLimit) break;

    const row = data[i];
    const clicked = row[0];
    const name = row[1];
    const email = (row[2] || "").toLowerCase();
    const lastFollowUp = row[6];
    let templateIndex = parseInt(row[12], 10);
    if (isNaN(templateIndex) || templateIndex < 0 || templateIndex >= templateBodies.length) {
  templateIndex = 0;
}

    const registered = row[14];
    Logger.log(`🔍 Row ${i + 1}: email=${email}, clicked=${clicked}, lastFollowUp=${lastFollowUp}, registered=${registered}, templateIndex=${templateIndex}`);


    // Skip invalid rows
    if (
      !clicked || !email ||
      email.includes("your_email") ||
      email.includes("test@") ||
      email.includes("example.com") ||
      registered === "Registered"
    ) {
      continue;
    }

    if (isNaN(templateIndex) || templateIndex < 0 || templateIndex >= templateBodies.length) {
      templateIndex = 0;
    }

    const bodyRaw = templateBodies[templateIndex];
    if (!bodyRaw) {
      Logger.log(`⚠️ Skipping row ${i + 1} due to missing template body`);
      continue;
    }

    const clickedDate = new Date(clicked);
    const twoDaysAfterClick = new Date(clickedDate);
    twoDaysAfterClick.setDate(clickedDate.getDate() + 2);

    if (today < twoDaysAfterClick) continue;

    let send = false;
if (!lastFollowUp) {
  send = true;
} else {
  const lastDate = new Date(lastFollowUp);
  const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
  if (diffDays >= 7) send = true;
}



    if (send) {
      const subject = subjects[templateIndex];
      const headerImg = headers[templateIndex];
      const safeName = name && name.trim() !== "" ? name.trim() : "there";
      const encodedEmail = encodeURIComponent(email);
      const clickTrackUrl = `${trackingBase}?track=click&email=${encodedEmail}`;
      const openTrack = `<img src="${trackingBase}?track=open&email=${encodedEmail}" width="1" height="1" style="display:none;" />`;
      const unsubscribeLink = `${trackingBase}?email=${encodedEmail}`;

      const bodyHtml = bodyRaw
        .replace(/{{\s*name\s*}}/gi, safeName)
        .replace(/href="(https?:\/\/.*?)"/g, 'href="$1"');

      const htmlBody = `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body {
                margin: 0;
                padding: 0;
                width: 100% !important;
                font-family: Arial, sans-serif;
                background: #ffffff;
              }
              .button {
                background-color: #11056d;
                color: #ffffff !important;
                text-decoration: none;
                padding: 15px 25px;
                font-size: 16px;
                display: inline-block;
                border-radius: 6px;
                margin-top: 20px;
              }
            </style>
          </head>
          <body style="margin:0;padding:0;width:100%;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td><img src="${headerImg}" width="100%" style="display:block;" alt="Header" /></td>
              </tr>
              <tr>
                <td style="padding: 20px; font-size: 16px; line-height: 1.6; color: #333333;">
                  ${bodyHtml}
                  <div style="text-align:center;">
                    <a href="${clickTrackUrl}" class="button">Explore Courses</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td><img src="${footerUrl}" width="100%" style="display:block;" alt="Footer" /></td>
              </tr>
              <tr>
                <td style="font-size:12px; text-align:center; color:#999999; padding: 15px;">
                  Real Estate Campus of Florida<br>
                  295 NW Peacock Blvd #881013<br>
                  Port St. Lucie, FL 34986 <br><br>
                  If you no longer wish to receive emails from us, 
                  <a href="${unsubscribeLink}" style="color:#999999;">unsubscribe here</a>.
                </td>
              </tr>
            </table>
            ${openTrack}
          </body>
        </html>`;

      try {
        GmailApp.sendEmail(email, subject, "", {
          htmlBody: htmlBody,
          from: "info@myrecampus.com",
          name: "Real Estate Campus of Florida"
        });

        Logger.log(`📧 Sent to: ${name} <${email}>`);

        const fullTimestamp = Utilities.formatDate(new Date(), timezone, "MM/dd/yyyy HH:mm:ss");
        sheet.getRange(i + 1, 7).setValue(fullTimestamp); // Last Follow-Up Sent
        sheet.getRange(i + 1, 6).setValue((parseInt(row[5] || 0, 10)) + 1); // Sent Count
        sheet.getRange(i + 1, 4).setValue(`Template ${templateIndex + 1}`); // Template Name
        sheet.getRange(i + 1, 12).setValue(subject);      // Column L → Subject
        sheet.getRange(i + 1, 13).setValue(templateIndex); // Column M → Template Index


        sentSoFar++;

      } catch (e) {
        Logger.log("❌ Error sending to " + email + ": " + e.message);
      }
    }
  }

  const nextStart = (startRow + sentSoFar) >= data.length ? 1 : (startRow + sentSoFar);
  props.setProperty("clickFollowUpStartRow", nextStart.toString());
}

