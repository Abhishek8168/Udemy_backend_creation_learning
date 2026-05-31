import Mailgen from 'mailgen'
import nodemailer from 'nodemailer'

const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task manager",
            link: "https://taskmanagerlink.com"
        }
    })

    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent)
    const emailHTML = mailGenerator.generate(options.mailgenContent)

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS
        }
        
    })

    const mail = {
        from: "mail.taskmanager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHTML
    }

    try{
        await transporter.sendMail(mail)
    }catch (error){
        console.error("Email serivce failed silently. Make sure that you provide your mailtrap credentials correctly in .env file")
        console.error('Error: ', error)
    }
}

const emailVerificationMailgenContent = (username, verificationURL) => {
    return {
        body: {
            name: username,
            intro: "Welcome! to our app! we'are excited to have you on board.",
            action: {
                instructions: "To verify your email please click on the following button",
                button: {
                    color: "rgba(17, 171, 20, 0.93)",
                    text: "Verify your email",
                    link: verificationURL
                }
            },
            otro:"Need help or have questions? Just reply to this email, we'd love to help you."
        }
    }
}

const forgotPasswordMailgenContent = (username, passwordResetURL) => {
    return {
        body: {
            name: username,
            intro: "We got a request to reset the password of your account",
            action: {
                instructions: "To reset your password please click on the following button",
                button: {
                    color: "rgba(178, 147, 130, 0.93)",
                    text: "reset your password",
                    link: passwordResetURL
                }
            },
            otro:"Need help or have questions? Just reply to this email, we'd love to help you."
        }
    }
}

export {
    emailVerificationMailgenContent,
    forgotPasswordMailgenContent,
    sendEmail
}