
// stepper

// reverse parse markdown from bot comment, determine which step the PR is on:

// * Participated in 2020
//   * no - close PR
// * SDP?
//   * no - request changes
// * Shipping form complete?
//   * no - request changes
// * Correct file path
//   * no - request changes
// * Markdown correct?
//   * no - request changes
// * Follows COC
//   * no - close PR
// * congrats!
// * merge PR

// Load .env in dev
if(!process.env.GITHUB_ACTIONS) {
  const result = require('dotenv').config()

  if (result.error) {
    throw result.error
  }
}

const airtable = require('./app/airtable.js');
const octokit = require('./app/octokit.js');
const actionEvent = require('./app/action-event.js');
const educationWeb = require('./app/education-web.js');
const fileValidator = require('./app/file-validator.js');

const BOT_ACCOUNT_LOGIN = "github-education"

const GRADUATES_2020 = "Graduation 2020"
const GRADUATES_2021 = "Graduation 2021"
const GRADUATES_2022 = "Graduation 2022"


try {
;(async ()=>{

  const feedback = []

  let pull, user2021, user2020, user2022, hasSdp

  if(actionEvent.name === "review_requested" && actionEvent.requestedReviewer.login !== BOT_ACCOUNT_LOGIN) {
    return true
  }

  try {
    pull = await octokit.fetchPr(actionEvent.pullNumber)
  }catch(err) {
    console.log(err)
  }

  try {
    user2022 = await airtable.fetchGraduate(actionEvent.pullAuthor, GRADUATES_2022)
  } catch(err) {
    console.log(err)
  }

  // checks

  // graduated already in 2020 or 2021?
  try {
    user2020 = await airtable.userParticipatedPrior(actionEvent.pullAuthor, GRADUATES_2020)
    user2021 = await airtable.userParticipatedPrior(actionEvent.pullAuthor, GRADUATES_2021)
  } catch(err) {
    console.log(err)
  }

  // approved for the student/teacher development pack
  try {
    hasSdp = await educationWeb.hasPack(actionEvent.pullAuthor)
  } catch(err) {
    console.log(err)
  }

  // Has the user completed the shipping form? (address must exist for the form to be submitted)
  const completedShippingForm = user2022 && user2022["Address Line 1"].length > 0
  const fileNames = pull.files.edges.map((file)=>{
    return file.node.path
  })

  let isMarkdownValid = {}
  let content
  const isFilePathValid = fileValidator.isValidPaths(fileNames)

  try {
    content = isFilePathValid.isValid && await octokit.getContent(`_data/${actionEvent.pullAuthor}/${actionEvent.pullAuthor}.md`)
  } catch(err) {
    feedback.push("I was unable to view the content of the markdown file, please try again in a few minutes")
    console.log(err)
  }

  if(content) {
    isMarkdownValid = await fileValidator.isMarkdownValid(content)
  }

  console.log(content)

 // I have read the instructions on the README file before submitting my application.
 // I made my submission by creating a folder on the _data folder and followed the naming convention mentioned in the instructions (<username>) and markdown file.
 // I have submitted a swag shipping form.
 // I have used the Markdown file template to add my information to the Year Book.
 // I understand that a reviewer will merge my pull request after examining it or ask for changes in case needed.
 // I understand I should not tag or add a reviewer to this Pull Request.
 // I have added the event to my Calendar.

  // #################### TODO CACHE AIR TABLE SOMEHOW ########################
  // * cache the entire base in a json file with actions
  // * if the user checks come back negative, query the api directly to double check
  // * if it comes back different, then trigger a cache rebuild


  // ############################ bot posting flow ############################
  // - show initial message with spinner when checks are running
  // - General message with a list of errors
  //   - Already Participated - close PR
  //   - Not applied for SDP
  //   - Not completed the shipping form
  //   - invalid files
  //     - comment on files review request changes
  //   - invalid markdown
  //     - comment on files review request changes
  // - collapse requested changes comment
  // - welcome and congrats
  // - merge PR

  const userAgreesCoc = user2022 && user2022["Code of Conduct"]
  let closePR = false

  if(user2020 || user2021) {
    console.log("user already Participated in 2020 or 2021")
    closePR = true
  } else {
    if(!hasSdp) {
      console.log("User has not applied for SDP")
      feedback.push("* *I'm not seeing a valid student developer pack approval, please submit an [application](https://education.github.com/discount_requests/student_application?utm_source=2021-06-05-GitHubGraduation) to get started*")
    }

    if(!completedShippingForm) {
      console.log("user has not completed the shipping form")
      feedback.push("* *It looks like you still need to fill out the [shipping form](https://airtable.com/shrVMo8ItH4wjsO9f) to continue*")
    }

    if(!isFilePathValid.isValid) {
      console.log('Files have errors: \n' + isFilePathValid.errors.join('\n'))
      feedback.push(`* *Uh Oh! I've found some issues with where you have created your files!* \n\t${isFilePathValid.errors?.join('\n')}`)
    }

    if(isMarkdownValid.isValid === false) {
      console.log("markdown is invalid")
      feedback.push(`* *Please take another look at your markdown file, there are errors:* \n\t${isMarkdownValid.errors?.join('\n')}`)
    }

    if(!userAgreesCoc) {
      console.log("User has not agreed to COC")
      feedback.push("* *You need to agree to our COC on the shipping form pretty please!*")
    }
  }

  let feedBackMessage = ""
  if(closePR) {
    feedBackMessage = "I'm really sorry! It looks like you've already graduated in a previous year. This is for first time grads!"
  } else if(feedback.length) {
    feedBackMessage = `
### I have a few items I need you to take care of before I can merge this PR:\n
${feedback.join('\n')}

Feel free to re-request a review from me and I'll come back and take a look!
    `
  } else {
    // All checks pass
    feedBackMessage = "Your Pull Request looks good! Thanks for your graduation submission. Next, one of our reviewers will come by to check your PR meets the Code of Conduct. You don’t need to do anything but wait. Once they've completed their review, they'll leave another comment asking for changes or merge your Pull Request."
    try {
      // await octokit.mergePR()
      await octokit.addReviewLabel()
    } catch(err) {
      console.error(err)
      feedBackMessage += "\n\n Uh Oh! I tried to merge this PR and something went wrong!"
      feedback.push("merge failed")
    }
  }

  console.log(feedBackMessage)

  try {
    await octokit.createReview(`
**Hi ${ actionEvent.pullAuthor },**
**Welcome to graduation!**

${ feedBackMessage }
`, feedback.length ? "REQUEST_CHANGES" : "APPROVE")
    } catch(err) {
      console.log(err)
    }

  if(closePR) {
    try {
      await octokit.addClosedLabel()
      await octokit.closePR()
    } catch(err) {
      console.log("failed to close PR")
      console.log(err)
    }
  }

  if(feedback.length) {
    console.log(feedback.join('\n'))
    process.exit(1)
  }
})()
} catch(err) {
  console.error(err)
  process.exit(1);
}
