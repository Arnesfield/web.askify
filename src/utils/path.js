const apiUrl = process.env.VUE_APP_API_URL
const assetsPath = 'static/'
const imgPath = assetsPath + 'img/'
const uploadsPath = 'uploads/'
const uploadsImgPath = uploadsPath + 'img/'
const avatarsPath = uploadsImgPath + 'avatars/'
const answersPath = uploadsImgPath + 'answers/'
const questionsPath = uploadsImgPath + 'questions/'
const tagsPath = uploadsImgPath + 'tags/'

export {
  apiUrl,
  assetsPath,
  imgPath,
  avatarsPath,
  answersPath,
  questionsPath,
  tagsPath
}

export default {
  apiUrl,
  assetsPath,
  imgPath,
  avatarsPath,
  answersPath,
  questionsPath,
  tagsPath
}
