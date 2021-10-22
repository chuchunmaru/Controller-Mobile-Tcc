export const setColor = (color) => 
{
  const darkSchema = true
  return (darkSchema)? colorList[`${color}dark`] : colorList[`${color}light`]
}



const colorList =
{
    "backgroundPrimarylight": "whitesmoke",
    "backgroundPrimarydark": "black"
}