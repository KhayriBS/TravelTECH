import JWT from 'jsonwebtoken'
let secretCode='**secretcode**'
export function createToken(username)
{
return JWT.sign({username},secretCode,{ expiresIn: '1h' })
}
