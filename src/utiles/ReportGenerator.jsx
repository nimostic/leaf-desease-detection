import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';


export const generateLeafReport = async (result, details, user) => {
  const htmlContent = `
    <html>
      <head>
        <style>
          body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #333; }
          .header { text-align: center; border-bottom: 2px solid #0B8457; padding-bottom: 10px; }
          .title { color: #0B8457; font-size: 28px; margin-bottom: 5px; }
          .info { margin-top: 20px; font-size: 14px; line-height: 1.6; }
          .result-card { background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin-top: 30px; border-left: 5px solid #DC3545; }
          .section { margin-top: 25px; }
          .section-title { font-size: 18px; font-weight: bold; color: #1C2D35; margin-bottom: 8px; }
          .treatment { color: #DC3545; }
          .prevention { color: #0B8457; }
          .footer { margin-top: 60px; text-align: center; font-size: 10px; color: #999; border-top: 1px solid #eee; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">Leaf Disease Analysis Report</h1>
          <p>KrishiLink Digital Diagnostic Service</p>
        </div>


        <div class="info">
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Farmer/User:</strong> ${user?.displayName || user?.email || "Valued User"}</p>
          <p><strong>Report ID:</strong> #RP-${Date.now().toString().slice(-6)}</p>
        </div>


        <div class="result-card">
          <h2 style="margin: 0; font-size: 20px;">Diagnosis: ${result.disease}</h2>
          <p style="margin: 5px 0 0 0;">Confidence Score: <strong>${result.confidence}</strong></p>
        </div>


        <div class="section">
          <div class="section-title">📍 Symptoms</div>
          <p>${details?.symptoms || "N/A"}</p>
        </div>


        <div class="section">
          <div class="section-title treatment">💊 Recommended Treatment</div>
          <p>${details?.treatment || "N/A"}</p>
        </div>


        <div class="section">
          <div class="section-title prevention">🛡️ Preventive Measures</div>
          <p>${details?.prevention || "N/A"}</p>
        </div>


        <div class="footer">
          <p>This is an AI-generated report for preliminary guidance. For severe cases, please consult an agricultural specialist.</p>
          <p>&copy; ${new Date().getFullYear()} KrishiLink AI Platform</p>
        </div>
      </body>
    </html>
  `;


  try {
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    throw error;
  }
};
