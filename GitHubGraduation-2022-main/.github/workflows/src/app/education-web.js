const axios = require('axios');

class EducationWeb {
  constructor() {

  }

  async hasPack(github_identifier) {
    await this.authenticate()

    const result = await axios({
      method: "get",
      url: process.env.EDUCATION_WEB_API + "/api/user",
      headers: {
        "Authorization": "token " + this.authToken,
        "Accept": "application/vnd.education.github.v2"
      },
      params: { github_identifier: github_identifier }
    })

    const user_type = result?.data?.user?.type

    return (user_type === "faculty" || user_type === "student")
  }

  async authenticate() {
    if(this.authToken) {
      return
    }

    const result = await axios({
      method: "post",
      url: process.env.EDUCATION_WEB_API + "/api/auth",
      headers: {
        "Accept": "application/vnd.education.github.v2"
      },
      data: {
        key: process.env.EDUCATION_WEB_KEY,
        secret: process.env.EDUCATION_WEB_SECRET
      }
    })

    this.authToken = result.data.jwt
  }
}

module.exports = new EducationWeb()
