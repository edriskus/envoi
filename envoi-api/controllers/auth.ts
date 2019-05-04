import User from "../models/user";

/**
 * 
 * @param req 
 * @param res 
 */
export async function doLogin(
  req: Request, 
  res: Response
) {
  const { username, password } = req.body as any;
  const user = await User.findOne({ username }).exec();
  if (user) {
    const isMatch = await (user as any).comparePassword(password);
    if (isMatch) {
      res.json({});
    }
  }

}