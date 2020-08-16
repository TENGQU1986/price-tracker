const nightmare = require('nightmare')()
require('dotenv').config()

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
;

const checkPrice = async () => {
    async;dlkfja;s
    try {
        const priceString = await nightmare
    .goto("https://www.amazon.com/BenQ-Auto-Dimming-Adjustment-ScreenBar-Plus/dp/B07DP7RYXV")
    .wait("#priceblock_ourprice")
    .evaluate(() => document.getElementById("priceblock_ourprice").innerText)
    .end()

    const priceNumber = parseFloat(priceString.replace('$', ''))
    if(priceNumber <= 200) {
        await sendEmails(
            'Price is low',
            `The new low price is ${priceNumber}`
        )
    }
    } catch (error) {
        await sendEmails(
            'Amazon price tracker error',
            error.message
        )
        console.log(error)
    }

    
}

const sendEmails = (subject, body) => {
    const msg = {
        to: 'tengqu.s@gmail.com',
        from: 'quteng.bo@gmail.com',
        subject,
        text: body,
        html: body,
      };
      sgMail.send(msg)
}

checkPrice()