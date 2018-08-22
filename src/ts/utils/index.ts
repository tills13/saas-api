import bcrypt from "bcrypt"
import config from "config"

import { FileInterface } from "../models"
import s3 from "../s3"

export function getSignedUrl (key: string, contentType: string) {
  return new Promise((resolve, reject) => {
    let params = { Bucket: config.s3.bucket, Key: key, ContentType: contentType, Expires: 120 }

    s3.getSignedUrl("putObject", params, (err, url) => {
      if (err) return reject(err)
      resolve(url)
    })
  })
}

export function getS3Url (file: FileInterface) {
  return config.s3.forcePathStyle
    ? `${ config.s3.endpoint }/${ file.bucket }/${ file.key }`
    : `http://${ file.bucket }.s3.amazonaws.com/${ file.key }`
}

export function generateSalt (rounds: number = 10) {
  return new Promise<string>((resolve, reject) => {
    let salt = bcrypt.genSalt(rounds, (err, salt) => {
      if (err) reject(err)
      else resolve(salt)
    })
  })
}

export function hashPassword (password: string, salt?: string) {
  return new Promise<string>(async (resolve, reject) => {
    const mSalt = salt || await generateSalt(10)
    bcrypt.hash(password, mSalt, (err, hashedPassword) => {
      if (err) reject(err)
      else resolve(hashedPassword)
    })
  })
}
