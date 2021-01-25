export default async (req, res, next) => {
  try {
    if (req.body.challengeDetails.isAdmin !== 1) {
      throw { status: 403, message: 'Only admins are authorized to edit challenges!' };
    }
    next();
  } catch (err) {
    next(err);
  }
};
