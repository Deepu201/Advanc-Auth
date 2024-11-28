import { mailtrapClient, sender } from "./mailtrap.config.js"
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"

export const sendVerificationEmail = async (email, verificationToken) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
			category: "Email Verification",
		});

		console.log("Email sent successfully", response);
	} catch (error) {
		console.error(`Error sending verification`, error);

		throw new Error(`Error sending verification email: ${error}`);
	}
};


export const sendWelcomeEmail=async(email,name)=>{
	 const recipient=[{email}]

	 try{

		const response=await mailtrapClient.send({
			from: sender,
			to: recipient,
			template_uuid: "16fc810a-10d2-4db2-aea9-ee48c2f07270",
			template_variables: {
				"company_info_name": "rio pvt",
				"name": name
			  }
			});
console.log("email sucessfully",response)

	 }catch(error){
		console.error(`Error sending welcome email`, error)
	 }


}

export const sendPasswordResetEmail=async(email,resetURL)=>{
	const recipient=[{email}]
	try{
const response=await mailtrapClient.send({
	from: sender,
	to: recipient,
	subject: "Reset your password",
	html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL)
})
console.log(response)
	}catch(error){
		console.error(`Error sending password reset email`, error)
	}

}


export const sendResetSuccessEmail=async(email)=>{
	const recipient=[{email}]

	try{
		const response=await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject:'reset password',
			html:PASSWORD_RESET_SUCCESS_TEMPLATE,
			category:"Password reset"
		})
		console.log(response)


	}catch(error){
		console.error(`Error sending reset success email`, error)
	}

}