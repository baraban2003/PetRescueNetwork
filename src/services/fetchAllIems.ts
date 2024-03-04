import axios from "axios"

export const fetchTotalItemCount = async () => {
  try {
    const response = await axios.get(
      "/api/pets/search?page=0&size=9999&sort=name",
    )
    const data = response.data
    // Check if data has the 'length' property
    if (data && data.length !== undefined) {
      return data.length // Return the length
    } else {
      console.error("Invalid response data:", data)
      return 0
    }
  } catch (error) {
    console.error("Error fetching total item count:", error)
    return 0
  }
}
