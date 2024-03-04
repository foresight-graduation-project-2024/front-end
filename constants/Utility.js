export const createUserObject = (user) => ({
  memberId: user.id,
  firstname: user.firstname,
  lastname: user.lastname,
  email: user.email,
  role: user.role,
});

export const timeFormat = (curTime) => {
  return (
    `${String(curTime.getDate()).padStart(2, "0")}-${String(
      curTime.getMonth() + 1
    ).padStart(2, "0")}-${curTime.getFullYear()}, ${String(
      curTime.getHours()
    ).padStart(2, "0")}:${String(curTime.getMinutes()).padStart(2, "0")}`
  )
}