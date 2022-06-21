const nodemailer = require('nodemailer')
const { google } = require('googleapis')
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS,
    SENDER_EMAIL_PASS
} = process.env

const oauth2Client = new OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)

// send mail
const sendEmail = async (to, url, txt, type) => {
    // oauth2Client.setCredentials({
    //     refresh_token: MAILING_SERVICE_REFRESH_TOKEN
    // })

    // const accessToken = await oauth2Client.getAccessToken()
    // const smtpTransport = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         type: 'OAuth2',
    //         user: SENDER_EMAIL_ADDRESS,
    //         clientId: MAILING_SERVICE_CLIENT_ID,
    //         clientSecret: MAILING_SERVICE_CLIENT_SECRET,
    //         refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
    //         accessToken
    //     }
    // })

    const smtpTransport = nodemailer.createTransport({
        pool: true,
        host: "giow1128.siteground.us",
        port: 465,
        secure: true, // use TLS
        auth: {
            user: SENDER_EMAIL_ADDRESS,
            pass: SENDER_EMAIL_PASS,
        },
    });


    // let transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         type: 'OAuth2',
    //         user: SENDER_EMAIL_ADDRESS,
    //         clientId: MAILING_SERVICE_CLIENT_ID,
    //         clientSecret: MAILING_SERVICE_CLIENT_SECRET,
    //         refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
    //         accessToken: accessToken,
    //         expires: 1484314697598
    //     }
    // });
    let mailOptions;
    if (type === "register") {
        mailOptions = {
            from: SENDER_EMAIL_ADDRESS,
            to: to,
            subject: "Account Registration",
            html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to Fiaraa.</h2>
            <p>Congratulations!</p>

            <p>
            You're almost set to start using Fiaraa services. Click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>
            <a href=${url} style="overflow-wrap: break-word; word-wrap: break-word;"> ${url} </a>
            </div>

            <br />
            <br />

            <p>Thank you,</p>
            <p>The Fiaraa team</p>
            <p><a href="#">support@fiaraa.com</a></p>
            </div>
            `
        }
    } else if (type === 'reset') {
        mailOptions = {
            from: SENDER_EMAIL_ADDRESS,
            to: to,
            subject: "Password Reset",
            html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">You Forgot Your Password</h2>

            <p>
            A request has been received to change the password of your Fiaraa account.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>
            <a href=${url} style="overflow-wrap: break-word; word-wrap: break-word;"> ${url} </a>
            </div>
            

            <p>
            If you did not initiate this request, please contact us immediately at
            <span style="margin-left: 10px;"><a href="#">support@fiaraa.com</a></span>
            </p>

            <br />
            <br />

            <p>Thank you,</p>
            <p>The Fiaraa team</p>
            </div>
            `
        }
    } else if (type === 'invite') {
        mailOptions = {
            from: SENDER_EMAIL_ADDRESS,
            to: to,
            subject: "Member Invitation",
            html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to Fiaraa.</h2>
            <p>Congratulations!</p>

            <p>
            You're invited to Fiaraa. To proceed use the details below to login to your account.
            </p>

            <br></br>
            ${txt}
            
            <br></br>
            <p>
            Once loged in, Change your password and update other informations.
            </p>
        
            <div>
            <a href=${url} style="overflow-wrap: break-word; word-wrap: break-word;"> ${url} </a>
            </div>

            <br />
            <br />

            <p>Thank you,</p>
            <p>The Fiaraa team</p>
            <p><a href="#">support@fiaraa.com</a></p>
            </div>
            `
        }
    } else if (type = 'update-notification') {
        mailOptions = {
            from: SENDER_EMAIL_ADDRESS,
            to: to,
            subject: "Account Update Notification",
            html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Account Update Notification.</h2>
            <p>Hi!</p>

            <p>
            This email was sent to notify you that your Fiaraa Account details has been Updated as shown below.
            </p>

            <br></br>
            ${txt}
            
            <br></br>
            <p>
            If you never Requested these changes, Kindly change your account password OR contact support.
            </p>
        
            <div>
            <a href=${url} style="overflow-wrap: break-word; word-wrap: break-word;"> ${url} </a>
            </div>

            <br />
            <br />

            <p>Thank you,</p>
            <p>The Fiaraa team</p>
            <p><a href="#">support@fiaraa.com</a></p>
            </div>
            `
        }
    } else if (type = 'buyer') {

    }

    // const mailOptions = {
    //     from: SENDER_EMAIL_ADDRESS,
    //     to: to,
    //     subject: "FIARAA",
    //     html: `
    //         <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
    //         <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to Fiaraa.</h2>
    //         <p>Congratulations! You're almost set to start using Fiaraa services.
    //             Just click the button below to validate your email address.
    //         </p>

    //         <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>

    //         <p>If the button doesn't work for any reason, you can also click on the link below:</p>

    //         <div>${url}</div>
    //         </div>
    //     `
    // }

    // smtpTransport.sendMail(mailOptions, (err, info) => {
    //     // if (err)
    //     //     return err;
    //     // return infor;
    //     if (err)
    //         console.log(err.message);
    //     else
    //         console.log(`Message sent: ${info.response}`);
    // })

    smtpTransport.sendMail(mailOptions, (err, info) => {
        // if (err)
        //     return err;
        // return infor;
        if (err)
            console.log(err.message);
        else
            console.log(`Message sent: ${info.response}`);
    })
}

module.exports = sendEmail