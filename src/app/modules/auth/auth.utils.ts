import jwt from "jsonwebtoken"

const createToken = (
  jwtPayload: { id: string; role: "student" | "admin" | "faculty" },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn })
}

export default createToken
