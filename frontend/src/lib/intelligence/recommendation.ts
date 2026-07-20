export function calculateRecommendation(
  overallScore: number,
  responseScore: number,
  friendlinessScore: number
) {
  if (
    overallScore >= 80 &&
    responseScore >= 70 &&
    friendlinessScore >= 70
  ) {
    return "Hot Prospect";
  }

  if (
    overallScore >= 65 ||
    (responseScore >= 60 && friendlinessScore >= 60)
  ) {
    return "Good Prospect";
  }

  if (
    overallScore >= 45 ||
    responseScore >= 40
  ) {
    return "Watch List";
  }

  return "Low Priority";
}