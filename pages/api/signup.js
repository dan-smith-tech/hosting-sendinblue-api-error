// pages/api/signup.js
const SibApiV3Sdk = require("sib-api-v3-sdk");
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

export default async function emailHandler(req, res) {
	const { method } = req;
	const { email } = req.body;

	switch (method) {
		case "POST":
			try {
				//#region Sendinlue API
				let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
				let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

				sendSmtpEmail.templateId = 6;
				sendSmtpEmail.sender = {
					name: "Bevl",
					email: "info@bevl.app",
				};
				sendSmtpEmail.to = [{ email }];

				apiInstance
					.sendTransacEmail(sendSmtpEmail)
					.then((res) => {
						console.log(res);
					})
					.catch((error) => {
						console.error(error);
					});
				//#endregion

				console.log("yo");

				res.status(201).json({ success: true, data: { email } });
			} catch (err) {
				res.status(400).json({ success: false, message: err });
			}
			break;
		default:
			res.status(400).json({
				success: false,
				message: "Incorrect request method: " + method,
			});
			break;
	}
}
