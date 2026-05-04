//The backend to send email. It runs on Google Apps Script
function doGet(e) {
  try {
    // Extract parameters
    var to = e.parameter.to;
    var subject = e.parameter.subject || "No Subject";
    var message = e.parameter.message || "Empty message";

    // Basic validation
    if (!to) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: "error",
          message: "Missing 'to' parameter"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Send email
    MailApp.sendEmail({
      to: to,
      subject: subject,
      body: message
    });

    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Email sent"
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}