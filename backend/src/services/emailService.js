import logger from '../logger';

const Email = require('email-templates');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY || 'SG.');

// so far the function needs 'receiver' 'template' 'username' properties inside an object
export const emailService = {
  async sendEmail({
    receiver,
    template,
    username,
    link = '',
  }) {
    const email = new Email();
    let message;
    let subject;
    let attachments;
    // renders the template into an html structure
    if (template === 'validation') {
      await email
        .render(`${template}/html`, {
          name: username,
          link,
        })
        .then((result) => { message = result; })
        .catch((error) => { throw new Error(error); });
      subject = `Welcome to Accepted ${username}!`;
    }
    const msg = {
      to: receiver,
      from: process.env.EMAIL_ADDRESS,
      subject,
      attachments,
      text: 'html email failed',
      html: message,
    };
    if (receiver === undefined || template === undefined || username === undefined) {
      throw new Error('One parameter is missing a value');
    } else {
      return (
        sgMail
          .send(msg)
          .then(() => {
            logger.log('info', 'Email sent');
          })
          .catch((error) => {
            logger.error(`${error.code || 400} - ${error.message}`);
            throw new Error(error);
          })
      );
    }
  },
};
