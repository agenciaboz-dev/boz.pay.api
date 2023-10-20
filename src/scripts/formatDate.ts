export const getDueDate = () => {
    const currentDate = new Date() // Get the current date
    currentDate.setDate(currentDate.getDate() + 3) // Add 3 days to the current date

    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, "0") // Months are 0-based in JavaScript, so we add 1.
    const day = String(currentDate.getDate()).padStart(2, "0")

    const formattedDate = `${year}-${month}-${day}`
    return formattedDate
}
